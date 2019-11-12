
const {ccclass, property} = cc._decorator;

@ccclass
export default class PlayButtonController extends cc.Component {

    @property
    isPlay: Boolean = false;

    @property({type: cc.AudioClip})
    audio: cc.AudioClip = null;

    onLoad () {
    }

    start () {
        if (this.audio != null) {
            var audioID = cc.audioEngine.play(this.audio, false, 0.3);
            cc.audioEngine.pause(audioID);
            this.node.on(cc.Node.EventType.TOUCH_START, function (touch, event) {
                this.audioPlay(audioID);
            }, this);  
        } 
    }

    update (dt) {

    }

    audioPlay(audioID) {
        if (!this.isPlay) {
            cc.audioEngine.resume(audioID);
            this.isPlay = true;
        }
        else {
            cc.audioEngine.pause(audioID);
            this.isPlay = false;
        }
    }
}
