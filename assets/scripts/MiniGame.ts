import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;


@ccclass('MiniGame')
export class MiniGame extends Component {
    public static mini1 = [
        { type: 0, number: 2, auSo: 2 },
        { type: 1, number: 2, auSo: 2 },
        { type: 2, number: 2, auSo: 2 },
        { type: 3, number: 2, auSo: 2 },
        { type: 4, number: 2, auSo: 2 },
        { type: 5, number: 2, auSo: 2 },
    ]

    public static mini1Nhieu = [
        { type: 0, number: 1 },
        { type: 0, number: 3 },
        { type: 1, number: 3 },
        { type: 1, number: 5 },
        { type: 2, number: 9 },
        { type: 2, number: 1 },
        { type: 3, number: 4 },
        { type: 4, number: 1 },
        { type: 5, number: 5 },
        { type: 0, number: 1 },
        { type: 0, number: 3 },
        { type: 1, number: 3 },
        { type: 1, number: 5 },
        { type: 2, number: 4 },
        { type: 2, number: 1 },
        { type: 3, number: 3 },
        { type: 4, number: 1 },
        { type: 5, number: 6 },
        { type: 5, number: 5 },
    ]

    public static mini2 = [
        { type: 0, number: 5, auSo: 5 },
        { type: 1, number: 5, auSo: 5 },
        { type: 2, number: 5, auSo: 5 },
        { type: 3, number: 5, auSo: 5 },
        { type: 4, number: 5, auSo: 5 },
        { type: 5, number: 5, auSo: 5 },
    ]

    public static mini2Nhieu = [
        { type: 0, number: 1 },
        { type: 0, number: 3 },
        { type: 1, number: 3 },
        { type: 1, number: 2 },
        { type: 2, number: 9 },
        { type: 2, number: 1 },
        { type: 3, number: 4 },
        { type: 4, number: 1 },
        { type: 5, number: 2 },
        { type: 0, number: 1 },
        { type: 0, number: 3 },
        { type: 1, number: 3 },
        { type: 1, number: 2 },
        { type: 2, number: 4 },
        { type: 2, number: 1 },
        { type: 3, number: 3 },
        { type: 4, number: 1 },
        { type: 5, number: 6 },
        { type: 5, number: 2 },
    ]

    public static mini3 = [
        { type: 0, number: 9, auSo: 9 },
        { type: 1, number: 9, auSo: 9 },
        { type: 2, number: 9, auSo: 9 },
        { type: 3, number: 9, auSo: 9 },
        { type: 4, number: 9, auSo: 9 },
        { type: 5, number: 9, auSo: 9 },
    ]

    public static mini3Nhieu = [
        { type: 0, number: 1 },
        { type: 0, number: 3 },
        { type: 1, number: 3 },
        { type: 1, number: 2 },
        { type: 2, number: 3 },
        { type: 2, number: 1 },
        { type: 3, number: 4 },
        { type: 4, number: 1 },
        { type: 5, number: 2 },
        { type: 0, number: 1 },
        { type: 0, number: 3 },
        { type: 1, number: 3 },
        { type: 1, number: 2 },
        { type: 2, number: 4 },
        { type: 2, number: 1 },
        { type: 3, number: 3 },
        { type: 4, number: 1 },
        { type: 5, number: 6 },
        { type: 5, number: 2 },
    ]


    public static mini4 = [
        { type: "e", auChu: 0, number: 6 },
    ]

    public static mini4Nhieu = [
        { type: "a" },
        { type: "b" },
        { type: "c" },
        { type: "d" },
        { type: "k" },
        { type: "f" },
        { type: "g" },
        { type: "h" },
        { type: "i" },
        { type: "k" },
        { type: "l" },
        { type: "m" },
        { type: "n" },
        { type: "o" },
        { type: "p" },
        { type: "a" },
        { type: "c" },
        { type: "v" },
        { type: "b" },
    ]

    public static mini5 = [
        { type: "ô", auChu: 1, number: 6 },

    ]

