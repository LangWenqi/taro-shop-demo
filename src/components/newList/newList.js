import Taro, {Component} from '@tarojs/taro'
import classNames from 'classnames/bind';
import {View, Image} from '@tarojs/components'
import {getQuery,div} from '@/utils'
import itemStyle from './newList.module.scss'

const itemClasses = classNames.bind(itemStyle);
const listClass = itemClasses('list', 'flex');
const itemClass = itemClasses('item', 'flex-box-0');

class NewList extends Component {
  static options = {
    addGlobalClass: true
  }
  static defaultProps = {
    list: []
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
  toDetail (id) {
    Taro.navigateTo({url:`/packageProduct/product/product?id=${id+''}`})
  }
  render() {
    const {list} = this.props;
    return (
      <View >
        {list && <View className={listClass}>
          {list.map((el) => (
              <View className={itemClass} key={el.id} onClick={this.toDetail.bind(this,el.id)}>
                <View className={itemStyle.imgWrapper}>
                  <Image className='commonImg' src={el.photo} mode='aspectFill' />
                </View>
                <View className={itemStyle.font}>{el.title}</View>
                <View className={itemStyle.price}>{el.price>0?`￥${div(el.price,100)} 元`:'面议'}</View>
              </View>
            ))
          }
          <View className={itemStyle.space} />
        </View>}
      </View>
    )
  }
}

export default NewList
