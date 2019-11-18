
const {ccclass, property} = cc._decorator;

@ccclass
export default class DrumController extends cc.Component {

    @property(cc.PolygonCollider)
    collider: cc.PolygonCollider = null;

    @property({type: cc.AudioClip})
    audio: cc.AudioClip = null;

    @property({type: cc.AudioClip})
    audioOut: cc.AudioClip = null;

    @property(cc.Animation)
    bodyAnimation: cc.Animation = null;

    onLoad () {
        this.node.on(cc.Node.EventType.TOUCH_START, function (touch, event) {
            var touchLocation = touch.getLocation();
            if (cc.Intersection.pointInPolygon(touchLocation, this.collider.world.points))
                this.surfaceSound(this.audio);
            else this.surfaceSound(this.audioOut);
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

    surfaceSound (audio) {
        cc.audioEngine.play(audio, false, 1);
        this.node.parent.getComponent(cc.Animation).play();
        this.bodyAnimation.play();
    }
}