    public static mini5Nhieu = [
        { type: "a" },
        { type: "b" },
        { type: "c" },
        { type: "d" },
        { type: "k" },
        { type: "f" },
        { type: "g" },
        { type: "h" },
        { type: "i" },
        { type: "k" },
        { type: "l" },
        { type: "m" },
        { type: "n" },
        { type: "o" },
        { type: "p" },
        { type: "a" },
        { type: "c" },
        { type: "v" },
        { type: "b" },


    ]

    public static mini6 = [
        { type: "x", auChu: 2, number: 6 },

    ]

    public static mini6Nhieu = [
        { type: "a" },
        { type: "b" },
        { type: "c" },
        { type: "d" },
        { type: "k" },
        { type: "f" },
        { type: "g" },
        { type: "h" },
        { type: "i" },
        { type: "k" },
        { type: "l" },
        { type: "m" },
        { type: "n" },
        { type: "o" },
        { type: "p" },
        { type: "a" },
        { type: "c" },
        { type: "v" },
        { type: "b" },


    ]

    public static mini7 = [
        { type: "e", auChu: 0, number: 2 },
        { type: "ê", auChu: 3, number: 2 },
        { type: "đ", auChu: 4, number: 2 },
    ]

    public static mini7Nhieu = [
        { type: "a" },
        { type: "b" },
        { type: "c" },
        { type: "d" },
        { type: "k" },
        { type: "f" },
        { type: "g" },
        { type: "h" },
        { type: "i" },
        { type: "k" },
        { type: "l" },
        { type: "m" },
        { type: "n" },
        { type: "o" },
        { type: "p" },
        { type: "a" },
        { type: "c" },
        { type: "v" },
        { type: "b" },
    ]


    public static mini8 = [
        { type: "h", auChu: 5, number: 2 },
        { type: "l", auChu: 6, number: 2 },
        { type: "i", auChu: 7, number: 2 },
    ]

    public static mini8Nhieu = [
        { type: "a" },
        { type: "b" },
        { type: "c" },
        { type: "d" },
        { type: "k" },
        { type: "f" },
        { type: "g" },
        { type: "x" },
        { type: "r" },
        { type: "k" },
        { type: "c" },
        { type: "m" },
        { type: "n" },
        { type: "o" },
        { type: "p" },
        { type: "a" },
        { type: "c" },
        { type: "v" },
        { type: "b" },
    ]

    public static mini9 = [
        { type: "t", auChu: 8, number: 2 },
        { type: "r", auChu: 9, number: 2 },
        { type: "s", auChu: 10, number: 2 },

    ]

    public static mini9Nhieu = [
        { type: "a" },
        { type: "b" },
        { type: "c" },
        { type: "d" },
        { type: "k" },
        { type: "f" },
        { type: "g" },
        { type: "x" },
        { type: "x" },
        { type: "k" },
        { type: "c" },
        { type: "m" },
        { type: "n" },
        { type: "o" },
        { type: "p" },
        { type: "a" },
        { type: "c" },
        { type: "v" },
        { type: "b" },
    ]
    public static mini10 = [
        { type: "kh", auChu: 11, number: 6 },

    ]

    public static mini10Nhieu = [
        { type: "tr" },
        { type: "ch" },
        { type: "th" },
        { type: "ngh" },
        { type: "ngh" },
        { type: "th" },
        { type: "gh" },
        { type: "gh" },
        { type: "ch" },
        { type: "ch" },
        { type: "th" },
        { type: "ngh" },
        { type: "tr" },
        { type: "tr" },
        { type: "ch" },
        { type: "ch" },
        { type: "ngh" },
        { type: "gh" },
        { type: "gh" },
    ]

    public static mini11 = [
        { type: "ng", auChu: 12, number: 6 },

    ]

    public static mini11Nhieu = [
        { type: "tr" },
        { type: "ch" },
        { type: "th" },
        { type: "ngh" },
        { type: "ngh" },
        { type: "th" },
        { type: "gh" },
        { type: "gh" },
        { type: "ch" },
        { type: "ch" },
        { type: "th" },
        { type: "ngh" },
        { type: "tr" },
        { type: "tr" },
        { type: "ch" },
        { type: "ch" },
        { type: "ngh" },
        { type: "gh" },
        { type: "gh" },
    ]

