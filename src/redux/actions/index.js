

export const addUserInfo = data => ({
  type: 'ADD_USERINFO',
  data:data
})

export const addBlogList = blogList => ({
  type: 'ADD_BLOG_LIST',
  blogList
})

export const addHost = host => ({
  type: 'ADD_HOST',
  host
})