import React from 'react'
import {NavLink} from 'react-router-dom'
import axios from 'axios'

export default class BlogIndexComponent extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      blogList:[]
    }
  }
  componentDidMount(){
    this.getBlogList()
  }
  getBlogList(){
    /*axios.get('http://localhost:3003/article/getArticle?u_id=1').then((res)=>{
      this.setState({
        blogList:res.data.data
      })
    })*/
    fetch.get("getArticle",{
      u_id:'1'
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
        <ul>
          {
            this.state.blogList.map((item,index) =>{
              return (<li key={index} className="li-wrap">
                  <p>{item.article_title}</p>
                  <div dangerouslySetInnerHTML = {{ __html:item.article_content }}></div>
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }
}