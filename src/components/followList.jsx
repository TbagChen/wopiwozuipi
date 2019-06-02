import React from 'react'
import {Spin,Empty,Button} from 'antd'

export default class FollowList extends React.Component{
  constructor(props){
    super(props)
    this.state={
      userList:'',
      host:'',
    }
  }
  componentWillMount(){
    let host1 = window.location.href;
    host1 = host1.toLocaleLowerCase();
    if (host1.match('xuweijin.com')) {
      this.setState({
        host:'https://www.xuweijin.com/blogApi'
      })
    } else {
      this.setState({
        host:'http://localhost:3003'
      })
    }
  }
  componentWillReceiveProps(nextProps){
    console.log(nextProps)
    this.setState({
      userList:nextProps.userList
    })
  }
  goUser(params){
    console.log(this.props)
    this.props.history.push('/user/'+params.followerInfo.u_id)
  }
  render(){
    return(
      <div className="follows-wrap-s">
        {
          this.state.userList === ''?(
            <div className="load-wrap"><Spin size="large" /></div>
          ):(
              this.state.userList.length === 0?(
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            ):(
              <ul className="user-ul">
                {
                  this.state.userList.map((item,index)=>{
                    return(
                      <li className="user-li" key={index}>
                        <div className="li-left">
                          <div className="img-wrap">
                            <img className="img-avater" src={item.followerInfo.avater?(item.followerInfo.avater):(this.state.host+'/upload/avater_boy.png')} alt=""/>
                            <span onClick={this.goUser.bind(this,item)} className="name-wrap">{item.followerInfo.real_name?item.followerInfo.real_name:item.followerInfo.user_name}</span>
                          </div>
                        </div>
                        {
                          item.self === 1?'':(
                            <div className="li-right">
                              {
                                item.hasFollowed === 0?(
                                  <Button className={'noFollow btn-usual'} onClick={this.follow}>关注</Button>
                                ):(
                                  <Button className={'hasFollowed btn-usual'} onClick={this.follow}>已关注</Button>
                                )
                              }
                            </div>
                          )
                        }
                      </li>
                    )
                  })
                }
              </ul>
            )

          )

        }
      </div>
    )
  }
}