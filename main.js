    var dom = document.getElementById("container");

    var myChart = echarts.init(dom);
    var app = {};
    option = null;
    var geoCoordMap = {
        '上海': [121.4648,31.2891],
        '东莞': [113.8953,22.901],
        '东营': [118.7073,37.5513],
        '中山': [113.4229,22.478],
        '临汾': [111.4783,36.1615],
        '临沂': [118.3118,35.2936],
        '丹东': [124.541,40.4242],
        '丽水': [119.5642,28.1854],
        '乌鲁木齐': [87.9236,43.5883],
        '佛山': [112.8955,23.1097],
        '保定': [115.0488,39.0948],
        '兰州': [103.5901,36.3043],
        '包头': [110.3467,41.4899],
        '北京': [116.4551,40.2539],
        '北海': [109.314,21.6211],
        '南京': [118.8062,31.9208],
        '南宁': [108.479,23.1152],
        '南昌': [116.0046,28.6633],
        '南通': [121.1023,32.1625],
        '厦门': [118.1689,24.6478],
        '台州': [121.1353,28.6688],
        '合肥': [117.29,32.0581],
        '呼和浩特': [111.4124,40.4901],
        '咸阳': [108.4131,34.8706],
        '哈尔滨': [127.9688,45.368],        
        '唐山': [118.4766,39.6826],
        '嘉兴': [120.9155,30.6354],
        '大同': [113.7854,39.8035],
        '大连': [122.2229,39.4409],
        '天津': [117.4219,39.4189],
        '太原': [112.3352,37.9413],
        '威海': [121.9482,37.1393],
        '宁波': [121.5967,29.6466],
        '宝鸡': [107.1826,34.3433],
        '宿迁': [118.5535,33.7775],
        '常州': [119.4543,31.5582],
        '广州': [113.5107,23.2196],
        '廊坊': [116.521,39.0509],
        '延安': [109.1052,36.4252],
        '张家口': [115.1477,40.8527],
        '徐州': [117.5208,34.3268],
        '德州': [116.6858,37.2107],
        '惠州': [114.6204,23.1647],
        '成都': [103.9526,30.7617],
        '扬州': [119.4653,32.8162],
        '承德': [117.5757,41.4075],
        '拉萨': [91.1865,30.1465],
        '无锡': [120.3442,31.5527],
        '日照': [119.2786,35.5023],
        '昆明': [102.9199,25.4663],
        '杭州': [119.5313,29.8773],
        '枣庄': [117.323,34.8926],
        '柳州': [109.3799,24.9774],
        '株洲': [113.5327,27.0319],
        '武汉': [114.3896,30.6628],
        '汕头': [117.1692,23.3405],
        '江门': [112.6318,22.1484],
        '沈阳': [123.1238,42.1216],
        '沧州': [116.8286,38.2104],
        '河源': [114.917,23.9722],
        '泉州': [118.3228,25.1147],
        '泰安': [117.0264,36.0516],
        '泰州': [120.0586,32.5525],
        '济南': [117.1582,36.8701],
        '济宁': [116.8286,35.3375],
        '海口': [110.3893,19.8516],
        '淄博': [118.0371,36.6064],
        '淮安': [118.927,33.4039],
        '深圳': [114.5435,22.5439],
        '清远': [112.9175,24.3292],
        '温州': [120.498,27.8119],
        '渭南': [109.7864,35.0299],
        '湖州': [119.8608,30.7782],
        '湘潭': [112.5439,27.7075],
        '滨州': [117.8174,37.4963],
        '潍坊': [119.0918,36.524],
        '烟台': [120.7397,37.5128],
        '玉溪': [101.9312,23.8898],
        '珠海': [113.7305,22.1155],
        '盐城': [120.2234,33.5577],
        '盘锦': [121.9482,41.0449],
        '石家庄': [114.4995,38.1006],
        '福州': [119.4543,25.9222],
        '秦皇岛': [119.2126,40.0232],
        '绍兴': [120.564,29.7565],
        '聊城': [115.9167,36.4032],
        '肇庆': [112.1265,23.5822],
        '舟山': [122.2559,30.2234],
        '苏州': [120.6519,31.3989],
        '莱芜': [117.6526,36.2714],
        '菏泽': [115.6201,35.2057],
        '营口': [122.4316,40.4297],
        '葫芦岛': [120.1575,40.578],
        '衡水': [115.8838,37.7161],
        '衢州': [118.6853,28.8666],
        '西宁': [101.4038,36.8207],
        '西安': [109.1162,34.2004],
        '贵阳': [106.6992,26.7682],
        '连云港': [119.1248,34.552],
        '邢台': [114.8071,37.2821],
        '邯郸': [114.4775,36.535],
        '郑州': [113.4668,34.6234],
        '鄂尔多斯': [108.9734,39.2487],
        '重庆': [107.7539,30.1904],
        '金华': [120.0037,29.1028],
        '铜川': [109.0393,35.1947],
        '银川': [106.3586,38.1775],
        '镇江': [119.4763,31.9702],
        '长春': [125.8154,44.2584],
        '长沙': [113.0823,28.2568],
        '长治': [112.8625,36.4746],
        '阳泉': [113.4778,38.0951],
        '青岛': [120.4651,36.3373],
        '韶关': [113.7964,24.7028],
        '晋城':[112.851274,35.497553],
        '台中':[120.563025,24.135955],
        '长崎':[129.51564,32.46126],
        '熊本':[130.4122,31.4724],
        '地震':[131.51564,33.46126],

    };
    
    var eventJson = [
        {
            "eventno":"20175473",
            "date":"2017-5-4",
            "event":"日本地震",
            "eventType":"地震",
            "riskLevel":"2",
            "itemInvolved":[{"id":"23060167","location":"Nagasaki","componay":"SONY","name":"长崎"},{"id":"23060132","location":"Kumamoto","componay":"SONY","name":"熊本"}]
        }
    ];
    var CityList = [
        {
    		"name":"深圳",
    	 	"toCoord":[],
    	 	"alarmValueTotal":"80",
    	 	"productList":[
    	 		{"name":"Site location","alarmValue":"深圳"}
    	 	],
            "alarmList":[
                {"eventno":"20170203547","event":"工厂停水","eventType":"市政水网改造","riskLevel":"严重","itemInvolved":"2298123","mitigationPlan":"调整供货商"},
                {"eventno":"20170203547","event":"生产设备故障","eventType":"设备故障","riskLevel":"严重","itemInvolved":"2298123","mitigationPlan":"调整供货商"}
            ]

    	},
    	{
    		"name":"宁波",
    	 	"toCoord":[{"name":"深圳","alarmValueTotal":"60"}],
    	 	"alarmValueTotal":"80",
    	 	"productList":[
    	 		{"name":"Level1 supplier","alarmValue":"舜宇"},
    	 		{"name":"Site location","alarmValue":"宁波"}
    	 	],
            "alarmList":[
                {"eventno":"201701031247","event":"员工数量大幅度削减","eventType":"人力不足","riskLevel":"严重","itemInvolved":"114392","mitigationPlan":"延期交付"}
            ]

    	},
    	{
    		"name":"晋城",
    	 	"toCoord":[{"name":"深圳","alarmValueTotal":"90"}],
    	 	"alarmValueTotal":80,
    	 	"productList":[
                {"name":"Level1 supplier","alarmValue":"鸿富锦"},
                {"name":"Site location","alarmValue":"晋城"}
    	 	],
            "alarmList":[
                {"eventno":"20170501247","event":"交付延期","eventType":"延期","riskLevel":"严重","itemInvolved":"11245312","mitigationPlan":"调整供货商"}
            ]

    	},
    	{
    		"name":"台中",
    	 	"toCoord":[{"name":"晋城","alarmValueTotal":"30"},{"name":"宁波","alarmValueTotal":"30"}],
    	 	"alarmValueTotal":"80",
    	 	"productList":[
                {"name":"Level2 supplier","alarmValue":"大立光"},
                {"name":"Site location","alarmValue":"台中"}
    	 	],
            "alarmList":[
                {"eventno":"20170501147","event":"物流延误","eventType":"交通","riskLevel":"严重","itemInvolved":"2298233","mitigationPlan":"增加供货渠道"}
            ]

    	},
    	{
    		"name":"熊本",
    	 	"toCoord":[{"name":"宁波","alarmValueTotal":"90"},{"name":"晋城","alarmValueTotal":"90"}],
    	 	"alarmValueTotal":"90",
    	 	"productList":[
                {"name":"Level2 supplier","alarmValue":"SONY"},
                {"name":"Site location","alarmValue":"熊本"}	 		
    	 	],
            "alarmList":[
                {"eventno":"201702123","event":"工厂停水","eventType":"市政水网改造","riskLevel":"严重","itemInvolved":"2212323","mitigationPlan":"调整供货商"},
                {"eventno":"201704047","event":"生产设备故障","eventType":"设备故障","riskLevel":"严重","itemInvolved":"9831223","mitigationPlan":"调整供货商"}
            ]

    	},
    	{
    		"name":"长崎",
    	 	"toCoord":[{"name":"宁波","alarmValueTotal":"90"},{"name":"晋城","alarmValueTotal":"90"}],
    	 	"alarmValueTotal":"90",
    	 	"productList":[
                {"name":"Level2 supplier","alarmValue":"SONY"},
                {"name":"Site location","alarmValue":"长崎"}  
    	 	],
           "alarmList":[
                {"eventno":"201702123","event":"工厂搬迁","eventType":"工厂变动","riskLevel":"正常","itemInvolved":"2212323","mitigationPlan":"调整供货商"}
            ]

    	},
        { "name":"地震",
            "productList":[
                {"name":"Event","alarmValue":"2016/01/02 日本地震"},
                {"name":"Risk Level","alarmValue":"High"}  
            ],}
    ]
    var convertData = function (data) {
        var res = [];
        var len = data.toCoord.length;

        if (len) {
        	for (var i = 0; i < len; i++) {
				var fromCoord = geoCoordMap[data.name];
	        	var toCoord = geoCoordMap[data.toCoord[i].name];
	        	 if (fromCoord && toCoord) {
	                res.push({
	                    fromName: data.name,
	                    toName: data.toCoord,
	                    coords: [fromCoord, toCoord]
	                });
	            }
        	}
        }
        return res;
    };
    
    var color = [  '#80F1BE','#fec42c','#dd4444']; // 局点颜色
    var series = [];
    var positionForCity = [];

    CityList.forEach(function (item, i) {

        var initCity = {  // 地图局点obj
            name: item.name,
            type: 'effectScatter',
            coordinateSystem: 'geo',
            zlevel: 2,
            rippleEffect: {
                brushType: 'stroke'
            },
            label: {
                normal: {
                    show: true,
                    position: 'right',
                    formatter: function (item) {
                        if (item.name === "深圳" || item.name === "地震") {$(".logo-wrapper").fadeIn();return ' ';
                        } else {
                            return item.name;
                        }
                    },
                    textStyle:{color:'#555'}
                }
            },
            symbolSize: function (val) {
                if (val[0] === 114.5435 && val[1] === 22.5439) {
                    initCity['symbol'] = 'image://images/logo.png';
                    return [35,30];
                } else {
                    return val[2] / 10;
                }
            },
            itemStyle: {
                normal: { // 局点颜色
                    color: function (dataItem){if (dataItem.name === "深圳" || dataItem.name === "地震") {return 'rgba(0,0,0,0)';}; return '#7f7f7f';}
                }
            },
            data: CityList.map(function (dataItem) {
                return {name: dataItem.name,value: geoCoordMap[dataItem.name].concat([dataItem.alarmValueTotal])};
            })
        }
        setTimeout(function () {
            series.push(initCity);
                if (option && typeof option === "object") {myChart.setOption(option, true);}
        },500)
    });
    
    option = {
        backgroundColor: '#fff',
        title : {text: '外部风险事件地图',subtext: '',left: 'center',textStyle : {color: '#555'}},
        tooltip : {
            triggerOn: 'click',
            padding:5,
            backgroundColor:'#fff',
            borderColor:"#e6e6e6",
            borderWidth:1,
            textStyle:{color:"#0b0300"},
            formatter:function (item){
       			var oStr = '';
            	CityList.map(function(currentCity) {
            	 	if(currentCity.name === item.data.name) {
            	 		var len = currentCity.productList.length;

            	 		currentCity.productList.forEach(function(item){
                            var bgcolor = color[0];
                            if (item.alarmValue < 30) {
                                bgcolor = color[0];
                            }

                            if (item.alarmValue >= 30 && item.alarmValue <90) {
                               bgcolor = color[1];
                            }


                            if (item.alarmValue >= 90) {
                               bgcolor = olor[2];
                            }

                            if (item.name === "Risk Level") {
                                oStr += '<li>' + item.name + '：<span style="display:inline-block;margin-left:10px;background:#dd4444;color:#fff;padding:0px 2px 0px 2px;">'+ item.alarmValue +'<span>' +'</li>';
                            } else {
                                oStr += '<li>' + item.name + '：<span style="display:inline-block;margin-left:10px;">'+ item.alarmValue +'<span>' +'</li>';
                            }
            	 			
            	 		});
            	 	} 

            	});
				return "<ul style = 'list-style:none;width:100%;text-align:left;padding:10px;margin:0;'>"+oStr+'</ul>';
            
            }
        },


        geo: {
            map: 'world',
            label: {
                emphasis: {
                    show: false
                }
            },
            roam: false,
            zoom:5,
            left:"-105%",
            top:"60%",
            itemStyle: {
                normal: {
                    areaColor: '#ededed',
                    borderColor: '#c7c7c7'
                },
                emphasis: {
                    areaColor: '#c7c7c7'
                }
            }
        },
        series: series
    };


    myChart.on('click',function(params){

    });

    // 告警信息列表table
    $('.toggle-button').click(function(){
        $('.trList').empty(); //清空缓存数据
        $('.trList').append($('<tr class = "loading"><td style = "text-align:center" colspan="6"> <i class="fa fa-spinner fa-spin fa-3x fa-fw"></i></td></tr>'));
        tipBarStatus(); // 菜单显示或隐藏

        var trArray = []; // 存储tr列表数据
        var itemInvolvedList = []; // 存储 itemInvolved 数据项

        eventJson.forEach(function (item) {

            item.itemInvolved.forEach(function (itemInvolved) {
                itemInvolvedList.push('<a style = "display:block;cursor:pointer" class = "showDetail">' + itemInvolved.id+'</a>');
            });

            var _color = item.riskLevel == "1" ? 'alarm' : (item.riskLevel == "2" ? "yellow" : "normal");
            trArray.push('<tr>'
                            +'<td class = "count-wrapper">'
                            +'<span>'
                            + item.eventno
                            +'</span>'
                            +'</td>'
                            +'<td class = "count-wrapper">'
                            +'<span>'
                            + item.date
                            +'</span>'
                            +'</td>'
                            +'<td class = "count-wrapper">'
                            +'<span>'
                            + item.event
                            +'</span>'
                            +'</td>'
                            +'<td class = "count-wrapper">'
                            +'<span>'
                            + item.eventType
                            +'</span>'
                            +'</td>'                            
                            +'<td class = "count-wrapper">'
                            +'<span class ="count '+ _color +'" style = "width:15px;height:15px;border-radius:50%;">'
                            +'</span>'
                            +'</td>'
                            +'<td class = "count-wrapper">'
                            +'<span>'
                            +itemInvolvedList.join("")
                            +'</span>'
                            +'</td>'
            +'</tr>');

        });
      
        var timer = setTimeout(function () {
            $('.trList').append($(trArray.join("")));
            $('.trList').fadeIn();
            $('.loading').css('display','none');
        },1000);

    })

    // 查看告警 箭头方向变化
    function tipBarStatus () {
        var hasClass = $("#btn-icon").hasClass('fa-chevron-up');
        if (hasClass) {
            $('#btn-icon').removeClass().addClass('fa fa-chevron-down');
           
        } else {
            $('#btn-icon').removeClass().addClass('fa fa-chevron-up');
        }
        $('.content-wrapper').slideToggle();
    }


    // 关闭供应商列表弹出框
    $(".fa-close").on("click", function () {
        $(".detail").fadeOut();
    })

    // 打开供应商列表弹出框
    $(document).on('click','.showDetail',function () {
        $(".detail").fadeIn();
    })

    // 关闭突发事件提示
    $(".close").on('click',function () {
        $('.alert-danger').fadeOut();
    });

    // 打开事件发生地灾害详情
    $(".openDetail").on('click', function () {
        $(".alert-warning").fadeToggle();
    });


    setTimeout(function () {
        $(".alert-danger").fadeIn();
    },5000);
    setTimeout(function () {
        $("#detail-wrapper").fadeIn();
    },5500);
    setTimeout(function () {
         addLine();
    },6500);   
    setTimeout(function () {
        $(".openDetail").fadeIn();
    },6900);
    function addLine () {
        option.geo.zoom = 6;
        option.geo.left = "-155%";
        option.geo.top = "60%";
        CityList.forEach(function (item, i) {

        var cityPointObj = {   // 地图局点obj
                name: item.name,
                type: 'effectScatter',
                coordinateSystem: 'geo',
                zlevel: 2,
                rippleEffect: {
                    brushType: 'stroke'
                },
                label: {
                    normal: {
                        show: true,
                        position: 'right',
                        formatter: function (item) {
                            if (item.name === "深圳") {
                                return ' ';
                            } else if (item.name === "地震"){
                              
                                return '';
                            }else {
                                return item.name;
                            }
                        },
                        textStyle:{
                            color:'#555'
                        }
                    }
                },

                symbolSize: function (val) {
                    console.log(1,val)
                    var SZ_X = [];
     
                    if (val[0] === 131.51564 && val[1] === 33.46126){
                        cityPointObj['symbol'] = 'image://images/icon.png';
                        return [35,30];
                    }else {
                         return val[2] / 8;
                    }

                    //console.log(1,val)131.51564,32.46126
                    // if (val[0] === 114.5435 && val[1] === 22.5439) {
                     
                    // } else {
                    //     return val[2] / 8;
                    // }
                },
                
                itemStyle: {
                    normal: { // 局点颜色
                        color: function (dataItem){

                            if (dataItem.name === "深圳") {return 'rgba(0,0,0,0)';};
                            if (dataItem.name === "地震") {return 'rgba(0,0,0,0)';};
                            if (dataItem.value[2] < 30) { return color[0];};
                            if (dataItem.value[2] >= 30 && dataItem.value[2] <90) {return color[1];};
                            if (dataItem.value[2] >= 90) { return color[2];};
                        }
                    }
                },
                data: CityList.map(function (dataItem) {
     
                    return {
                        name: dataItem.name,
                        value: geoCoordMap[dataItem.name].concat([dataItem.alarmValueTotal])
                    };
                })
            };

            var dynamicLine =  {
                name: item.name,
                type: 'lines',
                zlevel:4,
                effect: { show: true,period: 6,trailLength: 0.3,color: '#fff',symbolSize: 6},
                lineStyle: {
                    normal: {color: color[i],width: 0,curveness: 0}
                },
                data: convertData(item)
            };

            var dynamicLine_2 =     { // 控制曲线对位obj
                name: item.name,
                type: 'lines',
                zlevel: 2,
                symbol: ['none', 'arrow'],
                symbolSize: 15,
                effect: {show: false,period: 6,trailLength: 0,symbolSize:0},
                lineStyle: {
                    normal: {
                        color: function (dataItem) {return '#5479a7';      },
                        width: 2,
                        opacity: 1,
                        curveness: 0
                    }
                },
                data: convertData(item)
            };

            setTimeout(function () {
                option.series.push(
                    cityPointObj,
                    dynamicLine,
                    dynamicLine_2
                );
                if (option && typeof option === "object") {
                    myChart.setOption(option, true);
                }
            },200)

         });
    }
