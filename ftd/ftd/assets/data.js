var data = {
                      "level":1,
                      "hasNext":true,
                      "photoby":"小力子百合",
                      "photoUrl":"https://www.douban.com/photos/photo/2519734051",
                      "img1":"https://raw.githubusercontent.com/wsmn123123/ftd/master/1/p2519734229.jpg",
                      "img2":"https://raw.githubusercontent.com/wsmn123123/ftd/master/1/p2519734256.jpg",
                      "name":"希望的田野",
                      "isFinished":false,
                      "diffArea":[
                          {
                              "pos":{"x":100,"y":200},
                              "r":50
                          },
                          {
                              "pos":{"x":200,"y":400},
                              "r":50
                          }
                          ]
                      };

var canNextStage = false;
var backToMainClick = false;

var designedResolution = {width:1280,height:720};

var gameScale = gameScale || {};

 initGameScale = function(){
    var winSize = cc.Director.getInstance().getWinSize();
   	cc.log("winSize.width "+winSize.width);
   	cc.log("designedResolution.width "+designedResolution.width);
   	cc.log("designedResolution.height "+designedResolution.height);
    gameScale.scaleX = winSize.width / designedResolution.width;
    gameScale.scaleY = winSize.height / designedResolution.height;
    cc.log("gameScale.scaleY "+gameScale.scaleY);
    if(gameScale.scaleX > gameScale.scaleY){
       gameScale.minScale = gameScale.scaleY;
       gameScale.maxScale = gameScale.scaleX;
    }else{
       gameScale.minScale = gameScale.scaleX;
       gameScale.maxScale = gameScale.scaleY;
    }
    
 };

 getWinPos = function(designPos){
   var winSize = cc.Director.getInstance().getWinSize();
   var x = (designPos.x * winSize.width / designedResolution.width);
   var y = (designPos.y * winSize.height / designedResolution.height);
   return cc.p(x,y);
 };

 getScaleWinSize = function(designSize){
   var winSize = cc.Director.getInstance().getWinSize();
   var scaleSizeWidth = designSize.width * winSize.width / designedResolution.width;
   var scaleSizeHeight = designSize.height * winSize.height / designedResolution.height;
   return {width:scaleSizeWidth, height: scaleSizeHeight};
 };



//{
//       author:"明月",
//       levelsData:
//       [
//           {
//               photoby:"photoby",
//               leftImg:"bg_day.png",
//               rightImg:"bg_day.png",
//               level:1,
//               isFinished:false,
//               diffArea:[
//                 {pos:{x:100,y:100},r:50}
//               ]
//           },
//           {
//               photoby:"photoby",
//               leftImg:"bg_day.png",
//               rightImg:"bg_day.png",
//               level:2,
//               isFinished:false,
//               diffArea:[
//                 {pos:{x:100,y:100},r:50},
//                 {pos:{x:60,y:150},r:50},
//                 {pos:{x:150,y:180},r:50},
//                 {pos:{x:200,y:400},r:50}
//               ]
//           }
//       ]
//};

//var dataStr = data.toJSONString();
//cc.log("vdataStr: " +dataStr);
//var data = eval('('+dataStr+')');