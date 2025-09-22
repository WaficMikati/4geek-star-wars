import { Link, useLoaderData, useParams } from "react-router"

export async function loader({ params }) {
  const response = await fetch(`https://www.swapi.tech/api/${params.category}`)
  const json = await response.json()

  return json
}

export default function Category() {
  const name = useParams().category
  const data = useLoaderData()
  // console.log(data.results || data.result)

  if (name === 'films') {
    return (
      <>
        <h1>{name}</h1>
        {data.result.map((e, i) => (
          <div key={i}>
            <br />
            <h2>{e.properties.title}</h2>
            {Object.entries(e.properties).filter(e => ['title', 'episode_id', 'director', 'producer', 'release_date', 'opening_crawl'].includes(e[0])).map(([type, info], i) => (
              <h3>{`${type}: ${info}`}</h3>
            ))}
          </div>
        ))}
      </>
    )
  } else {
    return (
      <>
        <h1>{name}</h1>
        {data.results.map((e, i) => (
          <div key={i}>
            <br />
            <h2>{e.name}</h2>
            <Link to={`${e.url.split('/').pop()}-${e.name.replace(' ', '')}`}>
              More info
            </Link>
          </div>
        ))}
      </>
    )
  }
}