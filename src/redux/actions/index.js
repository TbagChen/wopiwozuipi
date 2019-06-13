let nextId = 1

export const addId = id => ({
  type: 'ADD_ID',
  id:++nextId
})