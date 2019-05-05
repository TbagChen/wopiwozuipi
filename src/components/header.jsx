import React from 'react'
import {NavLink} from 'react-router-dom'
import '../themes/index/header.scss'
import Cookies from 'js-cookie'
import { Menu, Dropdown, Button, Avatar } from 'antd';

export default class Header extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      loginInfo:''
    }
    this.logout = this.logout.bind(this)
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
  render(){
    const menu = (
      <Menu>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">我的主页</a>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">设置</a>
        </Menu.Item>
        <Menu.Item>
          <a onClick={this.logout} rel="noopener noreferrer" href="javascript:;">退出</a>
        </Menu.Item>
      </Menu>
    )
    return(
      <div className="header-wrap-big">
        <div className="header-wrap">
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
          </div>
          <div className="header-right">
            <div>
              {
                this.state.loginInfo === ''?(
                  <div>
                    <NavLink className="mr-20" to={'/writeBlog'}>写文章</NavLink>
                    <NavLink className="mr-20" to={'/login'}>登录</NavLink>
                    <NavLink to={'/register'}>注册</NavLink>
                  </div>
                ):(
                  <Dropdown overlay={menu} placement="bottomCenter">
                    <Avatar size="large" icon="user" />
                  </Dropdown>
                )
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}