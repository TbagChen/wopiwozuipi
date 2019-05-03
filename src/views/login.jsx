import React from 'react'
import {NavLink} from 'react-router-dom'
import { message, Form, Icon, Input, Button, Checkbox, } from 'antd'
import '../themes/register/login.scss'
class NormalLoginForm extends React.Component {
  constructor(props){
    super(props)
    console.log(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit(e){
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      const _this = this
      if (!err) {
        fetch.post('login',{
            userName:values.userName,
            password:values.password
        }).then(res=>{
          console.log(_this.props)
          if(res.code !== '200'){
            message.error(res.msg)
          }else{
            message.success('登录成功～')
            this.props.parentProps.history.push("/");
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
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox>Remember me</Checkbox>
          )}
          <NavLink className="login-form-forgot" to="/register">忘记密码</NavLink>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          <div className="toRegister">没有账号？ <NavLink to="/register">去注册</NavLink> Or <NavLink to="/">游客登录</NavLink></div>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);


export default class LoginComponent extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      username:'1111',
      status:false,
      arr:[1,2,3,4],
      form:''
    }
    this.changeStatus = this.changeStatus.bind(this)
    this.getData = this.getData.bind(this)
    this.login = this.login.bind(this)
    this.openMessage = this.openMessage.bind(this)
  }
  login(){
    fetch.post('login',{
      data:{
      userName:this.state.username,
      password:this.state.password}
    }).then(res=>{
      if(res.code !== '200'){
        message.error(res.msg)
      }else{
        message.success('登录成功～')
        this.props.history.push('/')
      }
    })
    /*axios.post('http://localhost:3003/users/login',{
      userName:this.state.username,
      password:this.state.password
    }).then(res=>{
      console.log(res)
      if(res.data.code !== '200'){
        message.error(res.data.msg)
      }else{
        message.success('登录成功～')
        this.props.history.push('/')
      }
    })*/
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
  openMessage(){
    message.success('成功～')
    console.log(this.props)
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }
  render(){
    return(
      <div>
        <WrappedNormalLoginForm parentProps = {this.props} />
        {/*用户名：<input type="text" name={'username'} value={this.state.username} onChange={this.getData} /><br/>
        密码：<input type="password" name={'password'}  onChange={this.getData}/><br/>
        <button onClick={this.login}>登录</button><br/>
        <Button type="primary" onClick={this.openMessage}>Button</Button>
        没有账号，<NavLink to="/register">去注册</NavLink>*/}
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