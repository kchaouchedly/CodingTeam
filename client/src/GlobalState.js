import React, {createContext,useState} from 'react'
import ProductsAPI from './api/ProductsAPI'
import CategoriesAPI from './api/CategoriesAPI'
export const GlobalState = createContext()


export const DataProvider = ({children}) =>{
   
    const state = {
        productsAPI: ProductsAPI(),
        categoriesAPI : CategoriesAPI()
    }
    return(
    
    <GlobalState.Provider value={state}>
        {children}
    </GlobalState.Provider>



  
    )}
