var origindata = [
    [{
        "id": "1.2",
        "name": "消费者BG",
        "children": ["2.2"],
        "parent": []
    }],
    [{
        "id": "2.2",
        "name": "手机产品线",
        "children": ["3.1", "3.2", "3.3"],
        "parent": ["1.2"]
    }],
    [{
        "id": "3.1",
        "name": "P系列",
        "children": ["4.1", "4.2", "4.3"],
        "parent": ["2.2"]
    }],
    [{
        "id": "4.1",
        "name": "P8",
        "children": ["5.1", "5.2"],
        "parent": ["3.1"]
    }, {
        "id": "4.2",
        "name": "P8 Lite",
        "children": ["5.1", "5.3"],
        "parent": ["3.1"]
    }],
    [{
        "id": "5.1",
        "name": "显示屏&摄像头",
        "children": ["6.1", "6.2"],
        "parent": ["4.1", "4.2"]
    }],
    [{
        "id": "6.2",
        "name": "摄像头",
        "children": ["7.1", "7.2"],
        "parent": ["5.1"]
    }],
    [{
        "id": "7.1",
        "name": "23060132",
        "children": ["g3.1"],
        "parent": ["6.2"]
    }, {
        "id": "7.2",
        "name": "23060167",
        "children": ["g3.2"],
        "parent": ["6.2"]
    }],
    [{
        "id": "g3.1",
        "name": "舜宇",
        "children": ["g4.1", "g4.2"],
        "parent": ["7.1"],
        "type": "2"
    }, {
        "id": "g3.2",
        "name": "鸿富锦",
        "children": ["g4.1", "g4.2"],
        "parent": ["7.2"],
        "type": "2"
    }],
    [{
        "id": "g4.1",
        "name": "Sony",
        "children": [""],
        "parent": ["g3.1", "g3.2"],
        "type": "2",
        "warn": true,
        "riskId": 'r1'
    }, {
        "id": "g4.2",
        "name": "大立光",
        "children": [],
        "parent": ["g3.1", "g3.2"],
        "type": "2",
    }]
];


var riskInfo = [{
    id: "r1",
    level: "High",
    info: "2016/01/02 日本地震"
}, {
    id: "r2",
    level: "High",
    info: "2016/03/11, 发生暴乱."
}, {
    id: "r3",
    level: "Low",
    info: "2016/01/20, A区大面积停电"
}];

var levelData = ["BG",
    "IPMT",
    "SPDT",
    "PDT",
    "品类",
    "子品类",
    "编码",
    "一级供应商",
    "二级供应商",
    "三级供应商",
    "四级供应商",
    "五级供应商",
    "六级供应商",
    "七级供应商"
];