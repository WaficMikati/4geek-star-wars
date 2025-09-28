import { useContext } from 'react'
import { Link } from 'react-router'
import { FavoritesContext } from '../store/FavoritesContext'

export function Favorites() {
  const { favorites } = useContext(FavoritesContext)

  return (
    <div className='dropdown'>
      <button
        className={`btn btn-outline-warning dropdown-toggle ms-auto d-block ${
          favorites.length > 0 ? '' : 'disabled'
        }`}
        type='button'
        data-bs-toggle='dropdown'
        aria-expanded='false'
      >
        Favorites
      </button>
      <ul className='dropdown-menu bg-black py-0'>
        {favorites.map(e => (
          <>
            <li>
              <span className='dropdown-header fs-5 text-capitalize text-primary-emphasis'>
                {e.category === 'people' ? 'characters' : e.category}
              </span>
            </li>
            {e.items.map((e, i) => (
              <li key={i}>
                <Link
                  className='dropdown-item text-warning'
                  to={`/${e.category}/${e.id}/${e.name}`}
                >
                  {e.name}
                </Link>
              </li>
            ))}
            <li>
              <hr className='dropdown-divider mb-0' />
            </li>
          </>
        ))}
      </ul>
    </div>
  )
}
