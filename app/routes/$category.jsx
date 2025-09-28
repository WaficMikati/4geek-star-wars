import { useLoaderData, useParams } from 'react-router'
import { CardPage } from '../components/CardPage'
import { useState } from 'react'
import { useEffect } from 'react'

export async function loader({ params }) {
  const { category } = params

  return fetch(`https://swapi.tech/api/${category}`)
    .then(r => r.json())
    .then(j => {
      return {
        result: j.results || j.result,
        next: j.next
      }
    })
}

export default function Category() {
  const { category } = useParams()
  const fetchedData = useLoaderData()
  const [data, setData] = useState(fetchedData.result)
  const [next, setNext] = useState(fetchedData.next)

  useEffect(() => {
    setData(fetchedData.result)
    setNext(fetchedData.next)
  }, [fetchedData])

  async function loadMore() {
    if (!next) return
    const response = await fetch(next)
    const json = await response.json()

    setData(prev => [...prev, ...json.results])
    setNext(json.next)
  }

  return (
    <>
      <CardPage
        data={data}
        category={category}
        loadMore={loadMore}
      />
    </>
  )
}
