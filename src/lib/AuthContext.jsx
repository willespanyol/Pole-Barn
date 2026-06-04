import React, { createContext, useContext, useEffect, useState } from 'react'
import { appClient } from '@/api/appClient'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoadingAuth, setIsLoadingAuth] = useState(true)
  const [authError, setAuthError] = useState(null)
  const [authChecked, setAuthChecked] = useState(false)

  const checkUserAuth = async () => {
    try {
      setIsLoadingAuth(true)
      setAuthError(null)
      const authed = await appClient.auth.isAuthenticated()
      if (!authed) {
        setUser(null)
        setIsAuthenticated(false)
        return
      }
      const currentUser = await appClient.auth.me()
      setUser(currentUser)
      setIsAuthenticated(true)
    } catch (error) {
      setUser(null)
      setIsAuthenticated(false)
      setAuthError({ type: 'auth_error', message: error.message || 'Authentication failed' })
    } finally {
      setIsLoadingAuth(false)
      setAuthChecked(true)
    }
  }

  useEffect(() => {
    checkUserAuth()
  }, [])

  const logout = async (redirectPath = '/') => {
    await appClient.auth.logout(redirectPath)
  }

  const navigateToLogin = () => appClient.auth.redirectToLogin('/portal')

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoadingAuth,
        isLoadingPublicSettings: false,
        authError,
        appPublicSettings: null,
        authChecked,
        logout,
        navigateToLogin,
        checkUserAuth,
        checkAppState: checkUserAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
