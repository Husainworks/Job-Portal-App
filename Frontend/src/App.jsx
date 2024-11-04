// 4:33:13 on 30/10/24 at 11:10pm
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './components/authorization/Login'
import Signup from './components/authorization/Signup'
import Home from './components/home'

const appRouter = createBrowserRouter([
  {
    path:"/",
    element:<Home/>
  },
  {
    path:"/login",
    element:<Login/>
  },
  {
    path:"/signup",
    element:<Signup/>
  }
])

function App() {
  return (
    <>
      <RouterProvider router = {appRouter}/>
    </>
  )
}

export default App