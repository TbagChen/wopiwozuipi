import React from 'react'
import {NavLink} from 'react-router-dom'
import { message, Form, Icon, Input, Button, Checkbox} from 'antd'
import '../themes/register/login.scss'
import Cookies from 'js-cookie'
import utils from '../utils'
import { connect } from 'react-redux';
import {addUserInfo} from '../redux/actions'

class NormalLoginForm extends React.Component {
  constructor(props){
    super(props)
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
          if(res.code !== '200'){
            message.error(res.msg)
          }else{
            message.success('登录成功～')
            _this.props.props.addUserInfo(res.data)
            Cookies.set('loginInfo',res.data)
            this.props.props.history.push("/");
          }
        })
      }
    });
  }
  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields();
  }
  hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  }
  render() {
    const { getFieldDecorator,getFieldsError,getFieldError, isFieldTouched } = this.props.form;
    const usernameError = isFieldTouched('userName') && getFieldError('userName');
    const passwordError = isFieldTouched('password') && getFieldError('password');
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item  validateStatus={usernameError ? 'error' : ''} help={usernameError || ''}>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
          )}
        </Form.Item>
        <Form.Item validateStatus={passwordError ? 'error' : ''} help={passwordError || ''}>
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
          <Button type="primary" htmlType="submit" className="login-form-button" disabled={this.hasErrors(getFieldsError())}>
            立即登录
          </Button>
          <div className="toRegister">没有账号？ <NavLink to="/register">去注册</NavLink> Or <NavLink to="/">游客登录</NavLink></div>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);


class LoginComponent extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      username:'1111',
      fileobj:'',
      status:false,
      arr:[1,2,3,4],
      form:'',
      imageUrl:'',
      loginInfo:'',
    }
    this.changeStatus = this.changeStatus.bind(this)
    this.getData = this.getData.bind(this)
    this.login = this.login.bind(this)
    this.openMessage = this.openMessage.bind(this)
    this.upload = this.upload.bind(this)
    this.getFileData = this.getFileData.bind(this)
    this.beforeUpload = this.beforeUpload.bind(this)
  }
  componentDidMount(){
    if(Cookies.get('loginInfo')){
      this.setState({
        loginInfo:JSON.parse(Cookies.get('loginInfo'))
      })
    }
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
        //this.props.addUserInfo()
        //cookie.save('loginInfo',res.data,{path:'/'})
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
  getFileData(e){
    this.setState({
      fileobj:e.target.files[0]
    })
  }
  changeStatus(){
    this.setState((prevState)=>({
      status:!prevState.status
    }))
  }
  upload(){
    fetch.get('getQiniuToken',{token:this.state.loginInfo.token}).then(res=>{
      utils.uploadFile(this.state.fileobj,res.data.qiniuToken).then(res=>{
        this.setState({
          imageUrl:'http://img.xuweijin.com/'+res
        })
        fetch.post('editUserAvater',{
          u_id:'1',
          token:this.state.loginInfo.token,
          avater:'http://img.xuweijin.com/'+res
        }).then(res=>{
        })
      })
    })
  }
  openMessage(){
    message.success('成功～')
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
      }
    });
  }
  beforeUpload(file){
    this.setState({
      fileobj:file
    })
  }
  uploadAvater(){

  }
  render(){
    /*const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );*/
    return(
      <div>
        <WrappedNormalLoginForm props={this.props}/>
        {/*{<Upload
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          customRequest = {this.upload}
          beforeUpload={this.beforeUpload}
          onChange={this.handleChange}
        >
          {this.state.imageUrl ? <img src={this.state.imageUrl} alt="avatar" /> : uploadButton}
        </Upload>}*/}
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

const mapStatetoProps = (state)=>{
  return {userInfo:state.userInfo}
}
const actionCreators = {addUserInfo}
export default connect(
  mapStatetoProps,actionCreators
)(LoginComponent,WrappedNormalLoginForm)