import React from 'react'
import {Spin,Button,message,Modal} from 'antd'
import Cookies from 'js-cookie'
import LoginModal from '../components/loginModal'
import {NavLink} from 'react-router-dom'
import { connect } from 'react-redux';
import {getBlogerInfo} from "../redux/middlewares/api";



import '../themes/user/user.scss'

class User extends React.Component{
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
  componentWillReceiveProps(nextProps){
    let key = nextProps.match.params.u_id;
    this.getBlogList(key)
    //this.getUserBasicInfo(key)
  }
  componentWillMount(){
    console.log(this.props)
    const params = {
      u_id:this.props.match.params.u_id,
      token:Cookies.get('loginInfo')?JSON.parse(Cookies.get('loginInfo')).token:''
    }
    this.props.getBlogerInfo(params)
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
    let key = this.props.match.params.u_id
    //this.getUserBasicInfo(key)
  }
  getBlogList(params){
    fetch.get("getArticle",{
      u_id:params,
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
        f_id:this.props.state.userInfo.blogerInfo.u_id,
        token:JSON.parse(Cookies.get('loginInfo')).token
      }).then(res=>{
        if(res.code==='200'){
          let i = 0
          let userInfo = this.props.state.userInfo.blogerInfo
          if(this.props.state.userInfo.blogerInfo.hasFollowed === 0){
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
  getUserBasicInfo(params){
    fetch.get("getUserBasicInfo",{
      u_id:params,
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
  goFollow(params){
    if(params === 1) {
      this.props.history.push('/user/' + this.props.state.userInfo.blogerInfo.u_id + '/follows')
    }else{
      this.props.history.push('/user/' + this.props.state.userInfo.blogerInfo.u_id + '/followees')
    }
  }
  render(){
    return(
      <div className="userComponent-wrap">
        <div className="userInfo-content">
          {this.props.state.userInfo.blogerInfo===''?(
            <div>
              <Spin delay={'1000'} />
            </div>
          ):(
            <div>
              <div className="uc-left">
                <img className="img-avater" src={this.props.state.userInfo.blogerInfo.avater?(this.props.state.userInfo.blogerInfo.avater):(this.state.host+'/upload/avater_boy.png')} alt=""/>
                <div className="left-text"><p><span className="name-span">{this.props.state.userInfo.blogerInfo.real_name?(this.props.state.userInfo.blogerInfo.real_name):(this.props.state.userInfo.blogerInfo.user_name)}</span></p>
                  <ul className="left-ul"><li className="left-li" onClick={this.goFollow.bind(this,1)}>
                    <span className="num-text">{this.props.state.userInfo.blogerInfo.following}</span><br/><span className="text-span">关注</span>
                  </li><li  className="left-li" onClick={this.goFollow.bind(this,2)}>
                    <span className="num-text">{this.props.state.userInfo.blogerInfo.follower}</span><br/><span className="text-span">关注者</span>
                  </li>
                  </ul>
                </div>
              </div>
              <div className="uc-right">
                {
                  this.props.state.userInfo.blogerInfo.u_id===this.state.loginInfo.u_id?(''):(
                    <div className="button-wrap">
                      {
                        this.props.state.userInfo.blogerInfo.hasFollowed === 0?(
                          <Button className={'noFollow noFollow'} onClick={this.follow}>关注</Button>
                        ):(
                          <Button className={'btn-usual hasFollowed'} onClick={this.follow}>已关注</Button>
                        )
                      }
                    </div>
                  )
                }
              </div>
            </div>
          )}

        </div>
        <div className="tab-wrap">
          <ul className="tab-ul">
            <li className="tab-li"><NavLink exact to={this.props.match.url}>文章</NavLink></li>
            <li className="tab-li"><NavLink exact to={this.props.match.url+'/tags'}>标签</NavLink></li>
            <li className="tab-li"><NavLink to={this.props.match.url+'/collections'}>收藏</NavLink></li>
            <li className="tab-li"><NavLink to={this.props.match.url+'/follows'}>关注</NavLink></li>
            <li className="tab-li"><NavLink to={this.props.match.url+'/followees'}>关注者</NavLink></li>
          </ul>
        </div>
        <div>
          {this.props.children}
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

const mapStatetoProps = (state)=>{
  return {state}
}
const actionCreators = {getBlogerInfo}
export default connect(
  mapStatetoProps,actionCreators
)(User)