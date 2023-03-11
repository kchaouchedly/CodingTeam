import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import {GlobalState} from '../../../../GlobalState'

function BtnRenderA({product, deleteProduct}) {
    const state = useContext(GlobalState)


    
    return (
        <div className="row_btn">
            {
               
                <>
                    <Link id="btn_buy" to="#!" 
                    onClick={() =>deleteProduct(product._id, product.images.public_id)}>
                        Delete
                    </Link>
                    <Link id="btn_view" to={`/edit_product/${product._id}`}>
                        Edit
                    </Link>
                </>
               
            }
                
        </div>
    )
}




export default BtnRenderA