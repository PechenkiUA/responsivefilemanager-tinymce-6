/**
 * plugin.js
 * TinyMCE 6
 * Copyright, Pechenki
 *
 * Contributing: https://github.com/AlexandrKrot/responsivefilemanager-tinymce-6
 */

tinymce.PluginManager.add('responsivefilemanager', function (editor) {

    function responsivefilemanager_onMessage(event) {
       if (editor.getParam('external_filemanager_path').toLowerCase().indexOf(event.origin.toLowerCase()) === 0) {
            
            if (event.data.sender === 'responsivefilemanager') {
                tinymce.activeEditor.insertContent(event.data.html);
                tinymce.activeEditor.windowManager.close();

                // Remove event listener for a message from ResponsiveFilemanager
                if (window.removeEventListener) {
                    window.removeEventListener('message', responsivefilemanager_onMessage, false);
                } else {
                    window.detachEvent('onmessage', responsivefilemanager_onMessage);
                }
            }
        }
    }

    function openmanager() {
        var width = window.innerWidth - 20;
        var height = window.innerHeight - 40;
        if (width > 1800) width = 1800;
        if (height > 1200) height = 1200;
        if (width > 600) {
            var width_reduce = (width - 20) % 138;
            width = width - width_reduce + 10;
        }

        editor.focus(true);
        var title = "RESPONSIVE FileManager";
        if (typeof editor.getParam('filemanager_title') !== "undefined" && editor.getParam('filemanager_title')) {
            title = editor.getParam('filemanager_title');
        }
        var akey = "key";
        if (typeof editor.getParam('filemanager_access_key') !== "undefined" && editor.getParam('filemanager_access_key')) {
            akey = editor.getParam('filemanager_access_key');
        }
        var sort_by = "";
        if (typeof editor.getParam('filemanager_sort_by') !== "undefined" && editor.getParam('filemanager_sort_by')) {
            sort_by = "&sort_by=" + editor.getParam('filemanager_sort_by');
        }
        var descending = "false";
        if (typeof editor.getParam('filemanager_descending') !== "undefined" &&  editor.getParam('filemanager_descending')) {
            descending =  editor.getParam('filemanager_descending');
        }
        var fldr = "";
        if (typeof editor.getParam('filemanager_subfolder') !== "undefined" && editor.getParam('filemanager_subfolder')) {
            fldr = "&fldr=" + editor.getParam('filemanager_subfolder');
        }
        var crossdomain = "";
        if (typeof editor.getParam('filemanager_crossdomain') !== "undefined" && editor.getParam('filemanager_crossdomain')) {
            crossdomain = "&crossdomain=1";

            // Add handler for a message from ResponsiveFilemanager
            if (window.addEventListener) {
                window.addEventListener('message', responsivefilemanager_onMessage, false);
            } else {
                window.attachEvent('onmessage', responsivefilemanager_onMessage);
            }
        }

        const fileUrl = editor.getParam('external_filemanager_path') + 'dialog.php?type=4&descending=' + descending + sort_by + fldr + crossdomain + '&lang=' + editor.getParam('language') + '&akey=' + akey;

        if (tinymce.majorVersion < 5) {
            win = editor.windowManager.open({
                title: title,
                file: fileUrl,
                width: width,
                height: height,
                inline: 1,
                resizable: true,
                maximizable: true
            });
        } else {
            win = editor.windowManager.openUrl({
                title: title,
                url: fileUrl,
                width: width,
                height: height,
                inline: 1,
                resizable: true,
                maximizable: true
            });
        }
    }

    if (tinymce.majorVersion < 5) {
        editor.addButton('responsivefilemanager', {
            icon: 'browse',
            tooltip: 'Insert file',
            shortcut: 'Ctrl+E',
            onClick: openmanager
        });

        editor.addShortcut('Ctrl+E', '', openmanager);

        editor.addMenuItem('responsivefilemanager', {
            icon: 'browse',
            text: 'Insert file',
            shortcut: 'Ctrl+E',
            onClick: openmanager,
            context: 'insert'
        });
    } else {
        editor.ui.registry.addButton('responsivefilemanager', {
            icon: 'browse',
            tooltip: 'Insert file',
            shortcut: 'Ctrl+E',
            onAction: openmanager
        });

        editor.addShortcut('Ctrl+E', '', openmanager);

        editor.ui.registry.addMenuItem('responsivefilemanager', {
            icon: 'browse',
            text: 'Insert file',
            shortcut: 'Ctrl+E',
            onAction: openmanager,
            context: 'insert'
        });
    }
});
