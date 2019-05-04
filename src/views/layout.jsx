import React from 'react'
import Header from '../components/header'

export default class Layout extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
    return(
      <div className="layout-wrap">
        <Header></Header>
        1233
        {this.props.children}
      </div>
    )
  }
}