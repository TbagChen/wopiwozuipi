import React from 'react'
import {NavLink} from 'react-router-dom'
import { message, Form, Icon, Input, Button,Layout, Menu ,Upload } from 'antd'
import axios from 'axios'
import '../themes/PersonalCenter/PersonalCenter.scss'
const { Header, Sider, Content, Footer } = Layout;


function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJPG = file.type === 'image/jpeg';
  if (!isJPG) {
    message.error('You can only upload JPG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJPG && isLt2M;
}



export default class SiderDemo extends React.Component {
    constructor(props){
      super(props)
      this.state = {
        loading: false,
      }
      this.uploadClick = this.uploadClick.bind(this)
    }
    handleChange = (info) => {
      if (info.file.status === 'uploading') {
        this.setState({ loading: true });
        return;
      }
      if (info.file.status === 'done') {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, imageUrl => this.setState({
          imageUrl,
          loading: false,
        }));
      }
      this.setState({
        file:info.file
      })
    };

    //上传头像
    uploadClick(){
      let form = new FormData();
      form.append('file', this.state.file);
      console.log('3334444',this.state.file)
    }
  
    render(){
      const size = this.state.size;
      return (
        <Layout>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          style={{ background: 'pink'}}
          // onBreakpoint={(broken) => { console.log(broken); }}
          // onCollapse={(collapsed, type) => { console.log(collapsed, type); }}
        >
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">
              <Icon type="upload" />
              <span className="nav-text">上传头像</span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="user" />
              <span className="nav-text">个人信息</span>
            </Menu.Item>
            <Menu.Item key="3">
              <Icon type="user" />
              <span className="nav-text">修改密码</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: 'pink', padding: 0 }} />
          <Content style={{ margin: '24px 16px 0' }}>
            <div style={{ padding: 24, background: '#fff', minHeight: 660 }}>
                
                  <Upload
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    beforeUpload={beforeUpload}
                    onChange={this.handleChange}
                  >
                    {this.state.imageUrl 
                    ? <img style={{ width: 300, height: 300 }} src={this.state.imageUrl} alt="avatar" /> 
                    : <div>
                        <Icon type={this.state.loading ? 'loading' : 'plus'} />
                        <div className="ant-upload-text">Upload</div>
                      </div>}
                  </Upload>
                  
                  <Button onClick={this.uploadClick} style={{ marginTop: 300 ,marginLeft:500}} type="primary" shape="round" icon="upload" size={size}>Upload</Button>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
          </Footer>
        </Layout>
      </Layout>
      );
    }
}