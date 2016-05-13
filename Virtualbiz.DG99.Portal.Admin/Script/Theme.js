
var themes = {   //皮肤文件
    'pepper-grinder':  '../Content/EasyUI/themes/pepper-grinder/easyui.css',
    'cupertino':  '../Content/EasyUI/themes/cupertino/easyui.css',
    'default': '../Content/EasyUI/themes/default/easyui.css',
    'dark-hive':  '../Content/EasyUI/themes/dark-hive/easyui.css',
    'bootstrap': '../Content/EasyUI/themes/bootstrap/easyui.css',
    'metro': '../Content/EasyUI/themes/metro/easyui.css',
    'sunny': '../Content/EasyUI/themes/sunny/easyui.css'
   
};

//////////////////////-----皮肤设置-----///////////////
changeTheme = function (themename) {  //选择设置皮肤
    $('#swicthstyle').attr('href', themes[themename]);
    console.info($('#swicthstyle'));
    var $iframe = $('iframe');

    if ($iframe.length > 0) {
        for (var i = 0; i < $iframe.length; i++) {
            var ifr = $iframe[i];
            $(ifr).contents().find('#swicthstyle').attr('href', "/" + themes[themename]);
        }
    }

    //$.cookie('style', themename, { expires: 7 });
    createCookie('style', themename, 365);
}

function createCookie(name, value, days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
    }
    else var expires = "";
    document.cookie = name + "=" + value + expires + "; path=/";
}

function readCookie(name) {
    var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
    if (arr != null) {
        $('#swicthstyle').attr('href', "/" + themes[arr[2]]);
    }
}