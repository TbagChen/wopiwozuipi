import React from 'react'
import {NavLink} from 'react-router-dom'

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
            头部右侧
          </div>
        </div>
      </div>
    )
  }
}