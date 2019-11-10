
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    // LIFE-CYCLE CALLBACKS:

    @property({
        type: [cc.AudioClip]
    })
    audio: cc.AudioClip[] = [null];

    @property
    keyCode: number = -1;

    onLoad () {
        this.node.on(cc.Node.EventType.MOUSE_DOWN, function () {
            cc.audioEngine.play(this.audio, false, 1);
        }, this);

        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, function (event) {
            if (this.keyCode != -1 && event.keyCode == this.keyCode)  
                cc.audioEngine.play(this.audio, false, 1);
        }, this);
    }

    // update (dt) {}
}
