import React from 'react'
import {NavLink} from 'react-router-dom'
import axios from 'axios'

export default class RegisterComponent extends React.Component {
  constructor(props){
    super(props)
    this.state={
      username:'',
      password:'',
      phone:''
    }
    this.inputChange = this.inputChange.bind(this)
    this.register = this.register.bind(this)
  }
  inputChange(e){
    const target = e.target
    const value = target.type==='checkbox'?target.checked:target.value
    const name = target.name
    this.setState({
      [name]:value
    })
  }
  register(){
    console.log(this.state)
    axios.post('https://blog.xuweijin.com/blogApi/users/register',{
      userName:this.state.username,
      password:this.state.password
    }).then(res=>{
      if(res.data.code === '200'){
        this.props.history.push('/login')
      }else{
        alert(res.data.msg)
      }
    })
  }
  render(){
    return (
      <div>
        用户名：<input type="text" name={'username'} onChange={this.inputChange} /> <br/>
        密码：<input type="password" name={'password'} onChange={this.inputChange}/> <br/>
        手机号：<input type="text" name={'phone'} onChange={this.inputChange}/> <br/>
        <button onClick={this.register}>立即注册</button>
        已有账号，<NavLink to="/login">去登录</NavLink>
      </div>
    )
  }
}