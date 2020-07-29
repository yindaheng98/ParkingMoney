$(document).ready(() => {
    $('#记录列表加载中').hide();
    $('#车辆列表加载中').hide();
});

let carsData = {};

let historyVue = new Vue({
    el: "#history",
    data: {车辆列表: [], 车辆动作: []},
    methods: {
        selectCar: function (car, event) {
            $('.选择车牌号').removeClass('选中车牌号');
            $(event.currentTarget).addClass('选中车牌号');
            if (car in carsData) {
                historyVue['车辆动作'] = carsData[car];
                return;
            }
            $('#记录列表加载中').show();
            historyVue['车辆动作'] = [];
            $.getJSON("index/getCarHistorys/" + car, (data) => {
                historyVue['车辆动作'] = data;
                carsData[car] = data;
                $('#记录列表加载中').hide();
            });
        }
    }
});

function updateCars() {
    $('#车辆列表加载中').show();
    historyVue['车辆列表'] = [];
    $.getJSON("index/getHistoryCars", (data) => {
        historyVue['车辆列表'] = data;
        historyVue['车辆动作'] = [];
        carsData = {};
        $('.选择车牌号').removeClass('选中车牌号');
        $('#车辆列表加载中').hide();
    });
}


