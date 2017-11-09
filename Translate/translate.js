var contextMenu = require('context-menu');
var request = require('request');
var selection = require('selection');

var menuItem = contextMenu.Item({
    label: "Translate Selection",
    context: contextMenu.SelectionContext(),
    contentScript: 'self.on("click", function () {' +
                        'var text = window.getSelection().toString();' +
                        'self.postMessage(text);' +
                    '});',
    onMessage: function (text) {
        if(text.length === 0) {
            throw ('Text to translate must not be empty');
        }

        var req = request.Request({
            url: "http://ajax.googleapis.com/ajax/services/language/translate",
            content: {
                v: "1.0",
                q: text,
                langpair: "len"
            },
            onComplete: function (response) {
                translated = response.json.responseData.translatedText;
                selection.text = translated;
            }
        });

        req.get();
    }

})