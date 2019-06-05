import React from 'react'
import '../themes/article/blogDetail.scss'
import {Spin,Button,message,Modal,Icon,Input} from 'antd'
import Cookies from 'js-cookie'
import LoginModal from '../components/loginModal'
import 'braft-editor/dist/index.css'
const { TextArea } = Input;
const confirm = Modal.confirm;




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
      replyContent1:'',
      replyList:[],
    }
    this.follow = this.follow.bind(this)
    this.collection = this.collection.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.replyArticle = this.replyArticle.bind(this)
    this.changeText = this.changeText.bind(this)
    this.changeText1 = this.changeText1.bind(this)
    this.deleteComment = this.deleteComment.bind(this)
    this.cancelReplyArticle = this.cancelReplyArticle.bind(this)
    this.replyComment = this.replyComment.bind(this)
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
  changeText1(e){
    this.setState({
      replyContent1:e.target.value
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
      if(res.code==='200'){
        res.data.forEach((item,index)=>{
          item.showReply = false
          item.child.forEach((option,index)=>{
            option.showReply = false
          })
        })
        this.setState({
          replyList:res.data,
        })
      }else{
        message.info(res.msg)
      }

    })
  }
  replyArticle(params,params2){
    console.log(params)
    console.log(params2)
    if(!Cookies.get('loginInfo')){
      this.setState({
        modalVisible:true
      })
      return
    }
    let content = '',
      parent_id = '',
      res_u_id = ''
    if(params){
      content = this.state.replyContent1
      parent_id = params.id
      res_u_id = params.u_id
    }else{
      content = this.state.replyContent
      res_u_id = this.state.articleDetail.u_id
    }
    if(params2){
      console.log(params2.id)
      parent_id = params2.id
    }
    if(content === ''){
      message.info('输入内容不能为空～')
    }else{
      fetch.post('commentSave',{
        u_id:this.state.loginInfo.u_id,
        content:content,
        parent_id:parent_id,
        res_u_id:res_u_id,
        article_id:this.state.articleDetail.id,
        token:JSON.parse(Cookies.get('loginInfo')).token
      }).then(res=>{
        console.log(res)
        if(res.code==='200'){
          message.success('回复成功～')
          this.setState({
            replyContent:'',
            replyContent1:''
          })
          this.getCommentList()
        }else{
          message.info(res.msg)
        }
      })
    }
  }
  deleteComment(params){
    const that = this
    confirm({
      title: '确认删除此回复吗?',
      content: '删除后不可恢复！',
      okText: '确认',
      centered:true,
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        fetch.post('deleteComment',{
          id:params.id,
          token:JSON.parse(Cookies.get('loginInfo')).token
        }).then(res=>{
          if(res.code === '200'){
            message.success('删除成功～')
            that.getCommentList()
          }else{
            message.error(res.msg)
          }
        })
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }
  replyComment(params){   //回复评论
    if(!Cookies.get('loginInfo')){
      this.setState({
        modalVisible:true
      })
      return
    }
    this.setState({
      replyContent1:''
    })
    this.state.replyList.forEach((item,index)=>{
      if(item.id == params.id){
        item.showReply = !item.showReply
      }else{
        item.showReply = false
      }
      item.child.forEach((option,index)=>{
        if(option.id == params.id){
          option.showReply = !option.showReply
        }else{
          option.showReply = false
        }
      })
    })
    this.setState({
      replyList:this.state.replyList
    })
  }
  cancelReplyArticle(){  //取消回复
    this.state.replyList.forEach((item,index)=>{
      item.showReply = false
      item.child.forEach((option,index)=>{
        option.showReply = false
      })
    })
    this.setState({
      replyList:this.state.replyList
    })
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
                <div className="button-wrap"><Button onClick={this.replyArticle.bind(this,'','')} size={'small'} type="primary">回复</Button></div>
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
                            {!Cookies.get('loginInfo')||JSON.parse(Cookies.get('loginInfo')).u_id !== item.u_id?"":(
                              <div className="delete-wrap" onClick={this.deleteComment.bind(this,item)}>删除</div>
                            )}
                            <span className="reply-btn" onClick={this.replyComment.bind(this,item)}>回复</span>
                          </div>
                        </div>
                        {item.showReply &&
                        <div className="reply-r-wrap">
                          <TextArea autosize={{ minRows: 1, maxRows: 6 }} value={this.state.replyContent1} onChange={this.changeText1} placeholder={'回复'+item.real_name}/>
                          <div className="button-wrap">
                            <Button onClick={this.cancelReplyArticle} className={'cancel-btn'} size={'small'}>取消</Button>
                            <Button onClick={this.replyArticle.bind(this,item,'')} size={'small'} type="primary">回复</Button>
                          </div>
                        </div>
                        }
                        {
                          item.child.length>0 &&
                          <ul className="reply-r-ul">
                            {item.child.map((option,index)=>{
                              return(
                                <li className="reply-li reply-r-ul-li" key={index}>
                                  <div className="li-left">
                                    <img className="img-avater" src={option.avater?(option.avater):(this.state.host+'/upload/avater_boy.png')} alt=""/>
                                  </div>
                                  <div className="li-right">
                                    <div className="l-r-top">{option.real_name?option.real_name:option.user_name}</div>
                                    <div className="l-r-top">回复 <span className="reply-name">{option.res_real_name}</span>：{option.content}</div>
                                    {/*<div className="content">{option.content}</div>*/}
                                    <div className="l-r-bottom">
                                      {window.$utils.goodTime(option.create_time/1000)}
                                      <div className="l-r-b-right">
                                        {!(Cookies.get('loginInfo')&&JSON.parse(Cookies.get('loginInfo')).u_id === option.u_id)?"":(
                                          <div className="delete-wrap" onClick={this.deleteComment.bind(this,option)}>删除</div>
                                        )}
                                        <span className="reply-btn" onClick={this.replyComment.bind(this,option)}>回复</span>
                                      </div>
                                    </div>
                                    {option.showReply &&
                                    <div className="reply-r-wrap reply-r-wrap-s">
                                      <TextArea autosize={{ minRows: 1, maxRows: 6 }} value={this.state.replyContent1} onChange={this.changeText1} placeholder={'回复'+option.real_name}/>
                                      <div className="button-wrap">
                                        <Button onClick={this.cancelReplyArticle} className={'cancel-btn'} size={'small'}>取消</Button>
                                        <Button onClick={this.replyArticle.bind(this,option,item)} size={'small'} type="primary">回复</Button>
                                      </div>
                                    </div>
                                    }
                                  </div>

                                </li>
                              )
                            })}
                          </ul>
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