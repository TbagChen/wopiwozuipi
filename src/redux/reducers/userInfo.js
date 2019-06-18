const userInfoInit = {
  id:'1',
  avater:'1'
}

const userInfo = (state = userInfoInit,action) =>{
  console.log('111')
  switch (action.type){
    case 'ADD_USERINFO':
      return Object.assign({},state,{
        userInfo: action.data
      })
    default:
      return state
  }
}

export default userInfo