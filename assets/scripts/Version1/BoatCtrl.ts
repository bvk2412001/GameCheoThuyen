import { _decorator, Animation, BoxCollider2D, Collider2D, Color, Component, Contact2DType, ERigidBody2DType, IPhysics2DContact, Layout, Node, ParticleSystem2D, PhysicsSystem2D, PolygonCollider2D, randomRangeInt, RigidBody, RigidBody2D, Sprite, tween, Vec2, Vec3 } from 'cc';
import { Item1 } from './Item1';
import { GamePlayCtrl } from './GamePlayCtrl';
import { BoardV1 } from './BoardV1';
import { BoatBot } from './BoatBot';
import { SoundGameMaganer } from '../SoundGameMaganer';
const { ccclass, property } = _decorator;

@ccclass('BoatCtrl')
export class BoatCtrl extends Component {
    @property(RigidBody2D)
    rigidBody2D: RigidBody2D = null!;

    @property(PolygonCollider2D)
    boxCollider2D: PolygonCollider2D = null!;


    @property(Node)
    target: Node = null!;  // Tham chiếu đến target node

    speed: number = 25  // Tốc độ di chuyển (đơn vị pixel/giây)

    speedCurrent = 20

    speedUp = 25

    public static instance: BoatCtrl = null

    speedDown = 10
    private isMovingForward: boolean = false; // Trạng thái di chuyển, true là tiến, false là lùi
    public huong = 0.1



    contain: Node
    posStart
    onLoad() {
        this.posStart = this.node.position.clone()
        BoatCtrl.instance = this
        this.rigidBody2D = this.node.getComponent(RigidBody2D)
        this.boxCollider2D = this.node.getComponent(PolygonCollider2D)
        this.boxCollider2D.sensor = false
        this.target = this.node.getChildByName("Node")
        this.rigidBody2D.enabled = true
        this.boxCollider2D.enabled = true
        this.boxCollider2D.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        PhysicsSystem2D.instance.fixedTimeStep = 1 / 120;
        this.contain = this.node.getChildByName("Containt")
        this.particleSystem = this.node.getComponentInChildren(ParticleSystem2D)

        this.node.children[5].getComponent(Animation).play("CheoThuyen")
        this.node.children[6].getComponent(Animation).play("CheoThuyen-001")
        this.node.children[7].getComponent(Animation).play("Character")
        this.node.getComponent(Animation).play("ScaleBoat")
    }


    SetSpeedUp() {
        // if (this.isChim) return
        // this.unscheduleAllCallbacks()
        // this.speed = this.speedUp
        // this.scheduleOnce(() => {
        //     this.speed = this.speedCurrent
        // }, 3)
    }

    SetSpeedDown() {
        // if (this.isChim) return
        // this.unscheduleAllCallbacks()
        // this.speed = this.speedDown
        // this.scheduleOnce(() => {
        //     this.speed = this.speedCurrent
        // }, 3)
    }

    indexdung = 0
    indexSai = 0
    isVacham: boolean = null
    isQuay: boolean = false
    isChim = false
    idItemCurrent = null
    isWall = false
    vatau = false
    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        if (this.isChim == true || GamePlayCtrl.instance.startGame == false) return

        if (otherCollider.node.name == "Wall") {
            if (this.isWall == false) {
                SoundGameMaganer.instance.playEffect(1)
                this.isWall = true
                this.scheduleOnce(() => {
                    this.isWall = false
                }, 3)
            }

        }


        if (otherCollider.node.getComponent(BoatBot)) {
            this.node.children[4].active = true
            this.node.children[3].active = false
            if (this.vatau == false) {
                SoundGameMaganer.instance.playEffect(2)
                this.vatau = true
                this.scheduleOnce(() => {
                    this.vatau = false
                }, 2)
            }

            this.scheduleOnce(() => {
                this.node.children[3].active = true
                this.node.children[4].active = false
            }, 1)

        }

        if (GamePlayCtrl.instance.version == 1) {
            this.CheckVer1(otherCollider)
        }
        if (GamePlayCtrl.instance.version == 2) {
            this.CheckVersion2(otherCollider)
        }

