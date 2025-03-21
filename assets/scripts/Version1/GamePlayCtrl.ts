import { _decorator, animation, Animation, Color, Component, instantiate, Label, Node, Prefab, randomRangeInt, screen, Size, tween, UIOpacity, UITransform, Vec3 } from 'cc';
import { SelectBoat } from '../SelectBoat';
import { BoatCtrl } from './BoatCtrl';
import { HelmCtrlV1 } from './HelmCtrlV1';
import { BoatBot } from './BoatBot';
import { MiniGame } from '../MiniGame';
import { BoardV1 } from './BoardV1';
import { Item1 } from './Item1';
import { StarCtrl } from '../../Sao/Script/StarCtrl';
import { tutorial } from '../tutorial';
import { SoundGameMaganer } from '../SoundGameMaganer';
import { BoardV2 } from './BoardV2';
const { ccclass, property } = _decorator;

@ccclass('GamePlayCtrl')
export class GamePlayCtrl extends Component {
    @property(Node)
    boats: Node[] = [];

    @property(HelmCtrlV1)
    helm: HelmCtrlV1 = null

    @property(Node)
    listBoard: Node;

    @property(Prefab)
    board: Prefab

    @property(Node)
    items: Node;

    @property(Label)
    time: Label = null

    @property(Node)
    canvas: Node = null
    listChu = []
    listNhieu = []
    startGame = false
    isGameOver = false
    isPlaybot = false

    @property(Node)
    timeCoutdown: Node = null

    @property(Node)
    thoai: Node = null

    @property(BoardV2)
    bang2: BoardV2 = null

    public static instance: GamePlayCtrl = null

    @property(Node)
    tutorial1: Node

    @property(Node)
    hand1: Node

    @property(Node)
    hand2: Node

    @property(Node)
    up: Node


    @property(Node)
    down: Node


    @property(Node)
    helpm: Node

    startTime
    timeManhinh = 10;

    indexRandom = 0
    randomTutorial() {
        if (this.version == 1) {

            if (tutorial.instance.targetNode)
                SoundGameMaganer.instance.playQua(tutorial.instance.targetNode.getComponent(Item1).data.type)
        }
        if (this.version == 2) {
            SoundGameMaganer.instance.playQua(6)
        }

        if (this.version == 3) {
            SoundGameMaganer.instance.playQua(6)
        }
    }


    playTutorial() {
        this.unschedule(this.playTutorial)
        if (GamePlayCtrl.instance.isPlayTutorial == false) {
            GamePlayCtrl.instance.isPlayTutorial = true;
            if (GamePlayCtrl.instance.IsUserPlay == true) return
            GamePlayCtrl.instance.IsUserPlay = true
            this.hand1.active = false

            this.scheduleOnce(() => {
                SoundGameMaganer.instance.playThoai(13)
                this.up.getComponent(Animation).stop()
                this.down.getComponent(Animation).stop()
                this.helm.getComponent(Animation).play("Scale2")
                this.hand2.active = true;
                GamePlayCtrl.instance.IsUserPlay2 = false;


                this.scheduleOnce(this.randomList1, 5)
            }, 0.5)
        }
        else {
            this.End()
        }
    }


    start() {
        this.startTime = new Date().getTime()
        GamePlayCtrl.instance = this

        console.log("[INFO]: Progress: 1")
        //this.ShowTutorial1()

    }

    isPlayTutorial = false

