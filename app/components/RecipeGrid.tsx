// app/components/RecipeGrid.tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import { Meal } from '../services/mealdb'
import { useMediaQuery } from 'react-responsive'
import { motion, AnimatePresence } from 'framer-motion'
import RecipeCard from './RecipeCard'

interface RecipeGridProps {
  meals: Meal[]
  onViewRecipe: (meal: Meal) => void
}

export default function RecipeGrid({ meals, onViewRecipe }: RecipeGridProps) {
  const [isMounted, setIsMounted] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Responsive grid configuration
  const isSm = useMediaQuery({ minWidth: 640 })
  const isMd = useMediaQuery({ minWidth: 768 })
  const isLg = useMediaQuery({ minWidth: 1024 })
  const isXl = useMediaQuery({ minWidth: 1280 })
  
  // Calculate columns based on screen size
  const getColumns = () => {
    if (isXl) return 4
    if (isLg) return 3
    if (isMd) return 2
    if (isSm) return 2
    return 1
  }
  
  const columns = getColumns()
  const gap = isSm ? 4 : 3 // gap-4 (16px) for sm and up, gap-3 (12px) for mobile
  
  // Set up animations
  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-base-200 rounded-lg aspect-video"></div>
            <div className="h-4 bg-base-200 rounded mt-2 w-3/4"></div>
            <div className="h-4 bg-base-200 rounded mt-2 w-1/2"></div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div 
      ref={containerRef}
      className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-${gap} p-3 sm:p-4`}
    >
      <AnimatePresence>
        {meals.map((meal, index) => (
          <motion.div
            key={meal.idMeal}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="w-full"
          >
            <RecipeCard meal={meal} onViewRecipe={onViewRecipe} />
          </motion.div>
        ))}
      </AnimatePresence>
      
      {meals.length === 0 && (
        <div className="col-span-full text-center py-12">
          <div className="text-5xl mb-4">🍽️</div>
          <h3 className="text-lg font-medium">No recipes found</h3>
          <p className="text-base-content/60">Try searching with different ingredients</p>
        </div>
      )}
    </div>
  )
}
