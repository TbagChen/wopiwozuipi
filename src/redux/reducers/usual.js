const host = (state='',action) => {
  switch (action.type){
    case('ADD_HOST'):
      return Object.assign({},state,{host:action.host})
    default:
      return state
  }
}

export default host