    version = -1
    randomList() {
        this.canvas.active = true
        let input = this.getParamUrl('input')
        switch (input) {
            case "tl_cheothuyen_2":
                this.version = 1
                this.listChu = MiniGame.mini1;
                this.listNhieu = MiniGame.mini1Nhieu;
                // SoundGameMaganer.instance.playThoai(SelectBoat.instance.numberCurrent)
                // this.scheduleOnce(() => {
                //     SoundGameMaganer.instance.playFullSo(2)
                // }, 3.5)
                break;
            case "tl_cheothuyen_5":
                this.version = 1
                this.listChu = MiniGame.mini2;
                this.listNhieu = MiniGame.mini2Nhieu;
                // SoundGameMaganer.instance.playThoai(SelectBoat.instance.numberCurrent)
                // this.scheduleOnce(() => {
                //     SoundGameMaganer.instance.playFullSo(5)
                // }, 3)
                break;
            case "tl_cheothuyen_9":
                this.version = 1
                this.listChu = MiniGame.mini3;
                this.listNhieu = MiniGame.mini3Nhieu;
                // SoundGameMaganer.instance.playThoai(SelectBoat.instance.numberCurrent)
                // this.scheduleOnce(() => {
                //     SoundGameMaganer.instance.playFullSo(9)
                // }, 3)
                break;
            case "tv_cheothuyen_e":
                this.version = 2
                this.listChu = MiniGame.mini4;
                this.listNhieu = MiniGame.mini4Nhieu;
                // SoundGameMaganer.instance.playThoai(SelectBoat.instance.numberCurrent)
                // this.scheduleOnce(() => {
                //     SoundGameMaganer.instance.playFullChu(0)
                // }, 3)
                break;
            case "tv_cheothuyen_oo":
                this.version = 2
                this.listChu = MiniGame.mini5;
                this.listNhieu = MiniGame.mini5Nhieu;
                // SoundGameMaganer.instance.playThoai(SelectBoat.instance.numberCurrent)
                // this.scheduleOnce(() => {
                //     SoundGameMaganer.instance.playFullChu(1)
                // }, 3)
                break;

            case "tv_cheothuyen_x":
                this.version = 2
                this.listChu = MiniGame.mini6;
                this.listNhieu = MiniGame.mini6Nhieu;
                // SoundGameMaganer.instance.playThoai(SelectBoat.instance.numberCurrent)
                // this.scheduleOnce(() => {
                //     SoundGameMaganer.instance.playFullChu(2)
                // }, 3)
                break;

            case "tv_cheothuyen_boss2":
                this.version = 2
                this.listChu = MiniGame.mini7;
                this.listNhieu = MiniGame.mini7Nhieu;
                // SoundGameMaganer.instance.playThoai(SelectBoat.instance.numberCurrent)
                // this.scheduleOnce(() => {
                //     SoundGameMaganer.instance.playFullChu(0)
                //     this.scheduleOnce(() => {
                //         SoundGameMaganer.instance.playFullChu(3)
                //         this.scheduleOnce(() => {
                //             SoundGameMaganer.instance.playFullChu(4)
                //         }, 1)
                //     }, 1)
                // }, 3)
                break;


            case "tv_cheothuyen_boss3":
                this.version = 2
                this.listChu = MiniGame.mini8;
                this.listNhieu = MiniGame.mini8Nhieu;
                SoundGameMaganer.instance.playThoai(SelectBoat.instance.numberCurrent)
                // this.scheduleOnce(() => {
                //     SoundGameMaganer.instance.playFullChu(5)
                //     this.scheduleOnce(() => {
                //         SoundGameMaganer.instance.playFullChu(6)
                //         this.scheduleOnce(() => {
                //             SoundGameMaganer.instance.playFullChu(7)
                //         }, 1)
                //     }, 1)
                // }, 3)
                break;

            case "tv_cheothuyen_boss5":
                this.version = 2
                this.listChu = MiniGame.mini9;
                this.listNhieu = MiniGame.mini9Nhieu;
                // SoundGameMaganer.instance.playThoai(SelectBoat.instance.numberCurrent)
                // this.scheduleOnce(() => {
                //     SoundGameMaganer.instance.playFullChu(8)
                //     this.scheduleOnce(() => {
                //         SoundGameMaganer.instance.playFullChu(9)
                //         this.scheduleOnce(() => {
                //             SoundGameMaganer.instance.playFullChu(10)
                //         }, 1)
                //     }, 1)
                // }, 3)
                break;
            case "tv_cheothuyen_kh":
                this.version = 2
                this.listChu = MiniGame.mini10;
                this.listNhieu = MiniGame.mini10Nhieu;
                // SoundGameMaganer.instance.playThoai(SelectBoat.instance.numberCurrent)
                // this.scheduleOnce(() => {
                //     SoundGameMaganer.instance.playFullChu(11)
                // }, 3)
                break
            case "tv_cheothuyen_ng":
                this.version = 2
                this.listChu = MiniGame.mini11;
                this.listNhieu = MiniGame.mini11Nhieu;
                // SoundGameMaganer.instance.playThoai(SelectBoat.instance.numberCurrent)
                // this.scheduleOnce(() => {
                //     SoundGameMaganer.instance.playFullChu(12)
                // }, 3)
                break
            case "tv_cheothuyen_boss10":
                this.version = 2
                this.listChu = MiniGame.mini12;
                this.listNhieu = MiniGame.mini12Nhieu;
                // SoundGameMaganer.instance.playThoai(SelectBoat.instance.numberCurrent)
                // this.scheduleOnce(() => {
                //     SoundGameMaganer.instance.playFullChu(13)
                //     this.scheduleOnce(() => {
                //         SoundGameMaganer.instance.playFullChu(12)
                //         this.scheduleOnce(() => {
                //             SoundGameMaganer.instance.playFullChu(14)
                //         }, 1)
                //     }, 1)
                // }, 3)
                break
            case "tv_cheothuyen_omop":
                this.version = 2
                this.listChu = MiniGame.mini13
                this.listNhieu = MiniGame.mini13Nhieu;
                // SoundGameMaganer.instance.playThoai(SelectBoat.instance.numberCurrent + 3)
                // this.scheduleOnce(() => {
                //     SoundGameMaganer.instance.playFullChu(17)
                //     this.scheduleOnce(() => {
                //         SoundGameMaganer.instance.playFullChu(18)
                //     }, 1)
                // }, 3)
                break
            case "tv_cheothuyen_onot":
                this.version = 2
                this.listChu = MiniGame.mini14
                this.listNhieu = MiniGame.mini14Nhieu;
                // SoundGameMaganer.instance.playThoai(SelectBoat.instance.numberCurrent + 3)
                // this.scheduleOnce(() => {
                //     SoundGameMaganer.instance.playFullChu(15)
                //     this.scheduleOnce(() => {
                //         SoundGameMaganer.instance.playFullChu(16)
                //     }, 1)
                // }, 3)
                break
            case "tv_cheothuyen_oaoe":
                this.version = 2
                this.listChu = MiniGame.mini15
                this.listNhieu = MiniGame.mini15Nhieu;
                // SoundGameMaganer.instance.playThoai(SelectBoat.instance.numberCurrent + 3)
                // this.scheduleOnce(() => {
                //     SoundGameMaganer.instance.playFullChu(19)
                //     this.scheduleOnce(() => {
                //         SoundGameMaganer.instance.playFullChu(20)
                //     }, 1)
                // }, 3)
                break
            case "tv_cheothuyen_uownguowc":
                this.version = 2
                this.listChu = MiniGame.mini16
                this.listNhieu = MiniGame.mini16Nhieu;
                // SoundGameMaganer.instance.playThoai(SelectBoat.instance.numberCurrent + 3)
                // this.scheduleOnce(() => {
                //     SoundGameMaganer.instance.playFullChu(21)
                //     this.scheduleOnce(() => {
                //         SoundGameMaganer.instance.playFullChu(22)
                //     }, 1)
                // }, 3)
                break
            case "tv_cheothuyen_boss15":
                this.version = 2
                this.listChu = MiniGame.mini17
                this.listNhieu = MiniGame.mini17Nhieu;
                // SoundGameMaganer.instance.playThoai(SelectBoat.instance.numberCurrent + 3)
                // this.scheduleOnce(() => {
                //     SoundGameMaganer.instance.playFullChu(23)
                //     this.scheduleOnce(() => {
                //         SoundGameMaganer.instance.playFullChu(24)
                //         this.scheduleOnce(() => {
                //             SoundGameMaganer.instance.playFullChu(25)
                //         }, 1)
                //     }, 1)
                // }, 3)
                break
            case "tv_cheothuyen_boss18":
                this.version = 2
                this.listChu = MiniGame.mini18
                this.listNhieu = MiniGame.mini18Nhieu;
                // SoundGameMaganer.instance.playThoai(SelectBoat.instance.numberCurrent + 3)
                // this.scheduleOnce(() => {
                //     SoundGameMaganer.instance.playFullChu(26)
                //     this.scheduleOnce(() => {
                //         SoundGameMaganer.instance.playFullChu(27)
                //         this.scheduleOnce(() => {
                //             SoundGameMaganer.instance.playFullChu(28)
                //         }, 1)
                //     }, 1)
                // }, 3)
                break
            case "tl_cheothuyen_phepcong":
                this.version = 3
                this.listChu = MiniGame.mini19
                this.listNhieu = MiniGame.mini19Nhieu;
                // SoundGameMaganer.instance.playThoai(SelectBoat.instance.numberCurrent)
                break
            case "tl_cheothuyen_phepcong10":
                this.version = 3
                this.listChu = MiniGame.mini20
                this.listNhieu = MiniGame.mini20Nhieu;
                // SoundGameMaganer.instance.playThoai(SelectBoat.instance.numberCurrent)
                break
            case "tl_cheothuyen_pheptru":
                this.version = 3
                this.listChu = MiniGame.mini21
                this.listNhieu = MiniGame.mini21Nhieu;
                // SoundGameMaganer.instance.playThoai(SelectBoat.instance.numberCurrent)
                break
            case "tl_cheothuyen_pheptru5":
                this.version = 3
                this.listChu = MiniGame.mini22
                this.listNhieu = MiniGame.mini22Nhieu;
                // SoundGameMaganer.instance.playThoai(SelectBoat.instance.numberCurrent)
                break
            case "tv_cheothuyen_boss12":
                this.version = 4
                this.listChu = MiniGame.mini23
                this.listNhieu = MiniGame.mini23Nhieu;
                // SoundGameMaganer.instance.playThoai(SelectBoat.instance.numberCurrent + 6)
                break
            case "tv_cheothuyen_boss16":
                this.version = 4
                this.listChu = MiniGame.mini24
                this.listNhieu = MiniGame.mini24Nhieu;
                // SoundGameMaganer.instance.playThoai(SelectBoat.instance.numberCurrent + 6)
                break
            case "tv_cheothuyen_ongoc":
                this.version = 4
                this.listChu = MiniGame.mini25
                this.listNhieu = MiniGame.mini25Nhieu;
                // SoundGameMaganer.instance.playThoai(SelectBoat.instance.numberCurrent + 6)
                this.diem++
                break
            case "tv_cheothuyen_boss19":
                this.version = 4
                this.listChu = MiniGame.mini26
                this.listNhieu = MiniGame.mini26Nhieu;
                // SoundGameMaganer.instance.playThoai(SelectBoat.instance.numberCurrent + 6)
                break
            default:
                break;
        }
    }
    playThoai() {
        this.canvas.active = true
        let input = this.getParamUrl('input')
        switch (input) {
            case "tl_cheothuyen_2":
                SoundGameMaganer.instance.playThoai(SelectBoat.instance.numberCurrent)
                this.scheduleOnce(() => {
                    SoundGameMaganer.instance.playFullSo(2)
                }, 3.5)
                break;
            case "tl_cheothuyen_5":
                SoundGameMaganer.instance.playThoai(SelectBoat.instance.numberCurrent)
                this.scheduleOnce(() => {
                    SoundGameMaganer.instance.playFullSo(5)
                }, 3)
                break;
            case "tl_cheothuyen_9":
                SoundGameMaganer.instance.playThoai(SelectBoat.instance.numberCurrent)
                this.scheduleOnce(() => {
                    SoundGameMaganer.instance.playFullSo(9)
                }, 3)
                break;
            case "tv_cheothuyen_e":
                SoundGameMaganer.instance.playThoai(SelectBoat.instance.numberCurrent)
                this.scheduleOnce(() => {
                    SoundGameMaganer.instance.playFullChu(0)
                }, 3)
                break;
            case "tv_cheothuyen_oo":
                SoundGameMaganer.instance.playThoai(SelectBoat.instance.numberCurrent)
                this.scheduleOnce(() => {
                    SoundGameMaganer.instance.playFullChu(1)
                }, 3)
                break;

            case "tv_cheothuyen_x":
                SoundGameMaganer.instance.playThoai(SelectBoat.instance.numberCurrent)
                this.scheduleOnce(() => {
                    SoundGameMaganer.instance.playFullChu(2)
                }, 3)
                break;

            case "tv_cheothuyen_boss2":
                SoundGameMaganer.instance.playThoai(SelectBoat.instance.numberCurrent)
                this.scheduleOnce(() => {
                    SoundGameMaganer.instance.playFullChu(0)
                    this.scheduleOnce(() => {
                        SoundGameMaganer.instance.playFullChu(3)
                        this.scheduleOnce(() => {
                            SoundGameMaganer.instance.playFullChu(4)
                        }, 1)
                    }, 1)
                }, 3)
                break;


            case "tv_cheothuyen_boss3":
                SoundGameMaganer.instance.playThoai(SelectBoat.instance.numberCurrent)
                this.scheduleOnce(() => {
                    SoundGameMaganer.instance.playFullChu(5)
                    this.scheduleOnce(() => {
                        SoundGameMaganer.instance.playFullChu(6)
                        this.scheduleOnce(() => {
                            SoundGameMaganer.instance.playFullChu(7)
                        }, 1)
                    }, 1)
                }, 3)
                break;

            case "tv_cheothuyen_boss5":
                SoundGameMaganer.instance.playThoai(SelectBoat.instance.numberCurrent)
                this.scheduleOnce(() => {
                    SoundGameMaganer.instance.playFullChu(8)
                    this.scheduleOnce(() => {
                        SoundGameMaganer.instance.playFullChu(9)
                        this.scheduleOnce(() => {
                            SoundGameMaganer.instance.playFullChu(10)
                        }, 1)
                    }, 1)
                }, 3)
                break;
            case "tv_cheothuyen_kh":
                SoundGameMaganer.instance.playThoai(SelectBoat.instance.numberCurrent)
                this.scheduleOnce(() => {
                    SoundGameMaganer.instance.playFullChu(11)
                }, 3)
                break
            case "tv_cheothuyen_ng":
                SoundGameMaganer.instance.playThoai(SelectBoat.instance.numberCurrent)
                this.scheduleOnce(() => {
                    SoundGameMaganer.instance.playFullChu(12)
                }, 3)
                break
            case "tv_cheothuyen_boss10":
                SoundGameMaganer.instance.playThoai(SelectBoat.instance.numberCurrent)
                this.scheduleOnce(() => {
                    SoundGameMaganer.instance.playFullChu(13)
                    this.scheduleOnce(() => {
                        SoundGameMaganer.instance.playFullChu(12)
                        this.scheduleOnce(() => {
                            SoundGameMaganer.instance.playFullChu(14)
                        }, 1)
                    }, 1)
                }, 3)
                break
            case "tv_cheothuyen_omop":
                SoundGameMaganer.instance.playThoai(SelectBoat.instance.numberCurrent + 3)
                this.scheduleOnce(() => {
                    SoundGameMaganer.instance.playFullChu(17)
                    this.scheduleOnce(() => {
                        SoundGameMaganer.instance.playFullChu(18)
                    }, 1)
                }, 3)
                break
            case "tv_cheothuyen_onot":
                SoundGameMaganer.instance.playThoai(SelectBoat.instance.numberCurrent + 3)
                this.scheduleOnce(() => {
                    SoundGameMaganer.instance.playFullChu(15)
                    this.scheduleOnce(() => {
                        SoundGameMaganer.instance.playFullChu(16)
                    }, 1)
                }, 3)
                break
            case "tv_cheothuyen_oaoe":
                SoundGameMaganer.instance.playThoai(SelectBoat.instance.numberCurrent + 3)
                this.scheduleOnce(() => {
                    SoundGameMaganer.instance.playFullChu(19)
                    this.scheduleOnce(() => {
                        SoundGameMaganer.instance.playFullChu(20)
                    }, 1)
                }, 3)
                break
            case "tv_cheothuyen_uownguowc":
                SoundGameMaganer.instance.playThoai(SelectBoat.instance.numberCurrent + 3)
                this.scheduleOnce(() => {
                    SoundGameMaganer.instance.playFullChu(21)
                    this.scheduleOnce(() => {
                        SoundGameMaganer.instance.playFullChu(22)
                    }, 1)
                }, 3)
                break
            case "tv_cheothuyen_boss15":
                SoundGameMaganer.instance.playThoai(SelectBoat.instance.numberCurrent + 3)
                this.scheduleOnce(() => {
                    SoundGameMaganer.instance.playFullChu(23)
                    this.scheduleOnce(() => {
                        SoundGameMaganer.instance.playFullChu(24)
                        this.scheduleOnce(() => {
                            SoundGameMaganer.instance.playFullChu(25)
                        }, 1)
                    }, 1)
                }, 3)
                break
            case "tv_cheothuyen_boss18":
                SoundGameMaganer.instance.playThoai(SelectBoat.instance.numberCurrent + 3)
                this.scheduleOnce(() => {
                    SoundGameMaganer.instance.playFullChu(26)
                    this.scheduleOnce(() => {
                        SoundGameMaganer.instance.playFullChu(27)
                        this.scheduleOnce(() => {
                            SoundGameMaganer.instance.playFullChu(28)
                        }, 1)
                    }, 1)
                }, 3)
                break
            case "tl_cheothuyen_phepcong":
                SoundGameMaganer.instance.playThoai(SelectBoat.instance.numberCurrent)
                break
            case "tl_cheothuyen_phepcong10":
                SoundGameMaganer.instance.playThoai(SelectBoat.instance.numberCurrent)
                break
            case "tl_cheothuyen_pheptru":
                SoundGameMaganer.instance.playThoai(SelectBoat.instance.numberCurrent)
                break
            case "tl_cheothuyen_pheptru5":
                SoundGameMaganer.instance.playThoai(SelectBoat.instance.numberCurrent)
                break
            case "tv_cheothuyen_boss12":
                SoundGameMaganer.instance.playThoai(SelectBoat.instance.numberCurrent + 6)
                break
            case "tv_cheothuyen_boss16":
                SoundGameMaganer.instance.playThoai(SelectBoat.instance.numberCurrent + 6)
                break
            case "tv_cheothuyen_ongoc":
                SoundGameMaganer.instance.playThoai(SelectBoat.instance.numberCurrent + 6)
                this.diem++
                break
            case "tv_cheothuyen_boss19":
                SoundGameMaganer.instance.playThoai(SelectBoat.instance.numberCurrent + 6)
                break
            default:
                break;
        }

    }

