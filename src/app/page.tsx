'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import ActivityCard from '@/components/ActivityCard';
import ProgressDashboard from '@/components/ProgressDashboard';
import Timer from '@/components/Timer';
import AuthButton from '@/components/AuthButton';
import { dailyActivities, Activity } from '@/data/activities';

export default function Home() {
  const { data: session, status } = useSession();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [currentActivity, setCurrentActivity] = useState<Activity | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [, setIsLoading] = useState(false);

  // Load user progress from database or localStorage
  const loadProgress = async () => {
    const allActivities = dailyActivities.phases.flatMap(phase => phase.activities);
    
    if (session?.user) {
      // Authenticated user - load from database
      try {
        setIsLoading(true);
        const response = await fetch('/api/progress');
        if (response.ok) {
          const { progress } = await response.json();
          const progressMap = progress.reduce((acc: Record<string, boolean>, item: { activityId: string; completed: boolean }) => {
            acc[item.activityId] = item.completed;
            return acc;
          }, {});
          
          const updatedActivities = allActivities.map(activity => ({
            ...activity,
            completed: progressMap[activity.id] || false
          }));
          setActivities(updatedActivities);
        }
      } catch (error) {
        console.error('Error loading progress:', error);
        setActivities(allActivities);
      } finally {
        setIsLoading(false);
      }
    } else {
      // Guest user - load from localStorage
      const savedProgress = localStorage.getItem('daily-progress');
      if (savedProgress) {
        const progress = JSON.parse(savedProgress);
        const updatedActivities = allActivities.map(activity => ({
          ...activity,
          completed: progress[activity.id] || false
        }));
        setActivities(updatedActivities);
      } else {
        setActivities(allActivities);
      }
    }
  };

  useEffect(() => {
    if (status !== 'loading') {
      loadProgress();
    }
  }, [session, status]);

  useEffect(() => {
    // Update current time every minute
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Find current activity based on time
    const now = currentTime;
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentTimeInMinutes = currentHour * 60 + currentMinute;

    const current = activities.find(activity => {
      const [startHour, startMinute] = activity.startTime.split(':').map(Number);
      const [endHour, endMinute] = activity.endTime.split(':').map(Number);
      const startTimeInMinutes = startHour * 60 + startMinute;
      const endTimeInMinutes = endHour * 60 + endMinute;
      
      return currentTimeInMinutes >= startTimeInMinutes && currentTimeInMinutes < endTimeInMinutes;
    });

    setCurrentActivity(current || null);
  }, [currentTime, activities]);

  const handleToggleComplete = async (activityId: string) => {
    const activityToUpdate = activities.find(a => a.id === activityId);
    if (!activityToUpdate) return;
    
    const newCompleted = !activityToUpdate.completed;
    
    // Optimistic update
    const updatedActivities = activities.map(activity => 
      activity.id === activityId 
        ? { ...activity, completed: newCompleted }
        : activity
    );
    setActivities(updatedActivities);
    
    if (session?.user) {
      // Authenticated user - save to database
      try {
        const response = await fetch('/api/progress', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            activityId,
            completed: newCompleted,
          }),
        });
        
        if (!response.ok) {
          // Revert optimistic update on error
          const revertedActivities = activities.map(activity => 
            activity.id === activityId 
              ? { ...activity, completed: !newCompleted }
              : activity
          );
          setActivities(revertedActivities);
          console.error('Failed to update progress in database');
        }
      } catch (error) {
        // Revert optimistic update on error
        const revertedActivities = activities.map(activity => 
          activity.id === activityId 
            ? { ...activity, completed: !newCompleted }
            : activity
        );
        setActivities(revertedActivities);
        console.error('Error updating progress:', error);
      }
    } else {
      // Guest user - save to localStorage
      const progress = updatedActivities.reduce((acc, activity) => {
        acc[activity.id] = activity.completed;
        return acc;
      }, {} as Record<string, boolean>);
      
      localStorage.setItem('daily-progress', JSON.stringify(progress));
    }
  };

  const resetProgress = () => {
    const resetActivities = activities.map(activity => ({ ...activity, completed: false }));
    setActivities(resetActivities);
    localStorage.removeItem('daily-progress');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4 md:p-8" dir="rtl">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            📋 البروتوكول اليومي – المنهجية العملية
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            الوقت الحالي: <span className="font-mono font-bold">{currentTime.toLocaleTimeString('ar-SA')}</span>
          </p>
          {currentActivity && (
            <div className="bg-yellow-100 border-yellow-300 border-2 rounded-lg p-3 inline-block">
              <p className="text-yellow-800 font-medium">
                🔔 النشاط الحالي: <span className="font-bold">{currentActivity.title}</span>
              </p>
              <p className="text-sm text-yellow-700">
                {currentActivity.timeSlot}
              </p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Progress and Timer */}
          <div className="lg:col-span-1">
            <AuthButton />
            <div className="mt-6">
              <ProgressDashboard activities={activities} />
            </div>
            <Timer 
              activityId={currentActivity?.id}
              activityName={currentActivity?.title}
            />
            
            {/* Reset Button */}
            <div className="bg-white rounded-xl shadow-lg p-4 text-center">
              <button
                onClick={resetProgress}
                className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors"
              >
                🔄 إعادة تعيين التقدم
              </button>
              <p className="text-xs text-gray-500 mt-2">
                هذا سيمحو كل التقدم المحفوظ
              </p>
            </div>
          </div>

          {/* Right Column - Activity Schedule */}
          <div className="lg:col-span-2">
            {dailyActivities.phases.map((phase, phaseIndex) => (
              <div key={phaseIndex} className="mb-8">
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">
                    {phase.title}
                  </h2>
                  <p className="text-lg text-gray-600 mb-6 text-center font-mono">
                    {phase.timeRange}
                  </p>
                  
                  <div className="space-y-4">
                    {phase.activities.map(activity => {
                      const activityWithProgress = activities.find(a => a.id === activity.id) || activity;
                      return (
                        <ActivityCard
                          key={activity.id}
                          activity={activityWithProgress}
                          onToggleComplete={handleToggleComplete}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-600">
          <p className="text-sm">
            💡 تطبيق البروتوكول اليومي - نظام إنتاجية شامل مع منهجيات علمية مثبتة
          </p>
        </div>
      </div>
    </div>
  );
}
