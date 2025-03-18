import { _decorator, AudioClip, AudioSource, Component, Node, randomRangeInt } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('SoundGameMaganer')
export class SoundGameMaganer extends Component {
    @property(AudioSource)
    audioSource: AudioSource;

    @property(AudioClip)
    khen: AudioClip[] = []

    @property(AudioClip)
    sai: AudioClip[] = []

    @property(AudioClip)
    so: AudioClip[] = []

    @property(AudioClip)
    fullSo: AudioClip[] = []

    @property(AudioClip)
    thoai: AudioClip[] = []

    @property(AudioClip)
    qua: AudioClip[] = []

    @property(AudioClip)
    chu: AudioClip[] = []


    @property(AudioClip)
    Fullchu: AudioClip[] = []

    @property(AudioClip)
    sources: AudioClip[] = []

    @property(AudioClip)
    effect: AudioClip[] = []

    @property(AudioSource)
    audioSource1: AudioSource
    public static instance: SoundGameMaganer = null
    onLoad() {
        SoundGameMaganer.instance = this
    }
    start() {
        this.audioSource1.clip = this.sources[0]
        this.audioSource1.loop = true
        this.audioSource1.play()
    }
    playKhen() {
        this.audioSource.stop()
        this.audioSource.clip = this.khen[randomRangeInt(0, this.khen.length)]
        this.audioSource.play()
    }

    playSai() {
        this.audioSource.stop()
        this.audioSource.clip = this.sai[randomRangeInt(0, this.sai.length)]
        this.audioSource.play()
    }

    playSo(index: number) {
        this.audioSource.playOneShot(this.so[index], 1)


    }

    playQua(index: number) {
        this.audioSource.stop()
        this.audioSource.clip = this.qua[index]
        this.audioSource.play()
    }

    playChu(index: number) {
        console.log(this.chu, index)
        this.audioSource.playOneShot(this.chu[index], 1)
    }


    playThoai(index: number) {
        console.log(this.thoai[index])
        this.audioSource.stop()
        this.audioSource.clip = this.thoai[index]
        this.audioSource.play()
    }

    playFullSo(index: number) {
        this.audioSource.stop()
        this.audioSource.clip = this.fullSo[index]
        this.audioSource.play()
    }

    playFullChu(index: number) {
        this.audioSource.stop()
        this.audioSource.clip = this.Fullchu[index]
        this.audioSource.play()
    }

    playEffect(index: number) {
        this.audioSource.playOneShot(this.effect[index], 1)
    }
}


