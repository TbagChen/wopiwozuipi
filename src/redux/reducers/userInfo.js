const userInfoInit = {
  id:'1',
  avater:'1'
}

const userInfo = (state = userInfoInit,action) =>{
  console.log('111')
  switch (action.type){
    case 'ADD_ID':
      return Object.assign({},state,{
        id: action.id
      })
    default:
      return state
  }
}

export default userInfo