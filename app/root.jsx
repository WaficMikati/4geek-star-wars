import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";
import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from "./components/Navbar.jsx";
import { FavoritesProvider } from "./store/favContext.jsx";

export default function App() {
  return (
    <html lang="en" data-bs-theme='dark'>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <Meta />
        <Links />
      </head>
      <body>
        <Navbar />

        <main className="container mt-4">
          <FavoritesProvider>
            <Outlet />
          </FavoritesProvider>
        </main>

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}