    randomList1() {
        GamePlayCtrl.instance.IsUserPlay2 = true;
        GamePlayCtrl.instance.hand2.active = false
        GamePlayCtrl.instance.helm.getComponent(Animation).stop()

        this.unschedule(this.randomList1)
        this.canvas.active = true
        this.startGame = false
        this.scheduleOnce(() => {
            this.SetTimeCountdown()
            SoundGameMaganer.instance.playEffect(3)
            this.scheduleOnce(() => {
                this.playThoai()
                this.scheduleOnce(() => {
                    GamePlayCtrl.instance.SetTime()
                    this.startGame = true;
                    this.isPlaybot = true
                }, 5)

            }, 4)
        }, 0)



    }

    IsUserPlay = false
    IsUserPlay2 = true
    vectorCorrect = new Vec3(-1231.011, -1000.167)
    StartGame() {
        this.timeCoutdown.active = false
        this.thoai.active = false
        this.randomList()
        this.SetBoat()
        this.SetUp()

        this.FindBoardCorrect()

        SoundGameMaganer.instance.playThoai(10)
        this.scheduleOnce(() => {
            this.startGame = true
            this.hand1.active = true
            this.up.getComponent(Animation).play("Scale2")
            this.scheduleOnce(() => {
                this.down.getComponent(Animation).play("Scale2")
            }, 0.4)


            this.scheduleOnce(this.playTutorial, 10)
            SoundGameMaganer.instance.playThoai(12)


        }, 6)
    }


