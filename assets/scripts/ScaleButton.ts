import { _decorator, CCFloat, CCInteger, Component, Node, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ScaleButton')
export class ScaleButton extends Component {
    @property(CCFloat)
    size = 1.5
    protected start(): void {
      
    }

    isMobile(): boolean {
        return /android|iphone|ipod/.test(navigator.userAgent.toLowerCase());
    }
    
    isIpad(): boolean {
        return /ipad/.test(navigator.userAgent.toLowerCase()) || 
               (/macintosh/.test(navigator.userAgent.toLowerCase()) && "ontouchend" in document);
    }

    protected update(dt: number): void {
        if(this.isMobile() == true){
            this.node.scale = new Vec3(this.size, this.size, this.size)
        }
    }
}


