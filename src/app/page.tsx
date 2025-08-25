'use client';

import React, { useState, useEffect, useCallback } from 'react';
import ActivityCard from '@/components/ActivityCard';
import ProgressDashboard from '@/components/ProgressDashboard';
import Timer from '@/components/Timer';
import AuthForm from '@/components/AuthForm';
import UserHeader from '@/components/UserHeader';
import TaskForm from '@/components/TaskForm';
import CustomTaskCard from '@/components/CustomTaskCard';
import { useAuth } from '@/contexts/AuthContext';
import { useTasks, CustomTask } from '@/contexts/TasksContext';
import { dailyActivities, Activity } from '@/data/activities';

export default function Home() {
  const { user, isLoading } = useAuth();
  const { customTasks, toggleTaskComplete, deleteTask } = useTasks();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [currentActivity, setCurrentActivity] = useState<Activity | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState<CustomTask | null>(null);
  const [activeTab, setActiveTab] = useState<'daily' | 'custom'>('daily');

  // Load user progress from localStorage
  const loadProgress = useCallback(() => {
    const allActivities = dailyActivities.phases.flatMap(phase => phase.activities);
    
    if (user) {
      // Authenticated user - load user-specific progress
      const savedProgress = localStorage.getItem(`daily-progress-${user.username}`);
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
    } else {
      setActivities(allActivities);
    }
  }, [user]);

  useEffect(() => {
    if (!isLoading) {
      loadProgress();
    }
  }, [user, isLoading, loadProgress]);

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

  const handleToggleComplete = (activityId: string) => {
    const activityToUpdate = activities.find(a => a.id === activityId);
    if (!activityToUpdate) return;
    
    const newCompleted = !activityToUpdate.completed;
    
    // Update activities state
    const updatedActivities = activities.map(activity => 
      activity.id === activityId 
        ? { ...activity, completed: newCompleted }
        : activity
    );
    setActivities(updatedActivities);
    
    // Save to localStorage with user-specific key
    const progress = updatedActivities.reduce((acc, activity) => {
      acc[activity.id] = activity.completed;
      return acc;
    }, {} as Record<string, boolean>);
    
    if (user) {
      localStorage.setItem(`daily-progress-${user.username}`, JSON.stringify(progress));
    }
  };

  const resetProgress = () => {
    const resetActivities = activities.map(activity => ({ ...activity, completed: false }));
    setActivities(resetActivities);
    if (user) {
      localStorage.removeItem(`daily-progress-${user.username}`);
    }
  };

  const handleEditTask = (task: CustomTask) => {
    setEditingTask(task);
    setShowTaskForm(true);
  };

  const handleDeleteTask = (taskId: string) => {
    if (confirm('هل أنت متأكد من حذف هذه المهمة؟')) {
      deleteTask(taskId);
    }
  };

  const handleCloseTaskForm = () => {
    setShowTaskForm(false);
    setEditingTask(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <AuthForm />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4 md:p-8" dir="rtl">
      <div className="max-w-6xl mx-auto">
        {/* User Header */}
        <UserHeader />
        
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
          
          {/* Tab Navigation */}
          <div className="flex justify-center mt-6">
            <div className="bg-white rounded-lg p-1 shadow-md">
              <button
                onClick={() => setActiveTab('daily')}
                className={`px-6 py-2 rounded-md font-medium transition-colors ${
                  activeTab === 'daily'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                الأنشطة اليومية
              </button>
              <button
                onClick={() => setActiveTab('custom')}
                className={`px-6 py-2 rounded-md font-medium transition-colors ${
                  activeTab === 'custom'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                المهام المخصصة ({customTasks.length})
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Progress and Timer */}
          <div className="lg:col-span-1">
            <ProgressDashboard activities={activities} />
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

          {/* Right Column - Content */}
          <div className="lg:col-span-2">
            {activeTab === 'daily' ? (
              /* Daily Activities */
              dailyActivities.phases.map((phase, phaseIndex) => (
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
              ))
            ) : (
              /* Custom Tasks */
              <div className="mb-8">
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">
                      المهام المخصصة
                    </h2>
                    <button
                      onClick={() => setShowTaskForm(true)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                    >
                      <span>➕</span>
                      <span>إضافة مهمة</span>
                    </button>
                  </div>
                  
                  {customTasks.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <p className="text-lg mb-2">🗂️ لا توجد مهام مخصصة بعد</p>
                      <p className="text-sm">أضف مهمة جديدة لتبدأ في تنظيم يومك</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {customTasks
                        .sort((a, b) => a.startTime.localeCompare(b.startTime))
                        .map(task => (
                          <CustomTaskCard
                            key={task.id}
                            task={task}
                            onToggleComplete={toggleTaskComplete}
                            onEdit={handleEditTask}
                            onDelete={handleDeleteTask}
                          />
                        ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-600">
          <p className="text-sm">
            💡 تطبيق البروتوكول اليومي - نظام إنتاجية شامل مع منهجيات علمية مثبتة
          </p>
        </div>
        
        {/* Task Form Modal */}
        <TaskForm
          isOpen={showTaskForm}
          onClose={handleCloseTaskForm}
          editingTask={editingTask}
        />
      </div>
    </div>
  );
}
