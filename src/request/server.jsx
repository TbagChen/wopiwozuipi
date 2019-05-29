import React from 'react'

import API from './api'
import {message} from 'antd'
import {withRouter} from "react-router-dom";
require('es6-promise').polyfill();

const fetch = require('isomorphic-fetch');



class CreateFetch  extends React.Component{
  constructor(props) {
    super(props);
    let host = window.location.href;
    host = host.toLocaleLowerCase();
    if (host.match('xuweijin.com')) {
        this.host = 'https://www.xuweijin.com/blogApi'
    } else {
        this.host = 'http://localhost:3003'    //http://localhost:3003
    }
  }
    async get(url, req) {
        url = API[url].path;
        this.lists = {
            method: 'GET',
            cache: 'no-cache',
            mode: 'cors',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
        }
        if(req.token){
          this.lists.headers['Authorization'] = 'Bearer ' + req.token;
        }
        let list = [];
        this.body = '';
        if (req instanceof Object) {
            let datas = req.data || req;
            for (let index in datas) {
                let str = index + '=' + datas[index];
                list.push(str);
            }
            this.body = '?' + list.join('&');
            this.lists.headers = req.headers || this.lists.headers;
            this.lists.cache = req.cache || this.lists.cache;
            this.lists.mode = req.mode || this.lists.mode;
        }
        let res = await fetch(this.host + url + this.body, this.lists);
        if(res.status === 401){
            message.error('token失效，请重新登录～')
        }else{
          return await res.json()
        }
    }
    async post(url, req) {
        url = API[url].path;
        this.lists = {
            method: 'POST',
            cache: 'no-cache',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            }
        }
      if(req.token){
        this.lists.headers['Authorization'] = 'Bearer ' + req.token;
      }
        if (req instanceof Object) {
            this.lists.headers = req.headers || this.lists.headers;
            this.lists.cache = req.cache || this.lists.cache;
            this.lists.mode = req.mode || this.lists.mode;
            this.lists.body = req.body || req;
            this.lists.body = JSON.stringify(this.lists.body)
        }
        let res = await fetch(this.host + url, this.lists);
      if(res.status === 401){
        message.error('token失效，请重新登录～')
        console.log(this.props)
        this.props.history.push("/some/Path");
      }else{
        return await res.json()
      }
    }
}

const Structure = new CreateFetch()

export default withRouter(Structure)
