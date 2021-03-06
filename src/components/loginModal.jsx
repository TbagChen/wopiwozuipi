import React from 'react'
import {Form,Input,Checkbox,Icon,Button,message} from 'antd'
import {NavLink} from 'react-router-dom'
import Cookies from 'js-cookie'
import '../themes/components/loginModal.scss'

class FormLogin extends React.Component{
  constructor(props){
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit(e){
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        fetch.post('login',{
          userName:values.userName,
          password:values.password
        }).then(res=>{
          if(res.code !== '200'){
            message.error(res.msg)
          }else{
            message.success('登录成功～')
            Cookies.set('loginInfo',res.data)
            window.location.reload();
            this.props.handleCancel()
          }
        })
      }
    });
  }
  render(){
    const { getFieldDecorator } = this.props.form
    return(
      <div className="loginModal-wrap">
        {<Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item>
            {getFieldDecorator('userName', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="用户密码" />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(
              <Checkbox>记住密码</Checkbox>
            )}
            <NavLink className="login-form-forgot" to="/register">忘记密码</NavLink>
            <Button type="primary" htmlType="submit" className="login-form-button">
              立即登录
            </Button>
            <div className="toRegister">没有账号？ <NavLink to="/register">去注册</NavLink></div>
          </Form.Item>
        </Form>}
      </div>
    )
  }
}
const FormLoginComponent = Form.create({ name: 'normal_login' })(FormLogin);

export default class LoginModal extends React.Component{
  render(){
    return(
      <FormLoginComponent {...this.props}></FormLoginComponent>
    )

  }
}