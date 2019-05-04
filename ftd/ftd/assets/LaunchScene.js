var LaunchScene =  cc.Scene.extend({
    winSize:null,
    pointer:null,
    circleLeft:null,
    circleRight:null,
    ctor:function () {
        this._super();
        this.winSize = cc.Director.getInstance().getWinSize();
        var spLeft = cc.Sprite.create("ex.jpg");
       spLeft.setPosition(this.winSize.width/4, this.winSize.height/2);
        this.addChild(spLeft,0);
        var spRight = cc.Sprite.create("ex.jpg");
        spRight.setPosition(this.winSize.width*3/4,this.winSize.height/2);
        this.addChild(spRight,0);

        var size  = spLeft.getContentSize();
        var scaleX = this.winSize.width / size.width;
        scaleX /=2;
        var scaleY = this.winSize.height / size.height;
        spLeft.setScaleX(scaleX);
        spLeft.setScaleY(scaleY);
        spRight.setScaleX(scaleX);
        spRight.setScaleY(scaleY);


       var spMidLine = cc.Sprite.create("HelloWorld.png",cc.rect(0, 0, 2, 450));
      spMidLine.setPosition(this.winSize.width / 2, this.winSize.height / 2);
      spMidLine.setScaleY(this.winSize.height / spMidLine.getContentSize().height);
      this.addChild(spMidLine,0);

      var sp = cc.Sprite.create("bird.png");
      sp.setPosition(300,200);
      this.addChild(sp,0);

        this.circleLeft = cc.Sprite.create("circle.png");
        this.circleLeft.setPosition(300,200);
       this.addChild(this.circleLeft,0);
       this.circleLeft.setVisible(false);

       this.circleRight = cc.Sprite.create("circle.png");
       this.circleRight.setPosition(this.winSize.width/2 + 300,200);
       this.addChild(this.circleRight,0);
       this.circleRight.setVisible(false);

       this.pointer = cc.Sprite.create("pointer.png");
       this.pointer.setPosition(500,0);
       this.addChild(this.pointer,0);

        var moveTo = cc.MoveTo.create(1.0, cc.p(300,160));
        var callFuncShowFind = cc.CallFunc.create(this.showFind, this);
        var delay = cc.DelayTime.create(1.0);
        var callFuncReplay = cc.CallFunc.create(this.replay,this);
        this.pointer.runAction(cc.RepeatForever.create(cc.Sequence.create(moveTo,callFuncShowFind,delay,callFuncReplay)));
       this.initMenu();

    
     },
      showFind:function(sender){
           this.circleLeft.setVisible(true);
           this.circleRight.setVisible(true);
      },
      replay:function(sender){
        this.pointer.setPosition(500,0);
        this.circleLeft.setVisible(false);
        this.circleRight.setVisible(false);

        var t = new Date();
        var hours = (t.getHours() > 9) ? t.getHours() : ("0" + t.getHours());//获取系统小时(其实并没有什么卵用)
        var minutes = (t.getMinutes() > 9) ? t.getMinutes() : ("0" + t.getMinutes());//获取系统分钟(也并没有什么卵用)
        var seconds = (t.getSeconds() > 9) ? t.getSeconds() : ("0" + t.getSeconds());//这个是毫秒(需要用到哦)
        var str = "" + hours + ":" + minutes+ ":" +seconds;//拼接起来就是时间了
        cc.log(str);
      },

    onEnter:function () {
      this._super();

    },
    initMenu:function(){
        var spriteNormal = cc.Sprite.create("blue_boxCross.png");
        var spriteNorma2 = cc.Sprite.create("blue_boxCross.png");
        spriteNorma2.setScale(1.1);
        var item1 = cc.MenuItemSprite.create(spriteNormal,spriteNorma2,this.closeClicked,this);
        item1.setPosition(this.winSize.width - 50, this.winSize.height - 50);
        item1.setScale(gameScale.minScale * 2);
        
        spriteNormal = cc.Sprite.create("btn-play-normal.png");
        spriteNorma2 = cc.Sprite.create("btn-play-selected.png");
        var itemPlay = cc.MenuItemSprite.create(spriteNormal,spriteNorma2,this.startGame,this);
        itemPlay.setPosition(this.winSize.width/2, this.winSize.height/2 );

        var actionTo = cc.ScaleTo.create(0.5, 1.2);
        var actionBack = cc.ScaleTo.create(0.2,1.0);
        var seq = cc.Sequence.create(actionTo, cc.DelayTime.create(0.25), actionBack);
        itemPlay.runAction(cc.RepeatForever.create(seq));

        spriteNormal = cc.Sprite.create("btn-about-normal.png");
        spriteNorma2 = cc.Sprite.create("btn-about-selected.png");
        var itemAbout = cc.MenuItemSprite.create(spriteNormal,spriteNorma2,this.showAbout,this);
        itemAbout.setPosition(this.winSize.width - 100, 100 );



        var menu = cc.Menu.create(itemPlay,itemAbout,item1);
        menu.setPosition(0,0);
        this.addChild(menu,2);



     },
     showAbout:function(sender){
        cc.log("showAbout()");
         var director = cc.Director.getInstance();

        director.pushScene(new AboutScene());
     },

     startGame:function(sender){
        cc.log("startGame()");
        
        var director = cc.Director.getInstance();

        director.pushScene(new MyScene());
     },
     closeClicked:function(sender){
       cc.log("sprite clicked!");
       cc.Director.getInstance().end();
    }

});