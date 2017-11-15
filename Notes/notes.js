var inputTitle = document.querySelector('.new-note input');
var inputBody = document.querySelector('.new-note textarea');
var nContainer = document.querySelector('.note-container');
var btn_clear = document.querySelector('.clear');
var btn_add = document.querySelector('.add');

btn_add.addEventListener('click', newNote);
btn_clear.addEventListener('click', clear_content);

start();

function start() {
    var getItems = browser.storage.local.get(null);
    getItems.then((results) => {
        var noteKeys = Object.keys(results);
        for (let newKey of noteKeys) {
            var value = results[newKey];
            displayNote(newKey, value);
        }
    });
}

function displayNote(title, body) {
    var note = document.createElement('div');
    var nDisplay = document.createElement('div');
    var nTitle = document.createElement('h2');
    var nParagraph = document.createElement('p');
    var btn_delete = document.createElement('button');
    var clearFix = document.createElement('div');
    var noteEdit = document.createElement('div');
    var noteTitleEdit = document.createElement('input');
    var noteBodyEdit = document.createElement('textarea');
    var clearFix2 = document.createElement('div');
    var btn_update = document.createElement('button');
    var btn_cancel = document.createElement('button');

    note.setAttribute('class', 'note');

    nTitle.textContent = title;
    nParagraph.textContent = body;
    btn_delete.setAttribute('class', 'delete');
    btn_delete.textContent = 'D E L E T E';
    clearFix.setAttribute('class', 'clearfix');
    btn_update.setAttribute('class', 'update');
    btn_update.textContent = 'U P D A T E';
    btn_cancel.setAttribute('class', 'cancel');
    btn_cancel.textContent = 'C A N C E L';
    clearFix2.setAttribute('class', 'clearfix');

    nDisplay.appendChild(nTitle);
    nDisplay.appendChild(nParagraph);
    nDisplay.appendChild(btn_delete);
    nDisplay.appendChild(clearFix);

    note.appendChild(nDisplay);

    noteEdit.appendChild(noteTitleEdit);
    noteTitleEdit.value = title;
    noteEdit.appendChild(noteBodyEdit);
    noteBodyEdit.textContent = body;
    noteEdit.appendChild(btn_update);
    noteEdit.appendChild(btn_cancel);

    noteEdit.appendChild(clearFix2);

    note.appendChild(noteEdit);

    nContainer.appendChild(note);
    noteEdit.style.display = 'none';
}