export const qrProduct=(item)=>{
	return `https://aicard.i31.com/QRcode/card/?p=${item.fake_id}&u=${item.user_code}&s=${item.self_code}`
}
export const qrCourse=(item)=>{
  return `https://aicard.i31.com/QRcode/course/?p=${item.fake_id}&u=${item.user_code}&s=${item.self_code}`
}
export const qrSeeRedPacket=(item)=>{
  return `https://aicard.i31.com/QRcode/others/?code=${item.code}&user_id=${item.user_id}&r_id=${item.r_id}&num=1`
}
export const qrShareRedPacket=(item)=>{
  return `https://aicard.i31.com/QRcode/money_new/?user_id=${item.user_id}&r_id=${item.r_id}`
}
export const qrTweeter=(item)=>{
  return `https://aicard.i31.com/QRcode/tweeter/?invite_code=${item.invite_code}&invite_userId=${item.invite_userId}`
}
export const qrInfomation=(item)=>{
  return `https://aicard.i31.com/QRcode/information/?info_code=${item.info_code}&newsId=${item.newsId}`
}
export const consultation=(item)=>{
  return `https://aicard.i31.com/QRcode/consultation/?info_code=${item.info_code}&newsId=${item.newsId}`
}
export const fixedQrCode=(item)=>{
  return `https://aicard.i31.com/QRcode/fixed/?fixedId=${item.fixedId}`
}
