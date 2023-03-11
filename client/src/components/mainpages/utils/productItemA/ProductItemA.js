
import React from 'react'
import BtnRenderA from './BtnRenderA'

function ProductItemA({product, deleteProduct, handleCheck}) {

    return (
        <div className="product_card">
            {
              <input type="checkbox" checked={product.checked}
                onChange={() => handleCheck(product._id)} />
            }
            <img src={product.images.url} alt="" />

            <div className="product_box">
                <h2 title={product.title}>{product.title}</h2>
                <span>${product.price}</span>
                <p>{product.description}</p>
            </div>

            
            <BtnRenderA product={product} deleteProduct={deleteProduct} />
        </div>
    )
}




export default ProductItemA

