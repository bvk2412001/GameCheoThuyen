import { _decorator, Component, Node, tween, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('HandRatation')
export class HandRatation extends Component {
    @property(Node)
    hand: Node = null;  // Gán node bàn tay từ Inspector

    @property
    radius: number = 100; // Bán kính quay

    @property
    duration: number = 2; // Thời gian hoàn thành một vòng

    start() {
        this.animateHand();
    }

    animateHand() {
        let angle = 0;
        tween(this.hand)
            .repeatForever(
                tween()
                    .to(this.duration, {}, {
                        onUpdate: (target, ratio) => {
                            angle = ratio * 360; // Góc từ 0 -> 360 độ
                            let radians = angle * (Math.PI / 180);
                            let x = Math.cos(radians) * this.radius;
                            let y = Math.sin(radians) * this.radius;
                            this.hand.setPosition(new Vec3(x, y, 0)); // Di chuyển theo quỹ đạo tròn
                        }
                    })
            )
            .start();
    }

}


