import { _decorator, CCInteger, Component, Input, Node, Sprite, tween } from 'cc';
import { SelectBoat } from './SelectBoat';
import { SoundGameMaganer } from './SoundGameMaganer';
import { GamePlayCtrl } from './Version1/GamePlayCtrl';
const { ccclass, property } = _decorator;

@ccclass('Boat')
export class Boat extends Component {
    @property(Node)
    select: Node

    @property(Node)
    arrow: Node

    @property(CCInteger)
    numberCard: number = 0

    protected start(): void {
        this.node.on(Input.EventType.TOUCH_END, this.OnClick, this)
        this.arrow = this.node.getChildByName("arrow")
        this.select = this.node.getChildByName("select")
    }


    OnClick() {
        if (this.numberCard == SelectBoat.instance.numberCurrent || SelectBoat.instance.isSelect == true) return;
        GamePlayCtrl.instance.timeTutorial1 = 5
        SoundGameMaganer.instance.playEffect(5)
        SelectBoat.instance.isSelect = true
        let pos = SelectBoat.instance.boatMidle.position.clone()
        let pos1 = this.node.position.clone()
        SelectBoat.instance.boatMidle.getComponent(Boat).SetNormal()
        tween(this.node).to(0.5, { position: pos })
            .call(() => {
                SelectBoat.instance.btnAcceptNode.active = true
                SelectBoat.instance.isSelect = false
                SelectBoat.instance.boatMidle = this.node
                this.SetSelect()
                SelectBoat.instance.numberCurrent = this.numberCard
                SelectBoat.instance.isSelect = false
            })
            .start()
        tween(SelectBoat.instance.boatMidle).to(0.5, { position: pos1 }).start()

    }

    SetSelect() {
        this.arrow.active = true
        this.select.active = true

    }

    SetNormal() {
        this.arrow.active = false
        this.select.active = false
    }


    Off() {
        this.node.off(Input.EventType.TOUCH_END, this.OnClick, this)
    }
}


