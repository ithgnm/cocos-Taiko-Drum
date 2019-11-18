
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Sprite)
    rightStick: cc.Sprite = null;

    @property(cc.Sprite)
    leftStick: cc.Sprite = null;

    @property(cc.PolygonCollider)
    collider: cc.PolygonCollider = null;

    @property(cc.Sprite)
    drum: cc.Sprite = null;
    
    onLoad () {
        this.node.parent.on(cc.Node.EventType.TOUCH_START, function (touch, event) {
            var touchLocation = this.node.convertToNodeSpaceAR(touch.getStartLocation());
            if (!(cc.Intersection.pointInPolygon(touch.getLocation(), this.collider.world.points))) {
                var points = this.collider.world.points;
                var location, distance = touch.getLocation().sub(points[0]).mag();
                points.forEach(point => {
                    if (point.sub(touch.getLocation()).mag() <= distance) {
                        distance = point.sub(touch.getLocation()).mag();
                        location = point;
                    }
                });
                touchLocation = this.node.convertToNodeSpaceAR(location);
            }
            if (touchLocation.x > 0) {
                this.rightStick.node.setPosition(touchLocation);
                this.rightStick.enabled = true;
                this.rightStick.node.getComponent(cc.Animation).play();
                var sequence = cc.sequence([cc.delayTime(0.3), cc.callFunc(function () {
                        this.rightStick.enabled = false;
                    }, this)
                ]);
                this.node.runAction(sequence);
            }
            else {
                this.leftStick.node.setPosition(touchLocation);
                this.leftStick.enabled = true;
                this.leftStick.node.getComponent(cc.Animation).play();
                var sequence = cc.sequence([cc.delayTime(0.3), cc.callFunc(function () {
                        this.leftStick.enabled = false;
                    }, this)
                ]);
                this.node.runAction(sequence);
            }   
        }, this); 
    }

    start () {
        this.collider = this.getComponent(cc.PolygonCollider);
        cc.director.getCollisionManager().enabled = true;
    }

    update (dt) {

    }
}