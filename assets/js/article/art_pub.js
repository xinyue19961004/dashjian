$(function () {
    var layer = layui.layer
    var form = layui.form
    //1、定义加载文章分类的方法
    initCate()
    function initCate() {
        $.ajax({
            type: "get",
            url: "/my/article/cates",
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg('初始化文章分类失败')
                }
                //调用模板引擎，渲染下拉列表
                var htmlstr = template('tpl-pub', res)
                console.log(htmlstr);
                $('[name=cate_id]').html(htmlstr)
                //一定要调用form,render方法
                form.render()

            }
        });
    }
    //2、 初始化富文本编辑器
    initEditor()

//3、  1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)

    //为选择封面绑定点击事件
    $('#btnChooseImage').on('click', function () {
        //模拟人的点击行为
        $('#coverFile').click()
    })

    //  input表单中files特有的方法change,只要传入的图片或文件发生变化就要用到change
    $('#coverFile').on('change', function (e) {
        var fileList = e.target.files
        //判断用户是否选择文件
        if (fileList.length == 0) {
            return layer.msg('请选择图片！')
        }
        //用户选择图片
        var file = fileList[0]
        //将选择的图片转化成地址
        var imgURL = URL.createObjectURL(file)
        //重新初始化裁剪区域
        $image.cropper('destroy').attr('src', imgURL).cropper(options)
    })








})