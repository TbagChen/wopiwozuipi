import React from 'react'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import CacheRoute, { CacheSwitch } from 'react-router-cache-route'
import LoginComponent from '../views/login'
import LayoutComponent from '../views/layout'
import registerComponent from '../views/register'
import errorComponent from '../views/error'
import BlogIndexComponent from '../views/blogIndex'
import WriteBlogComponent from '../views/writeBlog'
import BlogDetailComponent from '../views/blogDetail'
import MyBlogComponent from '../views/myBlog'
import UserComponent from '../views/user'

export default class IndexRouter extends React.Component{
  render(){
    return(
      <Router>
        <CacheSwitch>
          <Route path={"/login"} component={LoginComponent} />
          <Route path={"/register"} component={registerComponent} />
          <Route path="/" render={({history,location,match}) => (
            <LayoutComponent history={history} location={location} match={location}>
              <CacheRoute path="/" cacheKey="BlogIndexComponent" exact component={BlogIndexComponent} />
              <Route path="/writeBlog" exact component={WriteBlogComponent} />
              <Route path="/myBlog" exact component={MyBlogComponent} />
              <Route path="/blogDetail/:article_id" exact component={BlogDetailComponent} />
              <Route path="/user/:u_id" exact component={UserComponent} />
            </LayoutComponent>
          )} />
          <Route component={errorComponent}/>
        </CacheSwitch>
      </Router>
    )
  }
}