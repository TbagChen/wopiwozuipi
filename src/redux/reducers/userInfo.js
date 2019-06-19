

const userInfo = (state ={userInfo:''} ,action) =>{
  switch (action.type){
    case 'ADD_USERINFO':
      return Object.assign({},state,{
        userInfo:action.data
      })
    default:
      return state
  }
}

export default userInfo