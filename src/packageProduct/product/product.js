import Taro, { Component } from '@tarojs/taro'
import { View, Form, Button, Image, Swiper, SwiperItem, Text} from '@tarojs/components'
import {connect} from '@tarojs/redux'
import classNames from 'classnames/bind';
import { getQuery, div} from '@/utils'
import Nothing from '../../components/nothing/nothing'
import ItemTitle from '../../components/itemTitle/itemTitle';
import productStyle from './product.module.scss'
import indexImg from './images/icon_home.png'
import shareImg from './images/icon_share.png'
// import collectImg from './images/icon_shoucang_sel.png.png'
// import unCollectImg from './images/icon_shoucang_nol.png'

import {getProductDetail} from '../../api/apis/common'
import WxParse from '../../components/wxParse/wxParse'

const productClasses = classNames.bind(productStyle);
const bottomClass =productClasses('bottom','flex','flex-cross-center');
const leftClass =productClasses('left','flex','flex-cross-center','flex-box-1');
const rightClass =productClasses('right','flex','flex-cross-center','flex-main-center','flex-box-1');
const btnClass =productClasses('btn','flex-box-1');
const priceWrapper =productClasses('priceWrapper','flex','flex-cross-center','flex-main-justify');
const nothingFont = '此产品已下架\n点击图标回到首页~';
const nothingUrl = '/pages/index/index';
let productId = 0;

@connect(({company}) => ({
  company
}), (dispatch) => ({
  // getQrCodeQuery (url) {
  //   dispatch(getQrCodeQuery(url))
  // },

}))

class Product extends Component {
  config = {
    navigationBarTitleText: '产品详情',
  }

  constructor(props) {
    super(props);
    this.state={
      productMsg:{},
      showNothing:null,
      list : [],
      nowIndex:1
    }
  }
  componentWillReceiveProps (nextProps) {

  }
  componentDidMount(){
    productId = getQuery.call(this).id;
    this.getProductDetail();
  }
  componentWillUnmount () {
  }

  componentDidShow () { }

  componentDidHide () { }
  onShareAppMessage(res) {
    let params = {
      title:this.state.productMsg.title,
      path: `/packageProduct/product/product?id=${productId}`
    };
    if(this.state.list.length>0){
      params.imageUrl=this.state.list[0]
    }
    return params
  }
  getFormId(){

  }
  previewImg(current, urls) {
    Taro.previewImage({
      current,
      urls
    });
  }
  async getProductDetail(){
    const params ={
      productId
    }
    const res = await getProductDetail(params);
    const {code,data} = res;
    if(code == 200){
      this.setState({
        productMsg:data?data:{},
        showNothing:false,
        list :data.carousel?data.carousel.split(','):[]
      },()=>{
        if(this.state.productMsg.detail){
          const article = this.state.productMsg.detail;
          WxParse.wxParse('article', 'html', article, this.$scope, 0)
        }
      })
    }else if(code == 30001){
      this.setState({showNothing:true});
    }
  }
  makeCall(){
    const {company} = this.props;
    if(!company.companyMsg.hotline)return;
    Taro.makePhoneCall({
      phoneNumber: company.companyMsg.hotline,
    }).catch(res=>{
      if (res.errMsg !== "makePhoneCall:fail cancel") {
        Taro.showToast({
          title: "拨打电话失败!",
          duration: 1000,
          icon: "none"
        });
      }
    });
  }
  toIndex(){
    Taro.switchTab({url:nothingUrl})
  }
  swiperChange = (e) =>{
    this.setState({nowIndex:e.detail.current+1})
  }
  render () {
    return (
      <View>
        {this.state.showNothing === false &&<Form className={productStyle.container} reportSubmit onSubmit={this.getFormId}>
          <View>
            {this.state.list.length>0 &&<View className={productStyle.swiper}>
              <Swiper className={productStyle.swiper}
                      circular
                      autoplay onChange={this.swiperChange} >
                {this.state.list.map((el,index) => (
                  <SwiperItem key={index} >
                    <View className='commonImg' onClick={this.previewImg.bind(this,el,this.state.list)}>
                      <Image className='commonImg' src={el} mode='aspectFill' />
                    </View>
                  </SwiperItem>
                ))
                }
              </Swiper>
              <View className={productStyle.count}>{`${this.state.nowIndex}/${this.state.list.length}`}</View>
            </View>}
            <View className={productStyle.content}>
              <Text className={productStyle.title}>{this.state.productMsg.title}</Text>
              <View className={priceWrapper}>
                <View className={productStyle.price}>{this.state.productMsg.price>0?`￥${div(this.state.productMsg.price,100)} 元`:'面议'}</View>
                {/*<View>*/}
                  {/*<Image className={productStyle.collectionImg} />*/}
                  {/*<View className={productStyle.collectionFont}></View>*/}
                {/*</View>*/}
              </View>
            </View>
          </View>
          {this.state.productMsg.detail&&<View>
            <ItemTitle title='产品详情' />
            <import src='../../components/wxParse/wxParse.wxml' />
            <template is='wxParse' data='{{wxParseData:article.nodes}}' />
          </View>}
          <View className={bottomClass}>
            <View className={leftClass}>
              <Button className={btnClass}  formType='submit' onClick={this.toIndex}>
                <Image className={productStyle.btnImg} src={indexImg} />
                <View className={productStyle.btnFont}>首页</View>
              </Button>
              <Button className={btnClass} openType='share' formType='submit'>
                <Image className={productStyle.btnImg} src={shareImg} />
                <View className={productStyle.btnFont}>分享</View>
              </Button>
            </View>
            <Button className={rightClass} formType='submit' onClick={this.makeCall.bind(this)}>联系TA</Button>
          </View>
        </Form>}
        {this.state.showNothing === true &&<Nothing nothingFont={nothingFont} url={nothingUrl} />}
      </View>
    )
  }
}

export default Product
