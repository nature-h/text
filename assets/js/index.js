$(function () {
    getUserInfo()
    // 退出登录
    let layer = layui.layer
    $('#btnLogout').on('click', function () {
        layer.confirm('是否确认退出?', {
            icon: 3,
            title: '提示'
        }, function (index) {
            //do something

                layer.close(index);
                localStorage.removeItem('token')
                location.href='/login.html'
        });
    })
})
// 获取用户信息
function getUserInfo() {
    $.ajax({
        method:'get',
        url:'/my/userinfo',
        // headers: {
        //     Authorization : localStorage.getItem('token')
        // },
        success:function(res){
            console.log(res);  
            if (res.status !== 0) {
                return layui.layer.msg(res.message)
            }
            renderUser(res.data)
        }
    })
}
// 封装用户渲染
function renderUser(user) {
    let name = user.nickname || user.username
    $('#welcome').html('欢迎您！' + name)
    // 渲染头像
    if (user.user_pic == '') {
        $('.layui-nav-img').hide()
        $('.text-avatar').html(name[0].toUpperCase()).show()
    } else {
        $('.text-avatar').hide()
        $('.layui-nav-img').attr('src',user.user_pic).show()
    }
}