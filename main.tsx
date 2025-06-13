import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles/globals.css'

// Error boundary for production
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('NovaCore Error Boundary caught an error:', error, errorInfo)
    
    // In production, you might want to log this to an error reporting service
    if (import.meta.env.PROD) {
      // Example: Sentry.captureException(error, { contexts: { errorInfo } })
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#0B0D17] text-white flex items-center justify-center p-4">
          <div className="text-center max-w-md">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl">⚠️</span>
            </div>
            <h1 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
              發生了未預期的錯誤
            </h1>
            <p className="text-gray-400 mb-6">
              NovaCore 遇到了技術問題。請重新整理頁面或稍後再試。
            </p>
            <div className="space-y-3">
              <button
                onClick={() => window.location.reload()}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
              >
                重新整理頁面
              </button>
              <button
                onClick={() => this.setState({ hasError: false })}
                className="w-full bg-transparent border border-gray-600 hover:border-gray-500 text-gray-300 font-medium py-2 px-4 rounded-lg transition-colors"
              >
                重試
              </button>
            </div>
            {import.meta.env.DEV && this.state.error && (
              <details className="mt-6 text-left">
                <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-400">
                  錯誤詳細資訊 (開發模式)
                </summary>
                <pre className="mt-2 p-3 bg-gray-900 rounded text-xs text-red-400 overflow-auto">
                  {this.state.error.stack}
                </pre>
              </details>
            )}
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

// Performance monitoring
const startTime = performance.now()

// Initialize React app
const root = ReactDOM.createRoot(document.getElementById('root')!)

root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
)

// Log performance metrics in development
if (import.meta.env.DEV) {
  window.addEventListener('load', () => {
    const loadTime = performance.now() - startTime
    console.log(`🎮 NovaCore loaded in ${loadTime.toFixed(2)}ms`)
    
    // Log Web Vitals if available
    if ('web-vitals' in window) {
      // This would require the web-vitals library
      console.log('📊 Web Vitals monitoring enabled')
    }
  })
}

// Service Worker registration (for PWA functionality)
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('🔧 SW registered: ', registration)
      })
      .catch((registrationError) => {
        console.log('❌ SW registration failed: ', registrationError)
      })
  })
}

// Global error handling
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error)
  // In production, send to error tracking service
})

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason)
  // In production, send to error tracking service
})