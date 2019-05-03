import React from 'react'
import IndexRouter from './router/index'
import './App.css';
import './themes/themes.scss'

export default class AppComponent extends React.Component{
  render(){
    return(
      <div className={'body-wrap'}>
        <IndexRouter />
      </div>
    )

  }
}