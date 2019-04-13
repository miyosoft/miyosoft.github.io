var AboutScene =  cc.Scene.extend({
    winSize:null,
    ctor:function () {
        this._super();
        this.winSize = cc.Director.getInstance().getWinSize();
        var layer = cc.LayerColor.create(cc.c4b(85,148,255, 128), this.winSize.width, this.winSize.height);
         layer.ignoreAnchorPointForPosition(false);
         layer.setPosition(this.winSize.width / 2, this.winSize.height / 2);
         this.addChild(layer,0);
       this.initInfo();
     },
     onEnter:function () {
          this._super();
          sys.reflection.callJavaFun("showBanner","true");
      },
     onExit:function(){
        this._super();
        sys.reflection.callJavaFun("showBanner","false");
     },

    initInfo:function(){
        var spriteNormal = cc.Sprite.create("blue_boxCross.png");
        var spriteNorma2 = cc.Sprite.create("blue_boxCross.png");
        spriteNorma2.setScale(1.1);
        var item1 = cc.MenuItemSprite.create(spriteNormal,spriteNorma2,this.closeClicked,this);
        item1.setPosition(this.winSize.width - 50, this.winSize.height - 50);
		item1.setScale(gameScale.minScale * 2);

        var menu = cc.Menu.create(item1);
        menu.setPosition(0,0);
        this.addChild(menu,1);

        var infoTTF = cc.LabelTTF.create("Welcome to I Love FTD","Arial",36);
        infoTTF.setPosition(this.winSize.width/2,this.winSize.height / 2 + 250);
        this.addChild(infoTTF,2);

        infoTTF = cc.LabelTTF.create("This app does NOT collect information \n that identifies you, like name,address,\n"+
        "email info, telephone etc.\n "+
        "This app will use some information(like\n"+
        " including but not limited to language,\n"+
        "country,installed apps,advertise id,ip address) \n"+
        "to improve our app.This infomation could be \n " +
         "use in third party advertisement.\n" +
         "All the photos  are free to use in these game."
        ,"Arial",24);

        infoTTF.setPosition(this.winSize.width/2,this.winSize.height / 2);
        this.addChild(infoTTF,2);

        infoTTF = cc.LabelTTF.create( "Have a good play","Arial",28);
        infoTTF.setPosition(this.winSize.width/2,this.winSize.height / 2 - 250);
        this.addChild(infoTTF,2);


     },

     closeClicked:function(sender){
       cc.log("sprite clicked!");
       cc.Director.getInstance().popScene();
    }

});