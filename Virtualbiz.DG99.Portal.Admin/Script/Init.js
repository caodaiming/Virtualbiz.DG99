
$(function () {
    InitLeftMenu();
    tabClose();
    //tabSelect();
    //readCookie('style');
})

//初始化左侧
function InitLeftMenu() {
    $.ajax({
        url: 'http://localhost:8081/api/sysmenu/get',
        type: "get",
        dataType: "json",
        success: function (_menus) {
          
            $("#westreg").empty();
            var menulist = "";
            menulist += '<div class="easyui-accordion" fit="true" border="false">';
            var menus = _menus.menus;
            for (var i = 0; i < menus.length; i++) {
              
                menulist += '<div title="' + menus[i].Name + '" data-options="iconCls:\'' + menus[i].Icon + '\'" style="overflow: auto; padding: 5px;">';
                menulist += '<ul>';
                for (var k = 0; k < menus[i].Children.length; k++) {
                    menulist += '<li><div><a href="javascript:void(0)" rel="' + menus[i].Children[k].Url + '" ref="' + menus[i].Children[k].ID + '"><span class="' + menus[i].Children[k].Icon + '" style="width: 16px; display: inline-block">&nbsp;</span><span class="navtext">' + menus[i].Children[k].Name + '</span></a></div></li>';
                }

                menulist += '</ul></div>';
            }

            // $.each(_menus.menus, function (i, n) {

            //    menulist += '<div title="' + n.Name + '" data-options="iconCls:\'' + n.Icon + '\'" style="overflow: auto; padding: 5px;">';
            //    menulist += '<ul>';
            //    $.each(n.children, function (j, o) {
            //        menulist += '<li><div><a href="javascript:void(0)" rel="' + o.Url + '" ref="' + o.ID + '"><span class="' + o.Icon + '" style="width: 16px; display: inline-block">&nbsp;</span><span class="nav">' + o.Name + '</span></a></div></li>';
            //    })
            //    menulist += '</ul></div>';
            // })
            menulist += '</div>';
            $("#westreg").append(menulist);

            $('.easyui-accordion li a').click(function () {
                var tabTitle = $(this).children('.navtext').text();

                var url = $(this).attr("rel");
                var menuid = $(this).attr("ref");
                var icon = $(this).children('span').first().attr('class');

                addTab(tabTitle, url, icon);
                $('.easyui-accordion li div').removeClass("selected");
                $(this).parent().addClass("selected");
            }).hover(function () {
                $(this).parent().addClass("hover");
            }, function () {
                $(this).parent().removeClass("hover");
            });

            //导航菜单绑定初始化
            $(".easyui-accordion").accordion();
        },
        error: function (xhr, status) {
            if (xhr.responseText == "nosession") {
                $.relogin();
            }
        }
    })

}



function addTab(subtitle, url, icon) {
    console.info(spgc.bp() +url);
    if (!$('#tabs').tabs('exists', subtitle)) {
        
        $('#tabs').tabs('add', {
            title: subtitle,
            //content: createFrame(url),
            href: spgc.bp() +url,
            closable: true,
            icon: icon,
            loadingMessage: '正在加载中......'
        });

    } else {
        $('#tabs').tabs('select', subtitle);
    }
    //去掉panel中的滚动条
    //var $tab = $('#tabs').tabs('getTab', subtitle);
    //if ($tab == null) return;
    //var $tabBody = $tab.panel('body');
    //$tabBody.css({ 'overflow': 'hidden', 'position': 'relative' });

    //tabClose();

}




function createFrame(url) {
    var s = '<iframe scrolling="auto" frameborder="0"  src="' + url + '" style="width:100%;height:100%;"></iframe>';
    return s;
}

function tabClose() {
    /*双击关闭TAB选项卡*/
    $(".tabs-inner").dblclick(function () {
        var subtitle = $(this).children(".tabs-closable").text();
        $('#tabs').tabs('close', subtitle);
    })
}


function tabSelect() {
    $('#tabs').tabs({
        onSelect: function (title, index) {
            var pp = $('#tabs').tabs('getSelected');
            var tab = pp.panel('options');
            pp.panel('refresh', tab.href);

        }
    });
}




