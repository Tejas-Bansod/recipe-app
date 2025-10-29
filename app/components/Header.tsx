// app/components/Header.tsx
'use client'

import { useTheme } from 'next-themes'
import { Paintbrush, Star, X } from 'lucide-react'
import { useState, useEffect } from 'react'

const themes = [
  'cupcake',
  'dark',
  'light',
  'bumblebee',
  'emerald',
  'corporate',
  'synthwave',
  'retro',
  'cyberpunk',
  'valentine',
  'halloween',
  'garden',
  'forest',
  'aqua',
  'lofi',
  'pastel',
  'fantasy',
  'wireframe',
  'black',
  'luxury',
  'dracula',
  'cmyk',
  'autumn',
  'business',
  'acid',
  'lemonade',
  'night',
  'coffee',
  'winter',
]

interface HeaderProps {
  view: string
  setView: (view: string) => void
}

function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true)
  const [isMounted, setIsMounted] = useState(false)

  const handleClose = () => {
    setIsVisible(false)
    if (typeof window !== 'undefined') {
      localStorage.setItem('announcementClosed', 'true')
    }
  }

  useEffect(() => {
    if (typeof window === 'undefined') return
    
    const isClosed = localStorage.getItem('announcementClosed')
    setIsVisible(isClosed !== 'true')
    setIsMounted(true)
  }, [])

  if (typeof window === 'undefined' || !isMounted || !isVisible) return null

  return (
    <div className="w-full bg-gradient-to-r from-primary to-secondary text-white py-2 px-3 sm:px-4 text-sm font-medium relative">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex-1 text-center px-6">
          <div className="inline-flex flex-wrap justify-center items-center gap-x-1">
            <span>✨ This is a Demo Website Powered By Codenexor.</span>
            <a 
              href="https://codenexor.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="font-semibold hover:underline underline-offset-2 whitespace-nowrap"
            >
              Visit Our Website
            </a>
          </div>
        </div>
        <button 
          onClick={handleClose}
          className="btn btn-ghost btn-sm btn-circle !min-h-0 h-6 w-6 p-0 flex-shrink-0 absolute right-2 sm:relative sm:right-0"
          aria-label="Close announcement"
        >
          <X size={14} className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  )
}

export default function Header({ view, setView }: HeaderProps) {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  // Only render theme selector on client to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="sticky top-0 z-50 bg-base-100">
      <div className="relative z-50">
        <AnnouncementBar />
      </div>
      <div className="navbar bg-base-100 shadow-lg px-2 sm:px-4 lg:px-8 flex-nowrap relative z-40">
      <div className="navbar-start">
        <a className="btn btn-ghost text-base sm:text-lg md:text-xl px-2 sm:px-4">
          <span className="hidden sm:inline">🍳 Recipe App</span>
          <span className="sm:hidden">🍳</span>
        </a>
      </div>
      <div className="navbar-center">
        <div className="tabs tabs-boxed">
          <a className={`tab ${view === 'search' ? 'tab-active' : ''}`} onClick={() => setView('search')}>Search</a>
          <a className={`tab ${view === 'favorites' ? 'tab-active' : ''}`} onClick={() => setView('favorites')}>
            Favorites
          </a>
        </div>
      </div>
      <div className="navbar-end flex items-center gap-1 sm:gap-2">
        {mounted && (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost">
              <div className="w-4">
                <Paintbrush className="w-4 h-4" />
              </div>
            </div>
            <ul className="dropdown-content z-[1] p-2 shadow-2xl bg-base-300 rounded-box w-52">
              <div className="grid grid-cols-2 gap-1">
                {themes.map((t) => (
                  <button
                    key={t}
                    className={`btn btn-sm btn-ghost justify-start ${theme === t ? 'btn-active' : ''}`}
                    onClick={() => setTheme(t)}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </ul>
          </div>
        )}
        <button
          className={`btn btn-ghost btn-circle btn-sm sm:btn-md ${view === 'favorites' ? 'text-primary' : ''}`}
          onClick={() => setView(view === 'favorites' ? 'search' : 'favorites')}
          aria-label={view === 'favorites' ? 'View all recipes' : 'View favorites'}
        >
          <Star className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="sr-only">Favorites</span>
        </button>
      </div>
      </div>
    </div>
  )
}
