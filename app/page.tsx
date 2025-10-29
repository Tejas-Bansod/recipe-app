// app/page.tsx
'use client'

import { useState, useEffect } from 'react'
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import RecipeModal from './components/RecipeModal'
import { fetchMealsByIngredient, fetchMealById, fetchRandomMeals, Meal } from './services/mealdb'
import RecipeGrid from './components/RecipeGrid'
import SkeletonCard from './components/SkeletonCard'
import { FavoritesProvider, useFavorites } from './contexts/FavoritesContext'
import ScrollToTop from './components/ScrollToTop'

function HomePageContent() {
  const [meals, setMeals] = useState<Meal[]>([])
  const [suggestedMeals, setSuggestedMeals] = useState<Meal[]>([])
  const [loading, setLoading] = useState(false)
  const [loadingMore, setLoadingMore] = useState(false)
  const [loadingSuggestions, setLoadingSuggestions] = useState(true)
  const [error, setError] = useState('')
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [view, setView] = useState('search') // 'search' or 'favorites'
  const [searchQuery, setSearchQuery] = useState('')
  const [hasMore, setHasMore] = useState(true)
  const { favorites } = useFavorites()

  // Load random suggested recipes on initial render
  useEffect(() => {
    const loadRandomMeals = async () => {
      try {
        setLoadingSuggestions(true)
        const randomMeals = await fetchRandomMeals(8)
        setSuggestedMeals(randomMeals)
      } catch (err) {
        console.error('Failed to load suggested recipes:', err)
        setError('Failed to load suggested recipes. Please try again later.')
      } finally {
        setLoadingSuggestions(false)
      }
    }

    loadRandomMeals()
  }, [])

  const handleSearch = async (ingredient: string) => {
    try {
      setLoading(true)
      setError('')
      setView('search')
      setSearchQuery(ingredient)
      setHasMore(true)
      const results = await fetchMealsByIngredient(ingredient)
      setMeals(results)
      // If we get less than the max results, there are no more to load
      setHasMore(results.length === 20) // Assuming 20 is a reasonable page size
    } catch (err) {
      setError('Something went wrong while fetching recipes.')
    } finally {
      setLoading(false)
    }
  }

  const handleViewRecipe = async (meal: Meal) => {
    try {
      setLoading(true)
      const detailedMeal = await fetchMealById(meal.idMeal)
      setSelectedMeal(detailedMeal)
      setIsModalOpen(true)
    } catch (err) {
      setError('Something went wrong while fetching the recipe details.')
    } finally {
      setLoading(false)
    }
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedMeal(null)
  }

  const displayMeals = view === 'favorites' ? favorites : meals

  const loadMoreRecipes = async () => {
    if (loading || loadingMore || !hasMore) return
    
    try {
      setLoadingMore(true)
      // Get random meals for the next "page" (since the API doesn't support pagination)
      const moreMeals = await fetchRandomMeals(8)
      setMeals(prev => [...prev, ...moreMeals])
      // Since we're using random meals, we'll just stop after a certain number of loads
      if (meals.length + moreMeals.length >= 40) {
        setHasMore(false)
      }
    } catch (err) {
      console.error('Failed to load more recipes:', err)
    } finally {
      setLoadingMore(false)
    }
  }

  const handleScroll = () => {
    if (view !== 'search' || loading || loadingMore || !hasMore) return
    
    const scrollPosition = window.innerHeight + document.documentElement.scrollTop
    const pageHeight = document.documentElement.offsetHeight - 500 // Load more when 500px from bottom
    
    if (scrollPosition >= pageHeight) {
      loadMoreRecipes()
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [view, loading, loadingMore, hasMore])

  const showSuggestedRecipes = view === 'search' && (!meals.length || loadingSuggestions)

  return (
    <div className="min-h-screen bg-base-100">
      <Header view={view} setView={setView} />
      <main className="container mx-auto px-4 py-8">
        <ScrollToTop />
        {view === 'search' ? (
          <>
            <SearchBar onSearch={handleSearch} />
            {error && <div className="alert alert-error mt-4">{error}</div>}
            
            {/* Main Content Area */}
            <div id="recipe-results" className="mt-8">
              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {[...Array(8)].map((_, i) => (
                    <SkeletonCard key={i} />
                  ))}
                </div>
              ) : (
                <>
                  {meals.length > 0 ? (
                    <>
                      <h2 className="text-2xl font-bold mb-6">Search Results</h2>
                      <RecipeGrid meals={displayMeals} onViewRecipe={handleViewRecipe} />
                      {loadingMore && (
                        <div className="flex justify-center my-8">
                          <span className="loading loading-spinner loading-lg text-primary"></span>
                        </div>
                      )}
                      {!loadingMore && hasMore && view === 'search' && meals.length > 0 && (
                        <div className="flex justify-center mt-8">
                          <button 
                            onClick={loadMoreRecipes}
                            className="btn btn-primary"
                            disabled={loadingMore}
                          >
                            {loadingMore ? 'Loading...' : 'Load More Recipes'}
                          </button>
                        </div>
                      )}
                      {!hasMore && meals.length > 0 && (
                        <div className="text-center text-base-content/70 mt-8">
                          No more recipes to load
                        </div>
                      )}
                    </>
                  ) : showSuggestedRecipes ? (
                    <>
                      <h2 className="text-2xl font-bold mb-6">Suggested Recipes</h2>
                      {loadingSuggestions ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                          {[...Array(8)].map((_, i) => (
                            <SkeletonCard key={i} />
                          ))}
                        </div>
                      ) : (
                        <RecipeGrid meals={suggestedMeals} onViewRecipe={handleViewRecipe} />
                      )}
                    </>
                  ) : (
                    <div className="text-center py-12">
                      <div className="text-5xl mb-4">🍳</div>
                      <h3 className="text-xl font-medium mb-2">No recipes found</h3>
                      <p className="text-base-content/70">Try searching with different ingredients</p>
                    </div>
                  )}
                </>
              )}
            </div>
          </>
        ) : (
          <div className="mt-10">
            {favorites.length > 0 ? (
              <>
                <h2 className="text-2xl font-bold mb-6">Your Favorite Recipes</h2>
                <RecipeGrid meals={favorites} onViewRecipe={handleViewRecipe} />
              </>
            ) : (
              <div className="text-center py-12">
                <div className="text-5xl mb-4">❤️</div>
                <h3 className="text-xl font-medium mb-2">No favorite recipes yet</h3>
                <p className="text-base-content/70">Search for recipes and click the heart to add them to your favorites</p>
              </div>
            )}
          </div>
        )}
      </main>

      <RecipeModal
        meal={selectedMeal}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  )
}

export default function HomePage() {
  return (
    <FavoritesProvider>
      <HomePageContent />
    </FavoritesProvider>
  )
}
