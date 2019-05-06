import React from 'react'
import '../themes/article/blogDetail.scss'
import {Spin} from 'antd'

export default class BlogDetail extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      articleDetail:'',
      host:''
    }
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
    this.getArticleDetail()
  }
  getArticleDetail(){
    fetch.get('getArticleById',{
      id:this.props.match.params.article_id
    }).then(res=>{
      console.log(res)
      setTimeout(()=>{
        console.log(this.state.host)
      },1000)

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
        {this.state.articleDetail===''?(
          <div className="load-wrap"><Spin size="large" /></div>
        ):(
          <div>
            <div className="author-wrap">
              <div className="author-left">
                <img className="img-avater" src={this.state.articleDetail.avater?(this.state.host+this.state.articleDetail.avater):(this.state.host+'/upload/avater_boy.png')} alt=""/>
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
        )}

      </div>
    )
  }
}