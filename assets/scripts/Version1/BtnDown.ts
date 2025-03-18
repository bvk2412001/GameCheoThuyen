import { _decorator, Component, Input, Node, Vec3 } from 'cc';
import { BoatCtrl } from './BoatCtrl';
import { GamePlayCtrl } from './GamePlayCtrl';
import { SoundGameMaganer } from '../SoundGameMaganer';
const { ccclass, property } = _decorator;

@ccclass('BtnDown')
export class BtnDown extends Component {
    protected start(): void {

        this.node.on(Input.EventType.TOUCH_START, () => {
            BoatCtrl.instance.huong = -1
            this.node.setScale(new Vec3(1.3, 1.3, 1))

            SoundGameMaganer.instance.playEffect(7)
        }, this)

        this.node.on(Input.EventType.TOUCH_END, () => {
            BoatCtrl.instance.huong = -0.1
            this.node.setScale(new Vec3(1, 1, 1))
        }, this)

        this.node.on(Input.EventType.TOUCH_CANCEL, () => {
            BoatCtrl.instance.huong = -0.1
            this.node.setScale(new Vec3(1, 1, 1))
        }, this)

    }
}


