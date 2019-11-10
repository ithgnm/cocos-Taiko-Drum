
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    // LIFE-CYCLE CALLBACKS:

    @property
    speed: number = 0;

    // onLoad () {}

    start () {

    }

    update (dt) {
        this.node.setPosition(this.node.position.x -= this.speed * dt, this.node.position.y);
        if (this.node.position.x < -(this.node.parent.parent.width/2) - this.node.width/2)
            this.node.setPosition(this.node.parent.parent.width/2 + this.node.width/2, this.node.position.y);
    }
}
