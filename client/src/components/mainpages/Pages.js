import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Cart from './Cart/Cart'
import DetailProduct from './detailProduct/DetailProduct'
import Products from './products/Products'
import ProductsAdmin from './ProductsAdmin/ProductsA'
import Categories from './categories/Categories'
import CreateProduct from './createProduct/CreateProduct'
import NotFound from './utils/not_found/NotFound'

function Pages() {
  return (
    
        <Routes>
    
            <Route path="/" element={<Products />} />
            
            <Route path="/Admin" element={<ProductsAdmin />} />
            <Route path="/detail/:id" element={<DetailProduct />} />
            <Route path="/category" element={< Categories /> } />
            <Route path="/create_product" element={< CreateProduct /> } />
            <Route path="/edit_product/:id" element={< CreateProduct /> } />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
            </Routes>
            


  )
}

export default Pages
