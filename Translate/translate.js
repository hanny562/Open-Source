var contextMenu = require('context-menu');
var request = require('request');
var selection = require('selection');

var menuItem = contextMenu.Item({
    label: "Translate Selection",
    context: contextMenu.SelectionContext(),
    contextScript: 'self.on("click", function () {' +
                        'var text = window.getSelection().toString();' +
                        'self.postMessage(text);' +
                    '});',
    
    }

})