    public static mini12 = [
        { type: "th", auChu: 13, number: 2 },
        { type: "ng", auChu: 12, number: 2 },
        { type: "tr", auChu: 14, number: 2 },

    ]

    public static mini12Nhieu = [
        { type: "kh" },
        { type: "ch" },
        { type: "th" },
        { type: "ngh" },
        { type: "ngh" },
        { type: "kh" },
        { type: "gh" },
        { type: "gh" },
        { type: "ch" },
        { type: "ch" },
        { type: "kh" },
        { type: "ngh" },
        { type: "kh" },
        { type: "kh" },
        { type: "ch" },
        { type: "ch" },
        { type: "ngh" },
        { type: "gh" },
        { type: "gh" },
    ]

    public static mini13 = [
        { type: "om", auChu: 17, number: 3 },
        { type: "op", auChu: 18, number: 3 },
    ]

    public static mini13Nhieu = [
        { type: "ao" },
        { type: "au" },
        { type: "ui" },
        { type: "ưi" },
        { type: "ut" },
        { type: "ưt" },
        { type: "ac" },
        { type: "et" },
        { type: "et" },
        { type: "au" },
        { type: "ai" },
        { type: "ao" },
        { type: "âu" },
        { type: "au" },
        { type: "oa" },
        { type: "ung" },
        { type: "ưng" },
        { type: "ung" },
        { type: "ang" },
    ]


    public static mini14 = [
        { type: "on", auChu: 15, number: 3 },
        { type: "ot", auChu: 16, number: 3 },


    ]

    public static mini14Nhieu = [
        { type: "ao" },
        { type: "au" },
        { type: "ui" },
        { type: "ưi" },
        { type: "ut" },
        { type: "ưt" },
        { type: "ac" },
        { type: "et" },
        { type: "et" },
        { type: "au" },
        { type: "ai" },
        { type: "ao" },
        { type: "âu" },
        { type: "au" },
        { type: "oa" },
        { type: "ung" },
        { type: "ưng" },
        { type: "ung" },
        { type: "ang" },
    ]

    public static mini15 = [
        { type: "oa", auChu: 19, number: 3 },
        { type: "oe", auChu: 20, number: 3 },

    ]

    public static mini15Nhieu = [
        { type: "ao" },
        { type: "au" },
        { type: "ui" },
        { type: "ưi" },
        { type: "ut" },
        { type: "ưt" },
        { type: "ac" },
        { type: "et" },
        { type: "et" },
        { type: "au" },
        { type: "ai" },
        { type: "ao" },
        { type: "âu" },
        { type: "au" },
        { type: "ut" },
        { type: "ung" },
        { type: "ưng" },
        { type: "ung" },
        { type: "ang" },
    ]

    public static mini16 = [
        { type: "ương", auChu: 21, number: 3 },
        { type: "ươc", auChu: 22, number: 3 },

    ]

    public static mini16Nhieu = [
        { type: "ao" },
        { type: "au" },
        { type: "ui" },
        { type: "ưi" },
        { type: "ut" },
        { type: "ưt" },
        { type: "ac" },
        { type: "et" },
        { type: "et" },
        { type: "au" },
        { type: "ai" },
        { type: "ao" },
        { type: "âu" },
        { type: "au" },
        { type: "ut" },
        { type: "ung" },
        { type: "ưng" },
        { type: "ung" },
        { type: "ang" },
    ]

    public static mini17 = [
        { type: "ơn", auChu: 23, number: 2 },
        { type: "ut", auChu: 24, number: 2 },
        { type: "ơt", auChu: 25, number: 2 },
    ]

    public static mini17Nhieu = [
        { type: "ao" },
        { type: "au" },
        { type: "ui" },
        { type: "ưi" },
        { type: "ao" },
        { type: "ưt" },
        { type: "ac" },
        { type: "et" },
        { type: "et" },
        { type: "au" },
        { type: "ai" },
        { type: "ao" },
        { type: "âu" },
        { type: "au" },
        { type: "au" },
        { type: "ung" },
        { type: "ưng" },
        { type: "ung" },
        { type: "ang" },
    ]


