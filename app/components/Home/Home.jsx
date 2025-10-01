import 'bootstrap/dist/css/bootstrap.min.css'
import './home.css'

export function Home() {
  return (
    <>
      <div className='fade position-relative w-100 z-1'></div>

      <section
        className='
          star-wars
          d-flex justify-content-center position-relative text-warning
        '
      >
        <div className='crawl position-relative fw-bold'>
          <div className='title text-center'>
            <p className='mb-2'>Star Wars</p>
            <h1 className='text-uppercase mb-5'>SWAPI Databank</h1>
          </div>

          <p className='mb-4'>
            I built a Star Wars databank project using React 19.1.1, React
            Router v7, and Bootstrap 5.3.8. The app connects to the SWAPI API
            and lets users browse categories like films, people, and starships.
            Each item can be opened to view its details, and I added a favorites
            feature so users can save what they like.
          </p>

          <p className='mb-4'>
            I set up React Router for nested routes, including dynamic routes
            for categories and individual items. The interface is organized with
            a sidebar for navigation, a card grid for browsing items, and a
            details view for each entry. Bootstrap was used for layout,
            responsive design, and styling, while custom CSS was added for the
            Star Wars–style scrolling intro.
          </p>

          <p className='mb-0'>
            To improve usability, I included a cache system for API calls and
            local storage of favorites. The project structure is modular, with
            components for cards, details, the sidebar, and favorites, making it
            easier to maintain and expand later.
          </p>
        </div>
      </section>
    </>
  )
}
