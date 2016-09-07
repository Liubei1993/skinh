import 'rxjs/add/operator/map';
import {Config} from '../../config';

/*
聊天基础类
*/
export class Chat {
	/*
	public socket = (<any>window).tlantic.plugins.socket;
	private config = new Config();

  	constructor() {}

  	//连接聊天服务器
  	connect(){
  		return new Promise(resolve => {
	  	    this.socket.connect(
		        (chatId)=>{
		          	this.config.sys_chat_id = chatId;
		          	resolve(chatId);
		      	},
		      	(error)=>{
		         	alert("对不起，您的网络不通，请重试!");
		      	},
		      	this.config.sys_chat_ip,
		      	this.config.sys_chat_port
	      	);
		});
  	}

  	//发送数据
  	send(){
  		return new Promise(resolve => {
	  		let data = {token:'',username:'xx'};
	        this.socket.send(
	        	(result)=>{
	          		console.log(result);
	          		resolve(result);
	        	},
	        	(error)=>{
	          		console.log(error);
	        	},
	        	this.config.sys_chat_id,
	        	data
	        )
        });
  	}

  	//断开连接
  	disconnect(){
  		return new Promise(resolve => {
	  		this.socket.disconnect(
			  (result) => {
			    console.log(result);  
			    resolve(result);
			  },
			  (error) => {
			    console.log(error);
			  },
			  this.config.sys_chat_ip
			);
		});
  	}

  	//判断是否连接
  	isConnected(){
  		return new Promise(resolve => {
	  		this.socket.isConnected(
			  	this.config.sys_chat_id,
			  	(result) => {
			    	console.log(result); 
			    	resolve(result);
			  	},
			  	(error) => {
			    	console.log(error);
			  	}
			)
		});
  	}
  	*/
}
