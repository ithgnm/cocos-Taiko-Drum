
const {ccclass, property} = cc._decorator;

@ccclass
export default class DrumController extends cc.Component {

    @property(cc.PolygonCollider)
    collider: cc.PolygonCollider = null;

    @property({type: cc.AudioClip})
    audio: cc.AudioClip = null;

    onLoad () {
        this.node.on(cc.Node.EventType.TOUCH_START, function (touch, event) {
            var touch_location = touch.getLocation();
            if (cc.Intersection.pointInPolygon(touch_location, this.collider.world.points))
                this.surfaceSound(this.surface_type);
            else this.surfaceSound(this.surface_type + 1);
              
        }, this);
    }

    start () {
        this.collider = this.getComponent(cc.PolygonCollider);
        cc.director.getCollisionManager().enabled = true;
    }

    onDisable () {
        cc.director.getCollisionManager().enabled = false;
        cc.director.getCollisionManager().enabledDebugDraw = false;
        this.node.off(cc.Node.EventType.TOUCH_START);
    }

    update (dt) {

    }

    surfaceSound () {
        cc.audioEngine.play(this.audio, false, 1);
        this.node.parent.getComponent(cc.Animation).play();
    }
}
