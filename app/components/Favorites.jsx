import React, { useContext } from 'react'
import { Link } from 'react-router'
import { FavoritesContext } from '../store/FavoritesContext'

export function Favorites() {
  const { favorites, delFavorite } = useContext(FavoritesContext)

  return (
    <div
      className='dropdown'
      key={favorites.length}
    >
      <button
        className={`btn btn-outline-warning w-100 dropdown-toggle-split dropdown-start text-capitalize text-end rounded-start-0 border-start-0 border-top-0 border-end-0 pb-0 pt-2 fs-5 d-flex justify-content-between ${
          favorites.length > 0 ? '' : 'disabled'
        }`}
        type='button'
        data-bs-toggle='dropdown'
        data-bs-auto-close='outside'
        aria-expanded='false'
      >
        <span className='align-self-center badge text-black bg-warning mb-1'>
          {favorites.reduce(
            (total, category) => total + category.items.length,
            0
          )}
        </span>
        <span>Favorites</span>
      </button>
      <ul className='dropdown-menu bg-black p-2'>
        {favorites.map((e, i) => (
          <React.Fragment key={i}>
            <li>
              <div className='d-flex justify-content-between align-items-center py-0'>
                <span className='dropdown-header fs-5 text-capitalize text-primary-emphasis py-0'>
                  {e.category === 'people' ? 'characters' : e.category}
                </span>
                <button
                  className='btn btn-outline-primary border-0'
                  onClick={() => {
                    e.items.forEach(item =>
                      delFavorite({ category: item.category, id: item.id })
                    )
                  }}
                >
                  X
                </button>
              </div>
            </li>
            {e.items.map((item, i) => (
              <li
                key={i}
                className='d-flex align-items-center fs-5'
              >
                <Link
                  className='dropdown-item text-warning'
                  to={`/${item.category}/${item.id}/${item.name}`}
                >
                  {item.name}
                </Link>
                <button
                  className='btn btn-outline-warning border-0'
                  onClick={() =>
                    delFavorite({ category: item.category, id: item.id })
                  }
                >
                  X
                </button>
              </li>
            ))}
            <li>
              <hr className='dropdown-divider mb-0' />
            </li>
          </React.Fragment>
        ))}
      </ul>
    </div>
  )
}
