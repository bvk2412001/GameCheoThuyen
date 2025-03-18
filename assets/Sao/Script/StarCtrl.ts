import { _decorator, Animation, Camera, Canvas, Component, director, EventMouse, instantiate, Label, log, Node, randomRange, randomRangeInt, Skeleton, sp, Sprite, SpriteFrame, Tween, tween, UIOpacity, UITransform, Vec2, Vec3 } from 'cc';
import { SoundManager } from './SoundManager';
import { SoundGameMaganer } from '../../scripts/SoundGameMaganer';
import { GamePlayCtrl } from '../../scripts/Version1/GamePlayCtrl';
const { ccclass, property } = _decorator;

@ccclass('StarCtrl')
export class StarCtrl extends Component {
    @property(Node)
    nodetinhsao: Node
    @property(Node)
    board: Node
    @property(Node)
    stars: Node[] = []

    public static instance: StarCtrl
    protected __preload(): void {
        if (StarCtrl.instance != null) return;
        StarCtrl.instance = this
    }

    protected start(): void {
    }

    diem = 0
    showNode() {


        console.log(`[RESULT]: ${((new Date().getTime() - GamePlayCtrl.instance.startTime) / 1000).toFixed(2)} - ${this.diem}`)
        SoundManager.instance.playEndgame()
        this.nodetinhsao.active = true;
        tween(this.nodetinhsao).to(0.5, { scale: new Vec3(0.4, 0.4, 1) })
            .call(() => {
                tween(this.board).to(0.5, { scale: new Vec3(1, 1, 1) })
                    .call(() => {
                        this.ShowStars()
                    })
                    .start();
            })
            .start();
    }

    btnReset() {
        SoundManager.instance = null;
        StarCtrl.instance = null;
        director.loadScene("Game")
        //
    }

    btnBackGame() {
        console.log("[ACTION]: BACK")
    }

    btnNextGame() {
        console.log("[ACTION]: NEXTGAME")
    }

    btnListgame() {
        console.log("[ACTION]: SHOWLISTGAME")
    }



    ShowStars() {
        this.stars.forEach((node, index) => {
            if (index < this.diem) {
                this.scheduleOnce(() => {
                    tween(node).to(0.2, { scale: new Vec3(1, 1, 1) })
                        .call(() => {
                            node.getComponent(Animation).play("scale")
                            SoundManager.instance.playSao()
                        })
                        .start()

                }, 0.2 * index)
            }
        })
    }


    SetDiem(diem) {
        this.diem = diem
    }



}


