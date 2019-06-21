import React from 'react'
import IndexRouter from './router/index'
import './App.css';
import { connect } from 'react-redux';
import {addUserInfo,addHost} from "./redux/actions";
import Cookies from 'js-cookie'
import './themes/themes.scss'





class AppComponent extends React.Component{
  componentWillMount(){
    if(Cookies.get('loginInfo')){
      this.props.addUserInfo(JSON.parse(Cookies.get('loginInfo')))
    }
    console.log(this.props)
    let host1 = window.location.href;
    host1 = host1.toLocaleLowerCase();
    if (host1.match('xuweijin.com')) {
      this.props.addHost('https://www.xuweijin.com/blogApi')
    } else {
      this.props.addHost('http://localhost:3003')
    }
  }
  componentDidMount(){
    setTimeout(()=>{
      console.log(this.props)
    },1000)

  }
  render(){
    return(
      <div className={'body-wrap'}>
        <IndexRouter />
      </div>
    )

  }
}

const mapStatetoProps = (state)=>{
  return {userInfo:state.userInfo}
}
const actionCreators = {addUserInfo,addHost}

export default connect(
  mapStatetoProps,
  actionCreators
)(AppComponent)