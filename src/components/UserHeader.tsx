'use client'

import React from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useLanguage } from '@/contexts/LanguageContext'
import LanguageSelector from './LanguageSelector'

export default function UserHeader() {
  const { user, logout } = useAuth()
  const { t } = useLanguage()

  if (!user) return null

  return (
    <div className="flex items-center justify-between bg-white rounded-lg shadow-md p-4 mb-6">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
          <span className="text-blue-600 font-bold text-lg">
            {user.username.charAt(0).toUpperCase()}
          </span>
        </div>
        <div>
          <h3 className="font-medium text-high-contrast">{t('auth.welcome')}, {user.username}</h3>
          {user.email && (
            <p className="text-sm text-muted">{user.email}</p>
          )}
        </div>
      </div>
      
      <div className="flex items-center space-x-3">
        <LanguageSelector />
        <button
          onClick={logout}
          className="px-4 py-2 text-sm text-secondary hover:text-primary hover:bg-gray-100 rounded-lg transition-colors"
        >
          {t('auth.logout')}
        </button>
      </div>
    </div>
  )
}
