// app/services/mealdb.ts

export interface Meal {
  idMeal: string
  strMeal: string
  strCategory: string
  strArea: string
  strInstructions: string
  strMealThumb: string
  strYoutube: string
  [key: string]: string | null
}

export const fetchMealsByIngredient = async (ingredient: string): Promise<Meal[]> => {
  const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`)

  if (!res.ok) {
    throw new Error('Failed to fetch recipes by ingredient')
  }

  const data = await res.json()
  return data.meals || []
}

export const fetchMealById = async (id: string): Promise<Meal | null> => {
  const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)

  if (!res.ok) {
    throw new Error('Failed to fetch recipe details')
  }

  const data = await res.json()
  return data.meals ? data.meals[0] : null
}

export const fetchRandomMeals = async (count: number = 8): Promise<Meal[]> => {
  try {
    // Fetch multiple random meals (API only returns one at a time)
    const promises = Array(count).fill(null).map(() => 
      fetch('https://www.themealdb.com/api/json/v1/1/random.php')
        .then(res => {
          if (!res.ok) throw new Error('Failed to fetch random recipe')
          return res.json()
        })
        .then(data => data.meals?.[0])
    )

    const results = await Promise.all(promises)
    // Filter out any undefined results and remove duplicates by ID
    const uniqueMeals = results.filter((meal): meal is Meal => 
      Boolean(meal)
    ).reduce<Meal[]>((acc, meal) => {
      if (!acc.some(m => m.idMeal === meal.idMeal)) {
        acc.push(meal)
      }
      return acc
    }, [])

    return uniqueMeals
  } catch (error) {
    console.error('Error fetching random meals:', error)
    return []
  }
}
