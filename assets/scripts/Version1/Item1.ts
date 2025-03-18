import { _decorator, BoxCollider2D, Collider2D, Component, Contact2DType, instantiate, IPhysics2DContact, Label, math, Node, Prefab, random, randomRangeInt, RigidBody2D, Sprite, SpriteFrame, Vec2, Vec3 } from 'cc';
import { GamePlayCtrl } from './GamePlayCtrl';
const { ccclass, property } = _decorator;

@ccclass('Item1')
export class Item1 extends Component {
    @property(SpriteFrame)
    listImage: SpriteFrame[] = [];

    @property(Node)
    layout3: Node = null


    @property(Node)
    layoutTop: Node = null


    @property(Node)
    layoutBot: Node = null

    @property(Prefab)
    avatarItem: Prefab = null

    @property(BoxCollider2D)
    boxCollider: BoxCollider2D = null

    @property(RigidBody2D)
    rigid: RigidBody2D = null

    @property(Label)
    title: Label = null

    @property(SpriteFrame)
    didam: SpriteFrame[] = []


    data

    @property(Node)
    itemDam: Node = null
    listAvatar: Node[] = []

    @property(BoxCollider2D)
    boxCollider2D: BoxCollider2D = null

    protected start(): void {
        this.boxCollider2D.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        this.boxCollider2D.on(Contact2DType.POST_SOLVE, this.onPostSolve, this);
        this.boxCollider2D.on(Contact2DType.END_CONTACT, this.onEndContact, this);
    }

    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        console.log("onBeginContact")

    }

    onPostSolve() {

    }

    onEndContact() {

    }

    VaChamSai() {
        if (this.isVaCham == true) return
        this.isVaCham = true
        this.itemDam.active = true
        this.itemDam.getComponent(Sprite).spriteFrame = this.didam[1]
        this.scheduleOnce(() => {
            this.itemDam.active = false
            this.isVaCham = false
        }, 2)
    }

    isVaCham = false
    VaChamDung() {
        if (this.isVaCham == true) return
        this.isVaCham = true
        this.itemDam.active = true
        this.itemDam.getComponent(Sprite).spriteFrame = this.didam[0]
        this.scheduleOnce(() => {
            this.itemDam.active = false
            this.isVaCham = false
        }, 2)

    }

    SetUp(data): void {
        this.data = data
        if (GamePlayCtrl.instance.version == 1) {
            if (data.number < 5) {
                this.layout3.active = true

                for (let i = 0; i < data.number; i++) {
                    let avatar = instantiate(this.avatarItem)
                    this.layout3.addChild(avatar)
                    avatar.getComponent(Sprite).spriteFrame = this.listImage[data.type]
                    this.listAvatar.push(avatar)
                }
            }
            else {
                let indexTop = Math.floor(data.number / 2)
                let indexBott = data.number - indexTop
                this.layoutTop.active = true
                this.layoutBot.active = true
                for (let i = 0; i < indexTop; i++) {
                    let avatar = instantiate(this.avatarItem)
                    this.layoutTop.addChild(avatar)
                    avatar.getComponent(Sprite).spriteFrame = this.listImage[data.type]
                    this.listAvatar.push(avatar)
                }


                for (let i = 0; i < indexBott; i++) {
                    let avatar = instantiate(this.avatarItem)
                    this.layoutBot.addChild(avatar)
                    avatar.getComponent(Sprite).spriteFrame = this.listImage[data.type]
                    this.listAvatar.push(avatar)
                }
            }
        }

        if (GamePlayCtrl.instance.version == 2) {
            this.title.string = data.type
        }
        if (GamePlayCtrl.instance.version == 4) {
            this.title.string = data.type
        }

        if (GamePlayCtrl.instance.version == 3) {
            let x = data.type
            let indexQ = randomRangeInt(0, this.listImage.length)

            if (typeof (data.type) == "string") {

                x = eval(data.type)

            }
            console.log(x)
            if (x < 5) {
                this.layout3.active = true

                for (let i = 0; i < x; i++) {
                    let avatar = instantiate(this.avatarItem)
                    this.layout3.addChild(avatar)
                    avatar.getComponent(Sprite).spriteFrame = this.listImage[indexQ]
                    this.listAvatar.push(avatar)
                }
            }
            else {
                let indexTop = Math.floor(x / 2)
                let indexBott = x - indexTop
                this.layoutTop.active = true
                this.layoutBot.active = true
                for (let i = 0; i < indexTop; i++) {
                    let avatar = instantiate(this.avatarItem)
                    this.layoutTop.addChild(avatar)
                    avatar.getComponent(Sprite).spriteFrame = this.listImage[indexQ]
                    this.listAvatar.push(avatar)
                }


                for (let i = 0; i < indexBott; i++) {
                    let avatar = instantiate(this.avatarItem)
                    this.layoutBot.addChild(avatar)
                    avatar.getComponent(Sprite).spriteFrame = this.listImage[indexQ]
                    this.listAvatar.push(avatar)
                }
            }
        }


        let random = math.random()
        if (random < 0.5)
            this.node.setPosition(new Vec3(-this.node.position.x + randomRangeInt(-50, 50), this.node.position.y))
    }


    protected update(dt: number): void {
        this.rigid.linearVelocity = new Vec2(0, 0)
    }

    off() {
        this.boxCollider.sensor = true
    }
}


