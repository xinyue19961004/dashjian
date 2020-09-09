var layer = layui.layer
var form = layui.form
initCastList()
//1.获取文章分类列表
function initCastList() {
    $.ajax({
        type: "GET",
        url: "/my/article/cates",
        success: function (res) {
            if (res.status != 0) {
                return layer.msg('获取文章分类列表失败')
            }
            //利用模板引擎渲染数据到页面
            var htmlStr = template('tpl', res)
            $('tbody').html(htmlStr)
        }
    });
}
//2点击添加类别按钮，弹出一个框/ 通过 content 属性指定内容
// 根据索引，关闭对应的弹出层
//当你想关闭当前页的某个层时
// var index = layer.open();
// var index = layer.alert();
// var index = layer.load();
// var index = layer.tips();
//正如你看到的，每一种弹层调用方式，都会返回一个index
// layer.close(index); //此时你只需要把获得的index，轻轻地赋予layer.close即可
//根据索引关闭对应的弹出层

var indexAdd = null
$('#btnAddCate').on('click', function () {
    indexAdd = layer.open({
        type: 1,
        area: ['500px', '250px'],
        title: '添加文章分类',
        content: $('#dialog-add').html()
    })
})
//2.1弹出框中确认添加功能,要提交表单
$('body').on('submit', '#form-add', function (e) {
    e.preventDefault()
    $.ajax({
        type: "POST",
        url: "/my/article/addcates",
        data: $(this).serialize(),//请求体
        success: function (res) {
            if (res.status != 0) {
                console.log(res);
                return layer.msg('新增文章分类失败')
            }
            //更新列表数据
            initCastList()
            //弹出提示框
            layer.msg('新增文章分类成功')
            //关闭弹出层
            layer.close(indexAdd)
        }
    });


})
//3.为动态添加的编辑按钮注册点击事件
var indexEdit = null
$('tbody').on('click', '.btn-edit', function () {
    //弹出一个修改文章分类信息的层
    indexEdit = layer.open({
        type: 1,
        area: ['500px', '250px'],
        title: '修改文章分类',
        content: $('#dialog-edit').html()
    })
    //3.1 打开编辑按钮要获取按钮所在行的数据，因此要先获取id,并渲染到弹出层中,发起请求获取对应分类的数据
    var id = $(this).attr('data-id')
    $.ajax({
        type: "GET",
        url: "/my/article/cates/" + id,
        success: function (res) {
            if (res.status != 0) {
                return layer.msg('获取文章分类数据成功')
            }
            //为表单快速填充数据form.val(),为弹出层表单快速赋值
            //语法：form.val('filter', object);用于给指定表单集合的元素赋值和取值。如果 object 参数存在，则为赋值；如果 object 参数不存在，则为取值。
            form.val('form-edit', res.data)

        }
    });

})
//3.2编辑弹出层确认按钮点击之后要提交表单，为动态添加的表单注册submit事件
$('body').on('submit', '#form-edit', function (e) {
    e.preventDefault()
    $.ajax({
        type: "POST",
        url: "/my/article/updatecate",
        data: $(this).serialize(),
        success: function (res) {
            if (res.status != 0) {
                return layer.msg('更新分类失败')
            }
            //更新列表数据
            initCastList()
            //弹出提示框
            layer.msg('更新文章分类成功')
            //关闭弹出层
            layer.close(indexEdit)
        }
    });
})
//3.3 编辑删除按钮
$('tbody').on('click', '.btn-delete', function () {
    var id = $(this).attr('data-id')
    //提示用户是否确定删除
    layer.confirm('确定删除吗?', { icon: 3, title: '提示' }, function (index) {
        //do something
        $.ajax({
            type: "GET",
            url: "/my/article/deletecate/" + id,
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg('删除文章分类失败！')
                }
                layer.msg('删除文章分类成功！')
                initCastList()


            }
        });
        layer.close(index);
    });
})






