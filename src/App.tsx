import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import CategoryListPage from './category/list/CategoryListPage'
import { Route, Routes } from 'react-router-dom'
import DefaultLayout from './containers/DefaultLayout'
import CategoryCreatePage from './category/create/CategoryCreatePage'
import EditCategoryPage from './category/edit/EditCategoryPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Routes>
      <Route path={"/"} element={<DefaultLayout/>}>
        <Route index element={<CategoryListPage/>}/>
        <Route path={"category"}>
                    <Route path = "create" element={<CategoryCreatePage/>}/>
                    <Route path="edit/:id" element={<EditCategoryPage />} /> {/* Додайте маршрут для редагування */}
        </Route>
      </Route>
    </Routes>
    </>
  )
}

export default App
