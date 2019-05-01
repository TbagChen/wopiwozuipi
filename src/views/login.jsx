import React from 'react'
import {NavLink} from 'react-router-dom'
import axios from 'axios'
import UploadFile from '../components/uploadFile'
const Login = () => {
  return <div>登录文本</div>
}
export default class LoginComponent extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      username:'1111',
      status:false,
      arr:[1,2,3,4]
    }
    this.changeStatus = this.changeStatus.bind(this)
    this.getData = this.getData.bind(this)
    this.login = this.login.bind(this)
  }
  login(){
    console.log(this.state)
    axios.post('http://localhost:3003/blogApi/users/login',{
      userName:this.state.username,
      password:this.state.password
    }).then(res=>{
      console.log(res)
      if(res.data.code !== '200'){
        alert(res.data.msg)
      }else{
        this.props.history.push('/')
      }
    })
  }
  getData(e){
    const target = e.target
    const value = target.type === 'checkbox'?target.checked:target.value;
    const name = target.name
    this.setState({
      [name]:value
    })
  }
  changeStatus(){
    this.setState((prevState)=>({
      status:!prevState.status
    }))
  }

  render(){
    return(
      <div>
        用户名：<input type="text" name={'username'} value={this.state.username} onChange={this.getData} /><br/>
        密码：<input type="password" name={'password'}  onChange={this.getData}/><br/>
        <button onClick={this.login}>登录</button><br/>
        没有账号，<NavLink to="/register">去注册</NavLink>
        <UploadFile></UploadFile>
        {/*<button onClick={this.changeStatus}>
          {this.state.status?'on':'off'}
        </button>
        <ul>
          {
            this.state.arr.map((item, index) => {
              return <li key={index}>{item}</li>
            })
          }
        </ul>
        <Login />*/}
      </div>
    )
  }
}