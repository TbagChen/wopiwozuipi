import React from 'react'
import {Empty,Skeleton,Spin,Button,message,Modal} from 'antd'
import Cookies from 'js-cookie'
import LoginModal from '../components/loginModal'


import '../themes/user/user.scss'

export default class User extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      blogList:'',
      userInfo:'',
      host:'',
      loginInfo:'',
      modalVisible:false
    }
    this.follow = this.follow.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
  }
  componentWillMount(){
    this.getBlogList()
    this.getUserBasicInfo()
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
  getBlogList(){
    fetch.get("getArticle",{
      u_id:this.props.match.params.u_id,
    }).then(res=>{
      this.setState({
        blogList:res.data
      })
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
  follow(){
    if(this.state.loginInfo === ''){
      this.setState({
        modalVisible:true
      })
    }else{
      fetch.post('follow',{
        u_id:this.state.loginInfo.u_id,
        f_id:this.state.userInfo.u_id,
        token:JSON.parse(Cookies.get('loginInfo')).token
      }).then(res=>{
        if(res.code==='200'){
          let i = 0
          let userInfo = this.state.userInfo
          if(this.state.userInfo.hasFollowed === 0){
            i = 1
            message.success('关注成功～')
            userInfo.follower ++
          }else{
            i = 0
            message.success('取关成功～')
            userInfo.follower --
          }

          userInfo.hasFollowed = i
          this.setState({
            userInfo:userInfo
          })

        }
      })
    }
  }
  getUserBasicInfo(){
    fetch.get("getUserBasicInfo",{
      u_id:this.props.match.params.u_id,
      token:Cookies.get('loginInfo')?JSON.parse(Cookies.get('loginInfo')).token:''
    }).then(res=>{
      this.setState({
        userInfo:res.data
      })
    })
  }
  goDetail(params){
    this.props.history.push('/blogDetail/'+params.id)
  }
  render(){
    return(
      <div className="userComponent-wrap">
        <div className="userInfo-content">
          {this.state.userInfo===''?(
            <div>
              <Spin delay={'1000'} />
            </div>
          ):(
            <div>
              <div className="uc-left">
                <img className="img-avater" src={this.state.userInfo.avater?(this.state.userInfo.avater):(this.state.host+'/upload/avater_boy.png')} alt=""/>
                <div className="left-text"><p><span className="name-span">{this.state.userInfo.real_name?(this.state.userInfo.real_name):(this.state.userInfo.user_name)}</span></p>
                  <ul className="left-ul"><li className="left-li">
                    <span className="num-text">{this.state.userInfo.following}</span><br/><span className="text-span">关注</span>
                  </li><li  className="left-li">
                    <span className="num-text">{this.state.userInfo.follower}</span><br/><span className="text-span">关注者</span>
                  </li>
                  </ul>
                </div>
              </div>
              <div className="uc-right">
                {
                  this.state.userInfo.u_id===this.state.loginInfo.u_id?(''):(
                    <div className="button-wrap">
                      {
                        this.state.userInfo.hasFollowed === 0?(
                          <Button onClick={this.follow}>关注</Button>
                        ):(
                          <Button onClick={this.follow}>已关注</Button>
                        )
                      }
                    </div>
                  )
                }
              </div>
            </div>
          )}

        </div>
        <div className="article-content-list">
          <ul className="blog-ul" >
            {this.state.blogList === ''?(
              <Skeleton active />
            ):(
              this.state.blogList.length === 0?(
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
              ):(
                this.state.blogList.map((item, index) => {
                    return (<li key={index} className="li-wrap" >
                        <div className="li-top">
                          <span>{item.real_name?(item.real_name):(item.user_name)}</span>・
                          <span>{item.tag_name}</span>・
                          <span>{window.$utils.goodTime(item.create_time / 1000)}</span>
                        </div>
                        <div className="tc-content" onClick={this.goDetail.bind(this, item)}>
                          <div className="li-title">{item.article_title}</div>
                          <div className="li-content">{item.article_text}</div>
                        </div>
                        {/*<div dangerouslySetInnerHTML = {{ __html:item.article_content }}></div>*/}
                      </li>
                    )
                  }
                )
              )
            )}
          </ul>
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