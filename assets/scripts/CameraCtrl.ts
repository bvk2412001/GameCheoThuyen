import { _decorator, Component, Node, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('CameraCtrl')
export class CameraCtrl extends Component {
    target: Node | null = null; // The node that the camera should follow (e.g., player)

    @property(Node)
    target1: Node | null = null;


    smoothSpeed: number = 1; // Speed factor for smooth camera movement (between 0 and 1)

    start(): void {
        const carPosition = this.target1.getWorldPosition();
        // Di chuyển camera đến vị trí mới
        this.node.setWorldPosition(carPosition);
    }


    update(dt: number) {
        if (this.target) {

            // Step 2: Get the background size to calculate boundaries
            if (!this.target || !this.node) return;

            // Lấy vị trí hiện tại của car
            const carPosition = this.target.getWorldPosition();

            // Lấy vị trí hiện tại của camera
            const cameraPosition = this.node.getWorldPosition();

            // Tính toán vị trí camera cần di chuyển tới bằng nội suy
            const newPosition = Vec3.lerp(new Vec3(), cameraPosition, carPosition, 0.1);  // 0.1 là tốc độ nội suy, điều chỉnh để mượt hơn

            // Di chuyển camera đến vị trí mới
            this.node.setWorldPosition(newPosition);
        }
    }
}


