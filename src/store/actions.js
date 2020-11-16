export default {
  addToCart({state,commit},payload){
    const oldProduct = state.cartList.find(item => item.iid === payload.product.iid)
    if(oldProduct){
      commit('addProductCount',{
        oldProduct
      })
    }else{
      payload.product.count = 1;
      payload.product.checked = true;
      commit('addProduct',{
       newProduct : payload.product
     })
    }

  }
}
