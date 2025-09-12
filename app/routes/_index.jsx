import { Link, useLoaderData } from "react-router";

export async function loader() {
  const response = await fetch('https://www.swapi.tech/api')

  return response.json()
}

export default function Home() {
  const data = useLoaderData()

  return (
    <div className="d-grid">
      {Object.entries(data.result).map(([category, url], index) => (
        <Link
          key={index}
          to={`/${category}?url=${encodeURIComponent(url)}`}
        >
          {category}
        </Link>
      ))}
    </div>
  )
}