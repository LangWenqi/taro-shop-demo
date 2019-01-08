import Taro, {Component} from '@tarojs/taro'
import {View, Image, Button, Form} from '@tarojs/components'
import {connect} from '@tarojs/redux'
import classNames from 'classnames/bind';
import userStyle from './user.module.scss'
import collectionImg from './images/collection.png'
import serviceImg from './images/service.png'
import iconRightImg from '../../asset/common/rightIcon.png'
import {getUserDetail,toLogin} from '../../utils/auth'


const userClasses = classNames.bind(userStyle);
const userMessageClass = userClasses('userMessage', 'flex', 'flex-cross-center');
const userPhotoClass = userClasses('userPhoto', 'flex-box-0');
const countMessageClass = userClasses('countMessage', 'flex');
const countClass = userClasses('userName', 'count', 'flex', 'flex-main-center');
const countFontClass = userClasses('helpFont', 'flex', 'flex-cross-center');
const itemClass = userClasses('item', 'flex', 'flex-cross-center');
const itemFontClass = userClasses('itemFont', 'flex-box-1');
const iconLeftClass = userClasses('iconLeft', 'flex-box-0');
const iconRightClass = userClasses('iconRight', 'flex-box-0');
const itemNumClass = userClasses('itemNum', 'flex-box-0');
const loginUrl = '/packageLogin/login/login?loginType = 50005e';

@connect(({company}) => ({
  company
}), (dispatch) => ({


}))
class User extends Component {
  config = {
    navigationBarTitleText: '我的',
  }
  constructor(props) {
    super(props);
    this.state = {
      code:0,
      userMessage:{},
      list : [
        // {
        //   label: '我的收藏',
        //   openType:'',
        //   formType:'submit',
        //   icon:collectionImg,
        //   params:{
        //     num:1,
        //     url:'/pages/index/index',
        //   },
        //   method:'toUrl'
        // },
        {
          label: '联系客服',
          openType:'',
          // openType:'contact',
          formType:'submit',
          icon:serviceImg,
          params:{},
          method:'makeCall'
        }
      ]
    }
  }
  componentWillReceiveProps(nextProps) {

  }

  componentDidMount() {

  }
  componentWillUnmount() {

  }

  componentDidShow() {
    this.getUserDetail();
  }

  componentDidHide() {
  }
  btnMethod(method,params){
    this[method](params)
  }
  async getUserDetail(){
    const res = await getUserDetail({},false);
    const {code, data} = res;
    this.setState(()=>({
      userMessage:code==200&&data?data:{},
      code:code
    }));
  }
  makeCall(){
    const {company} = this.props;
    if(!company.companyMsg.hotline)return;
    Taro.makePhoneCall({
      phoneNumber: company.companyMsg.hotline,
    }).catch(res=>{
      if (res.errMsg !== "makePhoneCall:fail cancel") {
        Taro.showToast({
          title: "拨打电话失败!",
          duration: 1000,
          icon: "none"
        });
      }
    });
  }
  toUrl(params={}){
    if(!params.url)return;
    Taro.navigateTo({
      url:params.url
    })
  }
  getFormId(e) {
    // console.log(e.detail.formId)
  }
  toLogin(){
    const {code} = this.state;
    toLogin(code);
  }
  render() {
    const {userMessage,code} = this.state;
    const {company} = this.props;
    const userName = code==200?userMessage.nickName:(code==20003||code==10002)?'点击头像登录':'';
    return (
      <View>
        <View className={userMessageClass}>
          <View className={userPhotoClass} onClick={this.toLogin}>
            {userMessage.headPhoto&&<Image className={userStyle.userImg} src={userMessage.headPhoto} mode='aspectFill' />}
          </View>
          <View>
            <View className={userStyle.userName}>{userName}</View>
            <View className={userStyle.helpFont}>{company.companyMsg.name}欢迎您</View>
          </View>
        </View>
        {/*<View className={countMessageClass}>*/}
          {/*<View className={userStyle.countItem}>*/}
            {/*<View className={countClass}>12</View>*/}
            {/*<View className={countFontClass}>查看</View>*/}
          {/*</View>*/}
          {/*<View className={userStyle.countItem}>*/}
            {/*<View className={countClass}>12</View>*/}
            {/*<View className={countFontClass}>收藏</View>*/}
          {/*</View>*/}
        {/*</View>*/}
        <Form className={userStyle.list} reportSubmit onSubmit={this.getFormId}>
          {this.state.list.map((item, index) => (
            <View key={index}>
              <Button className={itemClass} openType={item.openType} formType={item.formType} onClick={this.btnMethod.bind(this,item.method,item.params)}>
                <Image className={iconLeftClass} src={item.icon} />
                <View className={itemFontClass}>{item.label}</View>
                <View className={itemNumClass}>{item.num}</View>
                <Image className={iconRightClass} src={iconRightImg} />
              </Button>
            </View>
          ))
          }
        </Form>
      </View>
    )
  }
}

export default User
