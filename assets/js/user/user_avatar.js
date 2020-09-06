//获取裁剪区域的dom元素 配置项代码不需要写哦！！！
var $image = $('#image')
//1.2配置选项
const options = {
    //纵横比
    aspectRatio: 1,
    //指定预览区域
    preview: '.img-preview'

}
//创建裁剪区域
$image.cropper(options)


//点击弹出文件选择框
//工作中十分常见哦，切记！！！
//定义一个按钮，文本是上传，一旦用户点击按钮，我们就手动触发文件选择框的点击事件
$('#btnChooseImage').on('click', function () {
    //模拟人的点击行为
    $('#file').click()
})
//input表单中files特有的方法change,只要传入的图片或文件发生变化就要用到change
$('#file').on('change', function (e) {
    console.log(e);
    var filelist = e.target.files
    if (filelist.length == 0) {
        return layer.msg('请选择照片！')
    }
    //1.拿到用户选择的文件
    var file = filelist[0]
    //2.将文件转化为路径
    var imgURL = URL.createObjectURL(file)
    //3.重新初始化裁剪区域
    $image.cropper('destroy').attr('src', imgURL).cropper(options)
})
//为确定按钮，绑定点击事件
var layer=layui.layer
$('#btnSure').on('click', function () {
    var dataURL = $image.cropper('getCroppedCanvas', {
         // 创建一个 Canvas 画布，设置样式
        width: 100,
        height: 100
    }).toDataURL('image/png')//图片以Png格式编译成编码（二进制代码），ajax中对于图片以及音频上传只可以上传转换之后的编码（转化为 base64 格式的字符串）
    //调用接口，把头像上传到服务器
    $.ajax({
        type: "post",
        url: "/my/update/avatar",
        data: {
            avatar:dataURL
        },
        success: function (res) {
            if (res.status != 0) {
                  return layer.msg('更新头像失败')
            }
            layer.msg('更新头像成功')
            //渲染头像
            window.parent.getUserInfo()

        }
    })

})
