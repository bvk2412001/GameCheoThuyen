import { _decorator, Camera, Component, instantiate, Node, Prefab, tween } from 'cc';
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
        SoundGameMaganer.instance.playThoai(9)
    }

    btnLeft() {
        GamePlayCtrl.instance.timeTutorial1 = 5
        console.log(this.boats)
        SoundGameMaganer.instance.playEffect(5)
        this.boats.filter(item => item.position.x < this.boatMidle.position.x)[0].getComponent(Boat).OnClick()
    }

    btnRight() {
        GamePlayCtrl.instance.timeTutorial1 = 5
        SoundGameMaganer.instance.playEffect(5)
        this.boats.filter(item => item.position.x > this.boatMidle.position.x)[0].getComponent(Boat).OnClick()
    }

    btnAccept() {
        GamePlayCtrl.instance.timeTutorial1 = 5
        GamePlayCtrl.instance.tutorial1.destroy()
        GamePlayCtrl.instance.tutorial1 = null
        SoundGameMaganer.instance.playEffect(6)
        //this.node.parent.addChild(instantiate(this.gameplay1))
        this.node.active = false
        this.boatMidle.getComponent(Boat).arrow.active = false
        this.boats.forEach(item => {
            item.getComponent(Boat).Off()

        })

        tween(this.camera.getComponent(Camera)).to(1, { orthoHeight: 512 })
            .call(() => {
                GamePlayCtrl.instance.StartGame()
            })
            .start();

    }

}


