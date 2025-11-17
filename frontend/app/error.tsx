'use client'

import { useEffect } from 'react'
import { AlertTriangle, Home, RefreshCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Error boundary caught:', error)
  }, [error])

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 via-orange-500/10 to-slate-950" />

      {/* Geometric pattern overlay */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 right-20 h-64 w-64 rounded-full bg-gradient-to-br from-red-500 to-orange-600 blur-3xl" />
        <div className="absolute bottom-20 left-20 h-96 w-96 rounded-full bg-gradient-to-br from-orange-500 to-red-600 blur-3xl" />
      </div>

      <div className="relative z-10 text-center max-w-2xl mx-auto">
        {/* Animated icon */}
        <div className="mb-8 inline-flex items-center justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-orange-600 rounded-full blur-xl opacity-50 animate-pulse" />
            <div className="relative bg-gradient-to-br from-red-500/20 to-orange-600/20 p-8 rounded-full border border-red-500/30">
              <AlertTriangle className="h-24 w-24 text-red-400" />
            </div>
          </div>
        </div>

        {/* Error message */}
        <h1 className="mb-4 text-3xl md:text-4xl font-bold text-white">
          Что-то пошло не так!
        </h1>

        <p className="mb-2 text-lg text-slate-400 max-w-md mx-auto">
          Уже работаем над починкой
        </p>

        <p className="mb-8 text-sm text-slate-500 max-w-lg mx-auto">
          Произошла непредвиденная ошибка. Наша команда уже получила уведомление и работает над её устранением.
          Пожалуйста, попробуйте обновить страницу или вернитесь позже.
        </p>

        {/* Error details (only in development) */}
        {process.env.NODE_ENV === 'development' && error.message && (
          <div className="mb-8 p-4 rounded-lg bg-slate-900/50 border border-red-500/20 text-left">
            <p className="text-xs text-red-400 font-mono break-all">
              {error.message}
            </p>
            {error.digest && (
              <p className="text-xs text-slate-500 mt-2">
                Error ID: {error.digest}
              </p>
            )}
          </div>
        )}

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            onClick={reset}
            size="lg"
            className="bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 group"
          >
            <RefreshCcw className="mr-2 h-5 w-5 group-hover:rotate-180 transition-transform duration-500" />
            Попробовать снова
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-white/20 hover:bg-white/5"
          >
            <a href="/">
              <Home className="mr-2 h-5 w-5" />
              На главную
            </a>
          </Button>
        </div>

        {/* Help text */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <p className="text-sm text-slate-500">
            Если проблема повторяется,{' '}
            <a href="/#contact" className="text-red-400 hover:text-red-300 underline">
              свяжитесь с нами
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
