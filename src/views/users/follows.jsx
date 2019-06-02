import React from 'react'
import FollowList from '../../components/followList'

import {message} from 'antd'


export default class Follows extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      userList:''
    }
    this.getUserList = this.getUserList.bind(this)
  }
  componentWillMount(){
    this.getUserList()
  }
  getUserList(){
    fetch.get('getFollowList',{
      u_id:this.props.match.params.u_id,
    }).then(res=>{
      if(res.code === '200'){
        this.setState({
          userList:res.data
        })
        console.log(this.state.userList)
      }else{
        message.info(res.msg)
      }
    })
  }
  render(){
    return(
      <div className="follows-wrap">
        <FollowList {...this.props} userList={this.state.userList}></FollowList>
      </div>
    )
  }
}