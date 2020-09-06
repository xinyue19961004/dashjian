$(function () { 
    getUserInfo()
    function getUserInfo() {
        var layer=layui.layer
        $.ajax({
            type: "GET",
            url: "/my/userinfo",
            //请求头携带token
            headers: {Authorization:localStorage.getItem('token')||''},
            success: function (res) {
                if (res.status != 0) {
                   layer.message('获取用户信息失败')
                }
                //渲染用户信息
                renderAvatar(res.data)
            },
            complete: function (options) {
                if (options.responseJson.status == 1 && options.responseJson.message == '身份验证失败') {
                    //强制清空token
                    localStorage.removeItem('token')
                    location.href='/login.html'
                }
                
            }
        });
    }
    //渲染头像函数
    function renderAvatar(user) {
        var name = user.nickname || user.username
        //设置欢迎文本
        $('#welcome').html(`欢迎&nbsp;{$name}`)
        //按需渲染用户头像
        if (user.user_pic != null) {
            //文本头像隐藏
            $('.text-avatar').hide()
            //渲染图片头像
            $('.layui-nav-img"').prop('scr', user.user_pic).show()
        } else {
            $('.layui-nav-img"').hide()
            var frst = name[0].toUpperCase()
            $('.text-avatar').html(frst).show()
        }
    }
    //点击退出按钮，实现退出功能，清空内存，并跳转至首页
    var layer = layui.layer
    $('#btnLogout').on('click', function () { 
        layer.confirm('确定退出登录', {icon: 3, title:'提示'}, function(index){
             //关闭confirm询问框
             localStorage.removeItem('token')
             location.href='/login.html'
            layer.close(index);
          });
     })
 })