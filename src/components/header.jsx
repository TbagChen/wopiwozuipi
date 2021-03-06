import React from 'react'
import {NavLink} from 'react-router-dom'
import '../themes/index/header.scss'
import Cookies from 'js-cookie'
import { Menu, Dropdown, Avatar, Icon ,Row, Col, Modal, message} from 'antd';
import LoginModal from '../components/loginModal'
import {connect} from 'react-redux'

//const socket = require('socket.io-client')('http://localhost:3003',{transports:['websocket','xhr-polling','jsonp-polling']});
const socket = require('socket.io-client')('https://www.xuweijin.com',{transports:['websocket','xhr-polling','jsonp-polling']});

class Header extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      loginInfo:'',
      modalVisible:false,
    }
    this.handleCancel = this.handleCancel.bind(this)
    this.toMyBlog = this.toMyBlog.bind(this)
    this.toPersonalCenter = this.toPersonalCenter.bind(this)
  }
  componentDidMount(){
    console.log(this.props.host)
    socket.on('add user', (data) => {
      console.log(data)
    });
    socket.on('new message', (data) => {
      console.log(data)
    });
    if(Cookies.get('loginInfo')){
      this.setState({
        loginInfo:JSON.parse(Cookies.get('loginInfo'))
      },() => {
        console.log(this.state.loginInfo.u_id)
        socket.on(this.state.loginInfo.u_id, (data) => {
          message.info('您有一条新消息哦~')

        });
      })

    }
  }
  logout(){
    Cookies.remove('loginInfo')
    this.props.props.history.push('/login')
  }
  handleCancel(){
    if(Cookies.get('loginInfo')){
      this.setState({
        loginInfo:JSON.parse(Cookies.get('loginInfo'))
      })
    }
    this.setState({
      modalVisible:false,
    })
  }
  toMyBlog(){
    if(this.props.userInfo.userInfo){
      this.props.props.history.push('/myBlog')
    }else{
      this.setState({
        modalVisible:true,
      })
    }
  }
  toPersonalCenter(){
    if(this.props.userInfo.userInfo){
      this.props.props.history.push('/PersonalCenter')
    }else{
      this.setState({
        modalVisible:true,
      })
    }
  }
  clickMenuItem(params){
    this.props.props.history.push('/user/'+this.props.userInfo.userInfo.u_id)
  }
  render(){
    const menu = (
      <Menu>
        <Menu.Item onClick={this.clickMenuItem.bind(this)}>
          <span rel="noopener noreferrer">我的主页</span>
        </Menu.Item>
        <Menu.Item>
          <span rel="noopener noreferrer">设置</span>
        </Menu.Item>
        <Menu.Item onClick={this.logout.bind(this)}>
          <span rel="noopener noreferrer">退出</span>
        </Menu.Item>
      </Menu>
    )
    return(
      <div className="header-wrap-big">
        <div className="header-wrap">
          <Row type={'flex'}>
            <Col span={16}>
              <div className="header-left">
                <NavLink to={'/'} >
                  <svg width="130" height="60">
                    <text textAnchor="middle" x="50%" y="50%" className="text text-1">
                      鲨鱼辣椒
                    </text>
                    <text textAnchor="middle" x="50%" y="50%" className="text text-2">
                      鲨鱼辣椒
                    </text>
                    <text textAnchor="middle" x="50%" y="50%" className="text text-3">
                      鲨鱼辣椒
                    </text>
                    <text textAnchor="middle" x="50%" y="50%" className="text text-4">
                      鲨鱼辣椒
                    </text>
                  </svg>
                </NavLink>
                <Menu
                  onClick={this.handleClick}
                  selectedKeys={[this.state.current]}
                  mode="horizontal"
                >
                  <Menu.Item key="mail">
                    <NavLink to={'/'}><Icon type="home" />广场</NavLink>
                  </Menu.Item>
                  <Menu.Item key="app">
                    <span onClick={this.toMyBlog}><Icon type="meh" />我的博客</span>
                  </Menu.Item>
                  <Menu.Item key="Personal">
                    <span onClick={this.toPersonalCenter}><Icon type="meh" />个人中心</span>
                    {/* <NavLink to={'/PersonalCenter'}><Icon type="meh" />个人中心</NavLink> */}
                  </Menu.Item>
                </Menu>
              </div>
            </Col>
            <Col span={8}>
              <div className="header-right">
                <div>
                  {
                    this.props.userInfo.userInfo === ''?(
                      <div>
                        <NavLink to={'/login'}><span className="mr-20">登录</span></NavLink>
                        <NavLink to={'/register'}>注册</NavLink>
                      </div>
                    ):(
                      <div>
                        <NavLink  to={'/writeBlog'}><span className="mr-20">写文章</span></NavLink>
                        <Dropdown trigger={['click']} overlay={menu} placement="bottomCenter">
                          {this.props.userInfo.userInfo.avater?(<span className="avater-a"><img src={this.props.userInfo.userInfo.avater} className="avater-img" alt="头像"/></span>):(<Avatar size="large" icon="user" />)}
                        </Dropdown>
                      </div>
                    )
                  }
                </div>
              </div>
            </Col>
          </Row>
        </div>
        <Modal
          title="请先登录"
          visible={this.state.modalVisible}
          footer={null}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okButtonProps={{ disabled: true }}
          cancelButtonProps={{ disabled: true }}
        >
          <LoginModal {...this.props} handleCancel={this.handleCancel}></LoginModal>
        </Modal>
      </div>
    )
  }
}

const mapStatetoProps = (state) => {
  return {host:state.host,userInfo:state.userInfo}
}

export default connect(
  mapStatetoProps
)(Header)