import Link from 'next/link'
import { FileQuestion, Home, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-slate-950" />

      {/* Geometric pattern overlay */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 right-20 h-64 w-64 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 blur-3xl" />
        <div className="absolute bottom-20 left-20 h-96 w-96 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 blur-3xl" />
      </div>

      <div className="relative z-10 text-center max-w-2xl mx-auto">
        {/* Animated icon */}
        <div className="mb-8 inline-flex items-center justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full blur-xl opacity-50 animate-pulse" />
            <div className="relative bg-gradient-to-br from-blue-500/20 to-purple-600/20 p-8 rounded-full border border-blue-500/30">
              <FileQuestion className="h-24 w-24 text-blue-400" />
            </div>
          </div>
        </div>

        {/* Error code */}
        <div className="mb-6">
          <h1 className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-blue-400 bg-clip-text text-transparent animate-pulse">
            404
          </h1>
        </div>

        {/* Error message */}
        <h2 className="mb-4 text-3xl md:text-4xl font-bold text-white">
          Упс! Страница не найдена
        </h2>

        <p className="mb-8 text-lg text-slate-400 max-w-md mx-auto">
          Похоже, вы попали на страницу, которая не существует или была перемещена.
          Давайте вернёмся на безопасную территорию.
        </p>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 group"
          >
            <Link href="/">
              <Home className="mr-2 h-5 w-5" />
              На главную
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-white/20 hover:bg-white/5"
          >
            <Link href="javascript:history.back()">
              <ArrowLeft className="mr-2 h-5 w-5" />
              Назад
            </Link>
          </Button>
        </div>

        {/* Help text */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <p className="text-sm text-slate-500">
            Если вы считаете, что это ошибка, пожалуйста{' '}
            <a href="/#contact" className="text-blue-400 hover:text-blue-300 underline">
              свяжитесь с нами
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
