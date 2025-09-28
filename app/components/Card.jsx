import { useContext } from 'react'
import { Link } from 'react-router'
import { FavoritesContext } from '../store/FavoritesContext'

export function Card({ category, name, id }) {
  const { favorites, toggleFavorite } = useContext(FavoritesContext)

  const isFavorited = () => {
    const categoryObj = favorites.find(cat => cat.category === category)
    if (!categoryObj) return false
    return categoryObj.items.some(item => item.id === id)
  }

  function toggle() {
    if (category && name && id) {
      toggleFavorite({ category: category, name: name, id: id })
    }
  }

  const item = name
    ?.toLowerCase()
    .replaceAll('é', 'e')
    .replaceAll("'", '')
    .split(' ')
    .join('_')

  return (
    <div
      className={`col-12 col-md-6 ${
        category === 'films' ? 'col-lg-4 py-0' : 'col-lg-3'
      }`}
    >
      <div className='card overflow-hidden border-0'>
        <Link
          to={`${id}/${name}`}
          className='stretched-link'
        ></Link>
        <div className='ratio ratio-4x3'>
          <img
            src={`/images/${category}/${item.replaceAll('_', '-')}.jpg`}
            className='card-img-top object-fit-cover'
          />
        </div>
        <div className='card-footer d-flex align-items-center flex-row-reverse justify-content-between bg-black bg-gradient'>
          <span className='card-text fs-5 text-warning text-capitalize'>
            {name}
          </span>
          <button
            className={`btn btn-outline-warning position-relative z-2 ${
              isFavorited() ? 'active' : ''
            }`}
            onClick={toggle}
          >
            {isFavorited() ? '♥︎' : '♡'}
          </button>
        </div>
      </div>
    </div>
  )
}
