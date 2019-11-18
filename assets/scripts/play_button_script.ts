
const {ccclass, property} = cc._decorator;

@ccclass
export default class PlayButtonController extends cc.Component {

    @property({type: cc.AudioClip})
    audio: cc.AudioClip = null;

    @property(cc.Label)
    current: cc.Label = null;

    @property(cc.Label)
    duration: cc.Label = null;

    @property
    audioSource = null;

    onLoad () {
        var isBegin = true;
        this.audioSource = this.addComponent(cc.AudioSource)
        this.node.on(cc.Node.EventType.TOUCH_START, function () {
            if (this.audio != null && isBegin) {
                this.audioSource.clip = this.audio;
                this.audioSource.volume = 0.5;
                this.audioSource.play();
                isBegin = false;
                let time = this.audioSource.getDuration();
                time = Math.round(time * 100)/100;
                this.duration.string = '/   ' + time.toString();
            }
            else if (this.audioSource.isPlaying)
                this.audioSource.pause();
            else this.audioSource.resume();
        }, this);
    }

    start () {
        
    }

    update (dt) {
        var sequence = cc.sequence([cc.delayTime(0.5), cc.callFunc(function () {
            let time = this.audioSource.getCurrentTime();
            time = Math.round(time * 100)/100;
            this.current.string = time.toString();
            }, this)
        ]);
        this.node.runAction(sequence);
    }
}
