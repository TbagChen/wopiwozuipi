import React from 'react'
import { message, Icon, Button,Layout, Menu ,Upload, Radio } from 'antd'
import '../themes/PersonalCenter/PersonalCenter.scss'
import utils from '../utils'
import Cookies from 'js-cookie'
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
        fileobj:'',
      }
      this.uploadClick = this.uploadClick.bind(this)
      this.getData = this.getData.bind(this)
      this.getFileData = this.getFileData.bind(this)
      this.beforeUpload = this.beforeUpload.bind(this)
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
    getData(e){
      const target = e.target
      const value = target.type === 'checkbox'?target.checked:target.value;
      const name = target.name
      this.setState({
        [name]:value
      })
      console.log(e.target.files[0])
    }
    getFileData(e){
      this.setState({
        fileobj:e.target.files[0]
      })
    }
    beforeUpload(file){
      this.setState({
        fileobj:file
      })
    }
    //上传头像
    uploadClick(){
      fetch.get('getQiniuToken',{token: JSON.parse(Cookies.get('loginInfo')).token}).then(res=>{
        utils.uploadFile(this.state.fileobj,res.data.qiniuToken).then(res=>{
          console.log(res)
          this.setState({
            imageUrl:'http://img.xuweijin.com/'+res
          })
          let avater = 'http://img.xuweijin.com/'+res
          fetch.post('editUserAvater',{
            u_id:JSON.parse(Cookies.get('loginInfo')).u_id,
            avater:avater,
            token: JSON.parse(Cookies.get('loginInfo')).token
          }).then(res=>{
            let loginInfo = JSON.parse(Cookies.get('loginInfo'))
            loginInfo.avater = avater
            Cookies.set('loginInfo',loginInfo)
            setTimeout(()=>{
              window.location.reload();
            },1000)
          })
        })
      })
    }
  
    render(){
      const size = this.state.size;
      return (
        <Layout>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          style={{ background: '#3872a1'}}
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
          <Header style={{ background: '#3872a1', padding: 0}} />
          <Content style={{ margin: '24px 16px 0' }}>
            <div style={{ padding: 24, background: '#fff', minHeight: 660 }}>
                
                  <Upload
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    beforeUpload={this.beforeUpload}
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