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
    axios.get('https://blog.xuweijin.com/blogApi/article/getArticle?u_id=1').then((res)=>{
      this.setState({
        blogList:res.data.data
      })
    })
  }
  render(){
    return(
      <div>
        这里是鲨鱼辣椒 <br/>
        快来<NavLink to={'/register'}>加入我们</NavLink>吧！
        <ul>
          {
            this.state.blogList.map((item,index) =>{
              return (<li key={index}>
                  <p>{item.article_title}</p>
                  <p>{item.article_text}</p>
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }
}