import ReactDOM from 'react-dom/client'
import './assets/index.css'
import { routes } from '@generouted/react-router'
import { RouterProvider, createHashRouter } from 'react-router-dom'

const router = createHashRouter(routes)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <RouterProvider router={router} />
)
