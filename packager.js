'use strict';
var packager = require('electron-packager');
var options = {
    'arch': 'x64',
    'platform': 'win32',
    'dir': './',
    'app-copyright': 'phamquocthinh',
    'app-version': '1.2.1',
    'asar': true,
    'name': 'trelloattachment',
    'out': './releases',
    'overwrite': true,
    'prune': true,
    'version': '1.1.0',
    'version-string': {
        'CompanyName': 'Home',
        'FileDescription': 'trelloattachment', /*This is what display windows on task manager, shortcut and process*/
        'OriginalFilename': 'trelloattachment',
        'ProductName': 'trelloattachment',
        'InternalName': 'trelloattachment'
    }
};

packager(options, function done_callback(err, appPaths) {
    console.log("Error: ", err);
    console.log("appPaths: ", appPaths);
});