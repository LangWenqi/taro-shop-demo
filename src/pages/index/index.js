import Taro, {Component} from '@tarojs/taro'
import {View} from '@tarojs/components'
import {connect} from '@tarojs/redux'
import {getQuery} from '@/utils'
import indexStyle from './index.module.scss'
import ItemList from '../../components/itemList/itemList';
import NewList from '../../components/newList/newList';
import ItemTitle from '../../components/itemTitle/itemTitle';
import ItemSwiper from '../../components/itemSwiper/itemSwiper';
import BottomLine from '../../components/bottomLine/bottomLine';
import SearchInput from '../../components/searchInput/searchInput'
import {getBanner, getNewList, getRecommendList} from '../../api/apis/common'

const searchUrl = '/packageSearch/search/search';
let pageNum = 1;
let pageSize = 10;
let loading = false;

@connect(({app}) => ({
  app
}), (dispatch) => ({
  // getQrCodeQuery (url) {
  //   dispatch(getQrCodeQuery(url))
  // },

}))
class Index extends Component {
  config = {
    navigationBarTitleText: '首页',
    usingComponents: {
      // 书写第三方组件的相对路径
    },
    enablePullDownRefresh: true,
    onReachBottomDistance: 10,
    backgroundTextStyle: 'dark'
  }

  constructor(props) {
    super(props);
    this.state = {
      bannerList: [],
      newList: [],
      list: [],
      total: 0
    }
  }

  componentWillReceiveProps(nextProps) {

  }

  componentDidMount() {
    getQuery.call(this);
    this.getBanner();
    this.getNewList();
    this.refresh();
  }

  componentWillUnmount() {

  }

  componentDidShow() {
  }

  componentDidHide() {
  }

  onPullDownRefresh() {
    this.refresh();
  }

  onReachBottom() {
    this.getRecommendList();
  }

  async getBanner() {
    const res = await getBanner();
    const {code, data} = res;
    if (code == 200) {
      this.setState({
        bannerList: data ? data : []
      })
    }
  }

  async getNewList() {
    const res = await getNewList();
    const {code, data} = res;
    if (code == 200) {
      this.setState({
        newList: data
      })
    }
  }

  noMoreProduct() {
    return this.state.list.length >= this.state.total && this.state.total > 0
  }

  async getRecommendList() {
    if (loading || this.noMoreProduct()) return;
    loading = true;
    const params = {
      pageNum,
      pageSize
    };
    const res = await getRecommendList(params);
    const {code, data} = res;
    if (code == 200) {
      const newData = data.data ? data.data : [];
      this.setState((prevState) => ({
        list: prevState.list.concat(newData),
        total: data.total
      }));
      pageNum++;
    }
    loading = false;
    Taro.stopPullDownRefresh();
  }

  refresh() {
    pageNum = 1;
    loading = false;
    this.setState(() => ({
      list: [],
      total: 0

    }), () => {
      this.getRecommendList();
    });
  }

  render() {

    return (
      <View className={indexStyle.container}>
        <SearchInput search={false} search-class={indexStyle.searchClass} url={searchUrl} />
        <ItemSwiper list={this.state.bannerList} />
        <ItemTitle title='新品首发' />
        <NewList list={this.state.newList} />
        <ItemTitle title='猜你喜欢' />
        <ItemList list={this.state.list} />
        {this.noMoreProduct() && <BottomLine />}
      </View>
    )
  }
}

export default Index
