'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

interface User {
  username: string
  email?: string
}

interface AuthContextType {
  user: User | null
  login: (username: string, password: string) => boolean
  register: (username: string, password: string, email?: string) => boolean
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in on app start
    const savedUser = localStorage.getItem('currentUser')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)
  }, [])

  const login = (username: string, password: string): boolean => {
    const users = JSON.parse(localStorage.getItem('users') || '{}')
    
    if (users[username] && users[username].password === password) {
      const userData = {
        username,
        email: users[username].email
      }
      setUser(userData)
      localStorage.setItem('currentUser', JSON.stringify(userData))
      return true
    }
    return false
  }

  const register = (username: string, password: string, email?: string): boolean => {
    const users = JSON.parse(localStorage.getItem('users') || '{}')
    
    if (users[username]) {
      return false // User already exists
    }
    
    users[username] = { password, email }
    localStorage.setItem('users', JSON.stringify(users))
    
    const userData = { username, email }
    setUser(userData)
    localStorage.setItem('currentUser', JSON.stringify(userData))
    return true
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('currentUser')
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
