/*
*   这个是工具类函数
* */
const utils = {
  formatDate(now, t) {//时间转换
    let date = new Date(parseInt(now));
    let Y,M,D,h,m,s;
    Y = date.getFullYear();
    M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    D = this.extra(date.getDate());
    h = this.extra(date.getHours());
    m = this.extra(date.getMinutes());
    s = this.extra(date.getSeconds());
    if (t === 'Y') {

      return Y;
    }
    if (t === 'M') {

      return M;
    }
    if (t === 'D') {

      return D;
    }
    if (t === 'h') {

      return h;
    }
    if (t === 'm') {

      return m;
    }
    if (t === 's') {

      return s;
    }
    if (t === 'ALL'){
      /*date.getFullYear()*/
      return Y+'-'+M+'-'+D+'  '+h+':'+m+':'+s
    }
    if(t === 'YMD'){
      return Y+'-'+M+'-'+D
    }
    if(t === 'TYMD'){}
    return Y+'年'+M+'月'+D+'日'
  },
  //补位函数。
  extra(x) {
    //如果传入数字小于10，数字前补一位0。
    if (parseInt(x) < 10) {
      return "0" + parseInt(x);
    } else {
      return x;
    }
  },
  //美化时间
  goodTime(str){
    var now = new Date().getTime(),
      oldTime = new Date(str*1000).getTime(),
      difference = now - oldTime,
      result='',
      minute = 1000 * 60,
      hour = minute * 60,
      day = hour * 24,
      month = day * 30,
      year = month * 12,
      _year = difference/year,
      _month =difference/month,
      _week =difference/(7*day),
      _day =difference/day,
      _hour =difference/hour,
      _min =difference/minute;
    if(_year>=1) {result=  ~~(_year) + "年前"}
    else if(_month>=1) {result= ~~(_month) + "个月前"}
    else if(_week>=1) {result= ~~(_week) + "周前"}
    else if(_day>=1) {result= ~~(_day) +"天前"}
    else if(_hour>=1) {result= ~~(_hour) +"个小时前"}
    else if(_min>=1) {result= ~~(_min) +"分钟前"}
    else result="刚刚";
    return result;
  },
}
export default utils