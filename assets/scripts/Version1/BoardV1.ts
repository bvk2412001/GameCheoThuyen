import { _decorator, Component, Game, Label, Node, Sprite, SpriteFrame, Vec2, Vec3 } from 'cc';
import { GamePlayCtrl } from './GamePlayCtrl';
const { ccclass, property } = _decorator;

@ccclass('BoardV1')
export class BoardV1 extends Component {
    @property(Label)
    title: Label

    @property(Sprite)
    avatar: Sprite


    @property(SpriteFrame)
    listImage: SpriteFrame[] = []

    @property(Node)
    mask: Node

    data
    SetUp(data) {
        this.data = data;
        if (GamePlayCtrl.instance.version == 1) {
            this.title.string = data.number
            this.avatar.spriteFrame = this.listImage[data.type]
        }

        if (GamePlayCtrl.instance.version == 2) {
            this.title.string = data.type
            this.avatar.node.active = false
        }
        if (GamePlayCtrl.instance.version == 3) {
            this.title.fontSize = 45
            this.title.string = data.type + "="
            this.avatar.node.active = false
        }

    }
    isEat = false
    numberEat = 0
    Eat() {
        if (GamePlayCtrl.instance.version == 1) {
            this.isEat = true
            this.mask.active = true
            this.node.setScale(new Vec3(0.8, 0.8, 0.8))
            return
        }
        this.numberEat++
        if (this.numberEat < this.data.number) return
        this.isEat = true
        this.mask.active = true
        this.node.setScale(new Vec3(0.8, 0.8, 0.8))
    }


    TinhDiemVe3() {
        this.title.string = this.data.type + "=" + eval(this.data.type)
    }
}


