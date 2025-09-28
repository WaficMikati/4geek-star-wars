export function Details({ name, info }) {
  return name !== 'opening_crawl' ? (
    <div className='input-group mt-2'>
      <span className='w-50 input-group-text text-start text-primary-emphasis text-wrap bg-dark bg-opacity-25 border-dark border-opacity-50 border-end-0'>
        {name.replaceAll('_', ' ').replaceAll('atmosphering', '')}
      </span>
      <span className='w-50 input-group-text text-wrap text-start text-warning-emphasis bg-dark bg-opacity-10 border-dark border-opacity-50 border-start-0'>
        {info}
      </span>
    </div>
  ) : (
    <div className='input-group'>
      <span className='input-group-text text-wrap text-start text-warning-emphasis bg-dark bg-opacity-10 border-dark border-opacity-50 border-start-0 fs-5'>
        {info}
      </span>
    </div>
  )
}
