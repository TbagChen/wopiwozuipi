import React from 'react'
import Header from '../components/header'

export default class Layout extends React.Component{

  componentWillMount(){
    console.log(this.props)
  }
  render(){
    return(
      <div className="layout-wrap-big">
        <Header props={this.props}></Header>
        <div className="layout-wrap">
          {this.props.children}
        </div>
      </div>
    )
  }
}