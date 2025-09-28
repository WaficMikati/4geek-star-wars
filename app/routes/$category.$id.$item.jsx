import { Link, useLoaderData, useParams } from 'react-router'
import { Details } from '../components/Details'

export async function loader({ params }) {
  const { category, id } = params
  const response = await fetch(`https://swapi.tech/api/${category}/${id}`)
  const json = await response.json()
  const dataArray = Object.entries(json.result.properties).filter(
    ([name]) => !['created', 'edited', 'url'].includes(name)
  )
  const data = dataArray.filter(([_, info]) => {
    return typeof info !== 'object' && !info?.startsWith?.('https')
  })
  const links = dataArray
    .filter(e => !data.includes(e) && e[1].length > 0)
    .sort((a, b) => {
      const getLength = item => (Array.isArray(item[1]) ? item[1].length : 1)
      return getLength(b) - getLength(a)
    })

  const fetchedLinks = await Promise.all(
    links.map(async ([name, info]) => [
      name,
      Array.isArray(info)
        ? await Promise.all(
            info.map(url =>
              fetch(url)
                .then(r => r.json())
                .then(d => d.result.properties)
            )
          )
        : [
            await fetch(info)
              .then(r => r.json())
              .then(d => d.result.properties)
          ]
    ])
  )

  return { data: data, links: fetchedLinks }
}

export default function Item() {
  const { category, item } = useParams()
  const fetchedData = useLoaderData()
  const data = fetchedData.data
  const links = fetchedData.links
  console.log(links)

  return (
    <div className='row overflow-scroll h-100 g-0 justify-content-center align-items-center px-2'>
      <div className='card text-capitalize bg-black bg-opacity-25 border-dark border-0 p-2 rounded-3'>
        <div className='row g-3'>
          <div className='col align-content-center'>
            <img
              className='object-fit-cover img-fluid rounded-3 border border-dark h-100'
              src={`/images/${category}/${item
                .replaceAll(' ', '-')
                .replaceAll("'", '')
                .toLowerCase()}.jpg`}
            />
          </div>
          <div className='col-12 col-xl-4'>
            <div className='card-body m-0 p-0'>
              <div className='display-5 text-warning border border-dark border-opacity-50 p-2 px-3 rounded-3 bg-dark bg-opacity-25 mb-3'>
                {item}
              </div>
              {data.map(
                ([name, info], i) =>
                  name !== 'name' && (
                    <Details
                      name={name}
                      info={info}
                      key={i}
                    />
                  )
              )}
            </div>
          </div>
        </div>
        <div className='card-footer bg-transparent border-0 p-0 pt-2'>
          <div className='row g-2'>
            {links.map(([name, info]) => (
              <div
                className='col-12 col-md-6 col-lg'
                key={name}
              >
                <div className='card h-100 bg-transparent border border-dark'>
                  <div className='card-header fs-5 text-warning border-bottom-0'>
                    {name}
                  </div>
                  <div className='card-body pt-0 pb-3 text-primary-emphasis'>
                    <div className='container-fluid'>
                      <div className='row gap-1'>
                        {info &&
                          info.map((e, i) => (
                            <Link
                              className='col-12 col-lg-auto btn btn-outline-primary text-start'
                              to={`/${e.url.split('/').slice(-2).join('/')}/${
                                e.title || e.name
                              }`}
                              key={i}
                            >
                              {e.title || e.name}
                            </Link>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
