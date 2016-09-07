import { Component } from '@angular/core';
import { NavController,Platform } from 'ionic-angular';
import { ImagePicker,Camera,Contacts,Transfer,File,AppVersion,BarcodeScanner,BatteryStatus,Brightness,CameraPreview,Device,Sim, SMS,Flashlight,DeviceMotion,Screenshot} from 'ionic-native';
declare var PhotoViewer:any;
declare var cordova: any;

@Component({
  templateUrl: 'build/pages/account/account.html',
})

export class AccountPage {

	private user : any;
	private sexShow = true;
	private nicknameShow = true;
	private avatarShow = true;
	private newNickname = '';
  private downloadImgUrl = '';
  private screenshotUrl = '';

  //摇一摇相关系数
  private lastX:number;
  private lastY:number;
  private lastZ:number;
  private moveCounter:number = 0;

  constructor(private platform:Platform,private navCtrl: NavController) {
  	this.user = {
  		imgurl:'./images/hot_pic3.png',
  		nickname:'阿良',
  		sex:'男'
  	}
  }

  //显示修改信息的box
  showSelectBox(className){
  	 switch (className) {
  	 	case "sex":
  			this.sexShow = false;
  	 		break;
  	 	case "avatar":
  	 		this.avatarShow = false;
  	 		break;
  	 	case "nickname":
  	 		this.nicknameShow = false;
  	 		break;
  	 	default:
  	 		break;
  	 }
  }

  //选择相册内图片
  ablum(){
  	let options = {
	    maximumImagesCount: 1,
	    width: 400,
	    height: 400,
	    quality: 80
	};
  	ImagePicker.getPictures(options).then((results) => {
	  for (var i = 0; i < results.length; i++) {
        this.transferUpLoad(results[i]);
	      this.user.imgurl = results[i];
	      this.avatarShow = true;
	  }
	}, (err) => { });
  }

  //调用相机拍照
  camera(){
  	let options = {
  		quality:80,
  		saveToPhotoAlbum:true,
  		correctOrientation:true,
  	};
  	Camera.getPicture(options).then((imageData) => {
	 	// If it's base64:
	 	// let base64Image = 'data:image/jpeg;base64,' + imageData;
	 	//return url
     //上传头像
    this.transferUpLoad(imageData);
	 	this.user.imgurl = imageData;
    this.avatarShow = true;
	}, (err) => {
	 // Handle error
	});
  }

  //换昵称
  changeNickname(){
  	if(this.newNickname){
  		this.user.nickname = this.newNickname;
  	}
  	this.nicknameShow = true;
  }

  //换性别
  changeSex(sex){
  	this.user.sex = sex;
  	this.sexShow = true;
  }

  //通讯录
  contact(){
    /*下面代码为查找通讯录*/
    let options = {
        filter   : "王",
        multiple : true,
        hasPhoneNumber : true
    };
      Contacts.find(['*'], options).then(
        (contacts) => {
          alert(JSON.stringify(contacts));
        },
        (error)=>{
          alert('error');
        }
      )
    /*下面代码为添加通讯录
    let contact = Contacts.create();
    contact.displayName = '刘亚东';
    contact.nickname = "Yado";
    contact.save().then(
      () => {
        alert('success');
      },
      (error: any) => {
        alert('error');
      }
    );
    */
  }

  //上传图片
  transferUpLoad(imgurl) {
    const fileTransfer = new Transfer();
    let uploadImgUrl = encodeURI("http://192.168.2.105/group1/mm_upload/index.php/Webservice/V100/file_upload");
    var options: any;
    options = {
      fileKey: 'temp_file',
      headers: {},
      params: {
        keytype:1,
        keyid:0,
        duration:0,
        orderby:0,
        content:'无'
        // 'id': this.id  //接口需要上传的参数
      }
    }
    fileTransfer.upload(imgurl, uploadImgUrl, options)
      .then((data) => {
        let result = JSON.stringify(data);
        alert(result);
      }, (err) => {
        let result = JSON.stringify(err);
        alert(result);
      })
  }

  //打电话
  callIT(passedNumber){
    //You can add some logic here
     window.location = passedNumber;
  }

  //保存图片
  //点判断路径是否存在，不存在则创建，存在则直接保存
  savePage(){

      const fileTransfer = new Transfer();
      const imageLocation = "http://www.bz55.com/uploads/allimg/120929/1-120929143930.jpg";

      let targetPath;

      if(!this.platform.is('cordova')) {
        return false;
      }

      if (this.platform.is('ios')) {
        targetPath = cordova.file.documentsDirectory + '/mm_skinh/test.png';
      }
      else if(this.platform.is('android')) {
        alert('android');
        targetPath = cordova.file.externalRootDirectory+ '/mm_skinh/test.png';
      }
      else {
        return false;
      }

      //先检测路径是否存在(安卓)
      File.checkDir(cordova.file.externalRootDirectory,'mm_skinh').then(
          (data)=>{
            alert('dir exist');
            fileTransfer.download(imageLocation, targetPath)
            .then(
                (result) => {
                  alert(JSON.stringify(result));
                  alert(result.toURL());
                  this.downloadImgUrl = result.toURL();
                })
            .catch(
                  (error) => {
                    alert(JSON.stringify(error));
                  }
                )
    }
       ).catch(
         (error)=>{
           alert('dir not exixt');
           //先创建目录
           File.createDir(cordova.file.externalRootDirectory,'mm_skinh',false).then(
               (data)=>{
                   fileTransfer.download(imageLocation, targetPath)
                  .then(
                      (result) => {
                        alert(JSON.stringify(result));
                        alert(result.toURL());
                        this.downloadImgUrl = result.toURL();
                      })
                  .catch(
                        (error) => {
                          alert(JSON.stringify(error));
                        }
                      )
               }
             ).catch(
               (error)=>{
                 alert(JSON.stringify(error));
               }
             )
         }
       )
  }

