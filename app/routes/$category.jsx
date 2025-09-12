import { useLoaderData } from "react-router"

export async function loader({ request }) {
  const url = new URL(request.url)
  const apiUrl = url.searchParams.get('url')
  const trueUrl = decodeURIComponent(apiUrl)
  const response = await fetch(trueUrl)
  return response.json()
}

export default function Category() {
  const data = useLoaderData()
  console.log(data);

  return (
    <h1>Test</h1>
  )
}