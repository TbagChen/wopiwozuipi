import React from 'react'
import {NavLink} from 'react-router-dom'

export default class LoginComponent extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      username:''
    }
  }
  login(){

  }
  getData(){

  }
  render(){
    return(
      <div>
        用户名：<input type="text" name={'username'} onChange={this.getData} /><br/>
        密码：<input type="password" name={'password'} /><br/>
        <button onClick={this.login}>登录</button><br/>
        没有账号，<NavLink to="/register">去注册</NavLink>
      </div>
    )
  }
}