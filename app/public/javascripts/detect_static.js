$(document).ready(() => {
    $('#识别记录加载中').hide();
});

let detectsVue = new Vue({
    el: "#detects",
    data: {识别记录: [], 图片: ''},
    methods: {
        selectCar: function (img, event) {
            $('.选择识别记录').removeClass('选中车牌号');
            $(event.currentTarget).addClass('选中车牌号');
            detectsVue['图片'] = img;
        }
    }
});

function updateDetects() {
    $('#识别记录加载中').show();
    detectsVue['识别记录'] = [];
    $.getJSON("index/getDetects", (data) => {
        detectsVue['识别记录'] = data;
        detectsVue['图片'] = '';
        $('.选择识别记录').removeClass('选中车牌号');
        $('#识别记录加载中').hide();
    });
}


