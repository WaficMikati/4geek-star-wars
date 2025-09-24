import { Link, useLoaderData, useParams } from 'react-router'
import { capitalizeWords } from '../utils/stringUtils'

export async function loader({ params }) {
  const response = await fetch(`https://www.swapi.tech/api/${params.category}`)
  const json = await response.json()

  return json
}

export default function Category() {
  const category = useParams().category
  const data = useLoaderData()
  // console.log(data.results || data.result)

  if (category === 'films') {
    return (
      <>
        <h1>{category}</h1>
        {data.result.map((e, i) => (
          <div key={i}>
            <br />
            <h2>{e.properties.title}</h2>
            {Object.entries(e.properties).filter(e => ['title', 'episode_id', 'director', 'producer', 'release_date', 'opening_crawl'].includes(e[0])).map(([type, info], i) => (
              <h3 key={i}>{`${type}: ${info}`}</h3>
            ))}
          </div>
        ))}
      </>
    )
  } else {
    return (
      <>
        <h1>{category}</h1>
        <div className='container my-5'>
          <div className='row g-3'>
            {data.results.map((e, i) => (
              <div className='col-4' key={i}>
                <Link to={`${e.url.split('/').pop()}-${e.name.replace(' ', '')}`}>
                  <div className='card'>
                    <div className='ratio ratio-4x3'>
                      <img className='card-img-top object-fit-cover' src={`/images/${category}/${e.name.toLowerCase().split(' ').join('-')}.jpg`} />
                    </div>
                    <div className='card-body fs-5'>
                      <span>{capitalizeWords(e.name)}</span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </>
    )
  }
}