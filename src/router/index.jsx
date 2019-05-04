import React from 'react'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import LoginComponent from '../views/login'
import LayoutComponent from '../views/layout'
import registerComponent from '../views/register'
import errorComponent from '../views/error'
import BlogIndexComponent from '../views/blogIndex'
import WriteBlogComponent from '../views/writeBlog'

export default class IndexRouter extends React.Component{
  render(){
    return(
      <Router>
        <Switch>
          <Route path={"/login"} component={LoginComponent} />
          <Route path={"/register"} component={registerComponent} />
          <Route path="/" render={({history,location,match}) => (
            <LayoutComponent history={history} location={location} match={location}>
              <Route path="/" exact component={BlogIndexComponent} />
              <Route path="/writeBlog" exact component={WriteBlogComponent} />
            </LayoutComponent>
          )} />
          <Route component={errorComponent}/>
        </Switch>
      </Router>
    )
  }
}