/**
 * Created by Administrator on 2017/5/17 0017.
 */

var obj = {
        data: origindata
    },
    suppliers,
    // nodesMap,
    root,
    map;


var init = function() {
    suppliers = $.extend(true, {}, obj).data;
    setNetWorkBackgroundTable(levelData, suppliers.length);
    // nodesMap = getNodesMap(suppliers);
    map = createGrid();
    createWarnIcons(map, map.warnNodes);
    setRiskRelationTable(map, suppliers);
};

init();

// 创建风险节点的警示图标
function createWarnIcons(map, nodes) {

    var node,
        map,
        options = map.options,
        icon;

    for (var i = 0, len = nodes.length; i < len; i++) {
        node = nodes[i];
        icon = $('<img src="./image/warn.png" class="demo-icon" />')[0];
        icon.style.left = node.left - options.nodeRadius;
        icon.style.top = node.top - map.scrollTop - options.nodeRadius / 2;
        map.dom.parentNode.appendChild(icon);
        icon.setAttribute('data-id', node.__storage.id);
    }
}


// 设置树形图的背景展现形式.
function setNetWorkBackgroundTable(levelData, level) {
    var $table = $(".demo-unit");
    var trContent = "";
    for (var i = 0; i < level; i++) {
        trContent += "<tr><td class='demo-label'>" + levelData[i] + "</td><td class='demo-value'></td></tr>";
    }
    $table.append(trContent);
}

// 根据风险节点推算供应商至产品编码的路径信息
function setRiskRelationTable(map, data) {

    var list = getAffectedData(map);

    var pathList = [];

    for (var i = 0, len = list.length; i < len; i++) {
        var path = list[i];
        var code = path[6].__storage.name;
        var t1 = path[7].__storage.name;
        var tn = path[data.length - 1].__storage.name;

        var risk = {
            code: code,
            t1: t1,
            tn: tn,
            affectedProduct: 'P8/P8 Lite',
            affectedMoney: (i + 1) + 'M',
            affectedPO: (i + 1) * 100 + 'M',
            mitigationPlan: 'Plan'
        };
        pathList.push(risk);
    }

    var tbody = "";
    for (var m = 0, l = pathList.length; m < l; m++) {
        var risk = pathList[m];
        tbody += '<tr>' +
            '<td class="demo-value">' + risk.code + '</td>' +
            '<td class="demo-value">' + risk.t1 + '</td>' +
            '<td class="demo-value">' + risk.tn + '</td>' +
            '<td class="demo-value content-left">' + risk.affectedProduct + '</td>' +
            '<td class="demo-value content-left">' + risk.affectedMoney + '</td>' +
            '<td class="demo-value content-left">' + risk.affectedPO + '</td>' +
            '<td class="demo-value content-left demo-mitigation-plan">' + risk.mitigationPlan + '</td>' +
            '</tr>';
    }
    $('#riskTable tbody').append(tbody);
    return pathList;
}


// 被setRiskRelationTable调用
// 获取节点路径
function getAffectedData(map) {

    function getParentPath(node, pathMap, pathNodesMap, sublist) {
        var parentNode;
        var level = node.__storage.level;
        var parentLevel = level - 1;

        pathMap[level] = node;
        var parent = node.parent;
        for (var j = 0, l = parent.length; j < l; j++) {
            parentNode = pathNodesMap[parent[j]];
            if (parentNode) {
                if (parentLevel > 6) {
                    getParentPath(parentNode, pathMap, pathNodesMap, sublist);
                } else if (parentLevel == 6) {
                    pathMap[parentLevel] = parentNode;
                    sublist.push($.extend(true, {}, pathMap));
                }
            }
        }
    }

    var warnNodes = map.warnNodes,
        pathNodesMap = map.pathNodesMap;

    var pathList = [];

    for (var i = 0, len = warnNodes.length; i < len; i++) {
        var rootNode = warnNodes[i];
        var storage = rootNode.__storage;
        var sublist = [];
        var pathMap = {};
        // pathMap[rootNode.__storage.level] = [rootNode];
        getParentPath(rootNode, pathMap, pathNodesMap, sublist);
        pathList = pathList.concat(sublist);
    }
    return pathList;
}


// 创建Grid
function createGrid() {

    map = new quickgrid.Map(host, {
        nodeRadius: 15,
        nodeWidth: 130,
        nodeSpace: 25,
        levelSpace: 15,
        padding: 7,
        textCenter: true,
        bezierLine: true,
        scrollAble: true
    });

    // 节点点击事件,将数据表格中的数据高亮显示
    map.on('nodeclick', function(e) {
        console.log('nodeclick');
        var node = e.node;
        var storage = node.__storage;
        var name = storage.name;
        var level = storage.level;
        var rows = $('#riskTable tbody tr');
        for (var i = 0, len = rows.length; i < len; i++) {
            var row = rows[i];
            var $row = $(row);
            if (level == 6 && row.children[0].textContent === name) {
                $row.addClass('demo-highlight');
            } else {
                $row.removeClass('demo-highlight');
            }
        }
    });

    // 节点点击事件,将数据表格中的数据高亮显示
    map.on('mapclick', function(e) {
        console.log('mapclick');
        var selectedNodes = map.selectedNodes;
        if (selectedNodes && selectedNodes.length === 0) {
            $('#riskTable tbody tr').removeClass('demo-highlight');;
        }
    });

    map.width(($('.demo-unit').width() - $('.demo-unit .demo-label').width()) + 'px');
    map.height(($('.demo-unit').height() + 10) + 'px');
    map.load(suppliers);

    return map;
}

// 根据riskInfo生成map结构数据
function generateRiskInfoMap(riskInfo) {
    var riskMap = {};
    for (var i = 0, len = riskInfo.length; i < len; i++) {
        if (risk = riskInfo[i]) {
            riskMap[risk.id] = risk;
        }
    }
    return riskMap;
}

var riskMap = generateRiskInfoMap(riskInfo);

//处理风险警示icon的点击事件
document.body.addEventListener('click', function(e) {

    var target = e.target;
    var icons = document.getElementsByClassName('demo-icon');
    var nodeId;
    var node;
    var risk;
    var popupId;
    var popup;

    if (target.className === 'demo-icon') {

        for (var i = 0, len = icons.length; i < len; i++) {
            var icon = icons[i];
            if (icon !== target) {
                icon.src = './image/warn.png';
                $(icon).popover('destroy');
            }
        }

        target.src = './image/warn_selected.png';
        if (node = map.nodesMap[target.getAttribute('data-id')]) {
            if (risk = riskMap[node.__storage.riskId]) {
                $(target).popover({
                    html: true,
                    placement: 'top',
                    animation: false,
                    content: '<div> <strong class = "demo-text" > Event: </strong>' + risk.info + '</br ><strong class = "demo-text" > Risk Level:</strong>' + risk.level + '</br></div>'
                });
                $(target).popover('show');
            }
        }
    } else {
        $(icons).popover('hide');
        for (var i = 0, len = icons.length; i < len; i++) {
            var icon = icons[i];
            icon.src = './image/warn.png';
        }
    }
});