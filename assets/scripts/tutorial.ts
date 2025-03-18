import { _decorator, Component, Label, math, Node, Sprite, Vec3 } from 'cc';
import { GamePlayCtrl } from './Version1/GamePlayCtrl';
import { Item1 } from './Version1/Item1';
import { BoatCtrl } from './Version1/BoatCtrl';
import { SoundGameMaganer } from './SoundGameMaganer';
const { ccclass, property } = _decorator;

@ccclass('tutorial')
export class tutorial extends Component {


    @property(Node)
    targetNode: Node = null;  // Node mục tiêu

    @property(Label)
    title: Label


    @property(Sprite)
    sp: Sprite

    public static instance: tutorial = null
    start() {
        tutorial.instance = this
        this.node.parent.active = false
    }


    update(deltaTime: number) {
        this.FindTarget()
        if (this.targetNode) {
            // Lấy vị trí của mũi tên và mục tiêu
            const arrowPosition = this.node.worldPosition;
            const targetPosition = this.targetNode.worldPosition;

            // Tính toán vector từ mũi tên tới mục tiêu
            const direction = new Vec3();
            Vec3.subtract(direction, targetPosition, arrowPosition);
            const distance = direction.length();
            // Check if the distance is within 300 units
            if (distance <= 500) {
                this.node.parent.active = false
                GamePlayCtrl.instance.timeTutorial = 15
            }
            // Tính toán góc theo radian
            const angle = Math.atan2(direction.y, direction.x);

            // Chuyển đổi radian sang độ
            const angleDegrees = math.toDegree(angle);

            // Đặt góc quay của mũi tên (lưu ý rằng trên Cocos Creator, trục Z thường là trục quay)
            this.node.setRotationFromEuler(0, 0, angleDegrees);
            this.title.node.setRotationFromEuler(0, 0, -angleDegrees);
        }
    }

    FindTarget() {
        let listWin = []
        if (GamePlayCtrl.instance.version != 4) {
            for (let i = 0; i < GamePlayCtrl.instance.listWin.length; i++) {
                let x = GamePlayCtrl.instance.listWin[i]
                if (x.active == true) {
                    if (GamePlayCtrl.instance.version == 1) {
                        listWin.push(x)
                    }

                    if (GamePlayCtrl.instance.version == 2) {
                        listWin.push(x)
                    }

                    if (GamePlayCtrl.instance.version == 3 && eval(x.getComponent(Item1).data.type) != eval(GamePlayCtrl.instance.bang.data.type)) {
                        continue
                    }
                    if (GamePlayCtrl.instance.version == 3 && eval(x.getComponent(Item1).data.type) == eval(GamePlayCtrl.instance.bang.data.type)) {
                        listWin.push(x)
                    }
                }
            }

        }

        else {

            for (let i = 0; i < GamePlayCtrl.instance.items.children.length; i++) {
                let x = GamePlayCtrl.instance.items.children[i]
                if (x.active == true) {
                    if (

                        (x.getComponent(Item1).data.type != GamePlayCtrl.instance.bang2.data.type || GamePlayCtrl.instance.bang2.isType1 == true)
                        && (GamePlayCtrl.instance.removeAccents(x.getComponent(Item1).data.type)
                            != GamePlayCtrl.instance.removeAccents(GamePlayCtrl.instance.bang2.data.type1 || GamePlayCtrl.instance.bang2.isType2 == true))) {
                        continue
                    }

                    if ((x.getComponent(Item1).data.type == GamePlayCtrl.instance.bang2.data.type && GamePlayCtrl.instance.bang2.isType1 == false)
                        || (GamePlayCtrl.instance.removeAccents(x.getComponent(Item1).data.type) == GamePlayCtrl.instance.removeAccents(GamePlayCtrl.instance.bang2.data.type1)
                            && GamePlayCtrl.instance.bang2.isType2 == false)

                    ) {

                        if (x.getComponent(Item1).data.type == GamePlayCtrl.instance.bang2.data.type && GamePlayCtrl.instance.bang2.isType1 == false) {
                            console.log(x.getComponent(Item1).data.type)
                            listWin.push(x)
                        }

                        if (GamePlayCtrl.instance.removeAccents(x.getComponent(Item1).data.type) == GamePlayCtrl.instance.removeAccents(GamePlayCtrl.instance.bang2.data.type1) && GamePlayCtrl.instance.bang2.isType2 == false) {
                            console.log(x.getComponent(Item1).data.type)
                            listWin.push(x)
                        }
                    }
                }
            }
        }
        if (listWin.length == 0) {
            this.node.parent.active = false
            return
        }

        let node = this.findClosestNode(listWin, this.node.parent)
        this.targetNode = node
        if (GamePlayCtrl.instance.version == 1) {
            SoundGameMaganer.instance.playQua(node.getComponent(Item1).data.type)
            this.sp.node.active = true
            this.sp.spriteFrame = node.getComponent(Item1).listImage[node.getComponent(Item1).data.type]
        }

        if (GamePlayCtrl.instance.version == 2) {
            this.title.node.active = true
            SoundGameMaganer.instance.playQua(6)
            this.title.string = node.getComponent(Item1).data.type
        }

        if (GamePlayCtrl.instance.version == 3) {
            this.title.node.active = true
            this.title.string = eval(node.getComponent(Item1).data.type)
            SoundGameMaganer.instance.playQua(6)
        }

        if (GamePlayCtrl.instance.version == 4) {
            this.title.string = node.getComponent(Item1).data.type
            this.title.node.active = true
            SoundGameMaganer.instance.playQua(6)
        }

        if (node.worldPosition.x >= BoatCtrl.instance.node.worldPosition.x && node.worldPosition.y >= BoatCtrl.instance.node.worldPosition.y) {
            this.node.parent.setPosition(new Vec3(200, 100, 0))
            return
        }

        if (node.worldPosition.x >= BoatCtrl.instance.node.worldPosition.x && node.worldPosition.y <= BoatCtrl.instance.node.worldPosition.y) {
            this.node.parent.setPosition(new Vec3(320, -455, 0))
            return
        }

        if (node.worldPosition.x <= BoatCtrl.instance.node.worldPosition.x && node.worldPosition.y >= BoatCtrl.instance.node.worldPosition.y) {
            this.node.parent.setPosition(new Vec3(-200, 100, 0))
            return

        }

        if (node.worldPosition.x <= BoatCtrl.instance.node.worldPosition.x && node.worldPosition.y <= BoatCtrl.instance.node.worldPosition.y) {
            this.node.parent.setPosition(new Vec3(-320, -455, 0))
        }

        return
    }
    findClosestNode(listNode: Node[], targetNode: Node): Node | null {
        if (!listNode || listNode.length === 0) {
            return null; // Trả về null nếu list rỗng
        }

        let closestNode: Node | null = null;
        let minDistance = Number.MAX_VALUE;

        // Lấy worldPosition của targetNode
        const targetWorldPos = targetNode.getWorldPosition();

        // Duyệt qua listNode để tìm node gần nhất
        listNode.forEach(node => {
            const nodeWorldPos = node.getWorldPosition();
            const distance = Vec3.distance(targetWorldPos, nodeWorldPos);
            if (distance < minDistance) {
                minDistance = distance;
                closestNode = node;
            }
        });

        return closestNode;
    }
}


