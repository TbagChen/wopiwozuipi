import React, { PureComponent } from "react";
import PropTypes from "prop-types";
// 设置高亮样式
// 设置高亮的语言

class ImageBlock extends PureComponent {



  componentDidMount() {
    // 注册要高亮的语法，
    // 注意：如果不设置打包后供第三方使用是不起作用的
  }
  imgClick(e){
    console.log(e)
  }
  render() {
    const { alt,src } = this.props;
    console.log(this.props)
    return (
      <span  style={{'textAlign':'center','display':'block'}}><img src={src}  onClick={()=>this.imgClick(src)} alt={alt} /></span>
    );
  }
}

export default ImageBlock;