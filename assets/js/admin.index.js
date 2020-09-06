//获取用户信息以及渲染用户头像
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers 就是请求头配置对象
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {

            console.log(res);
            if (res.status !== 0) {
                layui.layer.msg('获取用户信息失败！')
            }
            // 调用 renderAvatar 渲染用户的头像
            renderAvatar(res.data)
        },

    })
}

getUserInfo()
function renderAvatar(user) {
    //1.获取用户的名称 data: {id: 3669, username: "wxy", nickname: "燕燕美", email: "wxy@qq.com", user_pic: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQA…dElnoeXmCil5p+73K/wMCSu6TcRKHrwAAAABJRU5ErkJggg=="}
    message: "获取用户基本信息成功！"
    status: 0
    var name = user.nickname || user.username
    //2.设置欢迎文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    //3.按需渲染用户的头像
    if (user.user_pic != null) {
        //3.1 渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        //3.2渲染文本头像
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first)
    }

}

//点击退出按钮，实现退出功能,清空内存，并跳转至首页
var layer = layui.layer


$('#btnLogout').on('click', function () {
    alert('123')
    // 提示用户是否确认退出.layui提供的方法
    layer.msg("kkk")
    layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function (index) {
        localStorage.removeItem('token')
        //重新跳转到登录页面
        location.href = '/login.html'
        //清空本地存储中的token
        layer.close(index)

    })

    //关闭confirm询问框


})
