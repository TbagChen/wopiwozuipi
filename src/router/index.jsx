import React from 'react'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import CacheRoute, { CacheSwitch } from 'react-router-cache-route'
import LoginComponent from '../views/login'
import LayoutComponent from '../views/layout'
import registerComponent from '../views/register'
import SiderDemo from '../views/PersonalCenter'
import errorComponent from '../views/error'
import BlogIndexComponent from '../views/blogIndex'
import WriteBlogComponent from '../views/writeBlog'
import BlogDetailComponent from '../views/blogDetail'
import MyBlogComponent from '../views/myBlog'
import UserComponent from '../views/user'
import FollowsComponent from '../views/users/follows'
import FolloweesComponent from '../views/users/followees'
import ArticleComponent from '../views/users/article'
import CollectionsComponent from '../views/users/collections'
import TagsComponent from '../views/users/tags'

export default class IndexRouter extends React.Component{
  render(){
    return(
      <Router>
        <CacheSwitch>
          <Route path={"/login"} component={LoginComponent} />
          <Route path={"/register"} component={registerComponent} />
          <Route path="/" render={({history,location,match}) => (
            <LayoutComponent history={history} location={location} match={match}>
              <CacheRoute path="/" cacheKey="BlogIndexComponent" exact component={BlogIndexComponent} />
              <Route path="/writeBlog" exact component={WriteBlogComponent} />
              <Route path={"/PersonalCenter"} component={SiderDemo} />
              <Route path="/myBlog" exact component={MyBlogComponent} />
              <Route path="/blogDetail/:article_id" exact component={BlogDetailComponent} />
              {/*<Route path="/user/:u_id" exact component={UserComponent} />*/}
              <Route path="/user/:u_id" render={({history,location,match}) => (
                <UserComponent history={history} location={location} match={match} exact>
                  <Route path="/user/:u_id" exact component={ArticleComponent} />
                  <Route path="/user/:u_id/collections" component={CollectionsComponent} />
                  <Route path="/user/:u_id/tags" component={TagsComponent} />
                  <Route path="/user/:u_id/follows" component={FollowsComponent} />
                  <Route path="/user/:u_id/followees" component={FolloweesComponent} />
                </UserComponent>
              )} />
            </LayoutComponent>
          )} />
          <Route component={errorComponent}/>
        </CacheSwitch>
      </Router>
    )
  }
}