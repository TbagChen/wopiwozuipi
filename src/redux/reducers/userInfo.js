

const userInfo = (state ={userInfo:'',blogerInfo:''} ,action) =>{
  switch (action.type){
    case 'ADD_USERINFO':
      return Object.assign({},state,{
        userInfo:action.data
      })
    case 'ADD_BLOGERINFO':
      return Object.assign({},state,{
        blogerInfo:action.data
      })
    case 'ADD_FOLLOW':
      return Object.assign({},state,{
        
      })
    default:
      return state
  }
}

export default userInfo