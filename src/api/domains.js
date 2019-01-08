const domainsFuc = (env) => {
	let domain;
	if (env === 'development') {
		// domain = 'http://localhost:8080/xcx';
		// domain = 'http://192.168.1.177:8080/xcx';
    domain='https://www.wocaonidaye.top/xcx'
	} else {
    domain='https://www.wocaonidaye.top/xcx'
  }
  return {
		domain,
	}
};
export default domainsFuc
