$(function () {
    //layui自动注入方法
    $('#link_reg').on('click', function () {
        $(".login-box").hide()
        $(".reg-box").show()
    })
    $('#link_login').on('click', function () {
        $(".login-box").show()
        $(".reg-box").hide()
    })



    var form = layui.form
    form.verify({
        // 自定义了一个叫做 pwd 校验规则
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        // 校验两次密码是否一致的规则,用的特别多，务必记住
        repwd: function (value) {
            var pwd = $('.reg-box [name=password]').val()//, '密码必须6到12位，且不能出现空格']
            if (pwd != value) {
                return '两次密码不一致'

            }
        }
    })
    var layer = layui.layer//必然加
    $('#form_reg').on("submit", function (e) {
        e.preventDefault()
        //法一
        // var data={
        //     username: $('#form_reg [name=username]').val(),
        //     password: $('#form_reg [name=password]').val()
        // }
    
        $.ajax({
            method: "post",
            url: "http://ajax.frontend.itheima.net/api/reguser",
            // data: data,
            //法二
            data: $(this).serialize(),
            success: function (res) {
                if (res.status != 0) {
                 console.log(layer.msg(res.message));   
                }
                layer.msg("注册成功")
                //自点击
                $('#link_login').click()

            }
        });
        //登录表单
    })
    $("#form_login").on("submit",function (e) { 
        e.preventDefault();
        // console.log(1);
        $.ajax({
            type: "post",
            url: "http://ajax.frontend.itheima.net/api/login",
            data: $(this).serialize(),
            success: function (res) {
                console.log(1);
                if (res.status != 0) {
                    return layer.msg('登录失败！')
                }
                layer.msg('登录成功！')
                localStorage.setItem('token', res.token)
                location.href='/index.html'

            }
        });
       
    })
})