  //查看app版本
  getVersion(){
    AppVersion.getAppName()
    .then(
      function(data){
        alert(JSON.stringify(data));
      }
      );
    AppVersion.getPackageName()  
      .then(
      function(data){
        alert(JSON.stringify(data));
      }
      );
    AppVersion.getVersionCode()   
     .then(
      function(data){
        alert(JSON.stringify(data));
      }
      );
    AppVersion.getVersionNumber()  
      .then(
      function(data){
        alert(JSON.stringify(data));
      }
      );
  }

  //扫描二维码
  getCode(){
    BarcodeScanner.scan().then((barcodeData) => {
       alert(JSON.stringify(barcodeData));
    }, (err) => {
       alert(JSON.stringify(err));
    });
  }

  //查看电池电量
  getBattery(){
    // watch change in battery status
    let subscription = BatteryStatus.onChange().subscribe(
     (status) => {
       alert('电量:'+status.level+'--充电:'+status.isPlugged);
     }
    );
  }

  //设置屏幕亮度
  setLight(){
    let brightnessValue: number = 0.1;
    Brightness.setBrightness(brightnessValue);
  }

  //查看设备信息
  getDevice(){

    alert('Device UUID is: ' + JSON.stringify(Device.device));
  }

  //打开手电筒
  startLight(){
    Flashlight.switchOn().then(
        (data)=>{
          alert(JSON.stringify(data));
        }
      )
  }

  //关闭手电筒
  stopLight(){
        Flashlight.switchOff().then(
        (data)=>{
          alert(JSON.stringify(data));
        }
      )
  }

  //截屏
  screenHot(){
    // Take a screenshot and save to file
    Screenshot.save('jpg', 80, 'myscreenshot').then((data)=>{
      alert(JSON.stringify(data));
      this.screenshotUrl = data.filePath;
    },(error)=>{
      alert(JSON.stringify(error));
    });
  }

  //监听摇一摇
  shake(){
    var subscription = DeviceMotion.watchAcceleration({frequency:200}).subscribe(acc => {
          if(!this.lastX) {
            this.lastX = acc.x;
            this.lastY = acc.y;
            this.lastZ = acc.z;
            return;
          }

          let deltaX:number, deltaY:number, deltaZ:number;
          deltaX = Math.abs(acc.x-this.lastX);
          deltaY = Math.abs(acc.y-this.lastY);
          deltaZ = Math.abs(acc.z-this.lastZ);

          if(deltaX + deltaY + deltaZ > 6) {
            this.moveCounter++;
          } else {
            this.moveCounter = Math.max(0, --this.moveCounter);
          }

          if(this.moveCounter > 2) { 
            alert('SHAKE');
            this.moveCounter=0; 
          }

          this.lastX = acc.x;
          this.lastY = acc.y;
          this.lastZ = acc.z;

        }
      )
  }

  //获取sim卡信息
  sim(){
    Sim.getSimInfo().then(
      (info) => alert(JSON.stringify(info)),
      (err) => console.log('Unable to get sim info: ', err)
    );
  }

  //发送短信
  sms(){
    // Send a text message using default options
    SMS.send('15154102101', 'Hello world!').then(
        (data)=>{
          alert(JSON.stringify(data));
        }
      );
  }
  ionViewWillLeave(){
  	console.log('保存');
  }
}


function download(fileEntry, uri) {

    var fileTransfer = new Transfer();
    var fileURL = fileEntry.toURL();

    fileTransfer.download(
        uri,
        fileURL).then(
          (entry)=>{
            alert("Successful download...");
            alert("download complete: " + entry.toURL());
            this.downloadImgUrl = entry.toURL();
            readFile(entry);
          }
        ).catch(
          (error)=>{
            alert("download error source " + error.source);
            alert("download error target " + error.target);
            alert("upload error code" + error.code);
          }
        )
}

function readFile(fileEntry) {
    fileEntry.file(function (file) {
        var reader = new FileReader();

        reader.onloadend = function () {

            console.log("Successful file read: " + this.result);
            // displayFileData(fileEntry.fullPath + ": " + this.result);

        };

        reader.readAsText(file);

    }, 
    (error)=>{
            alert(JSON.stringify(error));
    });
}