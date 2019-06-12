const userInfoInit = {
  id:'1',
  avater:'1'
}

const userInfo = (state = userInfoInit,action) =>{
  switch (action.type){
    case 'LOGIN':
      return [
        ...state,{
          
        }
      ]
  }

  return state
}

export default userInfo