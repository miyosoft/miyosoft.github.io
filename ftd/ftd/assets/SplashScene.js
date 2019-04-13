var SplashScene =  cc.Scene.extend({
    winSize:null,
    moon:null,
    moonLight1:null,
    moonLight2:null,
    moonLight3:null,
    moonLight4:null,
    ctor:function () {
        this._super();
       this.winSize = cc.Director.getInstance().getWinSize();

        var layer = cc.LayerColor.create(cc.c4b(85,148,255, 128), this.winSize.width, this.winSize.height);
        layer.ignoreAnchorPointForPosition(false);
        layer.setPosition(this.winSize.width / 2, this.winSize.height / 2);
        this.addChild(layer,0);

       this.moon = cc.Sprite.create("moon_128.png");
       var moonSize = this.moon.getContentSize();
       this.moonLight1 = cc.Sprite.create("star.png");
       var lightSize = this.moonLight1.getContentSize();
       this.moonLight1.setPosition(moonSize.width /2, moonSize.height + lightSize.height);
       this.addChild(this.moonLight1,1);

       this.moonLight2 = cc.Sprite.create("star.png");
       this.moonLight2.setPosition(moonSize.width + lightSize.height, moonSize.height/2);
       this.moonLight2.setRotation(90);
      this.addChild(this.moonLight2,1);

      this.moonLight3 = cc.Sprite.create("star.png");
     this.moonLight3.setPosition(moonSize.width/2, -lightSize.height);
     this.moonLight3.setRotation(180);
        this.addChild(this.moonLight3,1);

      this.moonLight4 = cc.Sprite.create("star.png");
     this.moonLight4.setPosition( -lightSize.height,  moonSize.height/2);
     this.moonLight4.setRotation(270);
      this.addChild(this.moonLight4,1);

      this.moonLight1.setVisible(false);
      this.moonLight2.setVisible(false);
      this.moonLight3.setVisible(false);
      this.moonLight4.setVisible(false);


    this.moonLight1.setPosition(this.winSize.width/2, this.winSize.height/2)
    this.moonLight2.setPosition(this.winSize.width/2, this.winSize.height/2)
    this.moonLight3.setPosition(this.winSize.width/2, this.winSize.height/2)
    this.moonLight4.setPosition(this.winSize.width/2, this.winSize.height/2)


        this.moon.setPosition(this.winSize.width / 2, -moonSize.height);
        this.moon.setScale((this.winSize.width /5 )/ moonSize.width);
       this.addChild(this.moon,2);

     },

    onEnter:function () {
      this._super();

      var moveToCenter = cc.MoveTo.create(0.6, cc.p(this.winSize.width/2,this.winSize.height/2));
      var delay1 = cc.DelayTime.create(0.5);
      var callFuncShow = cc.CallFunc.create(this.showLight, this);
      var delay2 = cc.DelayTime.create(2);
      var callFunc = cc.CallFunc.create(this.toLaunchScene, this);
      var seq = cc.Sequence.create(moveToCenter,delay1,callFuncShow,delay2,callFunc);
       this.moon.runAction(seq);
    },
    showLight:function(sender){
      this.moonLight1.setVisible(true);
      this.moonLight2.setVisible(true);
      this.moonLight3.setVisible(true);
      this.moonLight4.setVisible(true);

        var bound = this.moon.getBoundingBox();
      this.moonLight1.runAction(cc.MoveBy.create(0.8, cc.p(0,bound.height)));
      this.moonLight2.runAction(cc.MoveBy.create(0.8, cc.p(bound.width,0)));
      this.moonLight3.runAction(cc.MoveBy.create(0.8, cc.p(0,-bound.height)));
      this.moonLight4.runAction(cc.MoveBy.create(0.8, cc.p(-bound.height,0)));

    },
    toLaunchScene:function(sender){
        cc.Director.getInstance().replaceScene(new LaunchScene());
    }
});