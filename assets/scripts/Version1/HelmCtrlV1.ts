import { _decorator, Animation, CCInteger, Component, EventTouch, math, misc, Node, Vec2, Vec3 } from 'cc';
import { BoatCtrl } from './BoatCtrl';
import { GamePlayCtrl } from './GamePlayCtrl';
const { ccclass, property } = _decorator;

@ccclass('HelmCtrlV1')
export class HelmCtrlV1 extends Component {
    @property(Node)
    boat: Node = null!;  // Node của xe

    private startAngle: number = 0;  // Góc xoay ban đầu của vô lăng
    private currentAngle: number = 0; // Góc hiện tại của vô lăng
    private wheelCenter: Vec2 = new Vec2();  // Tâm của vô lăng
    private previousAngle: number = 0; // Góc xoay của frame trước
    private totalSteeringAngle: number = 0; // Tổng góc xoay tích lũy của vô lăng

    private targetCarAngle: number = 0;  // Góc mục tiêu của xe
    @property(CCInteger)
    private lerpSpeed: number = 0.1;  // Tốc độ di chuyển dần dần của xe (giá trị giữa 0 và 1)

    private steeringSpeed: number = 0.2;  // Tốc độ xoay của vô lăng (giảm tốc độ quay)

    onLoad() {
        // Đăng ký sự kiện chạm cho vô lăng
        this.node.on(Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.on(Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.node.on(Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
    }

    onTouchStart(event: EventTouch) {
        if(GamePlayCtrl.instance.IsUserPlay == false) return
        GamePlayCtrl.instance.IsUserPlay2 = true;
        GamePlayCtrl.instance.hand2.active = false
        GamePlayCtrl.instance.helm.getComponent(Animation).stop()
        // Lấy vị trí của vô lăng (tâm của vô lăng)
        const worldPos = this.node.getWorldPosition();
        this.wheelCenter.set(worldPos.x, worldPos.y); // Lưu tâm của vô lăng

        // Lấy vị trí chạm và tính góc từ tâm vô lăng đến điểm chạm
        const touchPos = event.getUILocation();
        const startVector = new Vec2(touchPos.x - this.wheelCenter.x, touchPos.y - this.wheelCenter.y);
        this.startAngle = Math.atan2(startVector.y, startVector.x) * (180 / Math.PI); // Tính góc ban đầu

        // Lưu góc hiện tại của vô lăng
        this.currentAngle = this.totalSteeringAngle;  // Bắt đầu từ góc đã có
        this.previousAngle = this.startAngle;  // Lưu góc bắt đầu để tính delta
    }

    onTouchMove(event: EventTouch) {
        // Lấy vị trí chạm hiện tại
        if(GamePlayCtrl.instance.IsUserPlay == false) return
        if (GamePlayCtrl.instance.startGame == false) return;
        if (this.boat) {
            const touchPos = event.getUILocation();
            const currentVector = new Vec2(touchPos.x - this.wheelCenter.x, touchPos.y - this.wheelCenter.y);

            // Tính toán góc giữa tâm vô lăng và điểm chạm hiện tại
            const currentAngle = Math.atan2(currentVector.y, currentVector.x) * (180 / Math.PI);

            // Tính toán sự thay đổi góc giữa frame trước và frame hiện tại
            let deltaAngle = currentAngle - this.previousAngle;

            // Xử lý trường hợp xoay qua điểm -180 và 180 (giúp chuyển góc liên tục)
            if (deltaAngle > 180) {
                deltaAngle -= 360;
            } else if (deltaAngle < -180) {
                deltaAngle += 360;
            }

            // Giảm tốc độ xoay bằng cách nhân với hệ số steeringSpeed
            deltaAngle *= this.steeringSpeed;

            // Cộng dồn sự thay đổi góc vào tổng góc xoay
            this.totalSteeringAngle += deltaAngle;

            // Xoay vô lăng theo góc tổng tích lũy
            this.node.setRotationFromEuler(new Vec3(0, 0, this.totalSteeringAngle));

            // Cập nhật góc mục tiêu của xe
            this.targetCarAngle = this.totalSteeringAngle;

            // Cập nhật lại góc của frame trước để tiếp tục tính toán
            this.previousAngle = currentAngle;
        }
    }

    lerpAngle(a: number, b: number, t: number): number {
        let delta = ((b - a + 180) % 360) - 180; // Giữ góc quay trong phạm vi hợp lý
        return a + delta * t;
    }


    current = 0
    updateCarRotation(deltaTime) {
        if(GamePlayCtrl.instance.IsUserPlay == false) return
        if (this.boat) {
            // Lấy góc hiện tại của thuyền
            // Làm mượt góc quay theo thời gian
            const newCarAngle = math.lerp(this.current, this.node.angle, this.lerpSpeed * 10 * deltaTime);
            this.current = newCarAngle
            // Cập nhật góc quay mới cho thuyền
            this.boat.angle = this.current;
        }
    }

    onTouchEnd(event: EventTouch) {
        // Không cần làm gì thêm khi người dùng nhấc tay ra
        //this.current = this.boat.angle = this.current;
    }

    update(deltaTime: number) {

        // Gọi updateCarRotation mỗi frame để làm mượt quá trình xoay của xe
        this.updateCarRotation(deltaTime);
    }
}


