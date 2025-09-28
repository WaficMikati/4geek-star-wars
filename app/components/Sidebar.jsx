import { Link } from 'react-router'

export function Sidebar({ data }) {
  return (
    <>
      <div className='col-2 col-xl-1 d-flex flex-column h-100 pe-0'>
        <img
          src='/images/logo.png'
          className='img-fluid object-fit-contain'
        />
        <div className='container-fluid p-0 my-auto translate-middle-y'>
          {data.map(([category], i) => (
            <Link
              to={`/${category}`}
              key={i}
              className='w-100 btn btn-outline-warning text-capitalize text-end rounded-start-0 border-start-0 border-top-0 border-end-0 pb-0 pt-1 fs-5'
            >
              {category === 'people' ? 'characters' : category}
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}
