import { useState } from 'react'
import { createContext } from 'react'

const FavoritesContext = createContext([])

const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([])
  const addFavorite = (item) => setFavorites(prev => [...prev, item]) // item = {route:'', index:'', text:''}
  const delFavorite = (item) => setFavorites(prev => prev.filter(e => e !== item))
  // console.log('Favs: ', favorites)

  return <FavoritesContext value={{ addFavorite, delFavorite }}>{children}</FavoritesContext>
}

export { FavoritesContext, FavoritesProvider }