var UI = require('ui');
var Vector2 = require('vector2');

var main = new UI.Card({
    title: 'RAG Status',
    icon: 'images/menu_icon.png',
    subtitle: 'Hello World!',
    body: 'Press any button.',
    subtitleColor: 'indigo', // Named colors
    bodyColor: '#9a0036' // Hex colors
});

main.show();

main.on('click', 'select', function (e) {
});
