import React from 'react'
import IndexRouter from './router/index'
import './App.css';
import { connect } from 'react-redux';
import {addUserInfo} from "./redux/actions";
import Cookies from 'js-cookie'





class AppComponent extends React.Component{
  componentWillMount(){
    if(Cookies.get('loginInfo')){
      this.props.addUserInfo(JSON.parse(Cookies.get('loginInfo')))
    }
    console.log(this.props)
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
const actionCreators = {addUserInfo}

export default connect(
  mapStatetoProps,
  actionCreators
)(AppComponent)