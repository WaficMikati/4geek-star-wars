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
      {dataArr.map((e, i) => (
        <h3 key={i}>{`${e[0]}: ${e[1]}`}</h3>
      ))}
    </>
  )
}