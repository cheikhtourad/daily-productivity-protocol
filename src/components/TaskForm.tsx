'use client'

import React, { useState, useEffect } from 'react'
import { useTasks, CustomTask } from '@/contexts/TasksContext'
import { useLanguage } from '@/contexts/LanguageContext'

interface TaskFormProps {
  isOpen: boolean
  onClose: () => void
  editingTask?: CustomTask | null
}

const getCategoryKey = (category: string) => {
  const categoryMap: { [key: string]: string } = {
    'work': 'category.work',
    'health': 'category.health', 
    'education': 'category.education',
    'family': 'category.family',
    'hobbies': 'category.hobbies',
    'personal': 'category.personal',
    'other': 'category.other'
  }
  return categoryMap[category] || category
}

const categories = ['work', 'health', 'education', 'family', 'hobbies', 'personal', 'other']

export default function TaskForm({ isOpen, onClose, editingTask }: TaskFormProps) {
  const { addTask, editTask } = useTasks()
  const { t, dir } = useLanguage()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startTime: '',
    endTime: '',
    category: 'personal'
  })
  const [error, setError] = useState('')

  useEffect(() => {
    if (editingTask) {
      setFormData({
        title: editingTask.title,
        description: editingTask.description || '',
        startTime: editingTask.startTime,
        endTime: editingTask.endTime,
        category: editingTask.category
      })
    } else {
      setFormData({
        title: '',
        description: '',
        startTime: '',
        endTime: '',
        category: 'personal'
      })
    }
    setError('')
  }, [editingTask, isOpen])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!formData.title.trim()) {
      setError(t('task.validation.title_required'))
      return
    }

    if (!formData.startTime || !formData.endTime) {
      setError(t('task.validation.time_required'))
      return
    }

    if (formData.startTime >= formData.endTime) {
      setError(t('task.validation.time_order'))
      return
    }

    if (editingTask) {
      editTask(editingTask.id, formData)
    } else {
      addTask(formData)
    }

    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              {editingTask ? t('task.edit_task') : t('task.add_new_task')}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                {t('task.form.title')} *
              </label>
              <input
                type="text"
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder={t('task.form.title_placeholder')}
                dir={dir}
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                {t('task.form.description')}
              </label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent h-20"
                placeholder={t('task.form.description_placeholder')}
                dir={dir}
              />
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                {t('task.form.category')}
              </label>
              <select
                id="category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                dir={dir}
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {t(getCategoryKey(category))}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="startTime" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('task.form.start_time')} *
                </label>
                <input
                  type="time"
                  id="startTime"
                  value={formData.startTime}
                  onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="endTime" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('task.form.end_time')} *
                </label>
                <input
                  type="time"
                  id="endTime"
                  value={formData.endTime}
                  onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div className="flex space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                {t('task.form.cancel')}
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {editingTask ? t('task.form.save_changes') : t('task.form.add_task')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
