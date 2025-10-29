// app/components/RecipeCard.tsx
'use client'

import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { Heart, ChefHat } from 'lucide-react'
import { Meal } from '../services/mealdb'
import { useFavorites } from '../contexts/FavoritesContext'

interface RecipeCardProps {
  meal: Meal
  onViewRecipe: (meal: Meal) => void
}

export default function RecipeCard({ meal, onViewRecipe }: RecipeCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageSrc, setImageSrc] = useState('')
  const [isInView, setIsInView] = useState(false)
  const { isFavorite, addFavorite, removeFavorite } = useFavorites()

  const isLiked = isFavorite(meal.idMeal)

  useEffect(() => {
    if (!cardRef.current) return
    
    // Intersection Observer for lazy loading
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { rootMargin: '100px' } // Start loading when within 100px of viewport
    )
    
    observer.observe(cardRef.current)
    
    // Animation on first load
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
    )
    
    return () => observer.disconnect()
  }, [])
  
  // Load image when in view
  useEffect(() => {
    if (!isInView) return
    
    const img = new Image()
    const src = meal.strMealThumb || ''
    
    // Use lower quality image for faster initial load if available
    const lowQualitySrc = src.includes('preview') 
      ? src 
      : src.replace(/\/media\//, '/media/preview/')
    
    img.src = lowQualitySrc
    
    img.onload = () => {
      setImageSrc(lowQualitySrc)
      setImageLoaded(true)
      
      // Load higher quality in background
      if (lowQualitySrc !== src) {
        const hqImg = new Image()
        hqImg.src = src
        hqImg.onload = () => {
          setImageSrc(src)
        }
      }
    }
    
    return () => {
      img.onload = null
    }
  }, [isInView, meal.strMealThumb])

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (isLiked) {
      removeFavorite(meal.idMeal)
    } else {
      addFavorite(meal)
    }
  }

  return (
    <div
      ref={cardRef}
      className="card w-full bg-base-100 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 h-full flex flex-col"
    >
      <figure className="relative aspect-video w-full cursor-pointer overflow-hidden" onClick={() => onViewRecipe(meal)}>
        {/* Blur-up placeholder */}
        <div className={`absolute inset-0 transition-all duration-300 ${imageLoaded ? 'opacity-0' : 'opacity-100'}`}>
          <div className="w-full h-full bg-gradient-to-br from-base-200 to-base-300 flex items-center justify-center">
            <ChefHat className="text-base-300" size={48} />
          </div>
        </div>
        
        {/* Main image */}
        {isInView && (
        <img
          src={imageSrc || meal.strMealThumb}
          alt={meal.strMeal}
          loading="lazy"
          className={`w-full h-full object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setImageLoaded(true)}
          onError={(e) => {
            // Fallback to original source if preview fails
            if (imageSrc.includes('preview')) {
              setImageSrc(meal.strMealThumb)
            }
          }}
        />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity flex flex-col justify-end p-3 sm:p-4">
          <h3 className="text-white text-sm sm:text-base font-bold line-clamp-2">{meal.strMeal}</h3>
          {meal.strCategory && (
            <span className="badge badge-sm badge-primary mt-1">
              {meal.strCategory}
            </span>
          )}
        </div>
        <button
          onClick={handleLike}
          className={`absolute top-2 right-2 p-1.5 sm:p-2 rounded-full transition-colors ${
            isLiked 
              ? 'text-red-500 bg-white/90 hover:bg-white' 
              : 'text-white/80 bg-black/30 hover:bg-black/40 hover:text-white'
          }`}
          aria-label={isLiked ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart className="w-4 h-4 sm:w-5 sm:h-5" fill={isLiked ? 'currentColor' : 'none'} />
        </button>
      </figure>
      <div className="card-body p-3 sm:p-4 flex flex-col flex-grow">
        <div className="flex-grow">
          <h3 className="card-title text-sm sm:text-base font-semibold line-clamp-2 mb-1">
            {meal.strMeal}
          </h3>
          {meal.strArea && (
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">
              {meal.strArea} Cuisine
            </div>
          )}
        </div>
        <div className="card-actions justify-end mt-auto">
          <button
            onClick={(e) => {
              e.stopPropagation()
              onViewRecipe(meal)
            }}
            className="btn btn-sm btn-primary w-full sm:w-auto"
          >
            View Recipe
          </button>
        </div>
      </div>
    </div>
  )
}
