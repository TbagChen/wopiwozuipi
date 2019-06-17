const blog = (state={blogList:[]},action) => {
  console.log(action.blogList)
  switch (action.type){
    case 'ADD_BLOG_LIST' :
      console.log(state)
      return Object.assign({},state,{blogList:action.blogList})
    default :
      return state
  }
  //console.log(state)
}

export default blog