    public static mini18 = [
        { type: "ay", auChu: 26, number: 2 },
        { type: "au", auChu: 27, number: 2 },
        { type: "âu", auChu: 28, number: 2 },
    ]

    public static mini18Nhieu = [
        { type: "ao" },
        { type: "ây" },
        { type: "ui" },
        { type: "ưi" },
        { type: "ut" },
        { type: "ưt" },
        { type: "ac" },
        { type: "et" },
        { type: "et" },
        { type: "ây" },
        { type: "ai" },
        { type: "ao" },
        { type: "ao" },
        { type: "ây" },
        { type: "ut" },
        { type: "ung" },
        { type: "ưng" },
        { type: "ung" },
        { type: "ang" },
    ]


    public static mini19 = [
        { type: "7+1", auSo: 8 },
        { type: "5+1", auSo: 6 },
        { type: "9+1", auSo: 10 },
        { type: "3+1", auSo: 4 },
        { type: "4+1", auSo: 5 },
        { type: "1+1", auSo: 2 },
    ]

    public static mini19Nhieu = [
        { type: 1 },
        { type: 3 },
        { type: 7 },
        { type: 9 },
        { type: 5 },
        { type: 5 },
        { type: 1 },
        { type: 3 },
        { type: 9 },
        { type: 11 },
        { type: 12 },
        { type: 9 },
        { type: 7 },
        { type: 9 },
        { type: 1 },
        { type: 3 },
        { type: 7 },
        { type: 7 },
        { type: 1 },
    ]

    public static mini20 = [
        { type: "7+1", auSo: 8 },
        { type: "9+1", auSo: 10 },
        { type: "3+4", auSo: 7 },
        { type: "4+1", auSo: 5 },
        { type: "1+3", auSo: 4 },
        { type: "2+1", auSo: 3 },
    ]

    public static mini20Nhieu = [
        { type: 1 },
        { type: 3 },
        { type: 2 },
        { type: 9 },
        { type: 6 },
        { type: 6 },
        { type: 1 },
        { type: 2 },
        { type: 9 },
        { type: 11 },
        { type: 12 },
        { type: 9 },
        { type: 2 },
        { type: 9 },
        { type: 1 },
        { type: 2 },
        { type: 2 },
        { type: 11 },
        { type: 1 },
    ]
    public static mini21 = [
        { type: "4-1", auSo: 3 },
        { type: "3-1", auSo: 2 },
        { type: "5-1", auSo: 4 },
        { type: "2-1", auSo: 2 },
        { type: "7-1", auSo: 5 },
        { type: "6-1", auSo: 6 },
    ]

    public static mini21Nhieu = [
        { type: 1 },
        { type: 1 },
        { type: 7 },
        { type: 9 },
        { type: 8 },
        { type: 8 },
        { type: 1 },
        { type: 2 },
        { type: 9 },
        { type: 11 },
        { type: 12 },
        { type: 9 },
        { type: 7 },
        { type: 9 },
        { type: 1 },
        { type: 8 },
        { type: 8 },
        { type: 11 },
        { type: 1 },
    ]
    public static mini22 = [
        { type: "4-1", auSo: 3 },
        { type: "5-4", auSo: 1 },
        { type: "3-1", auSo: 2 },
        { type: "5-3", auSo: 2 },
        { type: "4-2", auSo: 1 },
        { type: "2-1", auSo: 1 },
    ]

    public static mini22Nhieu = [
        { type: 5 },
        { type: 4 },
        { type: 6 },
        { type: 9 },
        { type: 6 },
        { type: 6 },
        { type: 4 },
        { type: 4 },
        { type: 9 },
        { type: 11 },
        { type: 12 },
        { type: 9 },
        { type: 4 },
        { type: 9 },
        { type: 7 },
        { type: 8 },
        { type: 8 },
        { type: 11 },
        { type: 7 },
    ]

