$(function () {
    $('.link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    $('.link_login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    let form = layui.form
    // let layer = layui.layer
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        repwd: function (value) {
            if ( $('#reg-pwd').val() !== value) {
                return '两次密码不一致！'
            }
        }
    })
    let layer = layui.layer
    // 注册功能
    $('#form_reg').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method:'post',
            url: '/api/reguser',
            data:$(this).serialize(),
            success:function(res){
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg(res.message + '请登录！');
                $('.link_login').click()
                $('#form_reg')[0].reset()
            }
        })
    })
    // 登录功能
    $('#form_login').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method:'post',
            url:'/api/login',
            data:$(this).serialize(),
            success:function(res){
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg('登陆失败')
                }
                layer.msg(res.message)
                localStorage.setItem('token', res.token)
                location.href = '/index.html'
            }
        })
    })
})