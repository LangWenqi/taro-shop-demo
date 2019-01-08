import Taro, {Component} from '@tarojs/taro'
import classNames from 'classnames/bind';
import {View} from '@tarojs/components'
import itemStyle from './bottomLine.module.scss'

const itemClasses = classNames.bind(itemStyle);
const containerClass = itemClasses('container', 'flex','flex-cross-center');
const lineClass = itemClasses('line', 'flex-box-1');
const fontClass = itemClasses('font', 'flex-box-0');

class BottomLine extends Component {
  static options = {
    addGlobalClass: true
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

  render() {
    return (
      <View className={containerClass}>
        <View className={lineClass}></View>
        <View className={fontClass}>我是有底线的</View>
        <View className={lineClass}></View>
      </View>
    )
  }
}

export default BottomLine
