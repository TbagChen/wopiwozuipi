import React from 'react'
import {NavLink} from 'react-router-dom'
import axios from 'axios'
import '../themes/index/index.scss'
import Cookies from 'js-cookie'

export default class BlogIndexComponent extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      blogList:[],
      loginInfo:''
    }
  }
  componentDidMount(){
    this.setState({
      loginInfo:JSON.parse(Cookies.get('loginInfo'))||''
    })
    console.log(this.state.loginInfo)
    this.getBlogList()
  }
  getBlogList(){
    /*axios.get('http://localhost:3003/article/getArticle?u_id=1').then((res)=>{
      this.setState({
        blogList:res.data.data
      })
    })*/
    fetch.get("getArticle",{
      u_id:''
    }).then(res=>{
      this.setState({
        blogList:res.data
      })
    })
  }
  render(){
    return(
      <div>
        这里是鲨鱼辣椒 <br/>
        快来<NavLink to={'/register'}>加入我们</NavLink>吧！
        <h3><NavLink to={'/writeBlog'}>我要去写博客！</NavLink></h3>
        <ul className="blog-ul">
          {
            this.state.blogList.map((item,index) =>{
              return (<li key={index} className="li-wrap">
                  <div className="li-top">
                    <span>{item.user_name}</span>・
                    <span>{item.tag_name}</span>・
                    <span>{window.$utils.goodTime(item.create_time/1000)}</span>
                  </div>
                  <div className="li-title">{item.article_title}</div>
                  <div className="li-content">{item.article_text}</div>
                  {/*<div dangerouslySetInnerHTML = {{ __html:item.article_content }}></div>*/}
                </li>
              )
            })
          }
        </ul>
        {this.props.children}
      </div>
    )
  }
}