        if (GamePlayCtrl.instance.version == 3) {
            this.CheckVersion3(otherCollider)
        }
        if (GamePlayCtrl.instance.version == 4) {
            this.CheckVersion4(otherCollider)
        }


    }



    CheckVer1(otherCollider) {
        if (otherCollider.node.getComponent(Item1)) {
            if (this.idItemCurrent == otherCollider.node.uuid) return;
            this.idItemCurrent = otherCollider.node.uuid
            let item = otherCollider.node.getComponent(Item1)
            this.scheduleOnce(() => {
                let isCo = false
                GamePlayCtrl.instance.listBoard.children.forEach((element, index) => {
                    if (element.getComponent(BoardV1).data.type == item.data.type && element.getComponent(BoardV1).data.number == item.data.number) {
                        this.SetSpeedUp()
                        isCo = true;
                        element.getComponent(BoardV1).Eat()
                        GamePlayCtrl.instance.AddScore()
                        item.VaChamDung()
                        SoundGameMaganer.instance.playEffect(0)
                        if (this.indexdung < 1) {
                            SoundGameMaganer.instance.playKhen()
                            this.indexdung++
                        }
                        item.listAvatar.forEach((element: Node) => {
                            item.layout3.getComponent(Layout).enabled = false
                            item.layoutTop.getComponent(Layout).enabled = false
                            item.layoutBot.getComponent(Layout).enabled = false
                            let radomx = randomRangeInt(-20, 20)
                            let radomy = randomRangeInt(-30, 30)
                            tween(element).to(0.5, { worldPosition: this.contain.getWorldPosition() })
                                .call(() => {
                                    SoundGameMaganer.instance.playSo(item.data.auSo)

                                    this.contain.addChild(element)
                                    otherCollider.node.active = false
                                    element.setPosition(new Vec3(radomx, radomy, 0))
                                    element.setScale(new Vec3(0.7, 0.7, 0.7))
                                })
                                .start()
                        })
                    }
                })

                if (isCo == false) {
                    SoundGameMaganer.instance.playEffect(1)
                    item.VaChamSai()
                    this.SetSpeedDown()
                    if (this.indexSai < 2) {
                        SoundGameMaganer.instance.playSai()
                        this.indexSai++

                    }
                }

            }, 0.1)
        }
    }


    CheckVersion2(otherCollider) {
        if (otherCollider.node.getComponent(Item1)) {
            if (this.idItemCurrent == otherCollider.node.uuid) return;
            this.idItemCurrent = otherCollider.node.uuid
            let item = otherCollider.node.getComponent(Item1)
            this.scheduleOnce(() => {
                let isCo = false
                GamePlayCtrl.instance.listBoard.children.forEach((element, index) => {
                    if (element.getComponent(BoardV1).data.type == item.data.type && element.getComponent(BoardV1).isEat == false && isCo == false) {
                        item.VaChamDung()
                        this.SetSpeedUp()
                        SoundGameMaganer.instance.playEffect(0)
                        isCo = true;
                        element.getComponent(BoardV1).Eat()
                        GamePlayCtrl.instance.AddScore()
                        if (this.indexdung < 1) {
                            SoundGameMaganer.instance.playKhen()
                            this.indexdung++
                        }
                        this.scheduleOnce(() => {
                            SoundGameMaganer.instance.playChu(item.data.auChu)
                            otherCollider.node.active = false
                        }, 0.5)

                    }
                })
                if (isCo == false) {
                    this.SetSpeedDown()
                    item.VaChamSai()
                    SoundGameMaganer.instance.playEffect(1)
                    if (this.indexSai < 2) {
                        SoundGameMaganer.instance.playSai()
                        this.indexSai++

                    }

                }

            }, 0.1)
        }
    }


    CheckVersion3(otherCollider) {
        if (otherCollider.node.getComponent(Item1)) {
            if (this.idItemCurrent == otherCollider.node.uuid) return;
            this.idItemCurrent = otherCollider.node.uuid
            let item = otherCollider.node.getComponent(Item1)
            this.scheduleOnce(() => {
                let isCo = false

                if (eval(item.data.type) == eval(GamePlayCtrl.instance.bang.data.type)) {
                    item.itemDam.active = true
                    item.itemDam.getComponent(Sprite).spriteFrame = item.didam[0]
                    this.SetSpeedUp()
                    isCo = true;
                    //GamePlayCtrl.instance.bang.Eat()
                    GamePlayCtrl.instance.AddScore()

                    SoundGameMaganer.instance.playEffect(0)
                    if (this.indexdung < 1) {
                        SoundGameMaganer.instance.playKhen()
                        this.indexdung++
                    }
                    this.scheduleOnce(() => {
                        SoundGameMaganer.instance.playSo(GamePlayCtrl.instance.bang.data.auSo)
                        GamePlayCtrl.instance.bang.TinhDiemVe3()
                        this.scheduleOnce(() => {
                            GamePlayCtrl.instance.setBang()
                        }, 0.5)

                    }, 0.5)
                    this.scheduleOnce(() => {
                        otherCollider.node.active = false
                    }, 0.5)
                }

                if (isCo == false) {
                    item.VaChamSai()
                    SoundGameMaganer.instance.playEffect(1)
                    this.SetSpeedDown()
                    if (this.indexSai < 2) {
                        SoundGameMaganer.instance.playSai()
                        this.indexSai++

                    }

                }
            }, 0.1)
        }
    }
    CheckVersion4(otherCollider) {
        if (otherCollider.node.getComponent(Item1)) {
            if (this.idItemCurrent == otherCollider.node.uuid) return;
            this.idItemCurrent = otherCollider.node.uuid
            let item = otherCollider.node.getComponent(Item1)
            this.scheduleOnce(() => {
                let isCo = false

                if (item.data.type == GamePlayCtrl.instance.bang2.data.type || GamePlayCtrl.instance.removeAccents(item.data.type) == GamePlayCtrl.instance.removeAccents(GamePlayCtrl.instance.bang2.data.type1)) {
                    this.SetSpeedUp()

                    SoundGameMaganer.instance.playEffect(0)
                    item.itemDam.active = true
                    item.itemDam.getComponent(Sprite).spriteFrame = item.didam[0]
                    if (item.data.type == GamePlayCtrl.instance.bang2.data.type && GamePlayCtrl.instance.bang2.isType1 == false) {
                        GamePlayCtrl.instance.AddScore()
                        GamePlayCtrl.instance.bang2.isType1 = true
                        GamePlayCtrl.instance.bang2.lbTrc1.color = new Color(255, 197, 254, 255)
                        GamePlayCtrl.instance.bang2.lbTrc.outlineColor = new Color(255, 197, 254, 255)
                    }

                    if (GamePlayCtrl.instance.removeAccents(item.data.type) == GamePlayCtrl.instance.removeAccents(GamePlayCtrl.instance.bang2.data.type1)
                        && GamePlayCtrl.instance.bang2.isType2 == false
                    ) {
                        GamePlayCtrl.instance.bang2.isType2 = true
                        GamePlayCtrl.instance.AddScore()
                        GamePlayCtrl.instance.bang2.lbSau1.color = new Color(255, 197, 254, 255)
                        GamePlayCtrl.instance.bang2.lbSau.outlineColor = new Color(255, 197, 254, 255)
                    }

                    if (GamePlayCtrl.instance.bang2.isType1 == true && GamePlayCtrl.instance.bang2.isType2 == true) {
                        GamePlayCtrl.instance.showFull()
                    }


                    if (this.indexdung < 1) {
                        SoundGameMaganer.instance.playKhen()
                        this.indexdung++
                    }
                    isCo = true
                    this.scheduleOnce(() => {
                        otherCollider.node.active = false
                    }, 0.5)
                }

                if (isCo == false) {
                    SoundGameMaganer.instance.playEffect(1)
                    item.VaChamSai()
                    this.SetSpeedDown()
                    if (this.indexSai < 2) {
                        SoundGameMaganer.instance.playSai()
                        this.indexSai++

                    }
                }
            }, 0.1)
        }
    }

    lateUpdate(deltaTime: number) {
        if (GamePlayCtrl.instance.startGame == false) return
        this.boxCollider2D.sensor = false
        if (this.isChim == true) {
            this.rigidBody2D.linearVelocity = new Vec2(0, 0);
            return
        }
        // if (GameplayCtrl.instance.startGame == false) return
        if (!this.target || !this.rigidBody2D) return;

        // Lấy vị trí hiện tại của node và target
        let currentPosition = this.node.getWorldPosition();
        let targetPosition = this.target.getWorldPosition();

        // Tính toán vector từ vị trí hiện tại đến target
        let direction = new Vec3(
            targetPosition.x - currentPosition.x,
            targetPosition.y - currentPosition.y,
            0
        );

        // Chuẩn hóa vector hướng
        direction.normalize();

        // Tính toán vận tốc theo hướng và tốc độ (không cần deltaTime ở đây vì hệ thống vật lý tự xử lý)
        let velocity = new Vec2(direction.x * this.speed, direction.y * this.speed);
        if (!this.isMovingForward) {
            velocity.multiplyScalar(this.huong); // Đảo ngược hướng để lùi
        }
        this.rigidBody2D.linearVelocity = velocity
        if (Math.abs(this.huong) > 0.1) {
            this.particleSystem.emissionRate = 10
        }
        else {
            this.particleSystem.emissionRate = 0
        }


    }



    // Gọi hàm này khi người dùng chọn "Tiến"
    moveForward() {
        this.isMovingForward = true;  // Chuyển sang trạng thái tiến
    }

    // Gọi hàm này khi người dùng chọn "Lùi"
    moveBackward() {
        this.isMovingForward = false;  // Chuyển sang trạng thái lùi
    }
    @property(ParticleSystem2D)
    particleSystem: ParticleSystem2D = null;  // Gán hệ thống hạt trong Inspector

}


