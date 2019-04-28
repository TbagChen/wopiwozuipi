import React from 'react'
import {NavLink} from 'react-router-dom'

export default class BlogIndexComponent extends React.Component{
  render(){
    return(
      <div>
        这里是鲨鱼辣椒 <br/>
        快来<NavLink to={'/register'}>加入我们</NavLink>吧！
      </div>
    )
  }
}