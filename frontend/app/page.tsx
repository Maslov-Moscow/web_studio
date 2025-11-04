'use client'

import { useEffect, useState } from 'react'

export default function Home() {
  const [apiStatus, setApiStatus] = useState<string>('Checking...')

  useEffect(() => {
    fetch('/api/health/')
      .then(res => res.json())
      .then(data => setApiStatus(data.message))
      .catch(() => setApiStatus('API not available'))
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">
          WebStudio
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Professional Web Development Studio
        </p>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <p className="text-sm text-gray-500">API Status:</p>
          <p className="text-lg font-semibold text-green-600">{apiStatus}</p>
        </div>
      </div>
    </main>
  )
}
