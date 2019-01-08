import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import classNames from 'classnames/bind';
import { getQrCodeQuery} from '@/store/actions/app'
import ItemList from '../../components/itemList/itemList';
import SearchInput from '../../components/searchInput/searchInput'
import Nothing from '../../components/nothing/nothing'
import searchStyle from './search.module.scss'
import  {getSearchProductList} from '../../api/apis/common'

const searchClasses = classNames.bind(searchStyle);
const searchContainerClass =searchClasses('searchContainer','flex','flex-cross-center');
const searchWrapperClass =searchClasses('searchWrapper','flex-box-1');
let pageNum = 1;
let pageSize = 10;
let loading = false;

class Search extends Component {
  config = {
    navigationBarTitleText: '搜索',
    enablePullDownRefresh: true,
    onReachBottomDistance: 10
  }

  constructor(props) {
    super(props);
    this.state = {
      searchValue:'',
      total:0,
      list: []
    }
  }
  componentWillReceiveProps (nextProps) {

  }
  componentDidMount(){
    this.changeSearch('')
  }
  componentWillUnmount () {

  }

  componentDidShow () { }

  componentDidHide () { }
  onPullDownRefresh() {
    Taro.stopPullDownRefresh();
  }
  onReachBottom() {
    this.getSearchProductList();
  }
  noMoreProduct() {
    return this.state.list.length >= this.state.total && this.state.total > 0
  }
  async getSearchProductList() {
    if (loading || this.noMoreProduct()) return;
    loading = true;
    const params = {
      pageNum,
      pageSize,
      title:this.state.searchValue
    };
    const res = await getSearchProductList(params);
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
  }

  refresh() {
    pageNum = 1;
    loading = false;
    this.setState(() => ({
      list: [],
      total: 0,
    }), () => {
      if(this.state.searchValue){
        this.getSearchProductList();
      }
    });
  }
  changeSearch(value){
    this.setState(()=>({
      searchValue:value
    }),()=>{
      this.refresh();
    })
  }
  render () {
    const nothingFont = this.state.searchValue?'没有搜到任何产品哦~':'请输入搜索内容~';
    return (
      <View className={searchStyle.container}>
        <View className={searchContainerClass}>
          <View className={searchWrapperClass}>
            <SearchInput search={true} searchValue={this.state.searchValue}  onChangeSearch={this.changeSearch} />
          </View>
        </View>
        <ItemList list={this.state.list} />
        {this.state.list.length <= 0&&<Nothing nothingFont={nothingFont} />}
      </View>
    )
  }
}

export default Search
