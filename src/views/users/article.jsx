import React from 'react'
import {Empty,Skeleton,Spin,Button,message,Modal} from 'antd'

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
  componentWillMount(){
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