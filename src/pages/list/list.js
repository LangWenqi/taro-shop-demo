import Taro, {Component} from '@tarojs/taro'
import {View} from '@tarojs/components'
import {getQrCodeQuery} from '@/store/actions/app'
import ItemList from '../../components/itemList/itemList';
import TypeTab from '../../components/typeTab/typeTab';
import Nothing from '../../components/nothing/nothing'
// import BottomLine from '../../components/bottomLine/bottomLine';
import listStyle from './list.module.scss'
import {getProductType, getProductList} from '../../api/apis/common'


let pageNum = 1;
let pageSize = 10;
let loading = false;

class List extends Component {
  config = {
    navigationBarTitleText: '分类',
    enablePullDownRefresh: true,
    onReachBottomDistance: 10,
    backgroundTextStyle: 'dark'
  }

  constructor(props) {
    super(props);
    this.state = {
      typeList: [],
      nowIndex: 0,
      nowItem: {},
      list: [],
      showNothing: false,
      total: 0
    }
  }

  componentWillReceiveProps(nextProps) {

  }

  componentDidMount() {
    this.getProductType()
  }

  componentWillUnmount() {

  }

  componentDidShow() {
  }

  componentDidHide() {
  }
  onPullDownRefresh() {
    this.changeType(this.state.nowItem,this.state.nowIndex);
  }

  onReachBottom() {
    this.getProductList();
  }
  async getProductType() {
    const res = await getProductType();
    const {code, data} = res;
    if (code == 200) {
      this.setState({
        typeList: data ? data : []
      }, () => {
        const item = this.state.typeList.length > 0 ? this.state.typeList[0] : {};
        this.changeType(item, 0)
      })
    }
  }

  noMoreProduct() {
    return this.state.list.length >= this.state.total && this.state.total > 0
  }

  noProduct() {
    return this.state.list.length <= 0 && this.state.showNothing;
  }

  async getProductList() {
    if (loading || this.noMoreProduct()) return;
    loading = true;
    this.setState(() => ({
      showNothing: false
    }));
    const params = {
      pageNum,
      pageSize,
      typeId: this.state.nowItem.id ? this.state.nowItem.id : ''
    };
    const res = await getProductList(params);
    const {code, data} = res;
    if (code == 200) {
      const newData = data.data ? data.data : [];
      this.setState((prevState) => ({
        list: prevState.list.concat(newData),
        showNothing: true,
        total: data.total
      }));
      pageNum++;
    }
    loading = false;
    Taro.stopPullDownRefresh();
  }

  changeType(item, index) {
    pageNum = 1;
    loading = false;
    this.setState(() => ({
      nowIndex: index,
      nowItem: item,
      showNothing: false,
      total: 0,
      list: []
    }), () => {
      this.getProductList();
    })
  }

  render() {
    return (
      <View className={listStyle.container}>
        {this.state.typeList.length > 0 &&
        <TypeTab list={this.state.typeList} onChangeType={this.changeType} nowIndex={this.state.nowIndex} />}
        <ItemList list={this.state.list} />
        {this.noProduct() && <Nothing />}
        {/*{this.noMoreProduct() && <BottomLine />}*/}
      </View>
    )
  }
}

export default List
