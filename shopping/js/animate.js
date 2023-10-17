function animate(obj, target, callback) {
    clearInterval(obj.timer);
    // console.log(callback); callback = function () {} 调用时 callback()
    obj.timer = setInterval(function () {
        // 步长值写到定时器的里面
        // 把步长值改为整数，不要出现小数的问题
        // var step = Math.ceil((target - obj.offsetLeft) / 10);
        var step = (target - obj.offsetLeft) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        if (obj.offsetLeft === target) {
            clearInterval(obj.timer);
            // 回调函数写到定时器结束里面
            /*if(callback) {
                callback(); // 调用函数
            }*/
            callback && callback(); // 更简单更高级的写法
        }
        // 把每次加1这个步长值改为一个慢慢变小的值 步长公式：目标值 - 现在的位置） / 10
        // obj.style.left = obj.offsetLeft + 1 + 'px';
        obj.style.left = obj.offsetLeft + step + 'px';
    }, 15);
}