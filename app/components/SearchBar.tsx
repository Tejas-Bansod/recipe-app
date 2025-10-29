// app/components/SearchBar.tsx
'use client'

import { useState } from 'react'
import { Search } from 'lucide-react'
import IngredientSuggestions from './IngredientSuggestions'

interface SearchBarProps {
  onSearch: (query: string) => void
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [input, setInput] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      onSearch(input.trim())
      setInput('')
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-3 sm:px-4 lg:px-6">
      <div className="text-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold pt-6 sm:pt-8 md:pt-10 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Search Recipe by Ingredient
        </h1>
        <p className="text-sm sm:text-base text-base-content/70 mt-2 mb-4 sm:mb-6">
          Discover delicious recipes using ingredients you have at home
        </p>
      </div>
      
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl mx-auto mt-4 sm:mt-6 md:mt-8"
      >
        <div className="relative w-full">
          {/* Search Icon - Always visible */}
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 sm:pl-4 pointer-events-none z-10">
            <Search size={20} className="text-base-content/70" />
          </div>
          
          {/* Search Input */}
          <input
            type="text"
            placeholder="e.g., chicken, tomato, pasta..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="input input-bordered w-full pl-10 pr-24 sm:pr-28 h-12 sm:h-14 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200 bg-base-100"
            aria-label="Search recipes by ingredient"
          />
          
          {/* Search Button - Always visible */}
          <button
            type="submit"
            className="absolute inset-y-0 right-0 flex items-center justify-center w-16 sm:w-20 h-full bg-primary text-primary-content rounded-r-lg hover:bg-primary-focus transition-colors duration-200 z-10"
            aria-label="Search recipes"
          >
            <span className="hidden sm:inline">Go</span>
            <Search className="sm:hidden w-5 h-5" />
          </button>
        </div>
      </form>
      <div className="w-full max-w-2xl mx-auto mt-3 sm:mt-4">
        <IngredientSuggestions onSelectSuggestion={setInput} onSubmit={onSearch} />
      </div>
    </div>
  )
}
