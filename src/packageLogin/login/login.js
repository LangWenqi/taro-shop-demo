import Taro, { Component } from '@tarojs/taro'
import { View, Image, Button} from '@tarojs/components'
import classNames from 'classnames/bind';
import loginStyle from './login.module.scss'
import loginImg from './images/bg.png'
import { getQuery } from '@/utils'
import  {onGetUserInfo,programLogin} from '../../utils/auth'

const loginClasses = classNames.bind(loginStyle);
const smallFontClass =loginClasses('smallFont','flex','flex-main-center');
const bigFontClass =loginClasses('bigFont','flex','flex-main-center');
const btnClass =loginClasses('btn','flex','flex-main-center','flex-cross-center');


class Login extends Component {
  config = {
    navigationBarTitleText: '',
  }

  constructor(props) {
    super(props);
    this.state = {
      loginType:0
    }
  }
  componentWillReceiveProps (nextProps) {

  }
  componentDidMount(){
    this.initType()
  }
  componentWillUnmount () {

  }

  componentDidShow () { }

  componentDidHide () { }
  initType(){
    this.setState({
      loginType:getQuery.call(this).loginType
    })
  }
  async getUserInfo(e){
    const res = await onGetUserInfo(e);
    const {code}=res;
    if(code == 200 ){
      Taro.navigateBack(1);
    }
  }
  async login(){
    if(this.state.loginType!=10002)return;
    const res =await programLogin();
    const {code}=res;
    if(code == 200 ){
      Taro.navigateBack(1);
    }else if(code == 20003){
      this.setState({
        loginType:code
      })
    }
  }
  render () {
    const {loginType} = this.state;
    const openType = loginType==20003? 'getUserInfo':'';
    const btnFont = loginType==10002?'登录':loginType?'授权':'';
    return (
      <View className={loginStyle.container}>
        <Image className={loginStyle.img} src={loginImg} />
        {loginType==20003&&<View className={loginStyle.fontWrapper}>
          <View className={smallFontClass}>小程序需要</View>
          <View className={bigFontClass}>您的授权</View>
          <View className={smallFontClass}>才能继续操作</View>
        </View>}
        {loginType==10002&&<View className={loginStyle.fontWrapper}>
          <View className={smallFontClass}>您的用户信息已失效</View>
          <View className={bigFontClass}>请重新登录</View>
        </View>}
        <Button class={btnClass} openType={openType} onGetuserinfo={this.getUserInfo} onClick={this.login.bind(this)}>{btnFont}</Button>
      </View>
    )
  }
}

export default Login
