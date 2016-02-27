var UI = require("ui");
var Voice = require("ui/voice");

var main = new UI.Card({
    title: "RAG Status",
    icon: "images/menu_icon.png",
    subtitle: "Hello World!",
    body: "Press any button.",
    subtitleColor: "indigo", // Named colors
    bodyColor: "#9a0036" // Hex colors
});

main.show();

main.on("click", "select", function (e) {
    // Start a diction session and skip confirmation
    Voice.dictate('start', false, function (e) {
        if (e.err) {
            console.log('Error: ' + e.err);
            return;
        }

        main.subtitle('Success: ' + e.transcription);
    });

});
