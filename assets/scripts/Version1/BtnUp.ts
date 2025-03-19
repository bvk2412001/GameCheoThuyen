import { _decorator, Component, Input, Node, Vec3 } from 'cc';
import { BoatCtrl } from './BoatCtrl';
import { GamePlayCtrl } from './GamePlayCtrl';
import { SoundGameMaganer } from '../SoundGameMaganer';
const { ccclass, property } = _decorator;

@ccclass('BtnUp')
export class BtnUp extends Component {
    protected start(): void {

        this.node.on(Input.EventType.TOUCH_START, () => {
            if (GamePlayCtrl.instance.startGame == false) return;

            BoatCtrl.instance.huong = 1
            this.node.setScale(new Vec3(1.1, 1.1, 1))
            SoundGameMaganer.instance.playEffect(7)
            GamePlayCtrl.instance.playTutorial()

        }, this)

        this.node.on(Input.EventType.TOUCH_END, () => {
            if (GamePlayCtrl.instance.startGame == false) return;
            BoatCtrl.instance.huong = 0.1
            this.node.setScale(new Vec3(1, 1, 1))
        }, this)

        this.node.on(Input.EventType.TOUCH_CANCEL, () => {
            if (GamePlayCtrl.instance.startGame == false) return;
            BoatCtrl.instance.huong = 0.1
            this.node.setScale(new Vec3(1, 1, 1))
        }, this)

    }
}


