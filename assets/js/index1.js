$(function () {
    //单击去注册，登录框隐藏，注册框显示；反之，单击去登录，登录框显示，注册框隐藏
    $("#link_reg").on('click', function () {
        $(".login-box").hide()
        $(".reg-box").show()
    })
    $("#link_login").on("click", function () {
        $(".reg-box").hide()
        $(".login-box").show()
    })
    //登录框用户名，密码校验
    var form = layui.form
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        //注册页面用到的再次确认密码
        repwd: function (value) {
            //利用属性选择器选出密码框里面输入的值
            var pwd = $('#form_reg [name=password]').val()
            //判断再次输入密码框里的值与第一次在密码框输入的值是否相等
            if (pwd != value) {
                return '两次密码不一致哦'
            }
        }
    })
    //layer弹出层的意思 layer msg:弹出层提示信息
    var layer = layui.layer

    //3.用户注册页面点击注册按钮，注册成功
    $('#form_reg').on('submit', function (e) {
        e.preventDefault()
        // var data = {
        //     username: $('#form_reg [name=username]').val(),
        //     password:$('#form_reg [name="password"]').val()

        // }
        //配置对象，最终发送的是在ajaxpprefilter里
        $.ajax({
            type: "post",
            url: "/api/reguser",
            data: $(this).serialize(),

            success: function (res) {
                if (res.status == 0) {
                    layer.msg('注册成功')
                    $('#link_login').click()
                }
                console.log(layer.msg(res.message));

            }
        });
    })
    //4、用户登录页面点击登录按钮
    $("#form_login").on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            type: "post",
            url: "/api/login",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg('登录失败')
                }
                layer.msg('登录成功')
                localStorage.setItem('token', res.token)
                location.href='/index.html'

            }
        });

    })

})