'use client'

import { useEffect } from 'react'
import { AlertOctagon, Home } from 'lucide-react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Global error boundary caught:', error)
  }, [error])

  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        style={{
          fontFamily: "'Inter', system-ui, sans-serif",
          margin: 0,
          padding: 0,
        }}
      >
        <div
          style={{
            minHeight: '100vh',
            background: '#020617',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Background gradient */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to bottom right, rgba(239, 68, 68, 0.1), rgba(234, 88, 12, 0.1), #020617)',
            }}
          />

          <div
            style={{
              position: 'relative',
              zIndex: 10,
              textAlign: 'center',
              maxWidth: '42rem',
              margin: '0 auto',
            }}
          >
            {/* Icon */}
            <div
              style={{
                marginBottom: '2rem',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  background: 'linear-gradient(to bottom right, rgba(239, 68, 68, 0.2), rgba(234, 88, 12, 0.2))',
                  padding: '2rem',
                  borderRadius: '9999px',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                }}
              >
                <AlertOctagon
                  size={96}
                  style={{
                    color: '#f87171',
                  }}
                />
              </div>
            </div>

            {/* Error message */}
            <h1
              style={{
                marginBottom: '1rem',
                fontSize: '2.25rem',
                fontWeight: 'bold',
                color: 'white',
              }}
            >
              Критическая ошибка
            </h1>

            <p
              style={{
                marginBottom: '0.5rem',
                fontSize: '1.125rem',
                color: '#94a3b8',
                maxWidth: '28rem',
                margin: '0 auto 0.5rem',
              }}
            >
              Уже работаем над починкой
            </p>

            <p
              style={{
                marginBottom: '2rem',
                fontSize: '0.875rem',
                color: '#64748b',
                maxWidth: '32rem',
                margin: '0 auto 2rem',
              }}
            >
              Произошла критическая ошибка приложения. Наша команда уже получила уведомление.
              Пожалуйста, попробуйте обновить страницу.
            </p>

            {/* Action buttons */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <button
                onClick={reset}
                style={{
                  padding: '0.75rem 1.5rem',
                  fontSize: '1rem',
                  fontWeight: '500',
                  color: 'white',
                  background: 'linear-gradient(to right, #ef4444, #ea580c)',
                  border: 'none',
                  borderRadius: '0.375rem',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                Попробовать снова
              </button>
              <a
                href="/"
                style={{
                  padding: '0.75rem 1.5rem',
                  fontSize: '1rem',
                  fontWeight: '500',
                  color: '#cbd5e1',
                  background: 'transparent',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '0.375rem',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  textDecoration: 'none',
                }}
              >
                <Home size={20} />
                На главную
              </a>
            </div>

            {/* Help text */}
            <div
              style={{
                marginTop: '3rem',
                paddingTop: '2rem',
                borderTop: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <p
                style={{
                  fontSize: '0.875rem',
                  color: '#64748b',
                }}
              >
                Если проблема повторяется,{' '}
                <a
                  href="/#contact"
                  style={{
                    color: '#f87171',
                    textDecoration: 'underline',
                  }}
                >
                  свяжитесь с нами
                </a>
              </p>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
