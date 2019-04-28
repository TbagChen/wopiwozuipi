import React from 'react'
import {NavLink} from 'react-router-dom'

export default class RegisterComponent extends React.Component {
  render(){
    return (
      <div>
        用户名：<input type="text"/> <br/>
        密码：<input type="password"/> <br/>
        手机号：<input type="text"/> <br/>
        <button>立即注册</button>
        已有账号，<NavLink to="/login">去登录</NavLink>
      </div>
    )
  }
}