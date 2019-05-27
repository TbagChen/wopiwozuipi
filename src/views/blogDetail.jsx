import React from 'react'
import '../themes/article/blogDetail.scss'
import {Spin,Button,message,Modal,Icon,Input} from 'antd'
import Cookies from 'js-cookie'
import LoginModal from '../components/loginModal'
import 'braft-editor/dist/index.css'
const { TextArea } = Input;



export default class BlogDetail extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      articleDetail:'',
      host:'',
      hasFollowed:0,
      loginInfo:'',
      modalVisible:false,
      replyContent:'',
      replyList:[],
    }
    this.follow = this.follow.bind(this)
    this.collection = this.collection.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.replyArticle = this.replyArticle.bind(this)
    this.changeText = this.changeText.bind(this)
    this.deleteComment = this.deleteComment.bind(this)
  }
  componentWillMount(){
    console.log(this.props)
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
    this.getArticleDetail()
    this.getCommentList()
  }
  changeText(e){
    this.setState({
      replyContent:e.target.value
    })
  }
  getArticleDetail(){
    fetch.get('getArticleById',{
      id:this.props.match.params.article_id,
      u_id:Cookies.get('loginInfo')?JSON.parse(Cookies.get('loginInfo')).u_id:''
    }).then(res=>{
      console.log(res)
      setTimeout(()=>{
        console.log(this.state.host)
      },1000)

      this.setState({
        articleDetail:res.data,
        hasFollowed:res.data.hasFollowed
      })
    })
  }
  test(){
    console.log('12341')
  }
  handleCancel(){
    console.log('124141245')
    if(Cookies.get('loginInfo')){
      this.setState({
        loginInfo:JSON.parse(Cookies.get('loginInfo'))
      })
    }
    this.setState({
      modalVisible:false,
    })
  }
  collection(){
    if(this.state.loginInfo === ''){
      this.setState({
        modalVisible:true
      })
    }else {
      fetch.post('collectActicle', {
        token: JSON.parse(Cookies.get('loginInfo')).token,
        article_id: this.state.articleDetail.id
      }).then(res => {
        if (res.code === '200') {
          let i = 0
          let articleDetail = this.state.articleDetail
          if (this.state.articleDetail.hasCollect === 0) {
            i = 1
            message.success('收藏成功～')
          } else {
            i = 0
            message.success('已取消收藏～')
          }
          articleDetail.hasCollect = i
          this.setState({
            articleDetail: articleDetail
          })
        }
      })
    }
  }
  follow(){
    if(this.state.loginInfo === ''){
      this.setState({
        modalVisible:true
      })
    }else{
      fetch.post('follow',{
        u_id:this.state.loginInfo.u_id,
        f_id:this.state.articleDetail.u_id,
        token:JSON.parse(Cookies.get('loginInfo')).token
      }).then(res=>{
        if(res.code==='200'){
          let i = 0
          if(this.state.hasFollowed === 0){
            i = 1
            message.success('关注成功～')
          }else{
            i = 0
            message.success('取关成功～')
          }
          this.setState({
            hasFollowed:i
          })

        }
      })
    }
  }
  getCommentList(){
    fetch.get('getCommentList',{
      article_id:this.props.match.params.article_id,
    }).then(res=>{
      console.log(res)
      setTimeout(()=>{
        console.log(this.state.host)
      },1000)

      this.setState({
        replyList:res.data,
      })
    })
  }
  replyArticle(){
    console.log(this.state.replyContent)
    if(!Cookies.get('loginInfo')){
      this.setState({
        modalVisible:true
      })
      return
    }
    if(this.state.replyContent === ''){
      message.info('输入内容不能为空～')
    }else{
      fetch.post('commentSave',{
        u_id:this.state.loginInfo.u_id,
        content:this.state.replyContent,
        parent_id:'',
        article_id:this.state.articleDetail.id,
        token:JSON.parse(Cookies.get('loginInfo')).token
      }).then(res=>{
        if(res.code==='200'){
          message.success('回复成功～')
          this.setState({
            replyContent:''
          })
          this.getCommentList()
        }else{
          message.success(res.msg)
        }
      })
    }
  }
  deleteComment(params){
    fetch.post('deleteComment',{
      id:params.id,
      token:JSON.parse(Cookies.get('loginInfo')).token
    }).then(res=>{
      if(res.code === '200'){
        message.success('删除成功～')
        this.getCommentList()
      }else{
        message.error(res.msg)
      }
    })
  }
  replyComment(params){   //回复评论

  }
  render(){
    return(
      <div className="blogDetail-wrap">
        {this.state.articleDetail===''?(
          <div className="load-wrap"><Spin size="large" /></div>
        ):(
          <div>
            <div className="author-wrap">
              <div className="author-left">
                <img className="img-avater" src={this.state.articleDetail.avater?(this.state.articleDetail.avater):(this.state.host+'/upload/avater_boy.png')} alt=""/>
                <p className="text-wrap">
                  <span className="name-span">{this.state.articleDetail.real_name?this.state.articleDetail.real_name:this.state.articleDetail.user_name}</span><br/>
                  <span className="time-span">{window.$utils.formatDate(this.state.articleDetail.create_time,'TYMD')}</span>
                </p>
              </div>
              <div className="author-right">
                <div className="collect-wrap" onClick={this.collection}>
                  {this.state.articleDetail.hasCollect===0?(<Icon type="star"  style={{ color: '#ddd',fontSize:'20px' }}/>):(<Icon type="star" theme="filled"  style={{ color: '#1890ff' ,fontSize:'20px' }}/>)}
                </div>
                {
                  this.state.articleDetail.u_id===this.state.loginInfo.u_id?(''):(
                    <div className="follow-wrap">
                      {
                        this.state.hasFollowed === 0?(
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
            <div className="content-wrap">
              <div className="title">{this.state.articleDetail.article_title}</div>
              <div className="article-content" dangerouslySetInnerHTML = {{ __html:this.state.articleDetail.article_content }}></div>
            </div>
            <div className="reply-wrap">
              <div className="textarea-wrap">
                <TextArea autosize={{ minRows: 1, maxRows: 6 }} value={this.state.replyContent} onChange={this.changeText} placeholder={'想对作者说些什么？'}/>
                <div className="button-wrap"><Button onClick={this.replyArticle} size={'small'} type="primary">回复</Button></div>
              </div>
              <div className="reply-ul">
                {this.state.replyList.map((item,index)=>{
                  return(
                    <li className="reply-li" key={index}>
                      <div className="li-left">
                        <img className="img-avater" src={item.avater?(item.avater):(this.state.host+'/upload/avater_boy.png')} alt=""/>
                      </div>
                      <div className="li-right">
                        <div className="l-r-top">{item.real_name?item.real_name:item.user_name}</div>
                        <div className="content">{item.content}</div>
                        <div className="l-r-bottom">
                          {window.$utils.goodTime(item.create_time/1000)}
                          <div className="l-r-b-right">
                            {Cookies.get('loginInfo')&&JSON.parse(Cookies.get('loginInfo')).u_id !== item.u_id?"":(
                              <div className="delete-wrap" onClick={this.deleteComment.bind(this,item)}>删除</div>
                            )}
                            <span onClick={this.replyComment.bind(this,item)}>回复</span>
                          </div>
                        </div>
                        {true &&
                        <div>
                          <TextArea autosize={{ minRows: 1, maxRows: 6 }} value={this.state.replyContent} onChange={this.changeText} placeholder={'回复'+item.user_name}/>
                          <div className="button-wrap"><Button onClick={this.replyArticle} size={'small'} type="primary">回复</Button></div>
                        </div>
                        }
                      </div>
                    </li>
                  )
                })}
              </div>
            </div>
          </div>
        )}
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