import React from 'react'
import '../themes/index/index.scss'
import Cookies from 'js-cookie'
import {Skeleton,Empty} from 'antd'

export default class BlogIndexComponent extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      blogList:'',
      loginInfo:''
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
    this.getBlogList()
  }
  getBlogList(){
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
  render(){
    return(
      <div >
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
                        <span className="to-user-btn" onClick={this.goUser.bind(this, item)}>{item.real_name?(item.real_name):(item.user_name)}</span>・
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