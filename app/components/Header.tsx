// app/components/Header.tsx
'use client'

import { useTheme } from 'next-themes'
import { Paintbrush, Star } from 'lucide-react'

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

export default function Header({ view, setView }: HeaderProps) {
  const { theme, setTheme } = useTheme()

  return (
    <div className="navbar bg-base-100 shadow-lg px-2 sm:px-4 lg:px-8 sticky top-0 z-50 flex-nowrap">
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
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle btn-sm sm:btn-md">
            <Paintbrush className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <ul className="dropdown-content z-[1] menu p-2 shadow-2xl bg-base-200 rounded-box w-40 max-h-96 overflow-y-auto">
            <div className="grid grid-cols-2 gap-1">
              {themes.map((t) => (
                <button
                  key={t}
                  className={`btn btn-sm btn-ghost justify-start ${theme === t ? 'btn-active' : ''}`}
                  onClick={() => setTheme(t)}
                >
                  <span className="truncate text-xs">{t}</span>
                </button>
              ))}
            </div>
          </ul>
        </div>
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
  )
}
