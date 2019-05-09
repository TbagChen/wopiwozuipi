import React from 'react'
import {NavLink} from 'react-router-dom'
import { message, Form, Icon, Input, Button,  } from 'antd'
import axios from 'axios'
import '../themes/register/login.scss'

class NormalLoginForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        fetch.post('register',{
            userName:values.userName,
            password:values.password,
            realName:values.realName,
            phone:values.phone
        }).then(res=>{
          if(res.code !== '200'){
            message.error(res.msg)
          }else{
            message.success('注册成功～')
            this.props.parentProps.history.push('/login')
          }
        })
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('realName', {
            rules: [{ required: true, message: 'Please input your nickname!' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="昵称" />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('phoneNum', {
            rules: [{ required: true, message: 'Please input your phoneNum!' }],
          })(
            <Input prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="手机号" />
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            立即注册
          </Button>
          <div className="toRegister">已有账号？ <NavLink to="/login">去登录</NavLink></div>
        </Form.Item>
      </Form>
    );
  }
}

const RegisterForm = Form.create({ name: 'normal_login' })(NormalLoginForm);

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
    fetch.post('register',{
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
        <RegisterForm parentProps={this.props}></RegisterForm>
        {/*用户名：<input type="text" name={'username'} onChange={this.inputChange} /> <br/>
        密码：<input type="password" name={'password'} onChange={this.inputChange}/> <br/>
        手机号：<input type="text" name={'phone'} onChange={this.inputChange}/> <br/>
        <button onClick={this.register}>立即注册</button>
        已有账号，<NavLink to="/login">去登录</NavLink>*/}
      </div>
    )
  }
}