let nextId = 1

export const addId = id => ({
  type: 'ADD_ID',
  id:++nextId
})

export const addBlogList = blogList => ({
  type: 'ADD_BLOG_LIST',
  blogList
})