import { _decorator, Component, Label, Node, Sprite } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BoardV2')
export class BoardV2 extends Component {
    @property(Label)
    lbTrc: Label

    @property(Label)
    lbTrc1: Label

    @property(Label)
    lbSau1: Label

    @property(Label)
    lbSau: Label


    number: number


    data
    protected start(): void {
        console.log(this.removeVietnameseDiacritics("ư ơ ô ê a ă â ươm uôm ướp "))
    }
    SetUP(data) {
        this.data = data;
        this.number = data.number
        if (this.data.type.length == 0) {
            this.isType1 = true
        }

        this.lbTrc.string = this.data.type
        this.lbTrc1.string = this.removeVietnameseDiacritics(this.data.type)
        this.lbSau.string = this.data.type1
        this.lbSau1.string = this.removeVietnameseDiacritics(this.data.type1)
    }

    isType1 = false
    isType2 = false



    removeVietnameseDiacritics(input: string): string {
        // Normalize the input string to decompose diacritics
        return input.normalize('NFD')
            .replace(/[\u0301\u0300\u0309\u0323\u0303]/g, '')  // Chỉ loại bỏ dấu sắc, huyền, ngã, nặng, hỏi
            .normalize('NFC');  // Gộp lại các ký tự sau khi bỏ dấu
    }
}


