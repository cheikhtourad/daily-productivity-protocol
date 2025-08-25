'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface TimerProps {
  activityId?: string;
  activityName?: string;
}

export default function Timer({ activityName }: TimerProps) {
  const { t, dir } = useLanguage();
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [cycles, setCycles] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else if (minutes > 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        } else {
          // Timer completed
          setIsActive(false);
          setCycles(prev => prev + 1);
          
          // Auto-start break or next work session
          if (!isBreak) {
            // Start break
            setIsBreak(true);
            setMinutes(5);
            setSeconds(0);
          } else {
            // Start work session
            setIsBreak(false);
            setMinutes(25);
            setSeconds(0);
          }
          
          // Play notification sound or show notification
          if ('Notification' in window && Notification.permission === 'granted') {
            new Notification(isBreak ? t('timer.break_ended') : t('timer.work_session_ended'), {
              body: isBreak ? t('timer.back_to_work') : t('timer.break_time'),
              icon: '/favicon.ico'
            });
          }
        }
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, minutes, seconds, isBreak, t]);

  const toggleTimer = () => {
    setIsActive(!isActive);
    
    // Request notification permission
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  };

  const resetTimer = () => {
    setIsActive(false);
    setIsBreak(false);
    setMinutes(25);
    setSeconds(0);
  };

  const startBreak = () => {
    setIsActive(false);
    setIsBreak(true);
    setMinutes(5);
    setSeconds(0);
  };

  const formatTime = (mins: number, secs: number) => {
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
      <h3 className="text-xl font-bold text-center mb-4 text-gray-800">
        ⏰ {t('timer.pomodoro_timer')}
      </h3>
      
      {activityName && (
        <p className="text-center text-gray-600 mb-4 text-sm" dir={dir}>
          {t('timer.current_activity')}: <span className="font-medium">{activityName}</span>
        </p>
      )}
      
      <div className="text-center">
        <div className={`text-6xl font-mono font-bold mb-4 ${
          isBreak ? 'text-green-600' : 'text-blue-600'
        }`}>
          {formatTime(minutes, seconds)}
        </div>
        
        <div className="mb-4">
          <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
            isBreak 
              ? 'bg-green-100 text-green-800' 
              : 'bg-blue-100 text-blue-800'
          }`}>
            {isBreak ? `🌿 ${t('timer.break')}` : `💼 ${t('timer.work')}`}
          </span>
        </div>
        
        <div className="flex justify-center gap-3 mb-4">
          <button
            onClick={toggleTimer}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              isActive
                ? 'bg-red-500 hover:bg-red-600 text-white'
                : 'bg-green-500 hover:bg-green-600 text-white'
            }`}
          >
            {isActive ? `⏸️ ${t('timer.pause')}` : `▶️ ${t('timer.start')}`}
          </button>
          
          <button
            onClick={resetTimer}
            className="px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors"
          >
            🔄 {t('timer.reset')}
          </button>
          
          {!isBreak && !isActive && (
            <button
              onClick={startBreak}
              className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors"
            >
              ☕ {t('timer.break')}
            </button>
          )}
        </div>
        
        <div className="text-sm text-gray-600" dir={dir}>
          <p>{t('timer.completed_cycles')}: <span className="font-medium">{cycles}</span></p>
          <p className="mt-1 text-xs">
            {t('timer.work_break_duration')}
          </p>
        </div>
      </div>
    </div>
  );
}