    SetBoat() {
        this.boats.forEach((element, index) => {
            if (index == SelectBoat.instance.numberCurrent) {
                element.addComponent(BoatCtrl)
                SelectBoat.instance.camera.target = element
                SelectBoat.instance.camera.start()
                this.helm.boat = element
            }
            else {
                element.addComponent(BoatBot)
                this.scheduleOnce(() => {
                    element.angle = randomRangeInt(-90, 90)
                }, 30)

            }

        })

    }
    listWin: Node[] = []
    SetUp() {
        if (this.version == 1) {
            this.listBoard.active = true
            let listNode: Node[] = this.items.children
            this.shuffleNodes(listNode)
            let indexDuyet = 0
            this.listChu.forEach((element, index) => {
                let board = instantiate(this.board)
                this.listBoard.addChild(board)
                if (this.getParamUrl('input') == "tv_cheothuyen_uownguowc") {
                    board.getComponent(BoardV1).title.fontSize = 50
                }
                board.getComponent(BoardV1).SetUp(element)
                listNode[indexDuyet].angle = this.getRandomInt(-90, 90)
                listNode[indexDuyet].getComponent(Item1).SetUp(element)
                this.listWin.push(listNode[indexDuyet])
                indexDuyet++;

            });

            this.listNhieu.forEach(element => {
                listNode[indexDuyet].angle = this.getRandomInt(-90, 90)
                listNode[indexDuyet].getComponent(Item1).SetUp(element)
                indexDuyet++
            });
        }

        if (this.version == 2) {
            this.listBoard.active = true
            let listNode: Node[] = this.items.children
            this.shuffleNodes(listNode)
            let indexDuyet = 0
            this.listChu.forEach((element, index) => {
                let board = instantiate(this.board)
                this.listBoard.addChild(board)
                if (this.getParamUrl('input') == "tv_cheothuyen_uownguowc") {
                    board.getComponent(BoardV1).title.fontSize = 50
                }
                board.getComponent(BoardV1).SetUp(element)
                for (let i = 0; i < element.number; i++) {
                    listNode[indexDuyet].angle = this.getRandomInt(-90, 90)
                    listNode[indexDuyet].getComponent(Item1).SetUp(element)
                    this.listWin.push(listNode[indexDuyet])
                    console.log(element)
                    indexDuyet++;
                }



            });

            this.listNhieu.forEach(element => {
                listNode[indexDuyet].angle = this.getRandomInt(-90, 90)
                listNode[indexDuyet].getComponent(Item1).SetUp(element)
                indexDuyet++
            });
        }


        if (this.version == 3) {
            this.bang = instantiate(this.board).getComponent(BoardV1)
            this.bang.node.setScale(new Vec3(1.2, 1.2, 1.2))
            this.listBoard.addChild(this.bang.node)
            let listNode: Node[] = this.items.children

            this.shuffleNodes(listNode)
            let indexDuyet = 0
            this.listBoard.active = true
            this.listChu.forEach((element, index) => {
                listNode[indexDuyet].angle = this.getRandomInt(-90, 90)
                listNode[indexDuyet].getComponent(Item1).SetUp(element)
                this.listWin.push(listNode[indexDuyet])
                indexDuyet++;

            });

            this.listNhieu.forEach(element => {
                listNode[indexDuyet].angle = this.getRandomInt(-90, 90)
                listNode[indexDuyet].getComponent(Item1).SetUp(element)
                indexDuyet++
            });


            this.setBang()
        }

        if (this.version == 4) {
            this.bang2.node.active = true

            let listNode: Node[] = this.items.children

            this.shuffleNodes(listNode)
            let indexDuyet = 0

            this.listNhieu.forEach(element => {
                listNode[indexDuyet].angle = this.getRandomInt(-90, 90)
                listNode[indexDuyet].getComponent(Item1).SetUp(element)
                indexDuyet++
            });


            this.setBangV2()
        }

    }

