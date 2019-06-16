import {combineReducers} from 'redux'

import userInfo from './userInfo'
import blog from './blog'

const reducers =  combineReducers({
  userInfo,
  blog
})
export default reducers