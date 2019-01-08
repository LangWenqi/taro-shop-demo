import Taro, {Component} from '@tarojs/taro'
import {View, Image, Swiper, SwiperItem} from '@tarojs/components'
import {getQuery,div} from '@/utils'
import itemStyle from './itemSwiper.module.scss'


class ItemSwiper extends Component {
  static options = {
    addGlobalClass: true
  }
  static defaultProps = {
    list: [],
  }

  constructor(props) {
    super(props);
    this.state = {
      nowIndex:1
    }
  }

  componentWillReceiveProps(nextProps) {

  }

  componentDidMount() {
    getQuery.call(this);

  }

  componentWillUnmount() {

  }

  componentDidShow() {
  }

  componentDidHide() {
  }
  swiperChange = (e) =>{
    this.setState({nowIndex:e.detail.current+1})
  }
  toUrl(url){
    if(!url)return;
    Taro.navigateTo({url})
  }
  render() {
    const {list} = this.props;
    return (
      <View>
        {list &&<View className={itemStyle.container}>
           <Swiper className={itemStyle.container}
            circular
            autoplay onChange={this.swiperChange}>
            {list.map((el, index) => (
              <SwiperItem key={index} onClick={this.toUrl.bind(this,el.link)}>
                <View className='commonImg'>
                  <Image className='commonImg' src={el.picture} mode='aspectFill' />
                </View>
              </SwiperItem>
            ))
            }
          </Swiper>
          <View className={itemStyle.count}>{`${this.state.nowIndex}/${list.length}`}</View>
        </View>}
      </View>
    )
  }
}

export default ItemSwiper
