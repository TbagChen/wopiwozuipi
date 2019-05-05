import React from 'react'
import '../themes/article/blogDetail.scss'

export default class BlogDetail extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      articleDetail:''
    }
  }
  componentWillMount(){
    console.log(this.props)
    this.getArticleDetail()
  }
  getArticleDetail(){
    fetch.get('getArticleById',{
      id:this.props.match.params.article_id
    }).then(res=>{
      console.log(res)
      this.setState({
        articleDetail:res.data
      })
    })
  }
  test(){
    console.log('12341')
  }
  render(){
    return(
      <div className="blogDetail-wrap">
        <div className="author-wrap">
          <div className="author-left">
            <img className="img-avater" src="http://localhost:3003/upload/avater_boy.png" alt=""/>
            <p className="text-wrap">
              <span className="name-span">{this.state.articleDetail.real_name?this.state.articleDetail.real_name:this.state.articleDetail.user_name}</span><br/>
              <span className="time-span">{window.$utils.formatDate(this.state.articleDetail.create_time,'TYMD')}</span>
            </p>
          </div>
        </div>
        <div className="content-wrap">
          <div className="title">{this.state.articleDetail.article_title}</div>
          <div className="article-content" dangerouslySetInnerHTML = {{ __html:this.state.articleDetail.article_content }}></div>
        </div>
      </div>
    )
  }
}