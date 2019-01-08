import Taro, {Component} from '@tarojs/taro'
import classNames from 'classnames/bind';
import {View, Image, Input} from '@tarojs/components'
import searchInputStyle from './searchInput.module.scss'
import searchImg from './images/search.png'

const searchInputClasses = classNames.bind(searchInputStyle);
const containerClass = searchInputClasses('container','search-class');

class SearchInput extends Component {
  static options = {
    addGlobalClass: true
  }
  static externalClasses = ['search-class']
  static defaultProps = {
    search:true,
    searchValue:'',
    url:'',
    onChangeSearch(){}
  }
  componentWillReceiveProps(nextProps) {

  }

  componentDidMount() {


  }

  componentWillUnmount() {

  }

  componentDidShow() {
  }

  componentDidHide() {
  }
  changeSearch(e){
    const {search} =this.props;
    if(!search)return;
    this.props.onChangeSearch(e.target.value)
  }
  toSearch(){
    const {url,search} =this.props;
    if(search||!url)return;
    Taro.navigateTo({url})
  }
  render() {
    const {search,searchValue} = this.props;
    const wrapperClass = searchInputClasses('wrapper',{wrapperSearch:search});
    return (
      <View className={containerClass}>
        <View className={wrapperClass} onClick={this.toSearch.bind(this)}>
          <Image className={searchInputStyle.searchImg} src={searchImg} />
          <Input className={searchInputStyle.searchInput} placeholder='搜索商品' value={searchValue} disabled={!search} onInput={this.changeSearch.bind(this)} />
        </View>
      </View>
    )
  }
}

export default SearchInput
