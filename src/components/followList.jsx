import React from 'react'
import {Spin,Empty,Button,message,Modal} from 'antd'
import Cookies from 'js-cookie'
import LoginModal from '../components/loginModal'



export default class FollowList extends React.Component{
  constructor(props){
    super(props)
    this.state={
      userList:'',
      host:'',
      loginInfo:'',
      modalVisible:false,
    }
    this.handleCancel = this.handleCancel.bind(this)
  }
  componentDidMount(){
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
    if(Cookies.get('loginInfo')){
      this.setState({
        loginInfo:JSON.parse(Cookies.get('loginInfo'))
      })
    }
  }
  componentWillReceiveProps(nextProps){
    this.setState({
      userList:nextProps.userList
    })
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
  follow(params){
    if(this.state.loginInfo === ''){
      this.setState({
        modalVisible:true
      })
    }else{
      fetch.post('follow',{
        u_id:this.state.loginInfo.u_id,
        f_id:params.followerInfo.u_id,
        token:JSON.parse(Cookies.get('loginInfo')).token
      }).then(res=>{
        if(res.code==='200'){
          let i = 0
          let userList = this.state.userList
          if(params.hasFollowed === 0){
            i = 1
            message.success('关注成功～')
          }else{
            i = 0
            message.success('取关成功～')
          }

          params.hasFollowed = i
          this.setState({
            userList:userList
          })

        }
      })
    }
  }
  goUser(params){
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
                                  <Button className={'noFollow btn-usual'} onClick={this.follow.bind(this,item)}>关注</Button>
                                ):(
                                  <Button className={'hasFollowed btn-usual'} onClick={this.follow.bind(this,item)}>已关注</Button>
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