import React from 'react'
import FollowList from '../../components/followList'
import {message} from 'antd'
import Cookies from 'js-cookie'



export default class Follows extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      userList:'',
      loginInfo:'',
    }
    this.getUserList = this.getUserList.bind(this)
  }
  componentDidMount(){
    if(Cookies.get('loginInfo')){
      this.setState({
        loginInfo:JSON.parse(Cookies.get('loginInfo'))
      })
    }
    this.getUserList()
  }
  getUserList(){
    fetch.get('getFollowingList',{
      u_id:this.props.match.params.u_id,
      token:this.state.loginInfo?this.state.loginInfo.token:'',
    }).then(res=>{
      if(res.code === '200'){
        this.setState({
          userList:res.data
        })
      }else{
        message.info(res.msg)
      }
    })
  }
  render(){
    return(
      <div className="follows-wrap">
        <FollowList {...this.props}  userList={this.state.userList}></FollowList>
      </div>
    )
  }
}