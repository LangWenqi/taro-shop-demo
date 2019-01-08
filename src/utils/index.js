import {getType} from "./object";
import store from '../store'
//
/**
 * @author: langwenqi
 * @describe: check the telephone or mobile
 * @params:{String} mobile
 * @return: {Boolean} the result
 **/
export function checkPhone(mobile) {
    let reg = /(^(0[0-9]{2,3}-)?([2-9][0-9]{6,7})+(-[0-9]{1,4})?$)|(^((\(\d{3}\))|(\d{3}-))?(1[3456789]\d{9})$)/;
    return reg.test(mobile)
};

/**
 * @author: langwenqi
 * @describe: check the mobile
 * @params:{String} mobile
 * @return: {Boolean} the result
 **/
export function checkMobile(mobile) {
    let reg = /^1[0-9]{10}$/;
    return reg.test(mobile)
};

/**
 * @author: langwenqi
 * @describe: change the utf16 to utf8
 * @params:{String} str
 * @return: {String} the result
 **/
export function utf16toEntities(str) {
    if (getType(str) !== 'string') {
        return str
    }
    var patt = /[\ud800-\udbff][\udc00-\udfff]/g;
    // 检测utf16字符正则
    str = str.replace(patt, function (char) {
        var H, L, code;
        if (char.length === 2) {
            H = char.charCodeAt(0);
            // 取出高位
            L = char.charCodeAt(1);
            // 取出低位
            code = (H - 0xD800) * 0x400 + 0x10000 + L - 0xDC00;
            // 转换算法
            return "&#" + code + ";";
        } else {
            return char;
        }
    });
    return str;
}

/**
 * @author: langwenqi
 * @describe: change the utf8 to utf16
 * @params:{String} str
 * @return: {String} the result
 **/
export function entitiestoUtf16(str) {
    if (getType(str) !== 'string') {
        return str
    }
    // 检测出形如&#12345;形式的字符串
    var strObj = utf16toEntities(str);
    var patt = /&#\d+;/g;
    var H, L, code;
    var arr = strObj.match(patt) || [];
    for (var i = 0; i < arr.length; i++) {
        code = arr[i];
        code = code.replace('&#', '').replace(';', '');
        // 高位
        H = Math.floor((code - 0x10000) / 0x400) + 0xD800;
        // 低位
        L = (code - 0x10000) % 0x400 + 0xDC00;
        code = "&#" + code + ";";
        var s = String.fromCharCode(H, L);
        strObj = strObj.replace(code, s);
    }
    return strObj;
}

/**
 * @author: langwenqi
 * @describe: encodeURI the Object's keys
 * @params:{String} str
 * @return: {Object} the result
 **/
export function transformObjectString(obj) {
    if (getType(obj) === 'object') {
        let transObj = {};
        Object.keys(obj).forEach((el) => {
            transObj[el] = encodeURIComponent(obj[el]);
        });
        return transObj;
    }
    else if (getType(obj) === 'string') {
        return encodeURIComponent(obj)
    }
    return obj
}

/**
 * @author: langwenqi
 * @describe: decodeURI the Object's keys
 * @params:{String} str
 * @return: {Object} the result
 **/
export function unTransformObjectString(obj) {
    if (getType(obj) === 'object') {
        let transObj = {};
        Object.keys(obj).forEach((el) => {
            transObj[el] = decodeURIComponent(obj[el]);
        });
        return transObj
    } else if (getType(obj) === 'string') {
        return decodeURIComponent(obj)
    }
    return obj
}

/**
 * @author: langwenqi
 * @describe: stringify Object or parse Url
 * @params:{Object} stringify:obj,{String} parse:str
 * @return: {String} stringify:the result,{Object} parse:the result
 **/
export const qs = {
    stringify: function (obj = {}, ifEncode) {
        return Object.keys(obj).map((el) => {
            return `${el}=${ifEncode ? encodeURIComponent(obj[el]) : obj[el]}`
        }).join('&')
    },
    parse: function (str = '', ifDecode) {
        let param = {};
        const arr = str ? str.split('&') : [];
        arr.forEach((el) => {
            param[el.split('=')[0]] = ifDecode ? decodeURIComponent(el.split('=')[1]) : el.split('=')[1]
        });
        return param;
    }
};

