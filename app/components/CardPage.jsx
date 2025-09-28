import { Card } from './Card'

export function CardPage({ data, category, loadMore }) {
  return (
    <div className='h-100 overflow-scroll px-3'>
      <div className='row g-3'>
        {data.map(({ name, properties, uid }, i) => (
          <Card
            category={category}
            name={name || properties.title}
            id={uid}
            key={i}
          />
        ))}
      </div>
      {category !== 'films' && (
        <div className='d-flex justify-content-center my-3'>
          <button
            className='btn btn-outline-warning w-auto'
            onClick={loadMore}
          >
            Load More
          </button>
        </div>
      )}
    </div>
  )
}
