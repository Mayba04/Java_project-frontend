import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import CategoryListPage from './category/list/CategoryListPage'
import { Route, Routes } from 'react-router-dom'
import DefaultLayout from './containers/DefaultLayout'
import CategoryCreatePage from './category/create/CategoryCreatePage'
import CategoryEditPage from './category/edit/CategoryEditPage'
import ProductCreatePage from './product/create/ProductCreatePage'
import ProductListPage from './product/list/ProductListPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Routes>
      <Route path={"/"} element={<DefaultLayout/>}>
        <Route index element={<CategoryListPage/>}/>
        <Route path={"category"}>
                    <Route path = "create" element={<CategoryCreatePage/>}/>
                    <Route path={"edit/:id"} element={<CategoryEditPage/>} />
        </Route>
        <Route path={"product"}>
            <Route path = "create" element={<ProductCreatePage/>}/>
            <Route path="list" element={<ProductListPage />} />
        </Route>
      </Route>
    </Routes>
    </>
  )
}

export default App
