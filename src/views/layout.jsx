import React from 'react'
import Header from '../components/header'

export default class Layout extends React.Component{

  render(){
    return(
      <div>
        <div className="random-bg"></div>
        <div className="layout-wrap-big">
          <Header props={this.props}></Header>
          <div className="layout-wrap">
            {this.props.children}
          </div>
        </div>
      </div>

    )
  }
}