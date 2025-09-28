import { useState, createContext } from 'react'

const FavoritesContext = createContext([])

const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([])

  const addFavorite = item => {
    setFavorites(prev => {
      // Find if category already exists
      const categoryIndex = prev.findIndex(
        cat => cat.category === item.category
      )

      if (categoryIndex >= 0) {
        // Category exists, check if item already exists in that category
        const itemExists = prev[categoryIndex].items.some(
          existingItem => existingItem.id === item.id
        )

        if (itemExists) return prev // Item already exists, no change

        // Add item to existing category
        const updatedCategories = [...prev]
        updatedCategories[categoryIndex] = {
          ...updatedCategories[categoryIndex],
          items: [...updatedCategories[categoryIndex].items, item]
        }
        return updatedCategories
      } else {
        // Create new category with this item
        return [...prev, { category: item.category, items: [item] }]
      }
    })
  }

  const delFavorite = item => {
    setFavorites(prev => {
      return prev
        .map(categoryObj => {
          if (categoryObj.category === item.category) {
            // Remove item from this category
            const filteredItems = categoryObj.items.filter(
              existingItem => existingItem.id !== item.id
            )
            return { ...categoryObj, items: filteredItems }
          }
          return categoryObj
        })
        .filter(categoryObj => categoryObj.items.length > 0) // Remove empty categories
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
          // Remove item
          const updatedCategories = [...prev]
          updatedCategories[categoryIndex] = {
            ...updatedCategories[categoryIndex],
            items: updatedCategories[categoryIndex].items.filter(
              existingItem => existingItem.id !== item.id
            )
          }
          // Filter out empty categories
          return updatedCategories.filter(cat => cat.items.length > 0)
        } else {
          // Add item to existing category
          const updatedCategories = [...prev]
          updatedCategories[categoryIndex] = {
            ...updatedCategories[categoryIndex],
            items: [...updatedCategories[categoryIndex].items, item]
          }
          return updatedCategories
        }
      } else {
        // Create new category with this item
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
