import React from 'react'
import '../themes/article/blogDetail.scss'
import {Spin,Button,message,Modal} from 'antd'
import Cookies from 'js-cookie'
import LoginModal from '../components/loginModal'



export default class BlogDetail extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      articleDetail:'',
      host:'',
      hasFollowed:0,
      loginInfo:'',
      modalVisible:false
    }
    this.follow = this.follow.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
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
  follow(){
    if(this.state.loginInfo === ''){
      this.setState({
        modalVisible:true
      })
    }else{
      fetch.post('follow',{
        u_id:this.state.loginInfo.u_id,
        f_id:this.state.articleDetail.u_id
      }).then(res=>{
        if(res.code=='200'){
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
                {
                  this.state.articleDetail.u_id==this.state.loginInfo.u_id?(''):(
                    <div>
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