    bang: BoardV1 = null
    indexCurrent = 0
    public setBang() {
        this.bang.SetUp(this.listChu[this.indexCurrent])
        // this.items.children.forEach(ball => {
        //     if (ball.getComponent(Item1).data.type == this.bang.data.type) {
        //         ball.active = true
        //     }
        // })
        tutorial.instance.targetNode = null
        this.indexCurrent++
    }

    SetTime() {
        let time = 90
        this.time.string = "00:" + time.toString()
        let scheduleTime = () => {
            time--
            if (time >= 10) {
                this.time.string = "00:" + time.toString()
            }
            else {
                this.time.string = "00:0" + time.toString()

            }
            if (time == 6 && this.startGame == true) {
                this.time.node.parent.getComponent(Animation).play("animation")
                SoundGameMaganer.instance.playEffect(10)

            }

            if (time <= 0 && this.startGame == true) {
                this.startGame = false
                if (this.isGameOver == false) {
                    this.isGameOver = true;
                    this.TinhDiem()
                }
                // if (this.diem <= 1) {
                //     SoundGameMaganer.instance.playSai()
                // }
                // else {
                //     SoundGameMaganer.instance.playKhen()
                // }

                this.scheduleOnce(() => {
                    StarCtrl.instance.showNode()
                }, 1)

                this.time.node.parent.getComponent(Animation).stop()
                this.time.string = "00:00"

                this.unschedule(scheduleTime)

            }
        }

        this.schedule(scheduleTime, 1)
    }

