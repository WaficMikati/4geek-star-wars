import { useLoaderData, useParams } from 'react-router'
import { useState, useEffect } from 'react'
import { CardPage } from '../components/CardPage'
import { cachedFetch } from '../store/cache'

export async function loader({ params }) {
  const { category } = params

  return cachedFetch(`https://swapi.tech/api/${category}`).then(j => {
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
    const json = await cachedFetch(next)

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
