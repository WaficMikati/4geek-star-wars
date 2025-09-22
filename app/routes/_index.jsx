import { Link, useLoaderData } from "react-router";
import { setRouteData } from "../utils/routeCache";

export async function loader() {
  const response = await fetch('https://www.swapi.tech/api')
  const json = await response.json()
  const result = json.result

  setRouteData('categoryLinks', result)

  return result
}

export default function Home() {
  const data = useLoaderData()

  return (
    <div className="d-grid">
      {Object.entries(data).map(([category, url], index) => (
        <Link
          key={index}
          to={`/${category}`}
          state={{ url }}
        >
          {category}
        </Link>
      ))}
    </div>
  )
}