import Taro, {Component} from '@tarojs/taro'
import classNames from 'classnames/bind'
import {View} from '@tarojs/components'

import titleStyle from './itemTitle.module.scss'

const titleClass = classNames.bind(titleStyle);
const container = titleClass('title');

class ItemTitle extends Component {
  static defaultProps = {
    title: ''
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
      <View>
        <View className={container}>
          {this.props.title}
        </View>
      </View>
    )
  }
}

export default ItemTitle
