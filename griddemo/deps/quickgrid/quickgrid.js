$namespace('quickgrid', function(mind) {
    //默认参数配置
    var defaults = {

        // 文字是否居中显示
        textCenter: true,
        // 是否支持滚动
        scrollAble: true,
        // 圆型节点时半径大小
        nodeRadius: 15,
        //画布留白
        padding: 10,
        //节点宽度
        nodeWidth: 120,
        //节点高度
        nodeHeight: 30,
        //头部高度
        headHeight: 28,
        //文字左边距
        textLeft: 8,
        //节点间距离
        nodeSpace: 10,
        //上下级距离
        levelSpace: 33,
        //框选样式
        crossStyle: 'border 1px dashed black;background-color:silver;opacity:0.2;z-index:10',
        //框选是否交叉算选中
        crossSelect: 'cross',

        //是否bezier连线
        bezierLine: false,
        //线条宽度
        lineWidth: 1,
        //线条颜色
        lineColor: 'rgb(108,108,108)',
        //备注颜色
        remarkColor: '#F68D8D',
        //拖动线条的宽度
        dragLineWidth: 4,
        //拖动线条颜色
        dragLineColor: 'skyblue',

        //展开收拢操作的大小
        collapseSize: 0,
        //展开收拢操作绘制x偏移
        collapseOffsetX: -5,
        //展开收拢操作绘制y偏移
        collapseOffsetY: -5,
        //action大小
        actionSize: 19,
        //action右边距
        actionRight: 4,
        //action绘制x偏移
        actionOffsetX: 0,
        //action绘制y偏移
        actionOffsetY: 0,
        //action获取焦点时样式
        actionFocused: 'silver',
        //icons
        icons: {
            'warn': {
                width: 30,
                height: 30,
                default: 'data:image/png;base64,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',
                selected: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEcAAABMCAYAAAA/d6rcAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAACXBIWXMAAC4jAAAuIwF4pT92AAABWWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS40LjAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyI+CiAgICAgICAgIDx0aWZmOk9yaWVudGF0aW9uPjE8L3RpZmY6T3JpZW50YXRpb24+CiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgpMwidZAAAKmklEQVR4Ae1ae3CcVRU/3z6yu9nm/e4jhqSlLcm0gmClQAsYtQ9HsNMMWq2ttUkR26Ti0Dp0aJ0yWJo6jP9UQMUZqKNM1Y6OgnQaukrHCjKgjjIDw6MU0VJLX4NNnzSe32bP5j6+TTab3S/JzJ7O7b333HPvPff3/e757nezRHnJI5BHII+Adwg43k1lzPT1nsa45uHWQ0aLWu1TK16XA15PmJyvwP/dRHlZUudeGDWARoc5XT3XEQVeiGNx6cz1tHPxS1xWfQEgZnKHLodaXw7HTj2049/BUPT/C0S62dCfSGCylOEbEkBTgeOqN+I9OJ37b+O1zk8uz/HNo/Zfso4KlBTkMoAaVYC8Badtt58c3zZetC6R8q0UrY6wMpRIAAoAgUUqezxlkLfg1FW18waZyQvWxeebTksfWsVKACQgmQDpfTyo4cl4I8v3RqnQv4ccZ4LrhKHoLHrzxT3U+z4CMR6aBOTLibJrt1wqvWNOeWgDA1ObcjE+fxUt/Pad3F7IKZxIJns83VbeMOeuWC2H1yc5EGOxqSVSfBUde3MvnXznPBupzAF7PGeQF8xxKNi3lYGJqqiEfBeowLmoqtjEF6Gb1oA9KnMAqLzi4a9nr/bcM2f9Pg7A/h/xltIeRFfjr+jjZa/Sn0826wCFi5vo3MmDdPS1U9wAtnyYSMIcyfV+OahpDudgfIf6At0MjPYQSoMf0Kbpu+IJZU1ge+2X17BOfa2PCns0pzUns1Hpenae27nm/pk/oU9Wv0wR/wUKOJdp3zH+mlAlFJ1E/uA/6V8vv8dqkz3CHMSknEoumcOfB/yZYEh95Cita9yT1KIMnSUtn21nnbAHucmenMef3DGnM/YF3k5d5qJ3zv4+XV36RlId8F2m6tAp2nNkXlIXLwTDFVQ65T/0xnOHuC5xB7kwR3K9XxZruWFO2+4C8jkPmH5eXfI6LZvcY6rjOrRZ0jR3JYWKce4RBoE96mdFTtmTG3DqKtfyIhrNxe5ofpjJZGr53cw6tFkSjNTSoi1LWC/gIAc45qvd6poNRfbB6dhXwqu913RuYfUL8SBs6qWOAA0bSybPuoMqppayXuKOsEe+2uXc4wK7NdqwFNkHJ+LfxOBUqF74OExsb35EVbmWYQNbTfzBYvr0PctZ5zl7shuQu/bV84FvF4ODp5qUr9b/ntqveCpZT1WoCZ+id3pr6K+np+km0bKpdPztGJ04jEMR0JPALHlOXuvZZA7TOvAAA4Ojf1IivvO0lc816Qps0UcTx19AN7avYp3JHjU4y/bSuo6kkj3mrI99lEPrTv7y0fb+xmk/p9sn/iltH4uDvXT2wxAdOD5b7xMqaaBLZ1+kI68c5wYwRlgDJslHalYZlC3mAJD+e2EuiFQVnKINDM5wBX3QVxOAfk1bO+sQkIVBYI7KHqwnawzKDnM6Ywt4O21mxzTp5gB7U+U/NF06lZD/It+LnaOnj35CNy8orKVw6ev09vP/5gZhziUugz0qg/R+GdaywJzv+BiY7eb806LvUkfDb001/fh3RLes709377Sakwr0xRiWzGhdzbENcQ3sAYuQ8ALAg8Z6ssaekYPTefMKJvIsdkqTB5sfpaAPD1eXQ0eI/vC3/vT3ga8I3Yhr6IsxLAlPaKDFWxayXraWgCQAaTHP6j8MxcjAadsdIQcXWbpcX/YKLZl4QFdmUMMYGMuShuuWU2EV7qIFIDkYgj3CoBHHnpGBU1dxN2+pyabz32v5ganKuO46VjBcSYs23cGDCmsEHLAHa0IaMYMyB6cjVslXEhvYCU2W1D1HcytcnnbCqli5LC3CJ+UQgrEwpiV1LUupdlYV6yX+ACi8uQQgYU7GIGUKjkOFfZv52RSrTgecS7St+YeqyirXKR8WatkyVBQYE2Nr4g8UUmvnV1gH1qgMktgzYvZkBs5dsSbq892pOcuVNfyGuXLCu6Zaq6uAqGXNyKhgTIxtSUXTQpqxoIH1brFHwBEGWd2HUmQCjsPPahuzBhROSlGglzbPeDxZT1WoKx9oUcsDWvcSxsYcmuAbbu6K1axTwTHjj4fgrIvN4Vi3VHOSKxun/Sx+o2fqzbrKllpli5l2Zh23hZjDkuK6G2jOShwlVIDk1CxvLnQbduwZLnMcfg9Y98ITw+/TN5t+YfntpijnKFWAqMAyHObAHnNgLktm39bOOgEHubBHwFG3mNU9lWJ44HQ+ezu/um80B7t/5mNUGDC+pE2jRB23frWJraWyKIW5psYcmMuSwrKr6FMb5rNegBFwJDgPmzWYI31wbo4F3P7M0lL0Fq2sf8bydzDF1ElEpXyEqykbzMq9DXNhTkumzl9FgWiE9fJqF4AyZk/64Mzu62DWTDed6m7h2zsn/ZuCPjbdyxvz2K/5yaQ/e3JazIU5LcHfuhbf9znWAxRhkJx7BKBhMSg991b9pohZs8V06NZKvvet+YupHrT+2FN8UmvtT1/rHtQ0ZSPmxNyW1H/sS1RWX8J6gGMChLUCHElcHFzSA6e46B4eplodiv/OSztaXP5ioBrlsIy54YMm/mApfWbjF1mXChwBSOuWqjI0OB3P1PGB71vmAPj70zV8tTJagrnd/gZG1TOW0JRra9kvFSAEZiQBJy32DLUHHVof4+8BZ7UKAn4+8lrrcvpI4VFV7Xn5MF/GT+/ZRecvI8wocuLwXnpixXbWfMDpf4mEEyReqfjdC+5SQDtckKUUBKrU8o39zRxtH+VArDEM5422SX9M3c+jltLgGTp9MUoHT7ToM4ZLrqDe08/Tf189wQ0AQpLcFkqu9zNq2qKNNv5A4Bs+4+cjZfyTkXuv/KlhOnpV+AKfNIHPc5aB7dha6qsdW0t9cw26c1I3dvbcQr7Afm3S8VZ56cmNdOCRg+w2thYQPMPpHCdsL3zmy/YyIju3sKRijuvPR/q7jKP/mxfJZ4V69lHZowZoa2HuMadr/zI+16y1rMebIhAqp7Ip7/HPWN5i1yXuIEfMkbjjyhos1WbOuqd5n9o/H4HxuJTGG1ZQtBz3j2APknlqFvZYy7PB8UXWchBusCzHqyIYrqEF932e3QcoAoy6tWRlVvy1FGwpSGLLYTBEe3zQ8adiMskPimQy6eM2HnezJF27lJS3RhxQoA8Stg2C7gVOCMI458iZB4H5bEIvgVm2Gav7BQiqIk4jR5JFSw5bTCz7FzYYFO0Q6d9fG/r/VPaZgCKzSV/4JX7KwtU1SVn6WbkJjmWgKORp4IQJMFBP+8ygjJProoAj/gIgsEdliOoDQJIkfePtQ4EDYyRMIBTFQHgSApIMzKoxJabv8FdAEiaJDXJLUoEjnYSaAgT0AAn9wBoBBvlYE1kDcvXhAiCsBzq0iajluM4ERzVAGeAADFk8BhSg1Dgk7dw8ZkTWIuuA7+I/1qBuM7HVnDfBURsBDBaNQSAClICCtrEIStxZ5T8sXJIAJDnW5AoM+ruBoxpLZ+gwIMAQcLg4bsCBr1iDrAe5JOglcXFAUj150SM3E3pL+8BIY78EACAChJn3tyr/D7VIaTdzGUL0Uh+LuYAivkndzKU9mae7ODc7N11y4DFWECBUt9x0anu+nEcgj0AegTwCeQTyCOQRyCOQRyCPQB6BPAJZQOD/6D5J1eClzWMAAAAASUVORK5CYII=',
                hover: 'data:image/png;base64,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'
            }
        },
        //样式集定义
        styles: {
            'default': {
                common: {
                    nodeRadius: 15,
                    borderWidth: 0.5,
                    borderRadius: 5, // 方型圆角
                    borderColor: 'darkgray',
                    headBackgroundColor: 'rgb(176, 0, 4)',
                    shadowColor: 'rgb(122,122,122)',
                    headColorInNode: 'white',
                    headColorOutNode: 'black',
                    headFont: '14px Arial,sans-serif',
                    bodyBackgroundColor: 'white',
                    bodyColor: '#555555',
                    bodyFont: '10px Arial,sans-serif'
                },
                //获取鼠标焦点时的样式
                focused: {

                    borderColor: '#AAAAAA',
                    cursor: 'pointer'
                },
                //选中时的样式
                selected: {
                    borderWidth: 3,
                    borderWidth: 5,
                    borderColor: 'rgb(84,115,173)'
                        // shadowBlur: 10,
                        // shadowColor: 'black'
                },
                //搜索命中的样式
                searched: {
                    headColorInNode: 'red',
                    headColorOutNode: 'red',
                    headBackgroundColor: 'yellow'
                }
            }
        }


    };

    //注册的节点类型集合
    var registry_types = flyingon.create(null);

    //注册的命令类型集合
    var registry_commands = flyingon.create(null);

    //注册的布局集合
    var registry_layouts = flyingon.create(null);

    //扩展画布基础功能
    (function() {


        //转换文字为带省略号的形式
        function parse_text(context, text, width, all) {
            //获取可用宽度
            width = width - context.measureText("...").width;

            //获取评估长度
            var length = width * length / all | 0,
                split = text.substring(0, length),
                size = context.measureText(split).width,
                cache;
            if (size > width) {
                while (--length >= 0) {
                    split = text.substring(0, length);
                    if (context.measureText(split).width < width) {
                        return split;
                    }
                }
                return '';
            }
            while (true) {
                cache = text.substring(0, ++length);
                if (context.measureText(cache).width > width) {
                    return split;
                }
                split = cache;
            }
            return text;
        };

        //圆角矩形
        this.roundRect = function(x1, y1, x2, y2, radius) {

            this.beginPath();

            if (radius > 0) {
                this.moveTo(x1, y1 + radius);
                this.quadraticCurveTo(x1, y1, x1 + radius, y1);
                this.lineTo(x2 - radius, y1);
                this.quadraticCurveTo(x2, y1, x2, y1 + radius);
                this.lineTo(x2, y2 - radius);
                this.quadraticCurveTo(x2, y2, x2 - radius, y2);
                this.lineTo(x1 + radius, y2);
                this.quadraticCurveTo(x1, y2, x1, y2 - radius);
            } else {
                this.moveTo(x1, y1);
                this.lineTo(x2, y1);
                this.lineTo(x2, y2);
                this.lineTo(x1, y2);
            }

            this.closePath();
        };
        //绘制节点文字
        this.fillNodeText = function(text, left, x, y, width, height, font, color, textCenter, nodeWidth) {

            var size;

            this.font = font;
            this.fillStyle = color;
            this.textBaseline = 'middle';

            if ((size = this.measureText(text).width) > (width -= left << 1)) {
                text = parse_text(this, text, width, size) + '...';
            }
            if (textCenter) {
                this.fillText(text, x + (nodeWidth - size) / 2, y + (height >> 1));
            } else {
                this.fillText(text, x + left, y + (height >> 1));
            }
        };
        //画bezier连接线
        this.bezierLine = function(x1, y1, x2, y2) {

            this.moveTo(x1, y1);
            this.lineTo(x2, y2);
        };

        //画从上到下的bezier连线
        this.verticalBezierLine = function(x1, y1, x2, y2) {

            this.moveTo(x1, y1);
            this.bezierCurveTo(x1, y2, x2, y1, x2, y2);
        };

    }).call(CanvasRenderingContext2D.prototype);


    //布局基类
    $class('Layout', function() {


        var timestamp = 0;


        $constructor(function(map) {

            this.map = map;
            // this.leafNodes = []; // 最后一层节点的数组
            this.warnNodes = []; // 发生风险的节点数组
        });


        //布局类型 子类型必须重写此值
        this.type = '';

        //布局宽度
        this.width = 0;

        //布局高度
        this.height = 0;

        //排列节点，计算节点位置
        this.arrange = function() {

            var date = new Date();

            var map = this.map,
                // leafNodes = this.leafNodes,
                options = map.options,
                padding = options.padding,
                nodeSpace = options.nodeSpace,
                levelSpace = options.levelSpace,
                nodeWidth = options.nodeWidth,
                nodeHeight = options.nodeHeight,
                radius = options.nodeRadius,
                nodes = map.nodes,
                height,
                children,
                warnNodes = [],
                nodesWidth,
                nodesHeight,
                len = nodes.length;

            this.layerWidth = map.dom.clientWidth || 0;
            this.layerHeight = map.dom.clientHeight || 0;


            // leafNodes.length = 0;

            this.width = this.height = 0;
            var canvasWidth = parseInt(map.width());
            if (nodes) {
                for (var i = 0; i < len; i++) {
                    var nodesArray = nodes[i];
                    var l = nodesArray.length;
                    nodesWidth = l * nodeWidth + (l - 1) * options.nodeSpace;
                    var top = (nodeHeight + levelSpace) * i + padding;
                    for (var j = 0; j < l; j++) {
                        var node = nodesArray[j];
                        if (node.__storage.type === '2') {
                            node.left = (canvasWidth - nodesWidth) / 2 + (nodeWidth + nodeSpace) * j + (nodeWidth / 2 - radius);
                        } else {
                            node.left = (canvasWidth - nodesWidth) / 2 + (nodeWidth + nodeSpace) * j;
                        }

                        node.top = top;
                        node.isInPath = false;

                        if (node.__storage.warn) {
                            warnNodes.push(node);
                        }

                        // if (j === l - 1) {
                        //     leafNodes.push(node);
                        // }
                    }

                    this.width = nodesWidth > this.layerWidth ? nodesWidth : this.layerWidth;
                }
                nodesHeight = (nodeHeight + levelSpace) * len;
                map.warnNodes = warnNodes;

                this.height = nodesHeight > this.layerHeight ? nodesHeight : this.layerHeight;

            }
            console.log('arrange:', new Date() - date, 'ms'); //输出方法执行完毕耗时
        };

        //获取指定区域内需要绘制的节点
        this.getDrawNodes = function(x, y, width, height) {
            var map = this.map,
                layout = map.getLayout(),
                nodes = map.nodes,
                levelTotal = nodes.length,
                start = y > 0 ? (y * levelTotal / layout.height | 0) : 0,
                end = (y + height) > 0 ? ((y + height) * levelTotal / layout.height | 0) : 0,
                // canvasHeight = parseInt(map.height()),
                // leafNodes = this.leafNodes,
                // options = map.options,
                // overspaceX = options.nodeWidth + options.nodeSpace,
                // overspaceY = options.nodeHeight + options.levelSpace,
                // space = options.nodeSpace + options.nodeHeight,
                // start = y > 0 ? (y / space) | 0 : 0,
                // end = (y + height) / space | 0,
                // x1 = x - overspaceX,
                // x2 = x + width + overspaceX,
                // y1 = y - overspaceY,
                // y2 = y + height + overspaceY,
                // left = x - options.levelSpace,
                // right = x + width + options.levelSpace,
                // time = timestamp++,
                // node,
                // width = options.collapseSize,
                drawNodes = [];

            for (; start <= end; start++) {
                if (start >= 0 && start <= levelTotal - 1) {
                    drawNodes = drawNodes.concat(nodes[start]);
                }
            }


            // for (var i = 0, len = leafNodes.length; i < len; i++) {
            //     node = leafNodes[i];
            //     var level = node.__storage.level;

            //     if (((node.top + space) > y) && (node.top < (y + canvasHeight))) {
            //         var levelNodes = nodes[level];
            //         for (var m = 0, n = levelNodes.length; m < n; m++) {
            //             drawNodes.push(levelNodes[m]);
            //         }
            //     }

            //     if (node.top > (y + canvasHeight)) {
            //         break;
            //     }
            // }

            return drawNodes;

        };

        this.getConnectPoint = function(parent, node, collapseSize) {

            var options = node.map.options;
            var nodeWidth = options.nodeWidth;
            var nodeHeight = options.nodeHeight;
            var type_p = parent.__storage.type;
            var type = node.__storage.type;

            var x1, y1, x2, y2;
            var radius = node.map.options.nodeRadius;


            if (type_p === '2') {
                x1 = parent.left + radius;
                y1 = parent.top + parent.height / 2;
            } else {
                x1 = parent.left + (parent.width >> 1);
                y1 = parent.top + parent.height + collapseSize;
            }


            if (type === '2') {
                x2 = node.left + radius;
                y2 = node.top + parent.height / 2;
            } else {
                x2 = node.left + (node.width >> 1);
                y2 = node.top;
            }

            return {
                x1: x1,
                y1: y1,
                x2: x2,
                y2: y2
            };
        };

        this.getCenterPoint = function(node) {
            var map = this.map;

            return {
                x: node.left - ((map.dom.clientWidth - node.width) >> 1),
                y: node.top - map.options.padding
            };
        };

        //绘制bezier曲线
        this.drawStraightLine = function(context, parent, node, options, collapseSize) {

            var children = node.children,
                collapsed = children && !node.collapsed(),
                point;

            context.beginPath();

            if (parent) {
                point = this.getConnectPoint(parent, node, collapseSize);
                context.bezierLine(point.x1, point.y1, point.x2, point.y2);
            }

            context.lineWidth = options.lineWidth;
            context.strokeStyle = options.lineColor;
            context.stroke();

            // //绘制补偿线
            // if (collapsed) {
            //     if ((target = children[0]).timestamp !== (time = node.timestamp)) {
            //         point = this.getConnectPoint(node, target, collapseSize);
            //         context.bezierLine(point.x1, point.y1, point.x2, point.y2);
            //     }

            //     if ((target = children[children.length - 1]).timestamp !== time) {
            //         point = this.getConnectPoint(node, target, collapseSize);
            //         context.bezierLine(point.x1, point.y1, point.x2, point.y2);
            //     }
            // }
        };

        var prototype = this;

        this.__class_init = function(Class) {
            if (this !== prototype) {
                if (this.type) {
                    registry_layouts[this.type] = Class;
                } else {
                    throw 'the type of class "' + Class.xtype + '" not allow empty';
                }
            } else {
                registry_layouts.left = Class;
            }
        };

    })

    //节点事件类
    $class('NodeEvent', flyingon.Event, function(base) {

        $constructor(function(type, node) {

            var index = 2,
                length = arguments.length,
                key;

            this.type = type;
            this.node = node;

            while (index < length) {
                this[arguments[index++]] = arguments[index++];
            }
        }, true);

    });


    //命令基类
    $class('Command', function() {

        var prototype = this;

        //命令类型
        this.type = '';

        //x坐标偏移
        this.scrollLeft = 0;

        //y坐标偏移
        this.scrollTop = 0;

        //初始化命令
        this.init = function() {

        };

        //回退
        this.undo = function() {

        };

        //重做
        this.redo = function() {

        };

        this.__class_init = function(Class) {

            if (this !== prototype) {
                if (this.type) {
                    registry_commands[this.type] = Class;
                } else {
                    throw 'the type of class "' + Class.xtype + '" not allow empty';
                }
            }
        };


    });


    //展开节点命令
    $class(mind.Command, function(base) {

        this.type = 'expand';

        this.init = function(node) {

            this.node = node;
        };

        this.undo = function() {

            this.node.collapse(true, false);
        };

        this.redo = function() {

            this.node.expand(true, false);
        };

        this.dispose = function() {

            this.node = null;
        };


    });


    //思维导图类
    $class('Map', function() {

        var _self = this;
        var Array = window.Array;

        var NodeEvent = mind.NodeEvent;

        this.scrollLeft = this.scrollTop = 0;

        //当前鼠标指向的节点
        this.focusedNode = null;

        $constructor(function(host, options) {

            var dom = this.dom = document.createElement('div');

            dom.style.cssText = 'position:relative;width:100%;height:400px;overflow:hidden;';
            dom.innerHTML = '<div style ="position:relative;width:100%;height:100%;margin:0;border:0;padding:0;overflow:hidden;">' +
                '<canvas tabindex="0" style="position:absolute;left:0;top:0;-webkit-user-select:none;outline:none;"></canvas>' +
                '<canvas style="position:absolute;left:0;top:0;display:none;"></canvas>' +
                '</div>';

            //禁止拖动canvas
            dom.ondragstart = function() {

                return false;
            };

            // dom = dom.children[0]; //twoDiv

            //this.dom_scroll =(this.dom_host = dom.children[2]).children[0];//用于做滚动条效果

            this.dom_scrollWraper = dom = dom.children[0];
            this.dom_canvas = dom.children[0];
            this.dom_drag = dom.children[1]; //第二个canvas 拖动层
            // this.dom_canvas = dom = dom.children[0]; //第一个canvas 画布层

            if (options.scrollAble) {
                var dom_canvas = this.dom_canvas;
                dom_canvas.style.position = 'absolute';

                dom_canvas.style.left = 'auto';
                dom_canvas.style.right = 'auto';
                dom_canvas.style.top = 'auto';
                dom_canvas.style.buttom = 'auto';


                var dom_layer = document.createElement('div');
                dom_layer.id = 'scrollLayer';
                dom_layer.style.zIndex = '999';
                this.dom_scrollWraper.appendChild(dom_layer);
                this.dom_scrollLayer = dom.children[2];
            }

            dom = this.dom_canvas;

            this.context = dom.getContext('2d');
            this.selectedNodes = []; //存放选中的节点
            this.commands = []; //存放命令
            this.commands.index = -1; //
            if (host && !host.nodeType) {
                options = host;
                host = null;
            }

            //处理配置参数
            extend(this.options = flyingon.create(null), defaults);
            options && extend(this.options, options);

            //创建查找样式的方法
            create_findStyle(this);

            //绑定事件
            bind_events(this, dom);

            (host || document.body).appendChild(this.dom);
        });

        function extend(target, source) { //options对象,和default对象

            for (var name in source) {
                var value = source[name];

                if (value && typeof value === 'object') {
                    extend(target[name] || (target[name] = flyingon.create(null)), value);
                } else {
                    target[name] = value;
                }
            }
        };

        function create_findStyle(target) {
            var styles = target.options.styles,
                list = [],
                values = target.__styles = [],
                index = 0;

            for (var name in styles) {
                if (name === 'default') {
                    values['default'] = styles[name];
                } else {
                    list.push('if (' + name + ') return this.__styles[' + index + '];');
                    values[index++] = styles[name];
                }
            }

            if (values['default']) {
                list.push('return this.__styles["default"];');
            } else {
                list.pop();
                list.push('return this.__styles[' + (--index) + '];');
            }
            target.findStyle = new Function('node', list.join('\n'));
        };

        function bind_events(target, dom) {

            var hitTest, mousedown;

            function mouse_event(e, node) {

                var event = new flyingon.Event(e.type);

                event.dom = e.target;
                event.node = node || hitTest && hitTest[0] || null;

                event.ctrlKey = e.ctrlKey;
                event.shiftKey = e.shiftKey;
                event.altKey = e.altKey;
                event.metaKey = e.metaKey;
                if (!(event.which = e.which)) {
                    event.which = e.button & 1 ? 1 : (e.button & 2 ? 3 : 2);
                }

                event.pageX = e.pageX;
                event.pageY = e.pageY;

                event.clientX = e.clientX;
                event.clientY = e.clientY;

                event.screenX = e.screenX;
                event.screenY = e.screenY;

                return event;
            };

            dom.onmousedown = function(e) {
                var node = hitTest && hitTest[0] || null;
                if (target.trigger(e = mouse_event(e, node)) === false) {
                    return false;
                }
                if (e.which === 1) {
                    mousedown = {

                        x: e.clientX,
                        y: e.clientY,
                        node: node
                    };

                    if (node && node.parent && target.trigger('dragstart', 'node', node) !== false) //点中非根节点则拖拽
                    {
                        // mousedown.type = 'drag';
                    } else if (target.movable()) //移动
                    {
                        // mousedown.type = 'move';
                    } else //框选
                    {
                        mousedown.type = 'cross';
                        if (!e.ctrlKey) {
                            target.selectNodes(null);
                        }
                    }
                }
            };

            dom.onmousemove = function(e) {

                var rect = dom.getBoundingClientRect(),
                    cache = hitTest = target.hitTest(e.clientX - rect.left, e.clientY - rect.top),
                    node = cache && cache[0];


                if (target.trigger(mouse_event(e, node)) === false) {
                    return false;
                }

                if (!mousedown) {
                    //在节点内
                    if (node) {
                        node.__do_mousemove(hitTest[2], hitTest[3]);
                    } else {
                        target.trigger(new NodeEvent('outofnode'));
                    }

                    //处理focused节点
                    target.changeFocused(node);
                }
            }

            dom.onmouseup = function(e) {
                var event = mouse_event(e),
                    node,
                    rect = dom.getBoundingClientRect(),
                    cache = hitTest = target.hitTest(e.clientX - rect.left, e.clientY - rect.top); //这两行是解决当删除节点后 不移动节点 直接单机节点时候 命中检测方法找到的是上一个节点

                if (!(mousedown && mousedown.start) && event.which === 1) {
                    if (hitTest) {
                        if (node = hitTest[0]) {
                            if (!node.selected) {
                                target.selectNodes(node, !e.ctrlKey);
                            }
                        }
                    } else if (!e.ctrlKey && e.target === dom) {
                        target.selectNodes(null, true);
                    }
                }
                target.trigger(event);
            };

            dom.onclick = dom.ondblclick = function(e) {

                var node = hitTest && hitTest[0] || null,
                    action;

                if (node) {
                    if (action === node.focusedAction) {
                        target.trigger(new NodeEvent('action' + e.type, node, 'action', action));
                    } else {
                        target.trigger(new NodeEvent('node' + e.type, node));
                    }
                } {
                    target.trigger(new NodeEvent('map' + e.type));
                }
                target.trigger(mouse_event(e));
            };

            document.addEventListener('mousemove', function(e) {
                if (mousedown && (mousedown.start || Math.abs((e.clientX - mousedown.x) * (e.clientY - mousedown.y)) > 1)) {
                    var fn = window.getSelection;
                    if (fn) {
                        fn.call(window).removeAllRanges();
                    } else {
                        window.document.selection.empty();
                    }
                    switch (mousedown.type) {
                        case 'move':
                            do_move(target, mousedown, e);
                            break;

                        case 'drag':
                            do_drag(target, mousedown, e);
                            break;

                        case 'cross':
                            do_cross(target, mousedown, e);
                            break;
                    }
                }
            });

            document.addEventListener('mouseup', function(e) {
                if (mousedown) {
                    if (mousedown.start) {
                        switch (mousedown.type) {
                            case 'move':
                                break;

                            case 'drag':
                                end_drag(target, mousedown, e);
                                break;

                            case 'cross':
                                end_cross(target, mousedown, e);
                                break;
                        }
                    }
                    mousedown = null;
                }
            });

            //滚动条事件
            /* target.dom_scroll.parentNode.onscroll = function (e) {
                 if (target.disableScroll != true) {
                     var zoom = target.zoom();

                     target.scrollLeft = this.scrollLeft / zoom | 0;
                     target.scrollTop = this.scrollTop / zoom | 0;

                     target.update();
                 }
                 else {
                     target.disableScroll = false;

                 }
             };*/

            target.dom.onmousewheel = function(e) {

                if (e.ctrlKey) {
                    // var rect = e.target.getBoundingClientRect();
                    // target[e.wheelDelta > 0 ? 'zoomUp' : 'zoomDown'](e.clientX - rect.left, e.clientY - rect.top);
                } else {
                    target.dom_scrollWraper.scrollTop += (e.wheelDelta > 0 ? -100 : 100);
                }
            };

            target.dom_scrollWraper.onscroll = function(e) {
                if (!target.options.scrollAble) return;
                target.scrollLeft = target.dom_scrollWraper ? target.dom_scrollWraper.scrollLeft : target.scrollLeft;
                target.scrollTop = target.dom_scrollWraper ? target.dom_scrollWraper.scrollTop : target.scrollTop;
                target.update(true);
            }
        };

        function do_move(target, mousedown, e) {
            var zoom = target.zoom(),
                x = (e.clientX - mousedown.x) / zoom | 0,
                y = (e.clientY - mousedown.y) / zoom | 0;

            if (!mousedown.start) {
                mousedown.left = target.scrollLeft;
                mousedown.top = target.scrollTop;
                mousedown.start = true;
            }

            target.moveTo(mousedown.left - x, mousedown.top - y, false);
            target.draw();
        };

        //图形宽度
        this.defineProperty('width', '100%', {
            set: 'this.dom.style.width = value >= 0 ? value + "px" : value;'
        });

        //图形高度
        this.defineProperty('height', '400px', {
            set: 'this.dom.style.height =value >= 0 ? value + "px" :value;'
        });

        //是否可以移动
        this.defineProperty('movable', true);

        //布局类型
        this.defineProperty('layout', 'left', {

            set: 'this.__layout = null;'
        });


        //加载数据
        this.load = function(data, level, mapping) {

            var options = this.options,
                target = mind.Node.prototype;
            //给节点原型添加属性
            target.width = options.nodeWidth;
            target.height = options.nodeHeight;

            if (level && typeof level === 'object') {
                mapping = level;
                level = -1;
            }
            if (typeof data === 'string') {
                data = flyingon.parseJSON(data);
            }

            var nodes = this.nodes = parse_node(this, data, registry_types);

            var createNodesMap = function(data) {
                var nodesMap = {};
                for (var i = 0, len = data.length; i < len; i++) {
                    var subDataArray = data[i];
                    for (var j = 0, l = subDataArray.length; j < l; j++) {
                        var node = subDataArray[j];
                        nodesMap[node.__storage.id] = node;
                    }
                }

                return nodesMap;
            }

            this.nodesMap = createNodesMap(nodes);

            // if (level >= 0) {
            //     this.root.expandToLevel(level, false, false);
            // }

            this.arrange();
            // this.moveToNode(this.nodes[0], false);
            this.draw();

            //清空命令列表
            this.commands.length = this.commands.index = 0;
            this.trigger('loaded');
        };


        function parse_node(map, originData, types) {

            var nodes = [];

            for (var i = 0, len = originData.length; i < len; i++) {

                var nodesDataArray = originData[i];
                var nodesArray = [];

                for (var j = 0, l = nodesDataArray.length; j < l; j++) {
                    var data = nodesDataArray[j];
                    data.level = i;

                    var node = new(data.type && types[data.type] || mind.Node)(map),
                        storage = node.__storage = flyingon.create(node.__defaults),
                        children;

                    // storage.level = j;

                    for (var name in data) {
                        if (name !== 'children' && name !== 'parent') {
                            storage[name] = data[name];
                        } else {
                            node[name] = data[name];
                        }
                    }

                    nodesArray.push(node);
                }

                nodes[i] = nodesArray;
            }

            return nodes;
        };


        //获取当前布局
        this.getLayout = function() {

            return this.__layout || (this.__layout = new(registry_layouts[this.layout()] || registry_layouts.left)(this));
        };

        //排列节点
        this.arrange = function() {
            this.getLayout().arrange();
        };

        //选中节点
        this.selectNodes = function(nodes, clear) {

            var selectedNodes = this.selectedNodes,
                index = selectedNodes.length,
                node;

            if (!nodes) {
                clear = true;
                nodes = null;
            }

            if (clear && (clear = index > 0)) {
                for (var i = index - 1; i >= 0; i--) {
                    selectedNodes[i].selected = false;
                }
                selectedNodes.length = 0;
            }

            if (nodes) {
                if (!nodes[0]) {
                    nodes = [nodes];
                }
                index = 0;

                while (node = nodes[index++]) {
                    if (!node.selected) {
                        node.selected = true;
                        selectedNodes.push(node);
                    }
                }
            }

            if (clear || selectedNodes.length > 0) {
                this.update();
            }
        };

        //切换焦点节点
        this.changeFocused = function(node) {

            var focused = this.focusedNode;

            if (focused !== node) {
                var list = [];

                if (focused) {
                    var action = focused.focusedAction,
                        parent = focused.parent || focused === this.root;
                    if (action) {
                        parent && this.trigger(new NodeEvent('actionmouseout', focused, 'action', action));
                        focused.focusedAction = null;
                    }

                    focused.focused = false;
                    if (parent) {
                        this.trigger(new NodeEvent('nodemouseout', focused));

                    }

                }

                if (this.focusedNode = node) {
                    node.focused = true;
                    this.trigger(new NodeEvent('nodemouseover', node));

                }

            }
        };


        //移动到指定位置
        this.moveTo = function(x, y, update) {

            var layout = this.getLayout(),
                dom = this.dom,
                zoom = this.zoom(),
                width = dom.clientWidth / zoom | 0,
                height = dom.clientHeight / zoom | 0;

            this.scrollLeft = x | 0;
            this.scrollTop = y | 0;

            if (update !== false) {
                this.update();
            }
        };

        //移动到指定节点
        this.moveToNode = function(node, update, offsetX, offsetY) {

            var x, y;
            node = node || this.root;

            if (offsetX == null && offsetY == null) {
                y = this.getLayout().getCenterPoint(node);
                x = y.x;
                y = y.y;
            } else {
                x = node.left - (offsetX | 0);
                y = node.top - (offsetY | 0);
            }
            this.moveTo(x, y, update);
        };

        //缩放级别列表
        this.zoomList = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0, 1.1, 1.2, 1.3, 1.4, 1.5];

        this.__zoom = 1;

        //获取设置缩放级别
        this.zoom = function(zoom, offsetX, offsetY, update) {

            if (zoom == null) {
                return this.__zoom || 1;
            }

            var list = this.zoomList,
                min = list[0],
                max = list[list.length - 1];

            zoom = +zoom || 1;

            if (zoom > max) {
                zoom = max;
            } else if (zoom < min) {
                zoom = min;
            }
            if (this.__zoom != zoom) {
                //如果不指定缩放坐标则按照组件中心点为参照缩放
                if (offsetX == null) {
                    offsetX = this.dom.clientWidth >> 1;
                }
                if (offsetY == null) {
                    offsetY = this.dom.clientHeight >> 1;
                }

                this.scrollLeft += offsetX / this.__zoom - offsetX / zoom | 0;
                this.scrollTop += offsetY / this.__zoom - offsetY / zoom | 0;

                this.__zoom = zoom;

                if (update !== false) {
                    this.update();
                }
            }
        };

        //放大一级
        this.zoomUp = function(offsetX, offsetY, update) {

            var list = this.zoomList,
                index = this.zoomLevel();

            if (++index < list.length) {
                this.zoom(list[index], offsetX, offsetY, update);
                return true;
            }
        };

        //缩小一级
        this.zoomDown = function(offsetX, offsetY, update) {

            var index = this.zoomLevel();

            if (--index >= 0) {
                this.zoom(this.zoomList[index], offsetX, offsetY, update);
                return true;
            }
        };

        //当前缩放级别
        this.zoomLevel = function() {

            var list = this.zoomList,
                zoom = this.__zoom || 1,
                index = 0,
                min = 100,
                value;

            for (var i = list.length - 1; i >= 0; i--) {
                if ((value = zoom - list[i]) < 0) {
                    value = -value;
                }

                if (value < min) {
                    if (value === 0) {
                        return i;
                    }
                    index = i;
                    min = value;
                }
            }
            return index;
        };

        this.setScrollWidthHeight = function(width, height) {
            var layout = this.getLayout(),
                dom = this.dom,
                dom_canvas = this.dom_canvas,
                dom_scrollWraper = this.dom_scrollWraper,
                dom_scrollLayer = this.dom_scrollLayer;

            width = width || dom.clientWidth;
            height = height || dom.clientHeight;

            this.dom.width = width;
            this.dom.height = height;

            if (this.options.scrollAble) {
                dom_scrollWraper.style.overflow = 'hidden';

                var layerHeight = layout.layerHeight;
                var layerWidth = layout.layerWidth;

                if (layout.height > this.dom.height) {
                    dom_scrollWraper.style.overflow = 'auto';
                    // width = width - 18;
                    // layerHeight = layerHeight + 100;
                    // layerWidth = layerWidth - 18;
                }

                if (layout.width > this.dom.width) {
                    dom_scrollWraper.style.overflow = 'auto';
                    // height = height - 18;
                    // layerWidth = layerWidth + 100;
                    // layerHeight = layerHeight - 18;
                }


                dom_scrollLayer.style.width = layout.width + 'px';
                dom_scrollLayer.style.height = layout.height + 'px';
            }

            dom_canvas.width = width;
            dom_canvas.height = height;
            dom_canvas.style.width = width + 'px';
            dom_canvas.style.height = height + 'px';

            return {
                width: width,
                height: height
            }
        }

        //绘制节点
        this.draw = function(width, height) {

            var date = new Date();
            var layout = this.getLayout(),
                context = this.context,
                options = this.options,
                dom = this.dom,
                //dom =this.dom_scroll.parentNode,//滚动条的dom
                x = this.scrollLeft | 0,
                y = this.scrollTop | 0,
                zoom = this.zoom(),
                nodes,
                length;


            var obj = this.setScrollWidthHeight(width, height)
            width = obj.width;
            height = obj.height;

            dom = this.dom_canvas;
            dom.width = width - 10;
            dom.height = height - 10;

            dom.style.width = dom.width + 'px';
            dom.style.height = dom.height + 'px';
            if (zoom !== 1) {
                width = (width / zoom | 0) + 1;
                height = (height / zoom | 0) + 1;
            }
            //获取需要绘制的节点
            this.__draw_nodes = nodes = layout.getDrawNodes(x, y, width, height);

            //绘制节点
            if (length = nodes.length) {
                //如果已经存在的缩放平移状态则先恢复
                if (context.layout) {
                    context.restore();
                }

                context.layout = layout;
                context.options = options;
                context.zoom = zoom;

                context.save();

                //先缩放 需先缩放再移动 否则坐标换算比较麻烦
                if (zoom !== 1) {
                    context.scale(zoom, zoom);
                }
                //再移动
                context.translate(-x, -y);

                // 绘制路径
                var warnNodes = this.warnNodes || [];
                var pathNodes = [];

                for (var i = 0, len = warnNodes.length; i < len; i++) {
                    var warnNode = warnNodes[i];
                    // context.beginPath();
                    pathNodes = pathNodes.concat(this.getPathNodes(warnNode));
                }

                this.pathNodes = pathNodes;

                console.log('get path nodes:', new Date() - date, 'ms pathNodes.length:', pathNodes.length);
                var date_temp = new Date();

                // 绘制连线
                var nodesMap = this.nodesMap,
                    pathNode,
                    child,
                    childrenIds;
                for (var i = 0, len = pathNodes.length; i < len; i++) {
                    if ((pathNode = pathNodes[i]) && (childrenIds = pathNode.children)) {
                        for (var j = 0, l = childrenIds.length; j < l; j++) {
                            if ((id = childrenIds[j]) && typeof id !== 'object' && (child = nodesMap[id]))
                                layout.drawStraightLine(context, pathNode, child, options, options.collapseSize);
                        }
                    }
                }
                console.log('draw lines:', new Date() - date_temp, 'ms length:', nodes.length);

                //绘制节点
                for (var i = 0; i < length; i++) {
                    nodes[i].draw(context);
                }
            }
            console.log('draw end:', new Date() - date, 'ms length:', nodes.length);
        };


        this.getPathNodes = function(node) {

            function toUniqeArray(arr) {
                var map = {};
                var ret = [];

                for (var i = 0, len = arr.length; i < len; i++) {
                    map[arr[i]] = true;
                }

                for (var key in map) {
                    ret.push(key);
                }

                return ret;
            }

            var nodesMap = this.nodesMap,
                level = node.__storage.level - 1,
                pIds = node.parent || [],
                id,
                node,
                pathNodes = [node],
                pathNodesMap = {},
                any,
                ppIds = [];

            pathNodesMap[node.__storage.id] = node;

            do {
                ppIds.length = 0;
                for (var i = 0, len = pIds.length; i < len; i++) {
                    if ((id = pIds[i]) && (typeof id !== 'object')) {
                        if (node = nodesMap[id]) {
                            node.isInPath = true;
                            pathNodesMap[node.__storage.id] = node;
                            pathNodes.push(node);
                            if (any = node.parent) {
                                ppIds = ppIds.concat(any);
                            }
                        }
                    }
                }
                pIds = toUniqeArray(ppIds);
            } while (level--);
            this.pathNodesMap = pathNodesMap;

            return pathNodes;
        }


        //更新方法
        function update(target) {

            var locked, node;
            target.__update_time = 0;

            if (target.__update_arrange) {
                target.arrange();
                target.__update_arrange = false;

                if (locked = target.__update_locked) //锁定节点显示位置
                {
                    target.__update_locked = null;
                    node = locked.node;

                    target.moveToNode(node, false, locked.offsetX, locked.offsetY);
                }
            }
            target.draw();
        };

        //更新绘图
        this.update = function(arrange, locked) {

            var target = this;

            if (target.__update_time) {
                clearTimeout(target.__update_time);
            }

            if (arrange) {
                target.__update_arrange = true;

                if (locked) {
                    target.__update_locked = {

                        node: locked,
                        offsetX: locked.left - target.scrollLeft,
                        offsetY: locked.top - target.scrollTop
                    };
                }
            }
            target.__update_time = setTimeout(function() {

                update(target);
            }, 10);
        };

        //导出base64格式url
        this.toDataURL = function(imageType) {

            return this.dom_canvas.toDataURL('image/' + (imageType || 'png'));
        };

        //保存为json格式
        this.toJSON = function() {

            var root = this.root;

            if (root) {
                var writer = [];

                root.serialize(writer);
                return writer.join('');
            }
            return '';
        };


        //命中检测
        this.hitTest = function(x, y) { //传进来的是鼠标的的坐标


            var nodes = this.__draw_nodes, //获取绘制的节点
                zoom;
            if (nodes) {
                if ((zoom = this.zoom()) !== 1) { //当前如果是放大和缩小状态时
                    x = x / zoom | 0; //得到的结果比0大就是其本身整数部分 比0小就是0
                    y = y / zoom | 0;
                }

                x += this.scrollLeft; //鼠标相对画布的x
                y += this.scrollTop; //鼠标相对画布的y
                for (var i = nodes.length - 1; i >= 0; i--) {
                    var node = nodes[i],
                        left = node.left,
                        top = node.top;
                    if (x >= left && y >= top && x <= left + node.width && y <= top + node.height) {
                        return [node, null, x - left, y - top];
                    }
                    // var rect = node.collapseRect;

                    // if (rect && x >= rect.x1 && y >= rect.y1 && x <= rect.x2 && y <= rect.y2) {
                    //     return [null, node];
                    // }
                }
            }
        };

        //销毁节点
        this.dispose = function() {

            var list = this.commands,
                length = list.length,
                nodesMap = this.nodesMap;

            if (length > 0) {
                for (var i = length - 1; i >= 0; i--) {
                    list[i].dispose();
                }

                list.length = 0;
                this.commands = null;
            }

            for (var id in nodesMap) {
                nodesMap[id].dispose();
            }

            // this.root.dispose();
            if (list = this.selectedNodes) {
                list.length = 0;
                this.selectedNodes = null;
            }
            if (list = this.copiedNodes) {
                list.length = 0;
                this.copiedNodes = null;
            }
            if (this.dom.parentNode) {
                this.dom.parentNode.removeChild(this.dom);
            }

            this.root = this.dom = this.dom_canvas = this.dom_drag = this.context = null;
        };
    }); //Layout结尾
    //思维导图节点类
    $class('Node', function() {

        //节点事件类
        var NodeEvent = mind.NodeEvent;

        //圆弧度值
        var circle = 2 * Math.PI;

        $constructor(function(map) {

            this.map = map;
        });

        //是否异步加载节点
        this.async = false;

        //是否选中
        this.selected = false;

        //是否鼠标指向的节点
        this.focused = false;

        //鼠标指向的action
        this.focusedAction = null;

        //节点左上角x坐标
        this.left = 0;

        //节点左上角y坐标
        this.top = 0;

        //节点宽度
        this.width = 0;

        //节点高度
        this.height = 0;

        //节点id
        this.defineProperty('id', 0);

        //节点类型
        this.defineProperty('type', '');

        //节点名称
        this.defineProperty('name', '');

        //币种
        this.defineProperty('currency', '');

        //金额
        this.defineProperty('money', 0);

        //备注
        this.defineProperty('remark', '');

        //动作集合
        this.defineProperty('actions', '', {

            set: 'this.__actions = null;'
        });

        //是否折叠
        this.defineProperty('collapsed', false);

        //获取节点级别
        Object.defineProperty(this, 'level', {

            get: function() {
                var node = this,
                    level = 0;

                while (node = node.parent) {
                    level++;
                }

                return level;
            }
        });

        //处理mousemove事件
        this.__do_mousemove = function(x, y) {

            var map = this.map,
                focused = this.focusedAction,
                action = this.findAction(x, y);

            map.trigger(new NodeEvent('nodemousemove', this, 'offsetX', x, 'offsetY', y));

            if (focused !== action) {
                if (focused) {
                    map.trigger(new NodeEvent('actionmouseout', this, 'action', focused));
                }
                if (this.focusedAction = action) {
                    map.trigger(new NodeEvent('actionmouseover', this, 'action', action));
                }
                this.draw(map.context, true);
            }
        };

        //根据指定的坐标找action
        this.findAction = function(x, y) {

            var actions = this.__actions;

            if (actions) {
                var size = actions.size,
                    left = actions.x,
                    top = actions.y;

                if (y > top && y < top + size && x > left) {
                    return actions[(x - left) / size | 0] || null;
                }
            }
            return null;
        };

        //查找子节点
        this.find = function(filter, deep) {

            var nodes = arguments[2] || [],
                children;
            if (!deep && !filter) {
                nodes.push.apply(nodes, children);
                return nodes;
            }

            if (children = this.children) {
                for (var i = 0, _ = children.length; i < _; i++) {
                    var node = children[i];
                    if (!filter || filter(node)) {
                        nodes.push(node);
                    }
                    if (deep !== false && node.children) {
                        node.find(filter, true, nodes);
                    }
                }
            }
            return nodes;
        };

        //通过id查找指定节点 返回值null or node
        this.findById = function(id, deep) {

            var children = this.children;
            if (children) {
                for (var i = 0, _ = children.length; i < _; i++) {
                    var node = children[i];
                    if (node.id() === id) {
                        return node;
                    }
                    if (deep !== false && node.children && (node = node.findById(id, true))) {
                        return node;
                    }
                }
            }
            return null;
        };
        //通过name查找指定节点的集合
        this.findByName = function(name, deep) {

            var nodes = arguments[2] || [],
                children = this.children;

            if (children) {
                for (var i = 0, _ = children.length; i < _; i++) {
                    var node = children[i];
                    if (node.name() === name) {
                        nodes.push(node);
                    } else if (deep !== false && node.children) {
                        node.findByName(name, true, nodes);
                    }
                }
            }
            return nodes;
        };

        //展开至指定子节点级别
        this.expandToLevel = function(level, trigger, update) {

            if (level = level | 0) {
                var nodes = this.children;

                if (nodes) {
                    if (level < 0) //传入-1默认全部展开
                    {
                        level = 1000;
                    }
                    if (this.collapsed()) {
                        this.collapsed(false);
                        if (trigger) {
                            this.map.trigger(new NodeEvent('collapsed', this));
                        }
                        if (update !== false) {
                            update = true;
                        }
                    }
                    if (expandToLevel(this.map, nodes, level, trigger) && update !== false) {
                        update = true;
                    }
                    if (update) {
                        this.map.update(true, this);
                    }
                }
            } else {
                this.collapsed(trigger, update);
            }
        };

        function expandToLevel(map, nodes, level, trigger) {
            var change;
            level--;
            for (var i = 0, _ = nodes.length; i < _; i++) {
                var node = nodes[i],
                    children;

                if (node.async) //异步加载
                {
                    map.trigger(new NodeEvent('asyncload', this));
                } else if (children = node.children) {
                    var collapsed = node.collapsed();
                    if (level > 0) //继续展开上级节点
                    {
                        if (collapsed) {
                            node.collapsed(false);
                            if (trigger) {
                                map.trigger(new NodeEvent('expanded', node));
                            }
                            change = true;
                        }
                        //继续展开下级节点
                        change = expandToLevel(map, children, level, trigger) || change;
                    } else if (!collapsed) //收拢子节点
                    {
                        node.collapsed(true);

                        if (trigger) {
                            map.trigger(new NodeEvent('collapsed', this));
                        }
                        change = true;
                    }
                }
            }
            return change;
        };
        //展开当前节点
        this.expand = function(trigger, update) {

            if (this.collapsed()) {
                var map = this.map,
                    children;

                if (this.async) {
                    map.trigger(new NodeEvent('asyncload', this));
                } else if (children = this.children) {
                    this.collapsed(false);
                    if (trigger !== false) {
                        map.trigger(new NodeEvent('expand', this));
                    }
                    if (update !== false) {
                        map.addCommand('expand', this);
                        map.update(true, this);
                    }
                }
            }
        };

        //收拢当前节点
        this.collapse = function(trigger, update) {

            var children = this.children;

            if (children && !this.collapsed()) {
                var map = this.map;

                this.collapsed(true);

                if (trigger !== false) {
                    map.trigger(new NodeEvent('collapse', this));
                }
                if (update !== false) {
                    map.addCommand('collapse', this);
                    map.update(true, this);
                }
            }
        };

        //复制当前节点
        this.copy = function(deep) {

            var node = new this.Class(),
                source = this.__storage,
                cache;

            node.map = this.map;

            if (source) {
                cache = node.__storage = flyingon.create(node.__defaults);

                for (var name in source) {
                    cache[name] = source[name];
                }
            }
            if (deep !== false && (cache = this.children)) {
                copy_deep(node, cache);
            }
            return node;
        };

        function copy_deep(parent, children) {

            var nodes = parent.children = [];

            for (var i = 0, _ = children.length; i < _; i++) {
                var node = children[i].copy(true);

                node.parent = parent;
                nodes.push(node);
            }
        };
        //从json 批量加载节点
        this.load = function(data, mapping, update) {

            var map = this.map,
                nodes = map.parseNodes(data, mapping, this);

            if (this.async) {
                this.async = false;
                this.collapsed(false);

                map.addCommand('collapse', this);
            }
            if (nodes && nodes.length > 0) {
                if (update !== false) {
                    map.update(true, this);
                }
            } else {
                this.children = null;
                if (update !== false) {
                    map.update();
                }
            }
        };

        //从json 批量加载节点
        this.setRisk = function(risk) {
            this.__storage.warn = risk;
            this.map.update(true);
        };

        //获取或设置节点在父节点中的索引
        this.index = function() {

            var nodes = this.parent;

            if (nodes && (nodes = nodes.children)) {
                for (var i = 0, _ = nodes.length; i < _; i++) {
                    if (nodes[i] === this) {
                        return i;
                    }
                }
            }
            return 0;
        };

        //添加子节点
        this.append = function(nodes, trigger, update) {

            this.insert(-1, nodes, trigger, update);
        };

        //插入节点
        this.insert = function(index, nodes, trigger, update) {

            if (nodes) {
                var map = this.map,
                    children = this.children || (this.children = []),
                    length = children.length,
                    node;

                if (index < 0 || index > length) {
                    index = length;
                }

                if (!(length = nodes.length)) {
                    nodes = [nodes];
                    length = 1;
                }

                for (var i = 0; i < length; i++) {
                    if (node = nodes[i]) {
                        node.map = map;
                        node.parent = this;

                        children.splice(index++, 0, node);
                    }
                }

                if (trigger !== false) {
                    map.trigger(new NodeEvent('insert', this, 'nodes', nodes));
                }
                if (update !== false) {
                    map.addCommand('insert', this, index, nodes);
                    map.update(true);
                }
            }
        };

        //移除当前节点
        this.remove = function(trigger, update) {

            var parent = this.parent,
                nodes;

            if (parent && (nodes = parent.children)) {
                var map = this.map;

                for (var i = nodes.length - 1; i >= 0; i--) {

                    if (nodes[i] === this) {
                        nodes.splice(i, 1);

                        if (!nodes.length) {
                            parent.children = null; //置空children属性
                        }

                        this.focused = false;
                        this.parent = this.focusedAction = null;

                        if (trigger !== false) {
                            map.trigger(new NodeEvent('remove', this, 'parent', parent));
                        }
                        if (update !== false) {
                            map.addCommand('remove', this, parent, i);
                            map.update(true);
                        }
                        return true;
                    }
                }
            }
        };

        //获取样式值
        this.styleValue = function(style, name) {

            var storage, value;

            if ((value = this.map.__search) &&
                (storage = this.__storage) &&
                (value.test(storage.name)) &&
                (value = style.searched[name])) {
                return value;
            }

            if (this.selected && (value = style.selected[name])) {
                return value;
            }

            if (this.focused && (value = style.focused[name])) {
                return value;
            }
            return style.common[name];
        };

        //绘制节点
        this.draw = function(context, dirty) {

            var layout = context.layout,
                options = context.options,
                style = this.map.findStyle(this),
                lineWidth = this.styleValue(style, 'borderWidth'),
                radius = this.styleValue(style, 'borderRadius'),
                shadowBlur = this.__clearRect || 0,
                offset = lineWidth / 2, //线条绘制偏移以解决边框模糊问题
                x = this.left,
                y = this.top,
                width = this.width,
                height = this.height,
                cache = shadowBlur << 1,
                type = this.__storage.type;

            //限制绘制范围
            context.save();

            //局部绘制时先清除原绘制区域
            if (dirty === true) {
                shadowBlur++;
                cache += 2;

                context.clearRect(x - shadowBlur, y - shadowBlur, width + cache, height + cache);

                context.save();

                context.rect(x - shadowBlur, y - shadowBlur, width + cache, height + cache);
                context.clip();
            }

            //非拖拉状态
            if (dirty !== 2) {

            }
            if (dirty === true) {
                context.restore();
            }

            context.save();

            //绘制阴影
            this.drawShadow(context, options, x, y, width, options.nodeHeight, style);
            context.restore();

            //绘制节点
            this.drawNode(context, options, x, y, width, options.nodeHeight, style);
            context.restore();

            //绘制边框
            this.drawBorder(context, options, x, y, width, options.nodeHeight, style);
            // context.restore();
        };


        //绘制节点头部
        this.drawShadow = function(context, options, x, y, width, height, style) {

            var color = this.styleValue(style, 'shadowColor'),
                node = this,
                radius = this.styleValue(style, 'borderRadius'),
                type = node.__storage.type,
                nodeWidth = options.nodeWidth,
                nodeHeight = options.nodeHeight,
                textCenter = options.textCenter;

            if (node.__storage.warn || node.isInPath) {
                context.fillStyle = 'rgb(176, 0, 4)';
            } else {
                context.fillStyle = 'black';
            }

            if (type === '2') {
                // var radius = 15;
                var radius = options.nodeRadius;
                context.beginPath();
                context.fillStyle = color;
                context.arc(x + radius + 2, y + 2 + nodeHeight / 2, radius, 0, Math.PI * 2, true);
                context.closePath();
                context.fill();

            } else {
                context.roundRect(x + 2, y + 2, x + width, y + height, radius);
                context.fill();
            }
        };


        //绘制节点头部
        this.drawNode = function(context, options, x, y, width, height, style) {

            var font = this.styleValue(style, 'headFont'),
                colorInNode = this.styleValue(style, 'headColorInNode'),
                colorOutNode = this.styleValue(style, 'headColorOutNode'),
                node = this,
                borderRadius = this.styleValue(style, 'borderRadius'),
                radius = options.nodeRadius,
                type = node.__storage.type,
                nodeWidth = options.nodeWidth,
                nodeHeight = options.nodeHeight,
                textCenter = options.textCenter;

            if (node.__storage.warn || node.isInPath) {
                context.fillStyle = 'rgb(176, 0, 4)';
            } else {
                if (type === '2') {
                    context.fillStyle = 'rgb(130,201,63)';
                } else {
                    context.fillStyle = 'black';
                }

            }

            if (type === '2') {
                // var radius = 15;
                context.beginPath();
                context.arc(x + radius, y + nodeHeight / 2, radius, 0, Math.PI * 2, true);
                context.closePath();
                context.fill();
                context.fillNodeText(this.name(), options.textLeft + radius * 2, x, y, width, height, font, colorOutNode);

                // // 如果本节点发生风险
                // if (node.__storage.warn) {
                //     this.drawIcon(context, options, x, y, width, height);
                // }
            } else {
                context.roundRect(x, y, x + width, y + height, borderRadius);
                context.fill();
                // context.fillRect(x, y, width, height);
                context.fillNodeText(this.name(), options.textLeft, x, y, width, height, font, colorInNode, textCenter, nodeWidth);
            }
        };

        // this.drawIcon = function(context, options, x, y, width, height) {

        //     var x = this.left + options.nodeRadius;
        //     var y = this.top - 8;
        //     var warn = options.icons.warn;
        //     var image = new Image();
        //     image.src = warn.default;

        //     context.drawImage(image, x, y, warn.width, warn.height);
        // }

        this.drawBorder = function(context, options, x, y, width, height, style) {

            var node = this,
                type = node.__storage.type,
                radius = options.nodeRadius,
                nodeWidth = options.nodeWidth,
                nodeHeight = options.nodeHeight,
                lineWidth = this.styleValue(style, 'borderWidth');


            context.strokeStyle = this.styleValue(style, 'borderColor');
            context.lineWidth = lineWidth;
            if (type === '2') {

                // 
                // context.strokeStyle = 'darkgray';
                // var radius = 15;
                context.beginPath();
                // context.arc(x + radius, y + radius, radius, 0, Math.PI * 2, true);
                context.arc(x + radius, y + nodeHeight / 2, radius + lineWidth / 3, 0, Math.PI * 2, true);
                context.closePath();
                context.stroke();
            } else {

                context.roundRect(x - lineWidth / 3, y - lineWidth / 3, x + width + lineWidth / 3, y + height + lineWidth / 3, this.styleValue(style, 'borderRadius'));
                context.strokeStyle = this.styleValue(style, 'borderColor');
                //context.strokeStyle = this.styleValue(style,'cursor');
                context.stroke();
            }
        }


        //绘制备注信息
        this.drawRemark = function(context, options, x, y, width, height) {

            x += width;
            context.fillStyle = options.remarkColor;

            context.beginPath();
            context.moveTo(x, y);
            context.lineTo(x, y + 10);
            //context.lineTo(x - 10, y);
            context.quadraticCurveTo(x - 10, y + 10, x - 10, y);
            context.closePath();
            context.fill();
        };

        // //绘制动作集
        // this.drawActions = function(context, options, x, y, width, height, actions) {

        //     actions = this.__actions || (this.__actions = actions.split(','));

        //     var images = options.actions,
        //         size = actions.size = options.actionSize,
        //         offsetX = actions.offsetX = options.actionOffsetX,
        //         offsetY = actions.offsetY = options.actionOffsetY,
        //         focused = this.focusedAction,
        //         action;

        //     x += this.width - size - options.actionRight;
        //     y += (height - size) >> 1;

        //     for (var i = actions.length - 1; i >= 0; i--) {
        //         if (focused === (action = actions[i])) {
        //             context.fillStyle = options.actionFocused;
        //             context.fillRect(x, y, size, size);
        //         }
        //         context.drawImage(images[action], x + offsetX, y + offsetY);
        //         x -= size;
        //     }
        //     actions.x = x + size - this.left;
        //     actions.y = y - this.top;
        // };

        //序列化成json对象
        this.serialize = function(writer) {

            var storage = this.__storage,
                values = [],
                value,
                cache;

            writer.push('{');

            if (storage) {
                cache = this.__defaults;
                for (var name in storage) {
                    if ((value = storage[name]) !== cache[name]) {
                        writer.push('"', name, '":', '"', value, '"', ',');
                    }
                }
            }
            if (cache = this.children) {
                writer.push('"children":[');

                for (var i = 0, _ = cache.length; i < _; i++) {
                    if (i > 0) {
                        writer.push(',');
                    }
                    cache[i].serialize(writer);
                }
                writer.push(']');
            } else if (writer.pop() === '{') {
                writer.push('{');
            }

            writer.push('}');
        };

        //销毁节点
        this.dispose = function() {

            var list = this.children;

            // if (list) {
            //     for (var i = list.length - 1; i >= 0; i--) {
            //         list[i].dispose();
            //     }
            //     this.children = null;
            // }
            this.children = this.parent = this.map = this.__oldParent = null;
        };

        var prototype = this;
        this.__class_init = function(Class) {

            if (this !== prototype) {
                if (this.type) {
                    registry_types[this.type] = Class;
                } else {
                    throw ' the type of class "' + Class.xtype + '" notallowempty';
                }
            }
        };

    });
});