    diem = 0
    TinhDiem() {
        if (this.version != 4) {
            if (this.diem >= 5) {
                StarCtrl.instance.SetDiem(3)
            }
            else {
                if (this.diem >= 3) {
                    StarCtrl.instance.SetDiem(2)
                }
                else {
                    if (this.diem >= 1) {
                        StarCtrl.instance.SetDiem(1)
                    }
                    else {
                        StarCtrl.instance.SetDiem(0)
                    }
                }
            }
        }
        else {
            if (this.diem >= 7) {
                StarCtrl.instance.SetDiem(3)
            }
            else {
                if (this.diem >= 4) {
                    StarCtrl.instance.SetDiem(2)
                }
                else {
                    if (this.diem >= 2) {
                        StarCtrl.instance.SetDiem(1)
                    }
                    else {
                        StarCtrl.instance.SetDiem(0)
                    }
                }
            }
        }
    }


    AddScore() {
        tutorial.instance.targetNode == null
        tutorial.instance.node.parent.active = false
        GamePlayCtrl.instance.timeTutorial = 15
        this.diem++;
        if (this.version != 4) {
            if (this.diem == 6) {
                if (this.isGameOver == false) {
                    this.isGameOver = true
                    this.startGame = false
                    StarCtrl.instance.SetDiem(3)
                }
                this.scheduleOnce(() => {
                    if (this.diem <= 1) {
                        SoundGameMaganer.instance.playSai()
                    }
                    else {
                        SoundGameMaganer.instance.playKhen()
                    }

                    this.scheduleOnce(() => {
                        StarCtrl.instance.showNode()
                    }, 1)
                }, 1)

            }
        }
        else {
            if (this.diem == 8) {
                if (this.isGameOver == false) {
                    this.isGameOver = true
                    this.startGame = false
                    StarCtrl.instance.SetDiem(3)
                }
                this.scheduleOnce(() => {
                    if (this.diem <= 1) {
                        SoundGameMaganer.instance.playSai()
                    }
                    else {
                        SoundGameMaganer.instance.playKhen()
                    }

                    this.scheduleOnce(() => {
                        StarCtrl.instance.showNode()
                    }, 1)
                }, 3)

            }
        }



    }

