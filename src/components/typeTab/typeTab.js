import Taro, {Component} from '@tarojs/taro'
import classNames from 'classnames/bind'
import {View,Image} from '@tarojs/components'
import tabStyle from './typeTab.module.scss'
import moreImg from './images/more.png'

const tabClasses= classNames.bind(tabStyle);
const containerClass = tabClasses('container');
const listClass = tabClasses('list','flex');

class TypeTab extends Component {
  static options = {
    addGlobalClass: true
  }
  static defaultProps = {
    list: [],
    nowIndex:0,
    onChangeType(){}
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
  changeType(item,index){
    this.props.onChangeType(item,index);
  }
  render() {
    const {list,nowIndex} = this.props;
    const itemClass=(index) => tabClasses('item','flex','flex-main-center','flex-cross-center',{
      itemFocus:index === nowIndex,
    });

    return (
      <View>
        <View className={containerClass}>
          <View className={listClass}>
            {list.map((el,index)=>(
              <View className={itemClass(index)} key={el.id} onClick={this.changeType.bind(this,el,index)}>
                {el.name}
                {index===nowIndex&&<View className={tabStyle.line} />}
              </View>))
            }
            {/*<View className={tabStyle.after} />*/}
            {/*<View className={tabStyle.more}>*/}
              {/*<Image className={tabStyle.img} src={moreImg} />*/}
            {/*</View>*/}
          </View>
        </View>
      </View>
    )
  }
}

export default TypeTab
