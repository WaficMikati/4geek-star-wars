import { useLoaderData } from "react-router"

export async function loader({ params }) {
  const index = params.item.split('-')[0]
  const category = params.category

  const response = await fetch(`https://swapi.tech/api/${category}/${index}`)
  const data = await response.json()

  return data.result.properties
}

export default function Item() {
  const data = useLoaderData()
  const dataArr = Object.entries(data)

  return (
    <>
      {dataArr.map(([property, info], i) => (
        <h3 key={i}>{`${property}: ${info}`}</h3>
      ))}
    </>
  )
}