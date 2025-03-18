import { _decorator, Component, Node, ParticleSystem, ParticleSystem2D, random, randomRangeInt, sp, tween, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Effect')
export class Effect extends Component {
    @property(ParticleSystem2D)
    partical: ParticleSystem2D = null
    protected start(): void {
        this.partical.emissionRate = 10;
    }


}


