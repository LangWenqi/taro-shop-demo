import Taro, {Component} from '@tarojs/taro'
import {View,Image,Text} from '@tarojs/components'
import nothingStyle from './nothing.module.scss'
import nothingImg from './images/nothing.png'

class Nothing extends Component {
  static options = {
    addGlobalClass: true
  }
  static defaultProps = {
    nothingFont : '暂无产品哦~',
    url:'',
    urlType:'switchTab'
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
  toIndex(){
    const {url,urlType} = this.props;
    if(!url)return;
    Taro[urlType]({url});
  }
  render() {
    const {nothingFont} = this.props;
    return (
      <View className={nothingStyle.container} onClick={this.toIndex}>
        <Image className={nothingStyle.img} src={nothingImg} />
        <Text className={nothingStyle.font}>{nothingFont}</Text>
      </View>
    )
  }
}

export default Nothing
