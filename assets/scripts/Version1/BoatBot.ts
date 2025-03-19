import { _decorator, Collider2D, Component, Contact2DType, IPhysics2DContact, Node, randomRangeInt, RigidBody, Vec2, Vec3, RigidBody2D, BoxCollider2D, PolygonCollider2D, ParticleSystem2D, Layout, Animation } from 'cc';
import { GamePlayCtrl } from './GamePlayCtrl';
import { Item1 } from './Item1';
import { BoardV1 } from './BoardV1';
const { ccclass, property } = _decorator;

@ccclass('BoatBot')
export class BoatBot extends Component {
    @property(RigidBody2D)
    rigidBody2D: RigidBody2D = null!;

    @property(PolygonCollider2D)
    boxCollider2D: PolygonCollider2D = null!;

    @property(Node)
    target: Node = null!;  // Tham chiếu đến target node

    @property
    speed: number = 8; // Tốc độ di chuyển (đơn vị pixel/giây)

    private isMovingForward: boolean = true; // Trạng thái di chuyển, true là tiến, false là lùi
    @property(ParticleSystem2D)
    particleSystem: ParticleSystem2D = null;
    contain: Node



    onLoad() {
        this.rigidBody2D = this.node.getComponent(RigidBody2D)
        this.boxCollider2D = this.node.getComponent(PolygonCollider2D)
        this.rigidBody2D.enabled = true
        this.boxCollider2D.enabled = true
        this.rigidBody2D.enabledContactListener = true
        this.target = this.node.getChildByName("Node")
        this.boxCollider2D.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        this.boxCollider2D.on(Contact2DType.POST_SOLVE, this.onPostSolve, this);
        this.boxCollider2D.on(Contact2DType.END_CONTACT, this.onEndContact, this);
        this.contain = this.node.getChildByName("Containt")
        this.node.children[5].getComponent(Animation).play("CheoThuyen")
        this.node.children[6].getComponent(Animation).play("CheoThuyen-001")
        this.node.children[7].getComponent(Animation).play("Character")
        this.node.getComponent(Animation).play("ScaleBoat")
        this.particleSystem = this.node.getComponentInChildren(ParticleSystem2D)

        this.schedule(() => {
            if (GamePlayCtrl.instance.IsUserPlay == false) return;
            if (GamePlayCtrl.instance.IsUserPlay2 == false) return;
            if (this.isConvacham == false) return
            this.node.angle += randomRangeInt(-20, 20) * 30
            //this.quayxe()
        }, 0.5)
    }

