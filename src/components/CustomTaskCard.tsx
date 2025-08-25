'use client'

import React from 'react'
import { CustomTask } from '@/contexts/TasksContext'

interface CustomTaskCardProps {
  task: CustomTask
  onToggleComplete: (id: string) => void
  onEdit: (task: CustomTask) => void
  onDelete: (id: string) => void
}

const getCategoryIcon = (category: string) => {
  const icons: { [key: string]: string } = {
    'العمل': '💼',
    'الصحة': '🏃',
    'التعليم': '📚',
    'الأسرة': '👨‍👩‍👧‍👦',
    'الهوايات': '🎨',
    'المهام الشخصية': '📝',
    'أخرى': '📌'
  }
  return icons[category] || '📌'
}

const getCategoryColor = (category: string) => {
  const colors: { [key: string]: string } = {
    'العمل': 'bg-blue-100 text-blue-800',
    'الصحة': 'bg-green-100 text-green-800',
    'التعليم': 'bg-purple-100 text-purple-800',
    'الأسرة': 'bg-pink-100 text-pink-800',
    'الهوايات': 'bg-yellow-100 text-yellow-800',
    'المهام الشخصية': 'bg-gray-100 text-gray-800',
    'أخرى': 'bg-indigo-100 text-indigo-800'
  }
  return colors[category] || 'bg-gray-100 text-gray-800'
}

export default function CustomTaskCard({ task, onToggleComplete, onEdit, onDelete }: CustomTaskCardProps) {
  const timeSlot = `${task.startTime} - ${task.endTime}`
  
  return (
    <div className={`bg-white border-2 rounded-lg p-4 transition-all duration-200 hover:shadow-md ${
      task.completed ? 'border-green-200 bg-green-50' : 'border-gray-200'
    }`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-lg">{getCategoryIcon(task.category)}</span>
            <h3 className={`font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
              {task.title}
            </h3>
          </div>
          
          {task.description && (
            <p className={`text-sm mb-2 ${task.completed ? 'line-through text-gray-400' : 'text-gray-600'}`}>
              {task.description}
            </p>
          )}
          
          <div className="flex items-center space-x-2 mb-3">
            <span className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(task.category)}`}>
              {task.category}
            </span>
            <span className="text-xs text-gray-500 font-mono">
              {timeSlot}
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-1 mr-2">
          <button
            onClick={() => onEdit(task)}
            className="p-1.5 text-blue-600 hover:bg-blue-100 rounded-full transition-colors"
            title="تعديل المهمة"
          >
            ✏️
          </button>
          
          <button
            onClick={() => onDelete(task.id)}
            className="p-1.5 text-red-600 hover:bg-red-100 rounded-full transition-colors"
            title="حذف المهمة"
          >
            🗑️
          </button>

          <button
            onClick={() => onToggleComplete(task.id)}
            className={`p-2 rounded-full transition-colors ${
              task.completed 
                ? 'bg-green-500 text-white hover:bg-green-600' 
                : 'bg-gray-200 text-gray-600 hover:bg-green-100'
            }`}
            title={task.completed ? 'إلغاء إنجاز المهمة' : 'تأشير كمنجز'}
          >
            {task.completed ? '✓' : '○'}
          </button>
        </div>
      </div>
    </div>
  )
}
