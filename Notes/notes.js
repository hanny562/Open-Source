var inputTitle = document.querySelector('.new-note input');
var inputBody = document.querySelector('.new-note textarea');
var nContainer = document.querySelector('.note-container');
var btn_clear = document.querySelector('.clear');
var btn_add = document.querySelector('.add');

btn_add.addEventListener('click', newNote);
btn_clear.addEventListener('click', clear_content);