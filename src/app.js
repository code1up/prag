var UI = require("ui");
var Voice = require("ui/voice");
var ajax = require("ajax");

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
    Voice.dictate("start", false, function (e) {
        if (e.err) {
            console.log("Error: " + e.err);
            return;
        }

        main.subtitle("Success: " + e.transcription);

        var options = {
            url: "https://api.wit.ai/message?v=20160227&q=" + e.transcription,
            type: "json"
        };

        var success = function (data, status, request) {
            console.log(JSON.stringify(data));
        };

        var failure = function (error, status, request) {
            console.log("The ajax request failed: " + error);
        };

        ajax(options, success, failure);
    });
});
