var PicLayer = cc.Layer.extend({
	diffArea:[],
	spLeft:null,
	spRight:null,
	winSize: null,
	posLable:null,
    level:null,
	findCount:0,
	findTTF:null,


    ctor:function () {
        this._super();

        this.init();
         if( 'touches' in sys.capabilities )
            this.setTouchEnabled(true);
        else if ('mouse' in sys.capabilities )
            this.setMouseEnabled(true);

    },
	onEnter:function(){
		this._super();
		this.winSize = cc.Director.getInstance().getWinSize();
		this.initSprite();
        this.initMidLine();
	},
	initData:function(pJobj){
        this.level = pJobj.level;
		this.diffArea = pJobj.diffArea;
        for(var i = 0; i<this.diffArea.length; i++){
            this.diffArea[i].isfind = false;
        }
	},

	initMidLine:function(){
        this.findTTF = cc.LabelTTF.create(""+this.findCount +"/"+this.diffArea.length,"Arial",32);
        this.findTTF.setPosition(this.winSize.width /2, this.winSize.height - 50);
        this.addChild(this.findTTF,2);
        this.findTTF.setVisible(false);


	},

	initSprite:function(){
		this.spLeft = cc.Sprite.create(""+this.level+"_"+"1.jpg");
		this.spLeft.setPosition(this.winSize.width/4, this.winSize.height/2);
		this.addChild(this.spLeft,1);

        var scaleSize = getScaleWinSize({width:552,height:552});
        var picBgColorLayer = cc.LayerColor.create(cc.c4b(255, 255, 255, 255), scaleSize.width,scaleSize.height);
        picBgColorLayer.setPosition(this.winSize.width/4 - scaleSize.width/2, this.winSize.height/2 - scaleSize.height/2);
        this.addChild(picBgColorLayer,0);

		this.spRight = cc.Sprite.create(""+this.level+"_"+"2.jpg");
		this.spRight.setPosition(this.winSize.width*3/4,this.winSize.height/2);
		this.addChild(this.spRight,1);

        picBgColorLayer = cc.LayerColor.create(cc.c4b(255, 255, 255, 255), scaleSize.width,scaleSize.height);
        picBgColorLayer.setPosition(this.winSize.width*3/4 - scaleSize.width/2, this.winSize.height/2 - scaleSize.height/2);
        this.addChild(picBgColorLayer,-1);


        var size  = this.spLeft.getContentSize();
        scaleSize = getScaleWinSize({width:540,height:540});
        cc.log("initSprite():" + scaleSize.height +" " + scaleSize.width);
        this.spLeft.setScaleX(scaleSize.width / size.width);
        this.spLeft.setScaleY(scaleSize.height / size.height);
        this.spRight.setScaleX(scaleSize.width / size.width);
        this.spRight.setScaleY(scaleSize.height / size.height);

		this.posLable = cc.LabelTTF.create("0,0", "Arial", 20);
		this.posLable.setPosition(20,winSize.height - 20);
		this.posLable.setAnchorPoint(0,0.5);
		this.addChild(this.posLable,1);
        this.posLable.setVisible(false);


		// for(var i = 0; i<this.diffArea.length; i++){
  //           var sp = cc.Sprite.create("bird0_0.png");
  //           sp.setPosition(this.diffArea[i].pos.x,this.diffArea[i].pos.y);
  //           this.spLeft.addChild(sp,1);
  //       }
//         for(var i = 0; i<this.diffArea.length; i++){
//             var sp = cc.Sprite.create("circle.png");
//             sp.setPosition(this.diffArea[i].pos.x,this.diffArea[i].pos.y);
//             this.spRight.addChild(sp,1);
//         }
        
        
	},

	particleFind:function(pos){
	    cc.log("particleFind()");
	    var particle = cc.ParticleExplosion.create();
	    particle.initWithTotalParticles(10);
	    particle.setDuration(1.0);
	    particle.setPosition(pos);
	    particle.setTexture(cc.TextureCache.getInstance().addImage("snow.png"));
	    particle.setAutoRemoveOnFinish(true);

	    this.spLeft.addChild(particle,5);
        
        particle = cc.ParticleExplosion.create();
        particle.initWithTotalParticles(10);
        particle.setDuration(1.0);
        particle.setPosition(pos);
        particle.setTexture(cc.TextureCache.getInstance().addImage("snow.png"));
        particle.setAutoRemoveOnFinish(true);

        this.spRight.addChild(particle,5);
	},

	isTouchPosfindDiff:function(pos){
        var isfind = false;
        var leftPos = this.spLeft.convertToNodeSpace(pos);
        cc.log("isfindDiff nodeSpace left at: " + leftPos.x + " " + leftPos.y  );
        var findIndex = -1;
        for(var i = 0; i<this.diffArea.length; i++){
            var diffpos = this.diffArea[i].pos;
            var r = this.diffArea[i].r;
            if(cc.pDistance(diffpos,leftPos) < r && this.diffArea[i].isfind == false){
                this.posLable.setString("youfind left one");
                isfind = true;
                findIndex = i;
                break;
            }
        }
        if(!isfind){
            var rightPos = this.spRight.convertToNodeSpace(pos);
            cc.log("isfindDiff nodeSpace right at: " + rightPos.x + " " + rightPos.y  );
            for(var i = 0; i<this.diffArea.length; i++){
                var diffpos = this.diffArea[i].pos;
                var r = this.diffArea[i].r;
                if(cc.pDistance(diffpos,rightPos) < r && this.diffArea[i].isfind == false){
                    this.posLable.setString("youfind right one");
                    isfind = true;
                    findIndex = i;
                    break;
                }
            }
        }
        return findIndex;
	},
	tipDiff:function(){
	    for(var i = 0;i<this.diffArea.length; i++){
	        if(!this.diffArea[i].isfind){
                this.findDiffAtIndex(i);
                break;
	        }
	    }
	},
	onTouchesBegan:function(touches, event){
		if(touches.length <= 0){
		    return;
		}
		pos = touches[0].getLocation();
		cc.log("onTouchBegan at: " + pos.x + " " + pos.y  );
		this.posLable.setString("began:"+Math.round(pos.x)+","+Math.round(pos.y));
        var findIndex = this.isTouchPosfindDiff(pos);
        if(findIndex != -1){
            this.findDiffAtIndex(findIndex);
        }
	},
	findDiffAtIndex:function(index){
	    cc.log("findDiffAtIndex()");
	    var findPos = this.diffArea[index].pos;
        var sp = cc.Sprite.create("circle.png");
        sp.setPosition(findPos.x,findPos.y);
        sp.setScale(this.diffArea[index].r / 64.0);
        this.spRight.addChild(sp,1);

        sp = cc.Sprite.create("circle.png");
        sp.setPosition(findPos.x,findPos.y);
        sp.setScale(this.diffArea[index].r / 64.0);
        this.spLeft.addChild(sp,1);

        this.diffArea[index].isfind = true;
        
        this.findCount ++;
        this.findTTF.setString(""+this.findCount +"/"+this.diffArea.length);
        this.particleFind(findPos);

        this.getParent().findDiffCount(this.findCount);

        if(this.isAllFind()){
            this.posLable.setString("isAllFinded");
            this.getParent().gameFinish();
        }

	},

    isAllFind:function(){
        var isAll = true;
        for(var i = 0; i<this.diffArea.length; i++){
            if(!this.diffArea[i].isfind){
                isAll = false;
                break;
            }
        }
        return isAll;
    },

    onTouchesEnded:function (touches, event) {
        if (touches.length <= 0)
            return;

        var touch = touches[0];
        var pos = touch.getLocation();
        cc.log("onTouchesEnded at: " + pos.x + " " + pos.y  );
//        posLable.setString("began:"+pos.x+","+pos.y);
    }
});