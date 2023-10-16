window.addEventListener('load', function () {
    //1. 获取元素
    var prev = document.querySelector('.prev');
    var next = document.querySelector('.next');
    var focus = document.querySelector('.focus');

    // 2. 鼠标经过focus 就显示隐藏左右按钮
    focus.addEventListener('mouseenter', function () {
        prev.style.display = 'block';
        next.style.display = 'block';
    })
    focus.addEventListener('mouseleave', function () {
        prev.style.display = 'none';
        next.style.display = 'none';
    })

    // 3. 动态生成小圆圈：有几张图，生成几个小圆圈
    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('.circle');
    // console.log(ul.children.length);
    for (var i = 0; i < ul.children.length; i++) {
        // 创建一个li
        var li = document.createElement('li');
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
        })
    }

    // 如果把小圆圈排他思想写在生成li的for循环外面
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

    // 第三种，仍然写在for循环外，但用li。要声明li是ol下的每一个孩子。
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
})