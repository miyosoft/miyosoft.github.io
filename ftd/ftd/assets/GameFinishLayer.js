var GameFinishLayer = cc.Layer.extend({
    nextStageItem:null,
    onEnter: function () {
            this._super();
                 // Label Item (LabelAtlas)
                 var winSize = cc.Director.getInstance().getWinSize();
                 var spriteNormal = cc.Sprite.create("next.png");
                var spriteNorma2 = cc.Sprite.create("next.png");
                spriteNorma2.setScale(1.1);
                nextStageItem = cc.MenuItemSprite.create(spriteNormal,spriteNorma2,this.onMenuCallback,this);
                nextStageItem.setPosition(winSize.width / 2, winSize.height / 2)
                var actionTo = cc.ScaleTo.create(0.5, 1.2);
                var actionBack = cc.ScaleTo.create(0.2,1.0);
                var seq = cc.Sequence.create(actionTo, cc.DelayTime.create(0.25), actionBack);
                nextStageItem.runAction(cc.RepeatForever.create(seq));
        
                var menu = cc.Menu.create( nextStageItem);
                menu.setPosition(0,0);
                this.addChild(menu);
                cc.log("gameFinishLayer onEnter()");
                return true;

    },
    onMenuCallback:function (sender) {
        var seq = cc.Sequence.create(
            cc.Spawn.create(
                cc.ScaleTo.create(1, 0),
                cc.FadeOut.create(1)),
            cc.CallFunc.create(this.callParentNextStage, this));
        nextStageItem.runAction(seq);

    },
    callParentNextStage:function(){
        this.getParent().nextStage();
    }

});