    public getParamUrl(param) {
        var url_string = window.location.href
        var url = new URL(url_string);
        var value = url.searchParams.get(param);
        return value
    }

    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    shuffleNodes(nodeList) {
        const length = nodeList.length;
        for (let i = 0; i < length; i++) {
            // Chọn chỉ số ngẫu nhiên trong danh sách
            const randomIndex = this.getRandomInt(0, length);
            // Hoán đổi vị trí của phần tử hiện tại và phần tử ngẫu nhiên
            [nodeList[i], nodeList[randomIndex]] = [nodeList[randomIndex], nodeList[i]];
        }
        return nodeList;
    }
    timeCount = 3
    SetTimeCountdown() {
        this.timeCoutdown.active = true
        if (this.timeCount < 1) {

            console.log(this.timeCount)
            this.timeCoutdown.getComponent(Label).string = "Bắt Đầu"
            this.timeCoutdown.setScale(new Vec3(2, 2, 2))
            this.timeCoutdown.getComponent(UIOpacity).opacity = 0
            tween(this.timeCoutdown).to(1, { scale: new Vec3(1, 1, 1) })
                .call(() => {
                    this.timeCoutdown.active = false

                })
                .start()
            tween(this.timeCoutdown.getComponent(UIOpacity)).to(1, { opacity: 255 })
                .start()


            return
        }
        this.timeCoutdown.getComponent(Label).string = this.timeCount.toString()
        this.timeCoutdown.setScale(new Vec3(2, 2, 2))
        this.timeCoutdown.getComponent(UIOpacity).opacity = 0
        tween(this.timeCoutdown).to(1, { scale: new Vec3(1, 1, 1) })
            .call(() => {
                this.timeCount--
                this.SetTimeCountdown()
            })
            .start()
        tween(this.timeCoutdown.getComponent(UIOpacity)).to(1, { opacity: 255 })
            .start()
    }

    ShowTutorial() {

    }


