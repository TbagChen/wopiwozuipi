import React from 'react'
import IndexRouter from './router/index'
import './App.css';
import style from './themes/themes.scss'


export default class AppComponent extends React.Component{
  render(){
    return(
      <div className={'body-wrap'}>
        <div className={style.aaa}></div>
        <IndexRouter />
      </div>
    )

  }
}