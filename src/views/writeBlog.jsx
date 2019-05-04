import React from 'react'
import 'braft-editor/dist/index.css'
import '../themes/article/writeBlog.scss'
import BraftEditor from 'braft-editor'
import { Form, Input,Select, Button, message } from 'antd'
const { Option } = Select;

class WriteBlog extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      tagList:[]
    }
  }
  componentDidMount () {
    this.getTagList()
    // 异步设置编辑器内容
    setTimeout(() => {
      this.props.form.setFieldsValue({
        content: BraftEditor.createEditorState('<p>Hello <b>World!</b></p>')
      })
    }, 1000)
  }

  handleSubmit = (event) => {

    event.preventDefault()
    this.props.form.validateFields((error, values) => {
      if (!error) {
        const submitData = {
          u_id:'1',
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
    fetch.get('getTagList',{
      u_id:'1'
    }).then(res=>{
      this.setState({
        tagList:res.data
      })
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
                placeholder="请输入正文内容"
              />
            )}
          </Form.Item>
          <Form.Item>
            <Button size="large" type="primary" htmlType="submit">发布</Button>
          </Form.Item>
        </Form>
      </div>
    )
  }
}

export default Form.create()(WriteBlog)