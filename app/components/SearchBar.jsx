import { Favorites } from './Favorites'

export function SearchBar() {
  return (
    <div className='row container-fluid justify-content-center py-4 px-3 g-0'>
      <div className='col-2 col-lg-4'></div>
      <div className='col-8 col-lg-4'>
        <form
          className='d-flex gap-2'
          role='search'
        >
          <input
            className='form-control border-warning bg-black'
            type='search'
            placeholder='Type here to search'
            aria-label='Search'
          />
          <button
            className='btn btn-outline-warning'
            type='submit'
          >
            Search
          </button>
        </form>
      </div>
      <div className='col-2 col-lg-4'>
        <Favorites />
      </div>
    </div>
  )
}
