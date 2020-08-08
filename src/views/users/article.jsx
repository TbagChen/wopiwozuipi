import React from 'react'
import {Empty,Skeleton,message,Modal,Button} from 'antd'
import Cookies from 'js-cookie'
import utils  from '../../utils'
const confirm = Modal.confirm;
export default class Articles extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      blogList:'',
      userInfo:'',
      host:'',
      loginInfo:'',
      modalVisible:false
    }
    //this.handleCancel = this.handleCancel.bind(this)
    this.getBlogList = this.getBlogList.bind(this)
  }
  componentDidMount(){
    this.getBlogList()
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
  goDetail(params){
    this.props.history.push('/blogDetail/'+params.id)
  }
  deleteArticle(params){
    let that = this
    confirm({
      title: '确认删除此文章吗?',
      content: '删除后不可恢复',
      centered:true,
      okText: '确认',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        fetch.post("deleteArticle",{
          id:params.id,
          token:that.state.loginInfo.token
        }).then(res=>{
          if(res.code === '200'){
            message.success('删除成功～')
            that.getBlogList()
          }else{
            message.info(res.msg)
          }
        })
      },
      onCancel() {
      },
    });
  }
  editArticle(params){
    this.props.history.push('/writeBlog?id='+params.id)
  }
  render(){
    return(
      <div className="article-wrap">
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
                          <div className="l-t-l">
                            <img className="img-avater" src={item.avater?(item.avater):(this.state.host+'/upload/avater_boy.png')} alt=""/>
                          </div>
                          <div className="l-t-m">
                            <span>{item.real_name?(item.real_name):(item.user_name)}</span>・
                            <span>{item.tag_name}</span>・
                            <span>{window.$utils.goodTime(item.create_time / 1000)}</span>
                          </div>
                        </div>
                        <div className="tc-content" onClick={this.goDetail.bind(this, item)}>
                          <div className="li-title">{item.article_title}</div>
                          <div className="li-content">{item.article_text}</div>
                        </div>
                        <div className="tc-bottom">
                          {
                            (this.state.loginInfo&&this.state.loginInfo.u_id === this.props.match.params.u_id)&&(
                              <div className="tc-bottom-wrap">
                                <Button size={'small'} onClick={this.deleteArticle.bind(this,item)}>删除</Button>
                                <Button className={'edit-button'} size={'small'} onClick={() => this.editArticle(item)}>编辑</Button>
                              </div>
                            )
                          }
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
      </div>
    )
  }
}