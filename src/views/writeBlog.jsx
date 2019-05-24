import React from 'react'
import Cookies from 'js-cookie'
import 'braft-editor/dist/index.css'
import '../themes/article/writeBlog.scss'
import BraftEditor from 'braft-editor'
import { ContentUtils } from 'braft-utils'
import { Form, Input,Select, Button, message, Modal,Upload,Icon } from 'antd'
import utils from "../utils";
const { Option } = Select;
class WriteBlog extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      tagList:[],
      visible:false,
      tagName:'',
      loginInfo:'',
      editorState:''
    }
    this.showModal = this.showModal.bind(this)
    this.handleOk = this.handleOk.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.onChange = this.onChange.bind(this)
    this.uploadHandler = this.uploadHandler.bind(this)
    this.beforeUpload = this.beforeUpload.bind(this)
  }
  componentDidMount () {
    if(Cookies.get('loginInfo')){
      this.setState({
        loginInfo:JSON.parse(Cookies.get('loginInfo'))
      })
    }
    this.getTagList()
    // 异步设置编辑器内容
    this.props.form.setFieldsValue({
      content: BraftEditor.createEditorState('')
    })
    /*setTimeout(() => {
      this.props.form.setFieldsValue({
        content: BraftEditor.createEditorState('<p>Hello <b>World!</b></p>')
      })
    }, 1000)*/
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.props.form.validateFields((error, values) => {
      console.log(values)
      if (!error) {
        const submitData = {
          u_id:this.state.loginInfo.u_id,
          article_title: values.title,
          article_tag_id:values.tag,
          article_text: values.content.toText(), // or values.content.toHTML()
          article_content: values.content.toHTML() // or values.content.toHTML()
        }
        //console.log(values.tag)
        fetch.post('publish',submitData).then(res=>{
          console.log(res)
          if(res.code === '200'){
            this.props.history.push('/')
          }else{
            message(res.msg)
          }
        })
      }
    })

  }
  getTagList(){
    console.log(this)
    fetch.get('getTagList',{
      u_id:JSON.parse(Cookies.get('loginInfo')).u_id,
      token:JSON.parse(Cookies.get('loginInfo')).token
    }).then(res=>{
      this.setState({
        tagList:res.data
      })
    })
  }
  handleOk(){
    console.log(this)
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
        _this.getTagList()
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
  uploadHandler(){
    fetch.get('getQiniuToken').then(res=>{
      utils.uploadFile(this.state.fileobj,res.data.qiniuToken).then(res=>{
        console.log(res)
        this.setState({
          imageUrl:'http://pr42y3dpx.bkt.clouddn.com/'+res
        })
        this.props.form.validateFields((error, values) => {
          console.log(values.content)
          this.props.form.setFieldsValue({
            content: ContentUtils.insertMedias(values.content, [{
              type: 'IMAGE',
              url: 'http://pr42y3dpx.bkt.clouddn.com/'+res
            }])
          })
        })

      })
    })
  }
  beforeUpload(file){
    this.setState({
      fileobj:file
    })
  }
  render(){
    const { getFieldDecorator } = this.props.form
    const excludeControls = ['media','emoji']
    const extendControls = [
      {
        key: 'antd-uploader',
        type: 'component',
        component: (
          <Upload
            accept="image/*"
            showUploadList={false}
            beforeUpload={this.beforeUpload}
            customRequest={this.uploadHandler}
          >
            {/* 这里的按钮最好加上type="button"，以避免在表单容器中触发表单提交，用Antd的Button组件则无需如此 */}
            <button type="button" className="control-item button upload-button" data-title="插入图片">
              <Icon type="picture" theme="filled" />
            </button>
          </Upload>
        )
      }
    ]
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
          <Form.Item label="文章正文">
            {getFieldDecorator('content', {
              validateTrigger: 'onBlur',
              rules: [{
                required: true,
                validator: (_, value, callback) => {
                  if (value.isEmpty()) {
                    callback('请输入正文内容')
                  } else {
                    callback()
                  }
                }
              }],
            })(
              <BraftEditor
                className="my-editor"
                excludeControls={excludeControls}
                extendControls={extendControls}
                placeholder="请输入正文内容"
              />
            )}
          </Form.Item>
          <Form.Item>
            <Button size="large" type="primary" htmlType="submit">发布</Button>
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