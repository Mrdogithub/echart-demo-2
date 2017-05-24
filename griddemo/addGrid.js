+ function setIframe() {
    var target = $('.detail .detail-content');
    target.html('<iframe id="gridpage" frameborder="0" marginheight="0" marginwidth="0" onLoad="" src="./griddemo/index.html" style="position: absolute;width: 700px;height: 537px;margin: auto;left: 0;right: 0;top: 0;bottom: 0;"></iframe>');
}();

// function adjustIframe() {
//     var ifm = document.getElementById("gridpage");
//     var subDocument = document.frames ? document.frames["gridpage"].document : ifm.contentDocument;
//     if (ifm !== null && subDocument !== null) {
//         ifm.style.height = subDocument.body.scrollHeight + 'px';
//         ifm.style.width = subDocument.body.scrollWidth + 'px';
//     }
// }