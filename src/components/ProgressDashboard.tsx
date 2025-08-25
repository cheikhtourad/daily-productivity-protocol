'use client';

import React from 'react';
import { Activity, categoryIcons } from '@/data/activities';
import { useLanguage } from '@/contexts/LanguageContext';

interface ProgressDashboardProps {
  activities: Activity[];
}

export default function ProgressDashboard({ activities }: ProgressDashboardProps) {
  const { t } = useLanguage();
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

  const getCategoryKey = (category: string) => {
    const categoryMap: { [key: string]: string } = {
      'spiritual': 'category.spiritual',
      'work': 'category.work',
      'health': 'category.health', 
      'education': 'category.education',
      'family': 'category.family',
      'hobbies': 'category.hobbies',
      'personal': 'category.personal',
      'other': 'category.other'
    }
    return categoryMap[category] || `category.${category}`
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
      <h2 className="text-2xl font-bold text-center mb-6 text-high-contrast">
        📊 {t('progress.daily_progress_dashboard')}
      </h2>
      
      {/* Overall Progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-lg font-semibold text-secondary">{t('progress.overall_progress')}</span>
          <span className="text-lg font-bold text-accent">
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
              <div className="text-sm font-medium text-secondary mb-1">
                {t(getCategoryKey(category))}
              </div>
              <div className="text-lg font-bold text-medium-contrast">
                {stats.completed}/{stats.total}
              </div>
              <div className="text-sm text-accent">
                {percentage}%
              </div>
            </div>
          );
        })}
      </div>

      {/* Motivation Message */}
      <div className="mt-6 text-center">
        {progressPercentage === 100 && (
          <div className="text-success font-bold text-lg">
            🎉 {t('progress.congratulations_complete')}
          </div>
        )}
        {progressPercentage >= 80 && progressPercentage < 100 && (
          <div className="text-info font-medium">
            💪 {t('progress.excellent_performance')}
          </div>
        )}
        {progressPercentage >= 50 && progressPercentage < 80 && (
          <div className="text-warning font-medium">
            ⚡ {t('progress.halfway_there')}
          </div>
        )}
        {progressPercentage < 50 && (
          <div className="text-secondary font-medium">
            🚀 {t('progress.strong_start')}
          </div>
        )}
      </div>
    </div>
  );
}
