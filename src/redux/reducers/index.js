import {combineReducers} from 'redux'

import userInfo from './userInfo'
import blog from './blog'

export default combineReducers({
  userInfo,
  blog
})