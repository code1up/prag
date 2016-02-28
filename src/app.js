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

function setColor (color) {    
    var options = {
        url: "https://ragstatus.firebaseio.com/.json",
        method: "put",
        type: "json",
        data: {
            color: color
        }
    };

    var success = function (data, status, request) {
        console.log("SUCCESS: setColor");
    };

    var failure = function (error, status, request) {
        console.log("AJAX ERROR: setColor: " + error);
    };

    ajax(options, success, failure);    
}

main.on("click", "select", function (e) {
    // Start a diction session and skip confirmation
    Voice.dictate("start", false, function (e) {
        if (e.err) {
            console.log("Error: " + e.err);
            return;
        }

        main.subtitle("Success: " + e.transcription);

        var options = {
            url: "https://api.wit.ai/message?v=20160227&q=" + encodeURIComponent(e.transcription),
            headers: {
                "Authorization": "Bearer 7JWUQOPCWFVFX6RBQOWDWRO5O2KQMLUY"
            },
            type: "json"
        };

        var success = function (data, status, request) {
            var COLORS = {
                red: {
                    red: 0xFF,
                    green: 0x00,
                    blue: 0x00
                },
                amber: {
                    red: 0xFF,
                    green: 0xFF,
                    blue: 0x00
                },
                green: {
                    red: 0x00,
                    green: 0xFF,
                    blue: 0x00
                }
            };
                    
            console.log(JSON.stringify(data));
            
            if (!(data.outcomes && data.outcomes.length)) {
                console.log("missing data.outcomes");
                return;
            }
            
            var outcome = data.outcomes[0];

            if (outcome.intent !== "set_status") {
                console.log("unknown intent");
                return;
            }
            
            if (!outcome.entities) {
                console.log("missing outcome.entities");
                return;   
            }
            
            var colors = outcome.entities.color;
            
            if (!(colors && colors.length)) {
                console.log("missing colors");
                return;   
            }
            
            var color = colors[0].value;
            
            if (!color) {
                console.log("missing color value");
            }
            
            console.log("color: " + color);
            
            if (!COLORS[color]) {
                console.log("unknown color: " + color);
                return;
            }
                
            setColor(COLORS[color]);
        };

        var failure = function (error, status, request) {
            console.log("AJAX ERROR: main.on: " + error);
        };

        ajax(options, success, failure);
    });
});
