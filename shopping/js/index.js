// 轮播图 start
window.addEventListener('load', function () {
    // 1. 获取元素
    var prev = document.querySelector('.prev');
    var next = document.querySelector('.next');
    var focus = document.querySelector('.focus');
    var focusWidth = focus.offsetWidth; // 从函数内部提出来，在外面也能用

    // 2. 鼠标经过focus 就显示隐藏左右按钮
    focus.addEventListener('mouseenter', function () {
        prev.style.display = 'block';
        next.style.display = 'block';
        clearInterval(timer);
        timer = null; // 清除定时器变量，节省内存
    })
    focus.addEventListener('mouseleave', function () {
        prev.style.display = 'none';
        next.style.display = 'none';
        timer = setInterval(function () {
            // 手动调用点击事件
            next.click();
        }, 2000);
    })

    // 3. 动态生成小圆圈：有几张图，生成几个小圆圈
    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('.circle');
    // console.log(ul.children.length);
    for (var i = 0; i < ul.children.length; i++) {
        // 创建一个li
        var li = document.createElement('li');
        // 记录当前小圆圈的索引号，通过自定义属性
        li.setAttribute('index', i);
        // 把li插入ol
        ol.appendChild(li);
        // 4. 小圆圈排他思想：在刚才生成小圆圈的同时，就可以直接绑定这个事件
        li.addEventListener('click', function () {
            // 干掉所有人：所有li清除current类名
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            // 留下我自己：当前li设置current类名
            this.className = 'current';
            // 5. 点击小圆圈，移动图片，移动的是ul
            // ul移动距离: 小圆圈的索引号乘以图片的宽度
            // 点击某个li，就拿到当前li的索引号
            var index = this.getAttribute('index');
            // 当点击某个li，要把这个li的索引号给num
            num = index;
            // 当点击某个li，要把这个li的索引号给circle
            circle = index;
            // num = circle = index; // 可以连写
            // console.log(index); // 打印索引号看是否成功拿到
            // var focusWidth = focus.offsetWidth; // 局部变量，提到外面去
            // console.log(focusWidth);
            animate(ul, -index * focusWidth);
        })
    }

    // 小圆圈排他思想：如果把小圆圈排他思想写在生成li的for循环外面
    /*for (var j = 0; j < ul.children.length; j++) {
        ol.children[j].addEventListener('click', function () {
            // 干掉所有人：所有li清除current类名
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            // 留下我自己：当前li设置current类名
            this.className = 'current';
        })
    }*/

    // 小圆圈排他思想：第三种，仍然写在for循环外，但用li。要声明li是ol下的每一个孩子。
    /*for (var j = 0; j < ul.children.length; j++) {
        var li = ol.children[j];
        li.addEventListener('click', function () {
            // 干掉所有人：所有li清除current类名
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            // 留下我自己：当前li设置current类名
            this.className = 'current';
        })
    }*/

    // 把ol里面第一个li设置类名为current
    ol.children[0].className = 'current';
    // 6. 克隆第一张图片（li）放到ul最后面
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);

    // 7. 点击右侧按钮，图片滚动一张
    var num = 0;
    // circle控制小圆圈的播放。
    var circle = 0;
    // flag 节流阀
    var flag = true;
    next.addEventListener('click', function () {
        if (flag) {
            flag = false; // 关闭节流阀
            // 如果走到了最后复制的一张图片，此时ul要快速复原，left改为0
            if (num === ul.children.length - 1) {
                ul.style.left = 0;
                num = 0;
            }
            num++;
            animate(ul, -num * focusWidth, function () {
                flag = true; // 打开节流阀
            });
            // 8. 点击右侧按钮，小圆圈跟随变化，再声明一个变量circle控制小圆圈的播放
            circle++;
            // 如果circle == 4，说明走到最后克隆的这张图片了
            if (circle === ol.children.length) {
                circle = 0;
            }
            // 清除小圆圈类名设置current，左右按钮都有，封装成函数
            circleChange();
            /*// 清除所有小圆圈的current类名
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            // 留下当前小圆圈的current类名
            ol.children[circle].className = 'current';*/
        }
    });

    // 9. 左侧按钮做法
    prev.addEventListener('click', function () {
        if (flag) {
            flag = false;
            // 走到第一张图片，快速跳到第5张，移动的距离是最后一个的索引号乘以盒子的宽度
            if (num === 0) {
                num = ul.children.length - 1;
                ul.style.left = -num * focusWidth + 'px';
            }
            num--;
            animate(ul, -num * focusWidth, function () {
                flag = true;
            });
            // 8. 点击右侧按钮，小圆圈跟随变化，再声明一个变量circle控制小圆圈的播放
            circle--;
            // 如果circle < 0，说明走到第一张图片，小圆圈要改为第四个小圆圈（索引号3）
            /*if (circle < 0) {
                circle = ol.children.length - 1;
            }*/
            // 改成三元表达式更简洁
            circle = circle < 0 ? ol.children.length - 1 : circle;
            // 清除小圆圈类名设置current，左右按钮都有，封装成函数
            circleChange();
            /*// 清除所有小圆圈的current类名
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            // 留下当前小圆圈的current类名
            ol.children[circle].className = 'current';*/
        }
    });

    function circleChange() {
        // 清除所有小圆圈的current类名
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        // 留下当前小圆圈的current类名
        ol.children[circle].className = 'current';
    }

    // 10. 自动播放轮播图
    var timer = setInterval(function () {
        // 手动调用点击事件
        next.click();
    }, 2000);
})

// 轮播图 end

// 固定电梯导航 start
$(function () {
    // 当点击li，此时不需要执行页面滚动事件里面的li的背景选择，即添加current
    //节流阀 互斥锁
    var flag = true;

    // 1. 显示隐藏电梯导航
    toggleTool();
    function toggleTool() {
        if ($(document).scrollTop() >= $('.recom').offset().top) {
            $('.fixedtool').fadeIn();
        } else {
            $('.fixedtool').fadeOut();
        }
    }

    $(window).scroll(function () {
        toggleTool();
        // 4. 当页面滚动到内容各区域某个模块，左侧电梯导航，相对应的li模块，也会添加current类，兄弟移除current类名
        if (flag) {
            $('.floor .w').each(function (i, ele) {
                if ($(document).scrollTop() >= $(ele).offset().top) {
                    // console.log(i)
                    $('.fixedtool li').eq(i).addClass('current').siblings().removeClass();
                }
            })
        }
    });

    // 2. 点击电梯导航页面可以滚动到相应内容区域
    $('.fixedtool li').click(function () {
        flag = false;
        // 每次点击li，需要计算出页面要去的位置
        // 对应当前索引号的内容区模块的offset().top
        var current = $('.floor .w').eq($(this).index()).offset().top;
        // 页面动画滚动效果
        $('body, html').stop().animate({
            scrollTop: current
        }, function () {
            flag = true
        });
        // 3. 点击之后，当前li添加current类，兄弟移除current类名
        $(this).addClass('current').siblings().removeClass();
    });


})
// 固定电梯导航 end