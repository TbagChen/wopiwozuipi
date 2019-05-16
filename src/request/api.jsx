const APICONFIG = {
  login: {    //登录接口
    path: '/users/login'
  },
  register: {  //注册接口
    path: '/users/register'
  },
  getArticle:{
    path:'/article/getArticle'
  },
  getTagList:{
    path:'/users/getTag'
  },
  publish:{  //发布文章
    path:'/users/publish'
  },
  getArticleById:{
    path:'/article/getArticleById'
  },
  saveArticleTag:{
    path:'/article/saveArticleTag'
  },
  getQiniuToken:{
    path:'/qiniuUpload'
  },
  editUserAvater:{
    path:'/users/editUserAvater'
  },
  follow: {
    path: '/users/follow'
  },
  getUserBasicInfo:{
    path:'/users/getUserBasicInfo'
  }
}

export default APICONFIG
