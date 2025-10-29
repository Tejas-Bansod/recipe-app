// app/components/IngredientSuggestions.tsx
'use client'

import { useCallback } from 'react'

interface IngredientSuggestionsProps {
  onSelectSuggestion: (ingredient: string) => void
  onSubmit: (ingredient: string) => void
}

const popularIngredients = [
  'Chicken', 'Pasta', 'Rice', 'salt', 'Fish',
  'Tomato', 'Cheese', 'Mushroom', 'Potato', 'Onion',
  'Garlic', 'Broccoli', 'Spinach', 'Carrot', 'Chocolate'
]

export default function IngredientSuggestions({
  onSelectSuggestion,
  onSubmit
}: IngredientSuggestionsProps) {
  const handleClick = useCallback((ingredient: string) => {
    onSelectSuggestion(ingredient)
    onSubmit(ingredient)
    // Optional: Scroll to results after selection
    setTimeout(() => {
      const resultsElement = document.getElementById('recipe-results')
      if (resultsElement) {
        resultsElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }, 100)
  }, [onSelectSuggestion, onSubmit])

  return (
    <div className="w-full">
      <p className="text-xs sm:text-sm text-base-content/60 text-center mb-2">
        Popular ingredients:
      </p>
      <div className="flex flex-wrap justify-center gap-2 px-2">
        {popularIngredients.map((ingredient) => (
          <button
            key={ingredient}
            onClick={() => handleClick(ingredient.toLowerCase())}
            className="btn btn-xs sm:btn-sm btn-ghost normal-case font-normal hover:bg-base-200/50 transition-colors"
            aria-label={`Search for ${ingredient} recipes`}
          >
            {ingredient}
          </button>
        ))}
      </div>
    </div>
  )
}