    public static mini23 =
        [
            { type: "l", type1: "úa", anh: 0, full: "bông lúa", au: 29 },
            { type: "s", type1: "ữa", anh: 1, full: "hộp sữa", au: 30 },
            { type: "t", type1: "ằm", anh: 2, full: "cơm tằm", au: 31 },
            { type: "n", type1: "em", anh: 3, full: "đĩa nem", au: 32 },
        ]

    public static mini23Nhieu = [
        { type: "l", },
        { type: "s", },
        { type: "t", },
        { type: "n", },
        { type: "n", },
        { type: "c", },
        { type: "p", },
        { type: "x", },
        { type: "n", },
        { type: "c", },
        { type: "x", },
        { type: "p", },
        { type: "ua" },
        { type: "ưa" },
        { type: "âm" },
        { type: "em" },
        { type: "âu" },
        { type: "ung" },
        { type: "ưc" },
        { type: "uc" },
        { type: "ac" },
        { type: "ep" },
        { type: "ac" },
        { type: "ep" },
        { type: "ac" },

    ]


    public static mini24 =
        [
            { type: "b", type1: "ảng", anh: 4, full: "cái bảng", au: 33 },
            { type: "r", type1: "ăng", anh: 5, full: "hàm răng", au: 34 },
            { type: "b", type1: "óng", anh: 6, full: "quả bóng", au: 35 },
            { type: "đ", type1: "ọc", anh: 7, full: "đọc sách", au: 36 },
        ]

    public static mini24Nhieu = [
        { type: "b", },
        { type: "r", },
        { type: "b", },
        { type: "đ", },
        { type: "n", },
        { type: "c", },
        { type: "p", },
        { type: "x", },
        { type: "n", },
        { type: "c", },
        { type: "x", },
        { type: "p", },
        { type: "ang" },
        { type: "ăng" },
        { type: "ong" },
        { type: "oc" },
        { type: "âu" },
        { type: "ung" },
        { type: "ưc" },
        { type: "uc" },
        { type: "ac" },
        { type: "ep" },
        { type: "ac" },
        { type: "ep" },
        { type: "ac" },

    ]

    public static mini25 =
        [
            { type: "", type1: "ong", anh: 8, full: "con ong", au: 37 },
            { type: "s", type1: "óc", anh: 10, full: "con sóc", au: 39 },
            { type: "v", type1: "òng", anh: 9, full: "cái vòng", au: 38 },
            { type: "c", type1: "óc", anh: 11, full: "con cóc", au: 40 },
        ]

    public static mini25Nhieu = [
        { type: "ong", },
        { type: "v", },
        { type: "s", },
        { type: "c", },
        { type: "n", },
        { type: "b", },
        { type: "p", },
        { type: "x", },
        { type: "n", },
        { type: "b", },
        { type: "x", },
        { type: "p", },
        { type: "ong" },
        { type: "oc" },
        { type: "oc" },
        { type: "em" },
        { type: "âu" },
        { type: "ung" },
        { type: "ưc" },
        { type: "uc" },
        { type: "ac" },
        { type: "ep" },
        { type: "ac" },
        { type: "ep" },
        { type: "ac" },

    ]

    public static mini26 =
        [
            { type: "ph", type1: "ễu", anh: 12, full: "cái phễu", au: 41 },
            { type: "kh", type1: "óa", anh: 13, full: "chìa khóa", au: 42 },
            { type: "g", type1: "uốc", anh: 14, full: "đôi guốc", au: 43 },
            { type: "r", type1: "ìu", anh: 15, full: "cái rìu", au: 44 },
        ]

    public static mini26Nhieu = [
        { type: "ph", },
        { type: "kh", },
        { type: "g", },
        { type: "r", },
        { type: "n", },
        { type: "b", },
        { type: "p", },
        { type: "x", },
        { type: "n", },
        { type: "b", },
        { type: "x", },
        { type: "p", },
        { type: "êu" },
        { type: "oa" },
        { type: "uôc" },
        { type: "em" },
        { type: "iu" },
        { type: "ung" },
        { type: "ưc" },
        { type: "uc" },
        { type: "ac" },
        { type: "ep" },
        { type: "ac" },
        { type: "ep" },
        { type: "ac" },

    ]
}


