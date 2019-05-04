
//var dataStr = data.toJSONString();
//cc.log("vdataStr: " +dataStr);
//var data = eval('('+dataStr+')');

setCacheDir = function(cacheDir){
    cc.log("setCacheDir() called,cacheDir:"+cacheDir);
    cc.FileUtils.getInstance().addSearchPath(cacheDir);
};



setData = function(dataInStr){
    cc.log("setData() called,dataInStr:"+dataInStr);
    data = eval('(' + dataInStr + ')');
     cc.log("setData()data: "+data);
};

play = function(level){
    cc.log("play() called,level:"+level);
	

};

setCanPlayNext = function(canPlayBooleanStr){
	if(canPlayBooleanStr == "true"){
		canNextStage = true;
	}else{
		canNextStage = false;
	}
};

backToMain = function(arg){
	backToMainClick = true;
};



sys.callJsFun = function(funName,arg) {
	cc.log("callJsFun() called,funname:"+funName+" arg:"+arg);
	if("adLoaded" == funName){
	    addLoaded();
	}else if("setCacheDir" == funName){
	    setCacheDir(arg);
	}else if("setData" == funName){
	    setData(arg);
	}else if("play" == funName){
	    play(arg);
	}else if("setCanPlayNext" == funName){
		setCanPlayNext(arg);
	}else if("backToMain" == funName){
		backToMain(arg);
	}
};





