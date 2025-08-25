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
  
  // Determine category - use default if not available
  const category = activity.category || 'personal';

  return (
    <div className={`p-4 rounded-lg border-2 transition-all duration-300 ${
      activity.completed 
        ? 'bg-gray-100 border-gray-300 opacity-70' 
        : categoryColors[category]
    }`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3 flex-1">
          <span className="text-2xl">{categoryIcons[category]}</span>
          <div className="flex-1">
            <h3 className={`font-bold text-lg mb-1 text-black ${activity.completed ? 'line-through' : ''}`}>
              {(activity.title as unknown as Record<string, string>)[language] || activity.title}
            </h3>
            <p className="text-sm font-medium text-black">
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
          {/* Description */}
          <div>
            <h4 className="font-semibold text-md mb-2 text-black" style={{ textAlign: dir === 'rtl' ? 'right' : 'left' }}>📋 {t('activity.process')}</h4>
            <div className="bg-white/70 p-3 rounded-md">
              <p className="text-sm text-black" style={{ textAlign: dir === 'rtl' ? 'right' : 'left' }} dir={dir}>
                {(activity as any).description || (activity as any).descriptions?.[language] || 'وصف النشاط غير متوفر'}
              </p>
            </div>
          </div>

          {/* Methodology */}
          <div>
            <h4 className="font-semibold text-md mb-2 text-black" style={{ textAlign: dir === 'rtl' ? 'right' : 'left' }}>⚡ {t('activity.methodology')}</h4>
            <div className="bg-white/70 p-3 rounded-md">
              {((activity as any).methodology || (activity as any).methodologies?.[language]) && (
                <div>
                  {Array.isArray((activity as any).methodologies?.[language]) ? (
                    <ul className="space-y-1" style={{ textAlign: dir === 'rtl' ? 'right' : 'left' }} dir={dir}>
                      {(activity as any).methodologies[language].map((method: string, index: number) => (
                        <li key={index} className="text-sm text-black flex items-start gap-2">
                          <span className="text-blue-600">•</span>
                          <span>{method}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div>
                      <p className="font-medium text-sm text-black mb-1" style={{ textAlign: dir === 'rtl' ? 'right' : 'left' }} dir={dir}>
                        {(activity as any).methodology?.name || 'منهجية النشاط'}
                      </p>
                      <p className="text-sm text-black" style={{ textAlign: dir === 'rtl' ? 'right' : 'left' }} dir={dir}>
                        {(activity as any).methodology?.description || 'وصف المنهجية غير متوفر'}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
