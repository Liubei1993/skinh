

/*
	将json数组转变为"name=xx&password=yy"的形式
*/
export function json_to_string(params){
	if(params != {}){
		//用于处理请求中body格式
	    let bodyStr = [];
	    for (let item in params) {
	      bodyStr.push(item + '=' + params[item])
	    }
	    return bodyStr.join('&');
	}else{
		return '';
	}
}