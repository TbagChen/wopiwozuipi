
import {addBlogList,addBlogerInfo} from '../actions'

export const getBlogList = () => {
  return (dispatch)=>{
    return fetch.get("getArticle",{
      u_id:'',
      //token:JSON.parse(Cookies.get('loginInfo')).token||'',
    }).then(res=>{
      const data=res.data;
      const action = addBlogList(data);
      dispatch(action);
      return res
    })
  }
}

export const getBlogerInfo = (params) => {
  return (dispatch) => {
    return fetch.get('getUserBasicInfo',{
      u_id:params.u_id,
      token:params.token
    }).then(res=>{
      const data = res.data;
      const action = addBlogerInfo(data);
      dispatch(action);
    })
  }
}