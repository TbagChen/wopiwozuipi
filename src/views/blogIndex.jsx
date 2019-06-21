import React from 'react'
import '../themes/index/index.scss'
import Cookies from 'js-cookie'
import {Skeleton,Empty,Popover,Spin,Button,message} from 'antd'
import { connect } from 'react-redux';
import {getBlogList} from "../redux/middlewares/api";




class BlogIndexComponent extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      blogList:'',
      loginInfo:'',
      hoverUserInfo:'',
    }
    this.goDetail = this.goDetail.bind(this)
    this.goUser = this.goUser.bind(this)
  }
  componentDidMount(){
    if(Cookies.get('loginInfo')){
      this.setState({
        loginInfo:JSON.parse(Cookies.get('loginInfo'))
      })
    }
    console.log(this.props.userInfo.userInfo)
    //this.getBlogList1()
    //const action = getBlogList()
    this.props.getBlogList().then(res=>{
      //console.log(res)
    })
  }
  getBlogList1(){
    /*axios.get('http://localhost:3003/article/getArticle?u_id=1').then((res)=>{
      this.setState({
        blogList:res.data.data
      })
    })*/
    fetch.get("getArticle",{
      u_id:'',
      //token:JSON.parse(Cookies.get('loginInfo')).token||'',
    }).then(res=>{
      this.setState({
        blogList:res.data
      })
    })
  }
  goDetail(params){
    this.props.history.push('/blogDetail/'+params.id)
  }
  goUser(params){
    this.props.history.push('/user/'+params.u_id)
  }
  getHoverUser(params){  //获取鼠标悬停的用户信息
    this.setState({
      hoverUserInfo:''
    })
    fetch.get("getUserBasicInfo",{
      u_id:params.u_id,
      token:Cookies.get('loginInfo')?JSON.parse(Cookies.get('loginInfo')).token:''
    }).then(res=>{
      this.setState({
        hoverUserInfo:res.data
      })
    })
  }
  follow(){
    if(this.state.loginInfo === ''){
      message.info('请先登录～')
    }else{
      fetch.post('follow',{
        u_id:this.state.loginInfo.u_id,
        f_id:this.state.hoverUserInfo.u_id,
        token:JSON.parse(Cookies.get('loginInfo')).token
      }).then(res=>{
        if(res.code==='200'){
          let i = 0
          let hoverUserInfo = this.state.hoverUserInfo
          if(this.state.hoverUserInfo.hasFollowed === 0){
            i = 1
            message.success('关注成功～')
            hoverUserInfo.follower ++
          }else{
            i = 0
            message.success('取关成功～')
            hoverUserInfo.follower --
          }

          hoverUserInfo.hasFollowed = i
          this.setState({
            hoverUserInfo:hoverUserInfo
          })

        }
      })
    }
  }
  addIdF(){
  }
  render(){
    console.log(this.props)
    const content = (
      <div>
        {
          this.state.hoverUserInfo === ''?(
            <div style={{width:'200px',height:'100px',textAlign: 'center',lineHeight:'100px'}}><Spin></Spin></div>
            ):(
            <div className={'pop-user-wrap'}>
              <div className="top">
                <div className="top-left"><img className="img-avater" src={this.state.hoverUserInfo.avater?(this.state.hoverUserInfo.avater):(this.props.host.host+'/upload/avater_boy.png')} alt="用户头像"/></div>
                <div className="top-right">{this.state.hoverUserInfo.real_name}</div>
              </div>
              <div className="bottom">
                <ul className="left-ul"><li className="left-li">
                    <span className="num-text">{this.state.hoverUserInfo.following}</span><br/><span className="text-span">关注</span>
                  </li><li  className="left-li">
                    <span className="num-text">{this.state.hoverUserInfo.follower}</span><br/><span className="text-span">关注者</span>
                  </li>
                </ul>
                {
                  this.state.hoverUserInfo.u_id===this.state.loginInfo.u_id?(''):(
                    <div className="button-wrap">
                      {
                        this.state.hoverUserInfo.hasFollowed === 0?(
                          <Button size={'small'} className={'btn-usual noFollow'} onClick={this.follow.bind(this)}>关注</Button>
                        ):(
                          <Button size={'small'} className={'btn-usual hasFollowed'} onClick={this.follow.bind(this)}>已关注</Button>
                        )
                      }
                    </div>
                  )
                }
              </div>


            </div>
          )
        }
      </div>
    )
    return(
      <div >
        {/*<div><button onClick={this.addIdF.bind(this)}>添加state</button></div>
        u_id:{this.props.userInfo.id}*/}
        <ul className="blog-ul" >
          {this.props.blogList === ''?(
            <Skeleton active />
          ):(
            this.props.blogList === 0?(
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            ):(
              this.props.blogList.map((item, index) => {
                  return (<li key={index} className="li-wrap" >
                      <div className="li-top">
                        <Popover content={content}>
                          <span className="to-user-btn" onMouseEnter={this.getHoverUser.bind(this,item)} onClick={this.goUser.bind(this, item)}>{item.real_name?(item.real_name):(item.user_name)}</span>・
                        </Popover>
                        <span>{item.tag_name}</span>・
                        <span>{window.$utils.goodTime(item.create_time / 1000)}</span>
                        <div className="comment-wrap">评论数：{item.comment_count}</div>
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
        {/*{this.props.children}*/}
      </div>
    )
  }
}
const mapStatetoProps = (state)=>{
  return {blogList:state.blog.blogList,userInfo:state.userInfo,host:state.host}
}
const actionCreators = {getBlogList}
export default connect(
  mapStatetoProps,actionCreators
)(BlogIndexComponent)