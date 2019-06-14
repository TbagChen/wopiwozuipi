import React from 'react'
import {Empty,Skeleton,Spin} from 'antd'

export default class Tags extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      blogList:'',
      userInfo:'',
      host:'',
      tagsList:'',
      loginInfo:'',
      modalVisible:false,
      selectTag:''
    }
    //this.handleCancel = this.handleCancel.bind(this)
    this.getBlogList = this.getBlogList.bind(this)
    this.getTagsList = this.getTagsList.bind(this)
  }
  componentWillMount(){
    this.getBlogList()
    this.getTagsList()
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
  getBlogList(params){
    fetch.get("getArticleByTags",{
      id:params,
    }).then(res=>{
      this.setState({
        blogList:res.data
      })
    })
  }
  goDetail(params){
    this.props.history.push('/blogDetail/'+params.id)
  }
  getTagsList(){
    fetch.get("getTagList",{
      u_id:this.props.match.params.u_id,
    }).then(res=>{
      this.setState({
        tagsList:res.data
      })
      if(res.data.length !== 0){
        this.setState({
          selectTag:res.data[0].id
        })
        this.getBlogList(res.data[0].id)
      }
    })
  }
  changeTag(params){
    this.setState({
      selectTag:params.id
    })
    this.getBlogList(params.id)
  }
  render(){
    return(
      <div className="tags-wrap">
        <div className="tags-content">
          <ul className="tags-ul">
            {
              this.state.tagsList === ''?(
                <Spin delay={'1000'} />
              ):(
                this.state.tagsList.length === 0?(
                  <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                ):(
                  this.state.tagsList.map((item,index)=>{
                    return(
                      <li key={index} className={['tags-li',item.id===this.state.selectTag?'active':''].join(' ')} onClick={this.changeTag.bind(this,item)}>
                        {item.name}・({item.article_count}篇)
                      </li>
                    )
                  })
                )
              )
            }
          </ul>
        </div>
        {
          this.state.tagsList.length>0 &&
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
        }
      </div>
    )
  }
}