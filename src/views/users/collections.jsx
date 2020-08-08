import React from 'react'
import {Empty,Skeleton} from 'antd'

export default class Collections extends React.Component{
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
  }
  getBlogList(){
    fetch.get("getCollection",{
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
  goUser(params){  // 去用户个人信息页面
    this.props.history.push('/user/'+params.u_id)
  }
  render(){
    return(
      <div className="collections-wrap">
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
                            <span className="name-span" onClick={this.goUser.bind(this,item)}>{item.real_name?(item.real_name):(item.user_name)}</span>・
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