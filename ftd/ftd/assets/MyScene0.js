var MyScene =  cc.Scene.extend({
          bgLayer:null,  
          pipeLayer:null,
          picLayer:null,
          winSize:null,
          gameFinishLyaer:null,
          tipLayer:null,
          itemNext:null,
          itemTip:null,
          itemDrop:null,
          itemAd:null,
          isToggleShow:false,
          isGameFinish:false,
          ttfTipNum:null,
          tipNum:4,
          ttfNextNum:null,
          ttfLvl:null,
          nextNum:4,
          timePassed:0,
          firstTipUseTime:0,
          firstNextUseTime:0,
          starArrGray:[],
		  starArrBright:[],

       ctor:function () {
              this._super();
              timePassed = 0;
         },
      onEnter:function () {
          this._super();
          isGameFinish = false;
           var size = cc.Director.getInstance().getWinSize();
//          var sprite = cc.Sprite.create("/sdcard/bunny1.jpg");
//          sprite.setPosition(size.width / 2, size.height / 2);
//          sprite.setScale(1.0);
//          this.addChild(sprite, 3);
//          
         


             var ls = sys.localStorage;
             this.tipNum = ls.getItem("tipNum");
             if(!this.tipNum){
                this.tipNum = 4;
             }
             cc.log("tipNum:"+this.tipNum);
             this.nextNum = ls.getItem("nextNum");
             cc.log("nextNum:"+this.nextNum);
             if(!this.nextNum){
                this.nextNum = 4;
             }
             var now = new Date();
            this.firstTipUseTime = ls.getItem("firstTipUseTime");
            if(!this.firstTipUseTime){
            	this.firstTipUseTime = 0;
            }


            this.firstNextUseTime = ls.getItem("firstNextUseTime");
            cc.log("this.firstNextUseTime:"+this.firstNextUseTime);
            if(!this.firstNextUseTime){
            	this.firstNextUseTime = 0;
            }


            winSize = size;
           bgLayer = cc.LayerColor.create(cc.c4b(109, 152, 228, 255));
            this.addChild(bgLayer); 

        // pipeLayer = new PipeBirdLayer();
        // this.addChild(pipeLayer,2);
        // pipeLayer.setMyScene(this);

        	picLayer = new PicLayer();
        	picLayer.initData(data);
        	this.addChild(picLayer,1);

			var topBgBanner = cc.LayerColor.create(cc.c4b(205, 222, 252, 255), winSize.width, 60 * gameScale.scaleY);
			topBgBanner.setPosition(getWinPos(cc.p(0,660)));
			this.addChild(topBgBanner,2);

			var spILoveFTD = cc.Sprite.create("ILoveFTD.png");
         	spILoveFTD.setScaleY(gameScale.scaleY);
         	spILoveFTD.setScaleX(gameScale.scaleX);
         	spILoveFTD.setPosition(getWinPos(cc.p(128, 688)));
         	this.addChild(spILoveFTD,2);

         	var bottomBgBanner = cc.LayerColor.create(cc.c4b(250, 188, 18, 255), winSize.width, 72 * gameScale.scaleY);
			bottomBgBanner.setPosition(getWinPos(cc.p(0,0)));
			this.addChild(bottomBgBanner,2);

	        this.ttfLvl = cc.LabelTTF.create(""+this.level,"Arial",32);
            this.ttfLvl.setPosition(getWinPos(cc.p(640,688)));
            this.addChild(this.ttfLvl,2);


//        tipLayer = new TipLayer();
//        this.addChild(tipLayer,3);
//        tipLayer.setMyScene(this);

	       	this.initMenu();

	        this.schedule(this.onTick, 0.5);
	        this.schedule(this.checkNextReady, 1);
      },
      closeClicked:function(sender){
          cc.log("sprite clicked!");
          cc.Director.getInstance().popScene();
      },
      dropDownMenu:function(sender){
        cc.log("dropDownMenu()");
        // if(!this.isToggleShow){
        //     var actionShow = cc.Show.create();
        //     var actionTo = cc.MoveTo.create(0.25, cc.p(winSize.width - 50, winSize.height - 120));
        //     var action = cc.Sequence.create(
        //                 actionShow,
        //                 actionTo);
        //      this.itemNext.runAction(action);

        //     actionShow = cc.Show.create();
        //     actionTo = cc.MoveTo.create(0.25, cc.p(winSize.width - 50, winSize.height - 190));
        //     action = cc.Sequence.create(
        //                 actionShow,
        //                 actionTo);
        //      this.itemTip.runAction(action);

        //     actionTo = cc.MoveTo.create(0.25, cc.p(winSize.width - 50, winSize.height - 260));
        //     this.itemDrop.runAction(actionTo);
        // }else{
        //     var actionHide = cc.Hide.create();
        //     var actionTo = cc.MoveTo.create(0.25, cc.p(winSize.width - 50, winSize.height - 50));
        //     var action = cc.Sequence.create(
        //                 actionTo,
        //                 actionHide);
        //      this.itemNext.runAction(action);

        //     actionHide = cc.Hide.create();
        //     actionTo = cc.MoveTo.create(0.25, cc.p(winSize.width - 50, winSize.height - 50));
        //     action = cc.Sequence.create(
        //                 actionTo,
        //                 actionHide);
        //      this.itemTip.runAction(action);

        //     actionTo = cc.MoveTo.create(0.25, cc.p(winSize.width - 50, winSize.height - 120));
        //     this.itemDrop.runAction(actionTo);
        // }

        // this.isToggleShow = !this.isToggleShow;
      },
      tipDiff:function(sender){
        cc.log("tipDiff()");
        if(this.tipNum > 0){
            picLayer.tipDiff();
            this.dropUpMenu();
            this.tipNum --;
        }
        if(this.tipNum <= 0){
            this.itemTip.setEnabled(false);
        }
        var ls = sys.localStorage;
        ls.setItem("tipNum",this.tipNum);
        this.ttfTipNum.setString(""+this.tipNum);

        if(this.firstTipUseTime == 0){
        	var now = new Date();
        	this.firstTipUseTime = now.getTime();
        	ls.setItem("firstTipUseTime",this.firstTipUseTime); 
        }
        
      },
      skipLevel:function(sender){
        cc.log("skipLevel");
        var canNext = false;
        if(this.nextNum > 0){
        	canNext = true;
            this.nextNum --;
            var ls = sys.localStorage;
	        ls.setItem("nextNum",this.nextNum);
	        this.ttfNextNum.setString(""+this.nextNum);

	        if(this.firstNextUseTime == 0){
	        	var now = new Date();
	        	this.firstNextUseTime = now.getTime();
	        	ls.setItem("firstNextUseTime",this.firstNextUseTime); 
        	}

        }

        if(this.nextNum <= 0){
            this.itemNext.setEnabled(false);
        }
        if(canNext){
			this.nextStage();
        }
      },

      findDiffCount:function(diffCountFind){
      	// if(diffCountFind > this.starArrBright.length){
      	// 	return;
      	// }
      	// for (var i = 0; i < diffCountFind; i++) 
      	{
      		var spStar = this.starArrBright[diffCountFind-1];
			spStar.setScale(gameScale.minScale * 2);
      		spStar.setVisible(true);
      		spStar.runAction(cc.ScaleTo.create(1.0, gameScale.minScale));
      	}
      },

      dropUpMenu:function(){
          // this.dropDownMenu();
          // this.itemDrop.setSelectedIndex(0);
      },
      initMenu:function(){
        var spriteNormal = cc.Sprite.create("back.png");
        var spriteNorma2 = cc.Sprite.create("back.png");
        spriteNorma2.setScale(1.1);
        var item1 = cc.MenuItemSprite.create(spriteNormal,spriteNorma2,this.closeClicked,this);
         item1.setPosition(getWinPos(cc.p(67,36)));
         item1.setScale(gameScale.minScale);

        cc.MenuItemFont.setFontName("Marker Felt");
        cc.MenuItemFont.setFontSize(34);

        // this.itemDrop = cc.MenuItemToggle.create(
        //             cc.MenuItemSprite.create(cc.Sprite.create("down-chevron.png"),cc.Sprite.create("down-chevron.png")),
        //             cc.MenuItemSprite.create(cc.Sprite.create("up-chevron.png"),cc.Sprite.create("up-chevron.png")),
        //             this.dropDownMenu, this);
        //  this.itemDrop.setPosition(winSize.width - 50,winSize.height - 120);


        spriteNormal = cc.Sprite.create("right-chevron.png");
        spriteNorma2 = cc.Sprite.create("right-chevron.png");
        spriteNorma2.setScale(1.1);
        this.itemNext = cc.MenuItemSprite.create(spriteNormal,spriteNorma2,this.skipLevel,this);
        this.itemNext.setPosition(winSize.width - 50,winSize.height - 50);
        this.itemNext.setVisible(false);

        this.ttfNextNum = cc.LabelTTF.create(""+ this.nextNum,"Arial", 32);
        this.ttfNextNum.setPosition(spriteNormal.getContentSize().width,spriteNormal.getContentSize().height);
        this.itemNext.addChild(this.ttfNextNum,2);

        spriteNormal = cc.Sprite.create("tips.png");
        spriteNorma2 = cc.Sprite.create("tips.png");
        spriteNorma2.setScale(1.1);
        this.itemTip = cc.MenuItemSprite.create(spriteNormal,spriteNorma2,this.tipDiff,this);
        this.itemTip.setPosition(getWinPos(cc.p(1110,50)));

        this.ttfTipNum = cc.LabelTTF.create(""+this.tipNum,"Arial", 48);
        this.ttfTipNum.setPosition(getWinPos(cc.p(1185,36)));
        this.ttfTipNum.setScale(gameScale.minScale);
        this.ttfTipNum.setColor(cc.c3b(223, 82, 113));
        this.addChild(this.ttfTipNum,2);

	    this.ttfLvl.setString(""+data.level);
		
		for (var i = 0; i < data.diffArea.length; i++) {
			var sp = cc.Sprite.create("star_gray.png");
			sp.setPosition(getWinPos(cc.p(780 + i*50 ,36)));
			sp.setScale(gameScale.minScale);
			this.addChild(sp,3);
			this.starArrGray[i] = sp;


			sp = cc.Sprite.create("star_bright.png");
			sp.setPosition(getWinPos(cc.p(780 + i*50 ,36)));
			sp.setScale(gameScale.minScale);
			this.addChild(sp,3);
			sp.setVisible(false);
			this.starArrBright[i] = sp;

		}


		
        var menu = cc.Menu.create(this.itemTip,this.itemNext,item1);
        menu.setPosition(0,0);
        this.addChild(menu,3);

        if(this.tipNum <= 0){
            this.itemTip.setEnabled(false);
        }
        if(this.nextNum <= 0){
            this.itemNext.setEnabled(false);
        }


      },


      onTick:function (dt) {
//             cc.log("tick nextNum:"+this.nextNum +" tipNum:"+this.tipNum +" firstNextUseTime:"+this.firstNextUseTime);
            timePassed += dt;

            var now = new Date();
            var nowTime = now.getTime();
            var timeToProduce = 1000 * 120;
            var ls = sys.localStorage;
            if(this.nextNum < 4){
            	 var dur = nowTime - this.firstNextUseTime;
            	 var numNextProduced = dur / timeToProduce;
            	 if(numNextProduced >= 1){
            	 	this.nextNum += Math.floor(numNextProduced);
            	 	this.nextNum = Number(this.nextNum);
            	 	if(this.nextNum >= 4){
            	 		this.nextNum = 4;
            	 		this.firstNextUseTime = 0;
            	 		ls.setItem("firstNextUseTime",0);
            	 	}else{
            	 		this.firstNextUseTime = nowTime;
            	 		ls.setItem("firstNextUseTime",this.firstNextUseTime);
            	 	}

					ls.setItem("nextNum",this.nextNum);
            	 	this.ttfNextNum.setString(""+this.nextNum);
            	 	this.itemNext.setEnabled(true);
            	 }else{
            	 	var timeRemain = dur % timeToProduce;
            	 	timeRemain = timeToProduce - timeRemain;
            	 	timeRemain /= 1000;
            	 	cc.log("time remain to produce Next:"+timeRemain);
            	 }
            }

            if(this.tipNum < 4){
            	var dur = nowTime - this.firstTipUseTime;
            	var numTipProduced = dur / timeToProduce;
            	if(numTipProduced >= 1){
            	 	this.tipNum += Math.floor(numTipProduced);
            	 	this.tipNum = Number(this.tipNum);
            	 	if(this.tipNum >= 4){
            	 		this.tipNum = 4;
            	 		this.firstTipUseTime = 0;
            	 		ls.setItem("firstTipUseTime",0);
            	 	}else{
            	 		this.firstTipUseTime = nowTime;
            	 		ls.setItem("firstTipUseTime",this.firstTipUseTime);
            	 	}
            	 	this.firstTipUseTime = nowTime;
					ls.setItem("tipNum",this.tipNum);
            	 	this.ttfTipNum.setString(""+this.tipNum);
            	 	this.itemTip.setEnabled(true);
            	 }else{
            	 	var timeRemain = dur % timeToProduce;
            	 	timeRemain = timeToProduce - timeRemain;
            	 	timeRemain /= 1000;
            	 	cc.log("time remain to produce Tip:"+timeRemain);
            	 }

            }


           if(isGameFinish){
                this.unschedule(this.onTick);
                cc.log("setTouche false");
               picLayer.setTouchEnabled(false);

               gameFinishLyaer = new GameFinishLayer();
               cc.log("addchild gameFinishLayer");
               this.addChild(gameFinishLyaer,3);

           }
      },
     gameStart:function(){
        bgLayer.startMoveBG();
        pipeLayer.startMovePipeBird();
        tipLayer.onGameStart();
     },
     gameFinish:function(){
        cc.log("gameFinish()");
        isGameFinish = true;
        this.itemNext.setEnabled(false);
        this.itemTip.setEnabled(false);
        this.itemDrop.setEnabled(false);
        if(this.isToggleShow){
            this.dropUpMenu();
        }
     },
      gameOver:function(){
        cc.log("gameOver() ");
//        bgLayer.stopMoveBG();
//        tipLayer.onGameOver();
      },

	checkNextReady:function(){
		if(canNextStage){
			canNextStage = false;
			var director = cc.Director.getInstance();
        	director.replaceScene(new MyScene());
        	return;
		}
		if(backToMainClick){
			backToMainClick = false;
			var director = cc.Director.getInstance();
        	director.popScene();
        	return;
		}
	},

    nextStage:function(){
       cc.log("nextStage()");
       // var director = cc.Director.getInstance();
       // director.replaceScene(new MyScene(++curLevel));
       canNextStage = false;
       sys.reflection.callJavaFun("nextStage","null");
        
    }



  });