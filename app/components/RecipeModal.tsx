// app/components/RecipeModal.tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import { X, Soup } from 'lucide-react'
import gsap from 'gsap'
import { Meal } from '../services/mealdb'

interface RecipeModalProps {
  meal: Meal | null
  isOpen: boolean
  onClose: () => void
}

function getYoutubeVideoId(url: string) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  const match = url.match(regExp)
  return match && match[2].length === 11 ? match[2] : null
}

export default function RecipeModal({ meal, isOpen, onClose }: RecipeModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [videoError, setVideoError] = useState(false)

  useEffect(() => {
    // Reset video error state when meal changes
    setVideoError(false)
    
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      if (modalRef.current && contentRef.current) {
        gsap.fromTo(
          modalRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.3, ease: 'power2.out' }
        )
        gsap.fromTo(
          contentRef.current,
          { opacity: 0, scale: 0.95 },
          { opacity: 1, scale: 1, duration: 0.3, ease: 'power2.out', delay: 0.1 }
        )
      }
    } else {
      document.body.style.overflow = 'auto'
    }

    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isOpen])

  if (!isOpen || !meal) return null

  const ingredients = Object.entries(meal)
    .map(([key, value]) => {
      if (key.startsWith('strIngredient') && value) {
        const measureKey = `strMeasure${key.slice(13)}`
        return { ingredient: value, measure: meal[measureKey] }
      }
      return null
    })
    .filter(Boolean)

  const videoId = (meal.strYoutube && !videoError) ? getYoutubeVideoId(meal.strYoutube) : null

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 bg-opacity-60 flex justify-center items-center z-50 p-4 sm:p-6 md:p-8 backdrop-blur-sm"
    >
      <div
        ref={contentRef}
        className="card w-full max-w-4xl bg-base-100 shadow-2xl relative overflow-y-auto max-h-[90vh] rounded-2xl"
      >
        <button
          onClick={onClose}
          className="btn btn-sm btn-circle absolute right-4 top-4 z-20 bg-base-300/80"
        >
          <X size={18} />
        </button>

        <div className="card bg-base-100 rounded-2xl shadow-xl">
  {/* Video/Image Section */}
  <div className="w-full relative aspect-video bg-black">
    {videoId ? (
      // If we have a valid video ID and no errors, show the YouTube iframe
      <>
        {/* YouTube iframe for recipe video */}
        <iframe
          className="absolute top-0 left-0 w-full h-full"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0`}
          title={`${meal.strMeal} - Recipe Video`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          onError={() => setVideoError(true)} // Handle iframe loading errors
          onAbort={() => setVideoError(true)} // Handle iframe abort events
        />
        
        {/* Fallback image that appears if the video fails to load */}
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-300 ${
            videoError ? 'opacity-100' : 'opacity-0 pointer-events-none' // Only show if video errors, and don't block clicks when hidden
          }`}
          onError={(e) => {
            // If the image fails to load, use a placeholder
            const target = e.target as HTMLImageElement;
            target.src = '/placeholder-recipe.jpg';
          }}
        />
      </>
    ) : (
      // If no video is available, show the recipe image
      <img
        src={meal.strMealThumb}
        alt={meal.strMeal}
        className="absolute top-0 left-0 w-full h-full object-cover"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.src = '/placeholder-recipe.jpg';
        }}
      />
    )}
  </div>

  {/* Content Section */}
  <div className="card-body p-6 md:p-10 text-left space-y-6">
    <div>
      <h2 className="card-title text-2xl sm:text-3xl font-bold mb-3">{meal.strMeal}</h2>
      <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
        <div className="flex items-center gap-1">
          <Soup size={16} className="text-primary" />
          <span>{meal.strCategory}</span>
        </div>
        <span>•</span>
        <span>{meal.strArea}</span>
      </div>
    </div>

    <div>
      <h3 className="text-lg font-semibold mb-2">🧂 Ingredients</h3>
      <ul className="divide-y divide-base-200 border rounded-lg p-3 bg-base-200/30">
        {ingredients.map((ing, i) => (
          <li key={i} className="flex justify-between py-1 text-sm sm:text-base">
            <span>{ing?.ingredient}</span>
            <span className="text-gray-500">{ing?.measure}</span>
          </li>
        ))}
      </ul>
    </div>

    <div>
      <h3 className="text-lg font-semibold mb-2">🧑‍🍳 Instructions</h3>
      <p className="text-sm sm:text-base leading-relaxed whitespace-pre-line">
        {meal.strInstructions}
      </p>
    </div>
  </div>
</div>


      </div>
    </div>
  )
}