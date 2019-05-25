import React from 'react'
import {NavLink} from 'react-router-dom'
import '../themes/index/header.scss'
import Cookies from 'js-cookie'
import { Menu, Dropdown, Avatar, Icon ,Row, Col, Modal} from 'antd';
import LoginModal from '../components/loginModal'

export default class Header extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      loginInfo:'',
      modalVisible:false,
    }
    this.logout = this.logout.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.toMyBlog = this.toMyBlog.bind(this)
  }
  componentDidMount(){
    if(Cookies.get('loginInfo')){
      this.setState({
        loginInfo:JSON.parse(Cookies.get('loginInfo'))
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
    if(this.state.loginInfo){
      this.props.props.history.push('/myBlog')
    }else{
      this.setState({
        modalVisible:true,
      })
    }
  }
  render(){
    const menu = (
      <Menu>
        <Menu.Item>
          <span rel="noopener noreferrer">我的主页</span>
        </Menu.Item>
        <Menu.Item>
          <span rel="noopener noreferrer">设置</span>
        </Menu.Item>
        <Menu.Item>
          <span onClick={this.logout} rel="noopener noreferrer">退出</span>
        </Menu.Item>
      </Menu>
    )
    return(
      <div className="header-wrap-big">
        <div className="header-wrap">
          <Row type={'flex'}>
            <Col span={16}>
              <div className="header-left">
                <NavLink to={'/'} className="text-wrap">
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
                </Menu>
              </div>
            </Col>
            <Col span={8}>
              <div className="header-right">
                <div>
                  {
                    this.state.loginInfo === ''?(
                      <div>
                        <NavLink className="mr-20" to={'/login'}>登录</NavLink>
                        <NavLink to={'/register'}>注册</NavLink>
                      </div>
                    ):(
                      <div>
                        <NavLink className="mr-20" to={'/writeBlog'}>写文章</NavLink>
                        <Dropdown trigger={['click']} overlay={menu} placement="bottomCenter">
                          {this.state.loginInfo.avater?(<span className="avater-a"><img src={this.state.loginInfo.avater} className="avater-img" alt="头像"/></span>):(<Avatar size="large" icon="user" />)}
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