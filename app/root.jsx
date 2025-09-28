import 'bootstrap/dist/css/bootstrap.min.css'
import { useState } from 'react'
import { useEffect } from 'react'
import { Links, Meta, Outlet, Scripts } from 'react-router'
import { Sidebar } from './components/Sidebar'
import { FavoritesProvider } from './store/FavoritesContext'
import { cachedFetch } from './store/cache'

export default function App() {
  const [data, setData] = useState([])

  useEffect(() => {
    cachedFetch('https://swapi.tech/api').then(j =>
      setData(Object.entries(j.result))
    )
  }, [])

  return (
    <html
      lang='en'
      data-bs-theme='dark'
      className='h-100'
    >
      <head>
        <meta charSet='UTF-8' />
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1.0'
        />
        <Meta />
        <Links />
      </head>
      <body className='bg-black'>
        <div className='container-fluid ps-0'>
          <div className='vh-100 row'>
            <FavoritesProvider>
              <Sidebar data={data} />
              <div className='col vh-100 container-fluid d-flex flex-column overflow-hidden'>
                <div className='flex-grow-1 overflow-hidden'>
                  <Outlet />
                </div>
              </div>
            </FavoritesProvider>
          </div>
        </div>

        <Scripts />
      </body>
    </html>
  )
}
