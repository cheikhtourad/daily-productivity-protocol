'use client';

import React from 'react';
import { Activity, categoryIcons } from '@/data/activities';

interface ProgressDashboardProps {
  activities: Activity[];
}

export default function ProgressDashboard({ activities }: ProgressDashboardProps) {
  const totalActivities = activities.length;
  const completedActivities = activities.filter(a => a.completed).length;
  const progressPercentage = Math.round((completedActivities / totalActivities) * 100);

  const categoryStats = activities.reduce((stats, activity) => {
    const category = activity.category;
    if (!stats[category]) {
      stats[category] = { total: 0, completed: 0 };
    }
    stats[category].total++;
    if (activity.completed) {
      stats[category].completed++;
    }
    return stats;
  }, {} as Record<string, { total: number; completed: number }>);

  const getCategoryName = (category: string) => {
    const names = {
      spiritual: 'روحية',
      work: 'عمل',
      personal: 'شخصية',
      family: 'أسرة'
    };
    return names[category as keyof typeof names] || category;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
        📊 لوحة التقدم اليومي
      </h2>
      
      {/* Overall Progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-lg font-semibold">التقدم العام</span>
          <span className="text-lg font-bold text-blue-600">
            {completedActivities}/{totalActivities} ({progressPercentage}%)
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div 
            className="bg-gradient-to-r from-blue-500 to-green-500 h-4 rounded-full transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Object.entries(categoryStats).map(([category, stats]) => {
          const percentage = Math.round((stats.completed / stats.total) * 100);
          return (
            <div key={category} className="text-center">
              <div className="text-3xl mb-2">
                {categoryIcons[category as keyof typeof categoryIcons]}
              </div>
              <div className="text-sm font-medium text-gray-700 mb-1">
                {getCategoryName(category)}
              </div>
              <div className="text-lg font-bold text-gray-800">
                {stats.completed}/{stats.total}
              </div>
              <div className="text-sm text-blue-600">
                {percentage}%
              </div>
            </div>
          );
        })}
      </div>

      {/* Motivation Message */}
      <div className="mt-6 text-center">
        {progressPercentage === 100 && (
          <div className="text-green-600 font-bold text-lg">
            🎉 مبروك! تمام إنجاز جميع الأنشطة اليوم
          </div>
        )}
        {progressPercentage >= 80 && progressPercentage < 100 && (
          <div className="text-blue-600 font-medium">
            💪 أداء ممتاز! أكمل المتبقي لإنجاز مثالي
          </div>
        )}
        {progressPercentage >= 50 && progressPercentage < 80 && (
          <div className="text-orange-600 font-medium">
            ⚡ في منتصف الطريق! استمر بنفس القوة
          </div>
        )}
        {progressPercentage < 50 && (
          <div className="text-gray-600 font-medium">
            🚀 البداية القوية مفتاح النجاح!
          </div>
        )}
      </div>
    </div>
  );
}