/**
 * @author: langwenqi
 * @describe: check with emoji,'',null,undefind,String.trim()==='',special string to false
 * @params:{String} str
 * @return: {Boolean} the result
 **/
export function checkExpression(str) {
    let emoji = /[\ud800-\udbff][\udc00-\udfff]/;
    let reg = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]");
    if ((!str) || emoji.test(str) || reg.test(str) || str.trim() === '') {
        return false;
    }
    return true;
}

/**
 * @author: langwenqi
 * @describe: format the date Object or date Number
 * @params:{date Object or date Number} date
 * @params:{String} format
 * @return: {String} the result
 **/
export function dateFormat(date, format) {
    var o = {
        "y+": new Date(date).getFullYear(),
        "M+": new Date(date).getMonth() + 1,
        "d+": new Date(date).getDate(),
        "h+": new Date(date).getHours(),
        "m+": new Date(date).getMinutes(),
        "s+": new Date(date).getSeconds(),
    };
    if (/(y+)/.test(format)) format = format.replace(RegExp.$1,
        (new Date(date).getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o) if (new RegExp("(" + k + ")").test(format))
        format = format.replace(RegExp.$1,
            RegExp.$1.length === 1 ? o[k] :
                ("00" + o[k]).substr(("" + o[k]).length));
    return format;
}

/**
 * @author: langwenqi
 * @describe: get img src from the rich-context
 * @params:{String} strs
 * @return: {Array} arr_src
 **/
export function getHtmlImg(strs) {
    let imgReg = /<img.*?(?:>|\/>)/gi;
    let srcReg = /src=['"]?([^'"]*)['"]?/i;
    let arr = [];
    if (strs && strs.trim()) {
        arr = strs.match(imgReg);
    }
    let arr_src = [];
    if (arr) {
        for (var i = 0; i < arr.length; i++) {
            var src = arr[i].match(srcReg);
            //获取图片地址
            if (src[1]) {
                arr_src.push(src[1])
            }
        }
    }
    return arr_src;
}

/**
 * @author: langwenqi
 * @describe: get bytes length
 * @params:{String} str
 * @return: {Number} the result
 **/
export function getBytesLength(str) {
    // 在GBK编码里，除了ASCII字符，其它都占两个字符宽
    return str.replace(/[^\x00-\xff]/g, 'xx').length;
}

/**
 * @author: langwenqi
 * @describe: accurate multiplication
 * @params:{Number} arg1
 * @params:{Number} arg2
 * @return: {Number} the result
 **/
export function mul(arg1 = 0, arg2 = 0) {
    var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
    try {
        m += s1.split(".")[1].length;
    }
    catch (e) {
    }
    try {
        m += s2.split(".")[1].length;
    }
    catch (e) {
    }
    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
}

/**
 * @author: langwenqi
 * @describe: accurate division
 * @params:{Number} arg1：dividend
 * @params:{Number} arg2：divisor
 * @return: {Number} the result
 **/
export function div(arg1 = 0, arg2 = 1) {
    var t1 = 0, t2 = 0, r1, r2;
    try {
        t1 = arg1.toString().split(".")[1].length;
    }
    catch (e) {
    }
    try {
        t2 = arg2.toString().split(".")[1].length;
    }
    catch (e) {
    }
    r1 = Number(arg1.toString().replace(".", ""));
    r2 = Number(arg2.toString().replace(".", ""));
    return (r1 / r2) * Math.pow(10, t2 - t1);
}

//生成随机uuid
export function guid() {
  function S4() {
    return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
  }
  return (S4()+S4()+S4()+S4()+S4()+S4()+S4()+S4());
}
//时间(秒)转化时分秒 00:00:00
export function changSecond(second) {
  let s1 = '00';
  let s2 = '00';
  let s3 = '00';
  if(!second)return `${s1}:${s2}:${s3}`
  let m = second/60;
  let h = second/60/60;
  if(h<1){
    if(m<1){
      s3 = second;
    }else{
      s2 = parseInt(m)<10?`0${parseInt(m)}`:parseInt(m);
      s3 =second%60<10?`0${second%60}`:second%60;
    }
  }else{
    s1=parseInt(h)<10?`0${parseInt(h)}`:parseInt(h);
    if((second%3600)/60>1){
      s2 = parseInt(second%3600/60)<10?`0${parseInt(second%3600/60)}`:parseInt(second%3600/60);
      s3 = second%3600%60<10?`0${second%3600%60}`:second%3600%60;
    }else{
      s3 = second%3600<10?`${second%3600}`:second%3600
    }
  }
  return `${s1}:${s2}:${s3}`
}
/**
 * @author: langwenqi
 * @describe: pxString to Number
 * @params:{String} string
 * @return: {Number} the result
 **/
export function pxStringToNum(string, splitString = 'px', scale = 1) {
  if (getType(string) !== 'string') return;
  let number = parseInt(string.split(splitString)[0], 10);
  return number / scale;
}

/**
 * @author: langwenqi
 * @describe: Number to pxString
 * @params:{Number} number
 * @return: {pxString} the result
 **/
export function numToPxString(number, splitString = 'px', scale = 1) {
  if (getType(number) !== 'number') return;
  return `${scale * number}${splitString}`;
}

export function timeAgo(dateTimeStamp){   //dateTimeStamp 一个时间毫秒
  if(!dateTimeStamp)return ''
  let minute = 1000 * 60;
  let hour = minute * 60;
  let day = hour * 24;
  let week = day * 7;
  let halfamonth = day * 15;
  let month = day * 30;
  let now = new Date().getTime();   //获取当前时间毫秒
  let diffValue = now - dateTimeStamp;//时间差

  if(diffValue < 0){
    return;
  }
  let minC = diffValue/minute;  //计算时间差的分，时，天，周，月
  let hourC = diffValue/hour;
  let dayC = diffValue/day;
  let weekC = diffValue/week;
  let monthC = diffValue/month;
  let result;
  if(monthC >= 1 && monthC <= 3){
    result = " " + parseInt(monthC) + "月前"
  }else if(weekC >= 1 && weekC <= 3){
    result = " " + parseInt(weekC) + "周前"
  }else if(dayC >= 1 && dayC <= 6){
    result = " " + parseInt(dayC) + "天前"
  }else if(hourC >= 1 && hourC <= 23){
    result = " " + parseInt(hourC) + "小时前"
  }else if(minC >= 1 && minC <= 59){
    result =" " + parseInt(minC) + "分钟前"
  }else if(diffValue >= 0 && diffValue <= minute){
    result = "刚刚"
  }else {
    let datetime = new Date();
    datetime.setTime(dateTimeStamp);
    let Nyear = datetime.getFullYear();
    let Nmonth = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
    let Ndate = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
    let Nhour = datetime.getHours() < 10 ? "0" + datetime.getHours() : datetime.getHours();
    let Nminute = datetime.getMinutes() < 10 ? "0" + datetime.getMinutes() : datetime.getMinutes();
    let Nsecond = datetime.getSeconds() < 10 ? "0" + datetime.getSeconds() : datetime.getSeconds();
    result = Nyear + "-" + Nmonth + "-" + Ndate
  }
  return result;
}
export const comPressFile=()=>`?x-oss-process=image/format,jpg/auto-orient,1/resize,w_600`
export  const changeQrCodeQuery=(strs='')=>{
  let str=strs?strs:'';
  let arr=[];
  if(str.split('?').length>1&&str.split('?')[1].trim()!==''){
    arr = str.split('?')[1].split('&');
  }
  let obj ={};
  arr.forEach(item=>{
    let keys = item.split('=');
    obj[keys[0]] = keys[1]
  });
  return obj;
};
export const getQrCodeQuery = (url)=>{
    let q = decodeURIComponent(url);
    return changeQrCodeQuery(q);
};
export function getQuery() {
  const queryStore = store;
  let qrQuery=queryStore.getState().app.appQuery;
  let query=this.$router.params;
  // console.log('getQuery',query,qrQuery);
  return Object.assign({},qrQuery,query);
};
