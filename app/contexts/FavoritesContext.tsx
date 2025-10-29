// app/contexts/FavoritesContext.tsx
'use client'

import { createContext, useState, useEffect, useContext, ReactNode } from 'react'
import { Meal } from '../services/mealdb'

interface FavoritesContextType {
  favorites: Meal[]
  addFavorite: (meal: Meal) => void
  removeFavorite: (mealId: string) => void
  isFavorite: (mealId: string) => boolean
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined)

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<Meal[]>([])

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]')
    setFavorites(storedFavorites)
  }, [])

  const addFavorite = (meal: Meal) => {
    const newFavorites = [...favorites, meal]
    setFavorites(newFavorites)
    localStorage.setItem('favorites', JSON.stringify(newFavorites))
  }

  const removeFavorite = (mealId: string) => {
    const newFavorites = favorites.filter((fav) => fav.idMeal !== mealId)
    setFavorites(newFavorites)
    localStorage.setItem('favorites', JSON.stringify(newFavorites))
  }

  const isFavorite = (mealId: string) => {
    return favorites.some((fav) => fav.idMeal === mealId)
  }

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider')
  }
  return context
}