    update(deltaTime: number) {
        // if(GamePlayCtrl.instance.isBotPlay == false) return;
        this.moveBoss(deltaTime);
    }
    onEndContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        if (otherCollider.node.name === "Wall" || otherCollider.node.getComponent(BoatBot)) {
            this.isConvacham = false
        }
    }


    onPostSolve(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        if (otherCollider.node.name === "Wall" || otherCollider.node.getComponent(BoatBot)) {
            this.isConvacham = true
        }
    }

    isConvacham = false


    // Hàm di chuyển boss theo hướng đến target
    moveBoss(deltaTime: number) {
        if (GamePlayCtrl.instance.startGame == false) return
        // Lấy vị trí hiện tại của node và target
        let currentPosition = this.node.getWorldPosition();
        let targetPosition = this.target.getWorldPosition();

        // Tính toán vector từ vị trí hiện tại đến target
        let direction = new Vec3(
            targetPosition.x - currentPosition.x,
            targetPosition.y - currentPosition.y,
            0 // Chúng ta chỉ cần di chuyển trong không gian 2D (x, y)
        );

        // Tính khoảng cách đến target
        let distance = direction.length();

        // Chuẩn hóa vector hướng
        direction.normalize();

        // Tính toán vận tốc theo hướng và tốc độ
        let velocity = new Vec2(direction.x * this.speed, direction.y * this.speed);

        // Nếu trạng thái là lùi, đảo ngược hướng
        if (!this.isMovingForward) {
            velocity.multiplyScalar(-1); // Đảo ngược hướng để lùi
        }

        // Nếu khoảng cách nhỏ hơn một ngưỡng nào đó, ngừng di chuyển (ví dụ 1 pixel)
        if (distance <= 1) {
            this.rigidBody2D.linearVelocity = new Vec2(0, 0);  // Ngừng di chuyển
        } else {
            // Thiết lập vận tốc cho rigidBody2D để di chuyển node về phía hoặc lùi khỏi target
            this.rigidBody2D.linearVelocity = velocity;
        }
        this.particleSystem.emissionRate = 7

    }
    idItemCurrent = null
    // Xử lý va chạm với tường
    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        // Kiểm tra nếu đối tượng va chạm là tường
        if (GamePlayCtrl.instance.startGame == false) return
        if (otherCollider.node.name === "Wall" || otherCollider.node.getComponent(BoatBot) || otherCollider.node.getComponent(Item1)) {
            this.scheduleOnce(() => {
                this.isConvacham = true
                //this.tryChangeDirection();
            })




        }


        if (otherCollider.node.getComponent(Item1)) {
            if (this.idItemCurrent == otherCollider.node.uuid) return;
            this.idItemCurrent = otherCollider.node.uuid
            this.scheduleOnce(() => {
                if (GamePlayCtrl.instance.version == 1) {
                    this.Version1(otherCollider)
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
            }, 0.1)

        }

    }


    Version1(otherCollider) {
        let item = otherCollider.node.getComponent(Item1)
        GamePlayCtrl.instance.listBoard.children.forEach((element, index) => {
            if (element.getComponent(BoardV1).data.type == item.data.type && element.getComponent(BoardV1).data.number == item.data.number) {
                otherCollider.node.active = false
                item.listAvatar.forEach((element: Node) => {
                    item.layout3.getComponent(Layout).enabled = false
                    item.layoutTop.getComponent(Layout).enabled = false
                    item.layoutBot.getComponent(Layout).enabled = false
                    let radomx = randomRangeInt(-20, 20)
                    let radomy = randomRangeInt(-30, 30)
                    element.removeFromParent()
                    this.contain.addChild(element)
                    element.setPosition(radomx, radomy)
                    element.setScale(new Vec3(0.5, 0.5, 0.5))
                })
                item.listAvatar = []

                this.scheduleOnce(() => {
                    item.layout3.getComponent(Layout).enabled = true
                    item.layoutTop.getComponent(Layout).enabled = true
                    item.layoutBot.getComponent(Layout).enabled = true
                    item.SetUp(item.data)
                    otherCollider.node.active = true
                }, 5)
            }
        })
    }

    CheckVersion2(otherCollider) {

        let item = otherCollider.node.getComponent(Item1)
        this.scheduleOnce(() => {
            let isCo = false
            GamePlayCtrl.instance.listBoard.children.forEach((element, index) => {
                console.log(element.active)
                if (element.getComponent(BoardV1).data.type == item.data.type && element.getComponent(BoardV1).isEat == false && isCo == false) {
                    otherCollider.node.active = false
                    this.scheduleOnce(() => {
                        otherCollider.node.active = true
                    }, 5)
                }
            })
        }, 0.1)
    }
    CheckVersion3(otherCollider) {
        if (otherCollider.node.getComponent(Item1)) {
            let item = otherCollider.node.getComponent(Item1)
            this.scheduleOnce(() => {
                if (eval(item.data.type) == eval(GamePlayCtrl.instance.bang.data.type)) {
                    otherCollider.node.active = false

                    this.scheduleOnce(() => {
                        otherCollider.node.active = true
                    }, 5)
                }

            }, 0.1)
        }
    }


    CheckVersion4(otherCollider) {
        if (otherCollider.node.getComponent(Item1)) {
            let item = otherCollider.node.getComponent(Item1)
            this.scheduleOnce(() => {
                if (item.data.type == GamePlayCtrl.instance.bang2.data.type || GamePlayCtrl.instance.removeAccents(item.data.type) == GamePlayCtrl.instance.removeAccents(GamePlayCtrl.instance.bang2.data.type1)) {
                    otherCollider.node.active = false

                    this.scheduleOnce(() => {
                        otherCollider.node.active = true
                    }, 5)
                }

            }, 0.1)
        }
    }


}


