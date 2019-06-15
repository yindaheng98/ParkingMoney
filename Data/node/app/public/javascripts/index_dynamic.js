let currentVue = new Vue({
    el: "#current",
    data: {剩余车位: 0, 车辆列表: []}
});

function update() {
    $.getJSON("/index/getCurrentCars", (data) => {
        currentVue['剩余车位'] = data['剩余车位'];
        currentVue['车辆列表'] = data['车辆列表'];
    });
}

let b = false;

function roll_updatePage() {
    if (b) return;
    b = true;
    var ajaxTimeoutTest = $.ajax({
        url: "index/updated",
        timeout: 500000, //超时时间设置，单位毫秒
        type: 'get',
        dataType: 'text', //返回的数据格式
        success: function (data) {
            if (data === 'yes') update();
            b = false;
            roll_updatePage();
        },
        complete: function (XMLHttpRequest, status) { //求完成后最终执行参数
            // 设置timeout的时间，通过检测complete时status的值判断请求是否超时，如果超时执行响应的操作
            console.log(status);//超时,status还有success,error等值的情况
            ajaxTimeoutTest.abort();
            b = false;
            roll_updatePage();
        }
    });
}

update();
roll_updatePage();
