'use client'

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { useAuth } from './AuthContext'

export interface CustomTask {
  id: string
  title: string
  description?: string
  startTime: string
  endTime: string
  category: string
  completed: boolean
  createdAt: Date
  userId: string
}

interface TasksContextType {
  customTasks: CustomTask[]
  addTask: (task: Omit<CustomTask, 'id' | 'completed' | 'createdAt' | 'userId'>) => void
  editTask: (id: string, updates: Partial<CustomTask>) => void
  deleteTask: (id: string) => void
  toggleTaskComplete: (id: string) => void
  loadUserTasks: () => void
}

const TasksContext = createContext<TasksContextType | undefined>(undefined)

export function TasksProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  const [customTasks, setCustomTasks] = useState<CustomTask[]>([])

  const loadUserTasks = useCallback(() => {
    if (user) {
      const savedTasks = localStorage.getItem(`custom-tasks-${user.username}`)
      if (savedTasks) {
        const tasks = JSON.parse(savedTasks).map((task: any) => ({
          ...task,
          createdAt: new Date(task.createdAt)
        }))
        setCustomTasks(tasks)
      }
    } else {
      setCustomTasks([])
    }
  }, [user])

  useEffect(() => {
    loadUserTasks()
  }, [user, loadUserTasks])

  const saveTasksToStorage = (tasks: CustomTask[]) => {
    if (user) {
      localStorage.setItem(`custom-tasks-${user.username}`, JSON.stringify(tasks))
    }
  }

  const addTask = (taskData: Omit<CustomTask, 'id' | 'completed' | 'createdAt' | 'userId'>) => {
    if (!user) return

    const newTask: CustomTask = {
      ...taskData,
      id: `custom-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      completed: false,
      createdAt: new Date(),
      userId: user.username
    }

    const updatedTasks = [...customTasks, newTask]
    setCustomTasks(updatedTasks)
    saveTasksToStorage(updatedTasks)
  }

  const editTask = (id: string, updates: Partial<CustomTask>) => {
    const updatedTasks = customTasks.map(task =>
      task.id === id ? { ...task, ...updates } : task
    )
    setCustomTasks(updatedTasks)
    saveTasksToStorage(updatedTasks)
  }

  const deleteTask = (id: string) => {
    const updatedTasks = customTasks.filter(task => task.id !== id)
    setCustomTasks(updatedTasks)
    saveTasksToStorage(updatedTasks)
  }

  const toggleTaskComplete = (id: string) => {
    const updatedTasks = customTasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    )
    setCustomTasks(updatedTasks)
    saveTasksToStorage(updatedTasks)
  }

  return (
    <TasksContext.Provider value={{
      customTasks,
      addTask,
      editTask,
      deleteTask,
      toggleTaskComplete,
      loadUserTasks
    }}>
      {children}
    </TasksContext.Provider>
  )
}

export function useTasks() {
  const context = useContext(TasksContext)
  if (context === undefined) {
    throw new Error('useTasks must be used within a TasksProvider')
  }
  return context
}
