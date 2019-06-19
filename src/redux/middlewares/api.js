
import {addBlogList} from '../actions'

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