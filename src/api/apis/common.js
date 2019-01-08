import fetch from '../request'
//首页banner
export const getBanner = (params) => fetch('/company/banner', params, 'GET', {
  unPrivate: true
});
//首页新品推荐
export const getNewList = (params) => fetch('/product/getNew', params, 'GET', {
  unPrivate: true
});
//首页猜你想要
export const getRecommendList = (params) => fetch('/product/pageRecommend', params, 'POST', {
  unPrivate: true,
  loading:true
});
//分类获取产品分类
export const getProductType = (params) => fetch('/company/productType', params, 'GET', {
  unPrivate: true
});
//分类获取分类产品
export const getProductList = (params) => fetch('/product/pageByType', params, 'POST', {
  unPrivate: true,
  loading:true
});
//产品搜索
export const getSearchProductList = (params) => fetch('/product/search', params, 'POST', {
  unPrivate: true,
  loading:true
});
//产品详情
export const getProductDetail = (params) => fetch('/product/detail', params, 'GET', {
  unPrivate: true,
  loading:true
});
//获取公司信息
export const getCompanyInfo = (params) => fetch('/company/getById', params, 'GET', {
  unPrivate: true,
  loading:true
});
