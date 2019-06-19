const blog = (state={blogList:''},action) => {
  switch (action.type){
    case 'ADD_BLOG_LIST' :
      return Object.assign({},state,{blogList:action.blogList})
    default :
      return state
  }
  //console.log(state)
}

export default blog