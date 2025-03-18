import { _decorator, AudioClip, AudioSource, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('SoundManager')
export class SoundManager extends Component {
    public static instance: SoundManager
    @property(AudioSource)
    audio: AudioSource = null

    @property(AudioClip)
    sao: AudioClip = null;

    @property(AudioClip)
    Endgame: AudioClip = null;

    protected __preload(): void {
        SoundManager.instance = this;
    }

    playSao() {
        this.audio.playOneShot(this.sao, 0.5)
    }

    playEndgame() {
        this.audio.playOneShot(this.Endgame, 0.5)
    }
}


