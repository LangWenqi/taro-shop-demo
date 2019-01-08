import '@tarojs/async-await'
import Taro, { Component } from '@tarojs/taro'
import { Provider } from '@tarojs/redux'
import store from './store'
import { getQrCodeQueryAction} from './store/actions/app'
import { getCompanyMsg} from './store/actions/company'
import {getQrCodeQuery} from  './utils'
import {getGlobal, getQrKey} from  './utils/appId'
import './style/flex.scss'
import './style/common.scss'
import Index from './pages/index/index'


Taro.global = getGlobal();
// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
  require('nerv-devtools')
}

class App extends Component {

  config = {
    pages: [
      'pages/index/index',
      'pages/list/list',
      'pages/user/user'
    ],
    subPackages: [
      {
        root: 'packageSearch',
        pages: [
          'search/search',
        ]
      },
      {
        root: 'packageProduct',
        pages: [
          'product/product',
        ]
      },
      {
        root: 'packageLogin',
        pages: [
          'login/login',
        ]
      }
    ],
    tabBar: {
      color: "#282935",
      selectedColor: "#C1505A",
      backgroundColor: "#ffffff",
      borderStyle: "black",
      list: [
        {
          pagePath: "pages/index/index",
          text: "首页",
          iconPath: "asset/tabBar/index.png",
          selectedIconPath: "asset/tabBar/indexFocus.png",
          active: true
        },
        {
          pagePath: "pages/list/list",
          text: "分类",
          iconPath: "asset/tabBar/list.png",
          selectedIconPath: "asset/tabBar/listFocus.png",
          active: false
        },
        {
          pagePath: "pages/user/user",
          text: "我的",
          iconPath: "asset/tabBar/user.png",
          selectedIconPath: "asset/tabBar/userFocus.png",
          active: false
        },

      ],
      position: "bottom"
    },
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    },
    navigateToMiniProgramAppIdList: [

    ]
  }

  componentDidMount () {
   this.initQuery();
   this.initCompany()
  }

  componentDidShow () {}

  componentDidHide () {}

  componentCatchError () {}

  componentDidCatchError () {}
  initCompany(){
    store.dispatch(getCompanyMsg());
  }
  initQuery(){
    const url = this.$router.params[getQrKey()];
    store.dispatch(getQrCodeQueryAction(getQrCodeQuery(url)));
  }
  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
