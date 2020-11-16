export default {
  addProductCount(state,payload){
    payload.oldProduct.count++
  },
  addProduct(state,payload){
    state.cartList.push(payload.newProduct)
  },
  changeCheck: function (state, payload) {
    state.cartList[payload.index].checked = !state.cartList[payload.index].checked
  },
  allChecked(state){
    for(let item of state.cartList){
      item.checked = true
    }
  },
  noChecked(state){
    for(let item of state.cartList){
      item.checked = false
    }
  },
  backChecked(state){
    for(let item of state.cartList){
      item.checked = !item.checked
    }
  },
  deleteItem(state,payload){
    const index = state.cartList.findIndex(item => item.iid === payload.iid)
    state.cartList.splice(index,1)
  }
}
