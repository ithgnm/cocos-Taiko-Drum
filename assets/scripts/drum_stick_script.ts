
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Sprite)
    stick: cc.Sprite = null;
    
    onLoad () {
        
    }

    start () {
        this.node.parent.on(cc.Node.EventType.TOUCH_START, function (touch, event) {
            var touchLocation = this.node.convertToNodeSpace(touch.getStartLocation());
            this.stick.node.setPosition(touchLocation);
            this.stick.enabled = true;
            var sequence = cc.sequence([cc.delayTime(0.3), cc.callFunc(function () {
                    this.stick.enabled = false;
                }, this)
            ]);
            this.node.runAction(sequence);
        }, this); 
    }

    update (dt) {

    }
}