    timeTutorial = 15
    timeTutorial1 = 5
    isPlay = false
    protected update(dt: number): void {
        this.node.getComponent(UITransform).setContentSize(this.getSizeWindow())
        if (this.startGame == false && this.tutorial1 != null) {
            this.timeTutorial1 -= dt
            if (this.timeTutorial1 <= 0) {
                //this.tutorial1.active = true
            }
            else {
                this.tutorial1.active = false
            }
        }
        if (GamePlayCtrl.instance.IsUserPlay == false) return;
        if (GamePlayCtrl.instance.IsUserPlay2 == false) return;
        if (this.startGame == false) return
        this.timeManhinh -= dt
        this.timeTutorial -= dt
        if (this.timeTutorial <= 0) {
            if (tutorial.instance.node.parent.active == false) {
                tutorial.instance.node.parent.active = true
                this.randomTutorial()

            }

        }
        else {
            // if (tutorial.instance.targetNode == null || tutorial.instance.targetNode.active == false)
            //     tutorial.instance.node.parent.active = false
        }

        if (this.timeManhinh <= 0 && this.isPlay == false) {
            this.isPlay = true
            this.Play()
        }

    }
    public getSizeWindow(): Size {
        let newH: number = 0
        let newW: number = 0
        let scaleW = screen.windowSize.width / 1366
        let scaleH = screen.windowSize.height / 1024
        if (scaleW > scaleH) {
            newW = screen.windowSize.width / scaleH
            newH = 1024
        }
        else {
            newH = screen.windowSize.height / scaleW
            newW = 1366
        }
        return new Size(newW, newH)
    }

    @property(Node)
    anhs: Node = null

    @property(Node)
    anhFulls: Node = null

    public setBangV2() {
        this.listWin.push(this.listChu[this.indexCurrent])
        this.bang2.lbTrc1.color = new Color(255, 255, 255, 255)
        this.bang2.lbSau1.color = new Color(255, 255, 255, 255)

        this.bang2.lbTrc.color = new Color(0, 174, 255, 255)
        this.bang2.lbTrc.outlineColor = new Color(0, 174, 255, 255)

        this.bang2.lbSau.outlineColor = new Color(255, 197, 254, 255)
        this.bang2.lbSau.color = new Color(255, 197, 254, 255)

        this.bang2.isType1 = false
        this.bang2.isType2 = false
        this.bang2.SetUP(this.listChu[this.indexCurrent])
        // this.balls.forEach(ball => {
        //     if (this.removeAccents(ball.type) == this.removeAccents(this.bang.type) || this.removeAccents(ball.type) == this.removeAccents(this.bang.type1)) {
        //         ball.node.active = true
        //     }
        // })

        this.anhs.children.forEach((element, index) => {
            if (index == this.listChu[this.indexCurrent].anh) {
                element.active = true
            }
            else {
                element.active = false
            }
        })

    }

    removeAccents(input: string): string {
        // Normalize the input string to decompose diacritics
        return input.normalize('NFD')
            .replace(/[\u0301\u0300\u0309\u0323\u0303]/g, '')  // Chỉ loại bỏ dấu sắc, huyền, ngã, nặng, hỏi



            .normalize('NFC');  // Gộp lại các ký tự sau khi bỏ dấu
    }


    @property(Node)
    full: Node

    @property(Label)
    fullLbl: Label
    showFull() {
        this.scheduleOnce(() => {
            if (this.startGame == false) return
            SoundGameMaganer.instance.playFullChu(this.listChu[this.indexCurrent].au)
        }, 0.5)
        this.full.active = true
        this.anhFulls.children.forEach((element, index) => {
            if (index == this.listChu[this.indexCurrent].anh) {
                element.active = true
            }
            else {
                element.active = false
            }
        })

        this.fullLbl.string = this.listChu[this.indexCurrent].full

        this.scheduleOnce(() => {
            if (this.startGame == false) return
            this.indexCurrent++
            this.full.active = false
            this.setBangV2()
        }, 3.5)
    }

    btnBack() {
        console.log("[ACTION]: BACK")
    }

    ShowTutorial1() {
        if (this.tutorial1 != null) {
            this.tutorial1.position = new Vec3(-1202.713, -1488.159, 0)
            tween(this.tutorial1).to(1, { position: new Vec3(-1123.705, -1488.159) })
                .call(() => {
                    this.ShowTutorial1()
                })
                .start()
        }

    }


    FindBoardCorrect() {
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



        listWin[0].setPosition(this.vectorCorrect)
    }







    Play() {
        this.up.getComponent(Animation).play("Scale2")
        this.down.getComponent(Animation).play("Scale2")
        this.helm.getComponent(Animation).play("Scale2")
    }

    End() {
        this.up.getComponent(Animation).stop()
        this.down.getComponent(Animation).stop()
        this.helm.getComponent(Animation).stop()
    }

}


