'use client';

import React, { useState } from 'react';
import { Activity, categoryColors, categoryIcons } from '@/data/activities';
import { useLanguage } from '@/contexts/LanguageContext';

interface ActivityCardProps {
  activity: Activity;
  onToggleComplete: (activityId: string) => void;
}

export default function ActivityCard({ activity, onToggleComplete }: ActivityCardProps) {
  const [showDetails, setShowDetails] = useState(false);
  const { t, language, dir } = useLanguage();

  return (
    <div className={`p-4 rounded-lg border-2 transition-all duration-300 ${
      activity.completed 
        ? 'bg-gray-100 border-gray-300 opacity-70' 
        : categoryColors[activity.category]
    }`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3 flex-1">
          <span className="text-2xl">{categoryIcons[activity.category]}</span>
          <div className="flex-1">
            <h3 className={`font-bold text-lg mb-1 ${activity.completed ? 'line-through' : ''}`}>
              {(activity.title as unknown as Record<string, string>)[language] || activity.title}
            </h3>
            <p className="text-sm font-medium text-gray-600">
              {activity.timeSlot}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="p-2 rounded-full hover:bg-white/50 transition-colors"
            title={t('activity.show_details')}
          >
            <span className={`transform transition-transform ${showDetails ? 'rotate-180' : ''}`}>
              ⬇️
            </span>
          </button>
          <button
            onClick={() => onToggleComplete(activity.id)}
            className={`p-2 rounded-full transition-all ${
              activity.completed 
                ? 'bg-green-500 text-white' 
                : 'bg-white hover:bg-green-100'
            }`}
            title={activity.completed ? t('activity.unmark_complete') : t('activity.mark_complete')}
          >
            {activity.completed ? '✅' : '⭕'}
          </button>
        </div>
      </div>

      {showDetails && (
        <div className="mt-4 space-y-4 border-t pt-4">
          {/* Processus */}
          <div>
            <h4 className="font-semibold text-md mb-2" style={{ textAlign: dir === 'rtl' ? 'right' : 'left' }}>📋 {t('activity.process')}</h4>
            <ol className="space-y-2" style={{ textAlign: dir === 'rtl' ? 'right' : 'left' }} dir={dir}>
              {((activity.processus as unknown as Record<string, string[]>)[language] || activity.processus).map((step: string, index: number) => (
                <li key={index} className={`flex items-start gap-2 text-sm ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                  <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                    {index + 1}
                  </span>
                  <span className="flex-1">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Methodology */}
          <div>
            <h4 className="font-semibold text-md mb-2" style={{ textAlign: dir === 'rtl' ? 'right' : 'left' }}>⚡ {t('activity.methodology')}</h4>
            <div className="bg-white/70 p-3 rounded-md">
              <p className="font-medium text-sm text-blue-800 mb-1" style={{ textAlign: dir === 'rtl' ? 'right' : 'left' }} dir={dir}>
                {(activity.methodology.name as unknown as Record<string, string>)[language] || activity.methodology.name}
              </p>
              <p className="text-sm text-gray-700" style={{ textAlign: dir === 'rtl' ? 'right' : 'left' }} dir={dir}>
                {(activity.methodology.description as unknown as Record<string, string>)[language] || activity.methodology.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
