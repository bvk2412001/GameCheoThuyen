import { _decorator, Animation, Camera, Component, instantiate, Node, Prefab, tween, UIOpacity } from 'cc';
import { Boat } from './Boat';
import { CameraCtrl } from './CameraCtrl';
import { GamePlayCtrl } from './Version1/GamePlayCtrl';
import { SoundGameMaganer } from './SoundGameMaganer';
const { ccclass, property } = _decorator;

@ccclass('SelectBoat')
export class SelectBoat extends Component {
    public static instance: SelectBoat = null;

    @property(CameraCtrl)
    camera: CameraCtrl;

    @property(Node)
    public boatMidle: Node = null;

    @property(Node)
    public boats: Node[] = [];

    @property(Node)
    btnAcceptNode: Node = null;

    public numberCurrent = 1;


    public isSelect = false

    @property(Prefab)
    gameplay1: Prefab = null;

    start(): void {
        SelectBoat.instance = this;
        this.camera.node.getComponent(Camera).orthoHeight = 300

        this.firstGame()

    }

    endSelectBoat = false;

    firstGame() {
        this.scheduleOnce(() => {
            if (this.endSelectBoat == false) {
            SoundGameMaganer.instance.playThoai(9)
            this.boats.forEach((boat, index) => {
                this.scheduleOnce(() => {
                    boat.getComponent(Animation).play("NhapNhay")

                }, index * 0.4)

            })
        }
        }, 2)

        this.scheduleOnce(() => {
            this.end()
            this.scheduleOnce(() => {
                if (this.endSelectBoat == false) {
                    this.firstGame();
                }
            }, 5)
        }, 6)
    }

    btnLeft() {
        this.endSelectBoat = true;
        GamePlayCtrl.instance.timeTutorial1 = 5
        console.log(this.boats)
        SoundGameMaganer.instance.playEffect(5)
        const boat = this.boats.filter(item => item.position.x < this.boatMidle.position.x)[0];
        boat?.getComponent(Boat)?.OnClick();

        this.btnAcceptNode.getComponent(Animation).play("Scale")
        this.endSelectBoat = true;
        this.end();
    }

    btnRight() {
        GamePlayCtrl.instance.timeTutorial1 = 5
        SoundGameMaganer.instance.playEffect(5)
        this.endSelectBoat = true;
        const boat = this.boats.filter(item => item.position.x > this.boatMidle.position.x)[0];
        boat?.getComponent(Boat)?.OnClick();
        this.btnAcceptNode.getComponent(Animation).play("Scale")
        this.end();
    }


    end() {

        this.boats.forEach((boat, index) => {
            boat.getComponent(Animation).stop()
            boat.getComponent(UIOpacity).opacity = 255
        })

    }

    btnAccept() {
        this.end();
        GamePlayCtrl.instance.timeTutorial1 = 5
        GamePlayCtrl.instance.tutorial1.destroy()
        GamePlayCtrl.instance.tutorial1 = null
        SoundGameMaganer.instance.playEffect(5)
        //this.node.parent.addChild(instantiate(this.gameplay1))
        this.node.active = false
        this.boatMidle.getComponent(Boat).arrow.active = false
        this.boats.forEach(item => {
            item.getComponent(Boat).Off()

        })

        tween(this.camera.getComponent(Camera)).to(1, { orthoHeight: 512 })
            .call(() => {
                GamePlayCtrl.instance.StartGame()
                this.endSelectBoat = true;

            })
            .start();

    }

}


