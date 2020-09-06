$(function () {
    // 基本资料校验表单数据，和登录框用户名校验方法相同哦
    var form = layui.form
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称长度必须在1~6个字符之间！'
            }

        }
    })
    // 1 获取用户基本信息
    initUserInfo()
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败！')
                }
                console.log(res)
                //获取用户信息成功，快速进行渲染
                //用layui 方法去 快速给表单赋值渲染页面，
                form.val('formUserInfo', res.data)

            }
        })
    }
    //2 用户点击重置按钮后，表单内容被重置
    $('#btnReset').on('click', function (e) { 
        e.preventDefault()
        initUserInfo()
     })
    //3 监听表单提交事件（提交修改部分）
    var layer=layui.layer
    $('.layui-form').on('submit', function (e) { 
        //阻止浏览器默认提交行为
        e.preventDefault()
        //发起ajax数据请求
        $.ajax({
            method: 'post',
            url: '/my/userinfo',
            //快速获取表单里的值
            data: $(this).serialize(),
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg('更新用户信息失败！')
                }
                layer.msg('更新用户信息成功')
                //调用父页面中的方法，重新渲染用户头像和用户的信息
                window.parent.getUserInfo()


            }
        })
     })
})