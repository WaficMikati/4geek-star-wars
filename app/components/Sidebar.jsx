import { Link, useLocation } from 'react-router'
import { Favorites } from './Favorites'

export function Sidebar({ data }) {
  const location = useLocation()
  const currentCategory = location.pathname.split('/')[1]

  return (
    <div className='col-2 col-xl-1 d-flex flex-column h-100 pe-0'>
      <Link to='/'>
        <img
          src='/images/logo.png'
          className='img-fluid object-fit-contain'
        />
      </Link>
      <div className='container-fluid p-0 mt-4'>
        {data.map(([category], i) => (
          <Link
            to={`/${category}`}
            key={i}
            className={`w-100 btn btn-outline-warning text-capitalize text-end rounded-start-0 border-start-0 border-top-0 border-end-0 pb-0 pt-2 fs-5 ${
              currentCategory === category ? 'active' : ''
            }`}
          >
            {category === 'people' ? 'characters' : category}
          </Link>
        ))}
      </div>
      <Favorites />
    </div>
  )
}
