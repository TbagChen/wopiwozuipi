import {combineReducers} from 'redux'

import userInfo from './userInfo'
import blog from './blog'
import host from './usual'

const reducers =  combineReducers({
  userInfo,
  blog,
  host
})
export default reducers