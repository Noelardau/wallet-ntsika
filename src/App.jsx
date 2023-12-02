
// import { Login } from './components/Login'
import { UserSignIn } from './components/UserSignIn'
import { createBrowserRouter, RouterProvider, NavLink, Outlet, Navigate } from 'react-router-dom'
import { Mail } from './components/Mail'
import { Layout } from './pages/Layout'
import {LayoutAdmin} from "./pages/LayoutAdmin"
import { TransactionUser } from './pages/TransactionUser'
import { TransfertArgent } from './pages/TransfertArgent'

import './App.css'
import { About } from './pages/About'
import { TransactionLayout } from './pages/TransactionLayout'
import { UpdateForm } from './components/updateForm'
import { CompteLayout } from './pages/CompteLayout'
import { Home } from './pages/Home.jsx'
import { Users } from './pages/Users'
import { HomeAdmin } from './pages/HomeAdmin'
import { CashPointLayout } from './pages/CashPointLayout'
import { CashPoint } from './pages/CashPoint'
import { Distributeurs } from './pages/Distributeurs'
import { CreditDistributeur } from './pages/CreditDistributeur'
import { Retrait } from './pages/Retrait'
import { ListTransactionPage } from './pages/ListTransactionPage'
import { DepotPage } from './pages/DepotPage.jsx'
import { HomeConnectedAdmin } from './pages/HomeConnectedAdmin.jsx'
// import { data } from 'autoprefixer'
import { TransactionLayoutAdmin } from './pages/TransactionLayoutAdmin.jsx'
import { SignInUserTwo } from './pages/SignInUserTwo.jsx'
import { SignInDistributeur } from './pages/SignInDistributeur.jsx'
import { CompteLayoutAdmin } from './pages/CompteLayoutAdmin.jsx'

let router = createBrowserRouter([
  {
    path:"/",
    element: <Layout></Layout>,
    children:[
      {
        path:"",
        element: <Home></Home>
        // element: <Mail user={"Jo"} code={123321}></Mail>
      },
      {
        path:"signIn",
        element: <SignInUserTwo></SignInUserTwo>
      },
      {
        path:"about",
        element: <About></About>
      },
      {
        path:"transaction",
        element: <TransactionLayout></TransactionLayout>,
        children:[
          {
            path:"",
            element: <ListTransactionPage></ListTransactionPage>,
          },
          {
            path:"crediter",
            element: <TransfertArgent></TransfertArgent>,
          },
          {
            path:"retrait",
            element: <Retrait></Retrait>
          },
          {
            path:"depot",
            element: <DepotPage></DepotPage>
          },
          {
            path:"api",
            element: <h1>API space</h1>
          }
        ]
      },
      {
        path:"compte",
        element: <CompteLayout></CompteLayout>
      }
    ]
  },
  {
  path:"/admin/",
  element: <LayoutAdmin></LayoutAdmin>,
  children:[
    {
      path:"",
      element: <HomeAdmin></HomeAdmin>
    },
    {
      path:"compte",
      element: <CompteLayoutAdmin></CompteLayoutAdmin>
    },
    {
      path:"user",
      element: <Users></Users> 
    },
    {
      path:"transaction/:user_id",
      element: <ListTransactionPage></ListTransactionPage>

    },
    {
      path:"transaction",
      element: <TransactionLayoutAdmin></TransactionLayoutAdmin>,
      children:[
        {
          path:"",
          element: <ListTransactionPage typeUser="admin"></ListTransactionPage>,
        },
        {
          path:"crediter",
          element: <TransfertArgent type="admin"></TransfertArgent>,
        },
        {
          path:"retrait",
          element: <Retrait></Retrait>
        },
      ]
    },
    {
      path:"cashPoint",
      element: <SignInDistributeur></SignInDistributeur>
      
 
    }
  ]
}
])



export default function App() {

  let connexion = (data)=>{
    
    console.log(data)
    
  }


  return <RouterProvider router={router}></RouterProvider>
 
  

}

