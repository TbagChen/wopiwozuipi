import React from 'react'
import {NavLink} from 'react-router-dom'

export default class ErrorComponent extends React.Component{
  render(){
    return(
      <div>
        抱歉，找不到此页面 <NavLink exact to={'/'}>去首页</NavLink>
      </div>
    )
  }
}