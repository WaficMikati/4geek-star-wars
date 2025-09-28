import { useState, createContext, useEffect } from 'react'

const FavoritesContext = createContext([])
const FAVORITES_KEY = 'swapi_favorites'

const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    try {
      const saved = localStorage.getItem(FAVORITES_KEY)
      if (saved) {
        setFavorites(JSON.parse(saved))
      }
    } catch (error) {
      console.warn('Failed to load favorites from localStorage:', error)
    }
  }, [])

  useEffect(() => {
    if (favorites.length > 0) {
      try {
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites))
      } catch (error) {
        console.warn('Failed to save favorites to localStorage:', error)
      }
    }
  }, [favorites])

  const addFavorite = item => {
    setFavorites(prev => {
      const categoryIndex = prev.findIndex(
        cat => cat.category === item.category
      )

      if (categoryIndex >= 0) {
        const itemExists = prev[categoryIndex].items.some(
          existingItem => existingItem.id === item.id
        )

        if (itemExists) return prev

        const updatedCategories = [...prev]
        updatedCategories[categoryIndex] = {
          ...updatedCategories[categoryIndex],
          items: [...updatedCategories[categoryIndex].items, item]
        }
        return updatedCategories
      } else {
        return [...prev, { category: item.category, items: [item] }]
      }
    })
  }

  const delFavorite = item => {
    setFavorites(prev => {
      return prev
        .map(categoryObj => {
          if (categoryObj.category === item.category) {
            const filteredItems = categoryObj.items.filter(
              existingItem => existingItem.id !== item.id
            )
            return { ...categoryObj, items: filteredItems }
          }
          return categoryObj
        })
        .filter(categoryObj => categoryObj.items.length > 0)
    })
  }

  const toggleFavorite = item => {
    setFavorites(prev => {
      const categoryIndex = prev.findIndex(
        cat => cat.category === item.category
      )

      if (categoryIndex >= 0) {
        const itemExists = prev[categoryIndex].items.some(
          existingItem => existingItem.id === item.id
        )

        if (itemExists) {
          const updatedCategories = [...prev]
          updatedCategories[categoryIndex] = {
            ...updatedCategories[categoryIndex],
            items: updatedCategories[categoryIndex].items.filter(
              existingItem => existingItem.id !== item.id
            )
          }
          return updatedCategories.filter(cat => cat.items.length > 0)
        } else {
          const updatedCategories = [...prev]
          updatedCategories[categoryIndex] = {
            ...updatedCategories[categoryIndex],
            items: [...updatedCategories[categoryIndex].items, item]
          }
          return updatedCategories
        }
      } else {
        return [...prev, { category: item.category, items: [item] }]
      }
    })
  }

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, delFavorite, toggleFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  )
}

export { FavoritesContext, FavoritesProvider }
