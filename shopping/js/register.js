window.onload = function () {
    var regTel = /^1[3|4|5|7|8]\d{9}$/; // 手机号码的正则表达式
    var regQq = /^[1-9]\d{4,}$/;  // qq的正则表达式
    var regNickname = /^[\u4e00-\u9fa5]{2,8}$/; //昵称
    var regMessage = /^[0-9]{6}$/; // 短信验证码
    var regPassword = /^[a-zA-Z0-9-_]{6,16}$/; // 密码
    var tel = document.querySelector("#tel");
    var qq = document.querySelector('#qq');
    var nickname = document.querySelector('#nickname');
    var message = document.querySelector('#message');
    var password = document.querySelector('#password');
    var passwordConfirm = document.querySelector('#passwordConfirm');

    regexp(tel, regTel); // 手机号码
    regexp(qq, regQq); // qq
    regexp(nickname, regNickname); //昵称
    regexp(message, regMessage); // 短信验证码
    regexp(password, regPassword); // 密码

    // 表单验证函数
    function regexp(ele, reg) {
        ele.onblur = function () {
            if (reg.test(this.value)) {
                // console.log('right');
                this.nextElementSibling.className = 'success';
                this.nextElementSibling.innerHTML = '<i class="success_icon"></i> 输入正确';
            } else {
                // console.log('wrong');
                this.nextElementSibling.className = 'error';
                this.nextElementSibling.innerHTML = '<i class="error_icon"></i> 格式不正确，请重新输入';
            }
        }
    }

    passwordConfirm.onblur = function () {
        if (this.value === password.value) {
            this.nextElementSibling.className = 'success';
            this.nextElementSibling.innerHTML = '<i class="success_icon"></i> 输入正确';
        } else {
            this.nextElementSibling.className = 'error';
            this.nextElementSibling.innerHTML = '<i class="error_icon"></i> 密码不一致，请重新输入';
        }
    }

}