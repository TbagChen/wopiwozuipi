import React from 'react'
import Cookies from 'js-cookie'
import '../themes/article/writeBlog.scss'
import Editor from 'for-editor'
import { dropByCacheKey } from 'react-router-cache-route'
import { Form, Input,Select, Button, message, Modal,Upload,Icon } from 'antd'
import utils from "../utils";
//import BlogIndexComponent from "./blogIndex";
const { Option } = Select;
/*const options = {

}*/
class WriteBlog extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      tagList:[],
      visible:false,
      tagName:'',
      loginInfo:'',
      type:'create',
      editorState:'',
      editorValue:''
    }
    this.showModal = this.showModal.bind(this)
    this.handleOk = this.handleOk.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.onChange = this.onChange.bind(this)
    this.uploadHandler = this.uploadHandler.bind(this)
    this.beforeUpload = this.beforeUpload.bind(this)
  }
  componentDidMount () {
    if(utils.getUrlKey('id')){
      this.setState({
        type:'edit'
      })
      this.getArticleDetail(utils.getUrlKey('id'))
    }
    if(Cookies.get('loginInfo')){
      this.setState({
        loginInfo:JSON.parse(Cookies.get('loginInfo'))
      })
    }
    this.getTagList()
    // 异步设置编辑器内容
    /*this.props.form.setFieldsValue({
      content: BraftEditor.createEditorState('')
    })*/
    /*setTimeout(() => {
      this.props.form.setFieldsValue({
        content: BraftEditor.createEditorState('<p>Hello <b>World!</b></p>')
      })
    }, 1000)*/
  }

  handleSubmit = (event) => {
    event.preventDefault()
    if(this.state.editorValue == ''){
      message.warn('正文内容不能为空！')
      return;
    }
    this.props.form.validateFields((error, values) => {
      if (!error) {
        let submitData = {
          token:JSON.parse(Cookies.get('loginInfo')).token,
          type:this.state.type,
          u_id:this.state.loginInfo.u_id,
          article_title: values.title,
          article_tag_id:values.tag,
          article_text: this.state.editorValue, // or values.content.toHTML()
          article_content: this.state.editorValue // or values.content.toHTML()
        }
        if(this.state.type=='edit'){
          submitData.id = utils.getUrlKey('id')
        }
        fetch.post('publish',submitData).then(res=>{
          if(res.code === '200'){
            dropByCacheKey('BlogIndexComponent')
            this.props.history.push('/')
          }else{
            message(res.msg)
          }
        })
      }
    })

  }
  getArticleDetail(params){
    fetch.get('getArticleById',{
      id:params,
      u_id:Cookies.get('loginInfo')?JSON.parse(Cookies.get('loginInfo')).u_id:''
    }).then(res=>{
      this.props.form.setFieldsValue({
        title: res.data.article_title,
        tag: res.data.article_tag_id,
      })
      this.setState({
        editorValue:res.data.article_content
      })
      /*this.setState({
        articleDetail:res.data,
        hasFollowed:res.data.hasFollowed
      })*/
    })
  }
  getTagList(params){
    fetch.get('getTagList',{
      u_id:JSON.parse(Cookies.get('loginInfo')).u_id,
      token:JSON.parse(Cookies.get('loginInfo')).token
    }).then(res=>{
      this.setState({
        tagList:res.data
      })

        if(params){
          this.props.form.setFieldsValue({
            tag: params
          })
        }


    })
  }
  handleOk(){
    const _this = this
    if(this.state.tagName === ''){
      message.warn('标签名不能为空')
      return;
    }
    fetch.post('saveArticleTag',{
      name:this.state.tagName,
      u_id:this.state.loginInfo.u_id,
      token:JSON.parse(Cookies.get('loginInfo')).token
    }).then(res=>{
      if(res.code === '200'){
        message.success('添加成功')
        _this.getTagList(res.data.tag_id)

      }else{
        message(res.msg)
      }
    })
    this.setState({
      visible:false
    })
  }
  handleCancel(){
    this.setState({
      visible:false
    })
  }
  showModal(){
    this.setState({
      visible:true
    })
  }
  onChange(e){
    this.setState({
      tagName:e.target.value
    })
  }
  uploadHandler(params){
    fetch.get('getQiniuToken',{
      token:JSON.parse(Cookies.get('loginInfo')).token
    }).then(res=>{
      utils.uploadFile(params,res.data.qiniuToken).then(res=>{
        this.setState({
          imageUrl:'http://img.xuweijin.com/'+res
        })
        let str = this.state.editorValue + '![alt](http://img.xuweijin.com/'+res+')'
        this.setState({
          editorValue:str
        })
        /*this.props.form.validateFields((error, values) => {
          this.props.form.setFieldsValue({
            content: ContentUtils.insertMedias(values.content, [{
              type: 'IMAGE',
              url: 'http://img.xuweijin.com/'+res
            }])
          })
        })*/

      })
    })
  }
  beforeUpload(file){
    this.setState({
      fileobj:file
    })
  }
  handleChange(value){
    this.setState({
      editorValue:value
    })
  }
  render(){
    const { getFieldDecorator } = this.props.form

    //const controls = ['bold', 'italic', 'underline', 'text-color', 'separator', 'link', 'separator', 'media' ]
    return(
      <div className="writeBlog-wrap">
        <Form onSubmit={this.handleSubmit}>
          <Form.Item  label="文章标题">
            {getFieldDecorator('title', {
              rules: [{
                required: true,
                message: '请输入标题',
              }],
            })(
              <Input placeholder="请输入标题"/>
            )}
          </Form.Item>
          <Form.Item  label="文章标签">
            {getFieldDecorator('tag', {
              rules: [{
                required: true,
                message: '请选择一个标签',
              }],
            })(
              <Select placeholder="标签">
                {
                  this.state.tagList.map((item,index)=>{
                    return(<Option value={item.id} key={item.id}>{item.name}</Option>)
                  })
                }
              </Select>
            )}
            <Button onClick={this.showModal}>新增标签</Button>
          </Form.Item>
          <div className={'ant-form-item-label'}>
            <label style={{'lineHeight':'40px','color':'rgba(0,0,0,0.85)'}} htmlFor="tag" className="ant-form-item-required" title="文章内容">文章内容</label>
          </div>
          <Editor className="my-editor"
                  subfield = {true}
                  preview = {true}
                  addImg = {(file) => this.uploadHandler(file)}
                  value={this.state.editorValue} onChange={(value) => this.handleChange(value)} />
          <Form.Item className={'button-wrap'}>
            <Button size="large" type="primary" htmlType="submit">{this.state.type=='create'?'发布':'更新'}</Button>
          </Form.Item>
        </Form>
        <Modal
          title="请输入标签名"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Input  onChange={this.onChange}/>
        </Modal>
      </div>
    )
  }
}

export default Form.create()(WriteBlog)