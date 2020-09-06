function initArtCateList() {
    $.ajax({
        type: "GET",
        url: "/my/article/cates",
        success: function (data) {
            var res = template("tpl", data)
            $('tbody').html(res)
        }
    });
}