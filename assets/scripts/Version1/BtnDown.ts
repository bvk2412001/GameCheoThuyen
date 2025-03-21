import { _decorator, Component, Input, Node, Vec3 } from 'cc';
import { BoatCtrl } from './BoatCtrl';
import { GamePlayCtrl } from './GamePlayCtrl';
import { SoundGameMaganer } from '../SoundGameMaganer';
const { ccclass, property } = _decorator;

@ccclass('BtnDown')
export class BtnDown extends Component {
    protected start(): void {

        this.node.on(Input.EventType.TOUCH_START, () => {
            if (GamePlayCtrl.instance.startGame == false) return;
            GamePlayCtrl.instance.IsUserPlay = true
            BoatCtrl.instance.huong = -1
            this.node.setScale(new Vec3(1.1, 1.1, 1.1))
            GamePlayCtrl.instance.timeManhinh = 10
            GamePlayCtrl.instance.isPlay = false

            SoundGameMaganer.instance.playEffect(7)


            GamePlayCtrl.instance.playTutorial()
        }, this)

        this.node.on(Input.EventType.TOUCH_END, () => {
            if (GamePlayCtrl.instance.startGame == false) return;
            BoatCtrl.instance.huong = -0.1
            this.node.setScale(new Vec3(1, 1, 1))
            GamePlayCtrl.instance.timeManhinh = 10
            GamePlayCtrl.instance.isPlay = false
        }, this)

        this.node.on(Input.EventType.TOUCH_CANCEL, () => {
            if (GamePlayCtrl.instance.startGame == false) return;
            BoatCtrl.instance.huong = -0.1
            this.node.setScale(new Vec3(1, 1, 1))
            GamePlayCtrl.instance.timeManhinh = 10
            GamePlayCtrl.instance.isPlay = false
        }, this)

    }
}


