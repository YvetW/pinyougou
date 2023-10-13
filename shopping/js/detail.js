window.addEventListener('load', function () {
    // 放大镜效果
    var preview_img = document.querySelector('.product-big-image');
    var mask = document.querySelector('.mask');
    var big = document.querySelector('.big');
    // 1. 当鼠标经过preview_img, 就显示和隐藏mask遮挡层和big大盒子
    preview_img.addEventListener('mouseover', function () {
        mask.style.display = 'block';
        big.style.display = 'block';
    })
    preview_img.addEventListener('mouseout', function () {
        mask.style.display = 'none';
        big.style.display = 'none';
    })
    // 2. 黄色遮挡层跟随鼠标功能，并且不超出小盒子范围
    preview_img.addEventListener('mousemove', function (e) {
        // 先计算鼠标在盒子内的坐标
        var x = e.pageX - preview_img.offsetLeft;
        var y = e.pageY - preview_img.offsetTop;
        // console.log(x, y); // 打印检查
        // 减去盒子宽高的一半，使鼠标在黄色盒子中央
        // mask.style.left = x - mask.offsetWidth / 2 + 'px';
        // mask.style.top = y - mask.offsetHeight / 2 + 'px';
        // 把mask移动的距离赋值给一个变量，mask移动的距离。
        var maskX = x - mask.offsetWidth / 2;
        var maskY = y - mask.offsetHeight / 2;
        // 如果x左边小于0，就让它停在0的位置。如果大于遮挡层最大的距离，就把坐标设置为最大的移动距离。
        // 遮挡层最大移动距离
        var maskMax = preview_img.offsetWidth - mask.offsetWidth;
        if (maskX <= 0) {
            maskX = 0;
        } else if (maskX >= maskMax) {
            maskX = maskMax;
        }
        // y同理
        if (maskY <= 0) {
            maskY = 0;
        } else if (maskY >= maskMax) {
            maskY = maskMax;
        }
        mask.style.left = maskX + 'px';
        mask.style.top = maskY + 'px';
        // 3. 大图片移动距离 = 遮挡层移动距离 * 大图片最大移动距离 / 遮挡层最大移动距离
        // 大图片最大移动距离
        var bigImg = document.querySelector('.bigImg'); // 大图
        var bigMax = bigImg.offsetWidth - big.offsetWidth;
        // 大图片移动距离
        var bigX = maskX * bigMax / maskMax;
        var bigY = maskY * bigMax / maskMax;
        // 大图和遮罩层反方向走，负值
        bigImg.style.left = -bigX + 'px';
        bigImg.style.top = -bigY + 'px';
    })


})