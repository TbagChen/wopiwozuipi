import React from 'react'
import {NavLink} from 'react-router-dom'
import '../themes/index/header.scss'

export default class Header extends React.Component {
  constructor(props){
    super(props)
  }
  render(){
    return(
      <div className="header-wrap-big">
        <div className="header-wrap">
          <div className="header-left">
            <NavLink to={'/'}>鲨鱼辣椒</NavLink>
          </div>
          <div className="header-right">
            <NavLink className="mr-20" to={'/login'}>登录</NavLink>
            <NavLink to={'/register'}>注册</NavLink>
          </div>
        </div>
      </div>
    )
  }
}