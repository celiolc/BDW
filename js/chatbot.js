//When User mouseOver in ChatBot button, It's opened.
$(document).ready(function() {
    $(".chat-closed").on("mouseover", function(e) {
        $(".chat-header,.chat-content").removeClass("hide");
        $(this).addClass("hide");
        document.getElementById("chat-btn").style.cssText = 'display: none;'
        changeMedia(x); //Function called to check if it's Smart screen, If yes it's going to hide elements on the page when user clicks on ChatBot

    });
    //When User Press Close(X), The chat is closed.
    $(".close").on("click", function(e) {
        $(".chat-header,.chat-content").addClass("hide");
        $(".chat-closed").removeClass("hide");
        document.getElementById("chat-btn").style.cssText = 'display: block;'
        returnCSS(); //Function called to return CSS styles as before for Smartphones
        //clearInterval();
    });
});
$(document).ready(function($) {
    javascriptCheck();
    $('#id_contextdump').hide();
    enterbutton();
    invokeAjax("first_message");
});

// if javascript is enabled on the browser then can
// remove the warning message
function javascriptCheck() {
    $('#no-script').remove();
}

function createNewDiv(who, message) {
    console.log('002-001');
    var txt = who + ' : ' + message;
    return $('<div></br></br></div>').text(txt);

}

function chat(person, txt) {
    $('#id_botchathistory').append(createNewDiv(person, txt));
}

function processOK(response) {
    console.log('003-001');
    console.log(response);
    console.log(response.botresponse.messageout);
    console.log(response.botresponse.messageout.output.text);
    console.log(response.botresponse.messageout.context);
    console.log(response.results);
    var imgs = $('#image').val();
    insertChat('Watson', response.botresponse.messageout.output.text);
    insertChat('Results', response.results);
    //chat('Results2: ', response.results.CAT_ID);
    $('#id_contextdump').data('convContext', response.botresponse.messageout.context);

}

function processNotOK() {
    insertChat('Erro', 'Erro de acesso ao tentar se comunicar com o bot, contact o developer. Versao beta');

}



function invokeAjax(message) {
    var contextdata = $('#id_contextdump').data('convContext');
    console.log('checking stashed context data');
    console.log(contextdata);


    //var ajaxData = "msgdata=" + message;
    var ajaxData = {};
    ajaxData.msgdata = message;
    if (contextdata) {
        ajaxData.context = contextdata;
    }

    $.ajax({
        type: 'POST',
        url: 'botchat1',
        data: ajaxData,
        //success: setTimeout(processOK, 3000),
        success: processOK,
        error: processNotOK,
    });
}

// sets pressing of enter key to perform same action as send button
function enterbutton() {
    $(function() {
        $("form input").keypress(function(e) {
            if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13)) {
                $('#id_enter').click();
                return false;
            } else {
                return true;
            }
        });
    });
}


//End of Javascript from templatePadrao

var me = {};
me.avatar = "https://drive.google.com/uc?id=1F0Nct8qYEoP3iqU8NJUXhJmK5F7TRPVH";

var you = {};
you.avatar = "https://drive.google.com/uc?id=1bhsmp7BJt8MmyOItTMKZvCP8x36YJLIc";

function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}

//-- No use time. It is a javaScript effect.
function insertChat(who, text, time) {
    if (time === undefined) {
        time = 0;
    }
    var control = "";
    var date = formatAMPM(new Date());

    if (who == "me") {
        control = '<li style="width:100%">' +
            '<div class="msj macro">' +
            '<div class="avatar"><img class="img-circle" style="width:100%;" src="' + me.avatar + '" /></div>' +
            '<div class="text text-l">' +
            '<p>' + text + '</p>' +
            '<p><small>' + date + '</small></p>' +
            '</div>' +
            '</div>' +
            '</li>';
    } else if (who == "Results" && text.botresponse == undefined) {
        control +=
            '<li style="width:100%;">' +
            '<div class="msj-rta macro">' + //+ '<i>'
            '<div class="text text-r" style="width:100%; float: left;">' +
            '<table id="query_results" border="1"><tr>';
        if (text[0] == undefined) {
            for (var attributename in text) {
                control += "<th>" + attributename + "</th>";
            }
            control += '</tr>';
            control += '<tr>';
            for (var attributename in text) {
                control += "<td>" + text[attributename] + "</td>";
            }
            control += '</tr>';

        } else {
            for (var attributename in text[0]) {
                control += "<th>" + attributename + "</th>";
            }
            for (var key in text) {
                control += '<tr>';
                for (var attributename in text[key]) {
                    control += "<td>" + text[key][attributename] + "</td>";
                }
                control += '</div>' + '</div>' + '</i>' +

                    '</li>';
                '</tr>';
            }
        }
        control += '</tr>';
        control += '</table>';
        //control += '<tr>'
        //for(var attributename in text) {
        //    control += "<td>" + text[attributename] + "</td>";
        // }
        // control += '</tr>'
        // control += '</table>
    } else if (text[0] != undefined) {
        //control = chat(person, txt);
        control = '<li style="width:100%;">' +
            '<div class="msj-rta macro">' +
            '<div class="text text-r">' +
            '<p>' + text +
            '</p>' +
            '<p><small>' + date + '</small></p>' +
            '</div>' +
            '<div class="avatar" style="padding:0px 0px 0px 10px !important"><img class="img-circle" style="width:100%;" src="' + you.avatar + '" /></div>' +
            '</li>';
    }


    setTimeout(
        function() {
            $("ul").append(control).scrollTop($("ul").prop('scrollHeight'));
        }, time);

}


$(".mytext").on("keyup", function(e) {
    if ((e.keyCode || e.which) == 13) {
        var text = $(this).val();
        if (text !== "") {
            insertChat("me", text);
            //invokeAjax(text);
            $(this).val('');

        }

    }

});

$(".mytext").on("keydown", function(e) {
    if (e.which == 13) {
        var text = $(this).val();
        if (text !== "") {
            insertChat("me", text);
            invokeAjax(text);
            $(this).val('');
        }
    }
});

/*$('body > section > div > div > div > div > div > div > div > div > div:nth-child(2) > span').click(function() {
    console.log("clicked button");
    $(".mytext").trigger({
        type: 'keydown',
        which: 13,
        keyCode: 13
    });
})
*/
$('#gly').on("click", function() {
    console.log("clicked button");
    var text = $(".mytext").val();
    if (text !== "") {
        insertChat("me", text);
        invokeAjax(text);
        $(".mytext").val('');
    }
});

//Function/code created to Text to Speech 'Audio capture'

$('#checkbox').on("click", function() {
    var socketaddy = "wss://" + window.location.host + "/ws/audio";
    var isChecked = document.getElementById("checkbox").checked;

    if (!isChecked) {
        console.log("Input is NOT checked and Voice/Audio  is disabled");
        sock.close();

    } else {
        console.log("Input is checked and Voice is now  enabled");
        var output = document.getElementById('output')
        $('#output').on('playing', function() {
            $('#text').text('Playing audio.')
        });
        $('#output').on('ended', function() {
            $('#text').text('Voice is ON, Press OFF to mute')

        });

        sock = new WebSocket(socketaddy);
        sock.onopen = function() {
            $('#text').text('Voice is ON, Press OFF to mute');
            console.log("Connected websocket");
        };
        sock.onerror = function() {
            console.log("Websocket error");
        };
        sock.onclose = function() {
            $('#text').text('Voice is OFF, Press ON to hear');
            document.getElementById('button').style.cssText = ''
                //document.getElementById('button2').style.cssText = ''
        }

        sock.onmessage = function(evt) {
            console.log("Websocket message", evt);
            output.src = window.URL.createObjectURL(evt.data);
            output.play();
        };
        //});
    }
});
//End of Audio capture

//Function/code created to Speech To Text 'Voice/Mic capture and recording'
$('#checkbox').on("click", function() {
            var isChecked = document.getElementById("checkbox").checked;
            if (!isChecked) {
                console.log("Input is NOT checked and Voice/Mic  is disabled");
                ws.close();
                mediaRecorder.stop();
            } else {
                console.log("Input is checked and Voice/Mic is now  enabled");
                enableMic();
                var token = "{{payload}}";
                var model = "en-US_BroadbandModel"; // Change to your own model
                var wsURI = 'wss://stream.watsonplatform.net/speech-to-text/api/v1/recognize?watson-token=' +
                    token + '&model=' + model;
                var message = {
                    'action': 'start',
                    'content-type': 'audio/ogg',
                    'continuous': true,
                    'interim_results': true,
                    // 'inactivity_timeout': 6000,
                    'word_confidence': false,
                    'timestamps': true,
                    'max_alternatives': 0,
                    'keywords': ['imposible', 'unavailable'],
                    'keywords_threshold': 0.8,
                    'speaker_labels': true
                };
                var message2 = { 'action': 'stop' };
                var index = 0;
                var ws = new WebSocket(wsURI);
                ws.onopen = function(evt) { onOpen(evt) };
                ws.onmessage = function(evt) { onMessage(evt) };
                ws.onclose = function(evt) { onClose(evt) };
                ws.onerror = function(evt) { onError(evt) };


                //function that is going to record sound 
                function enableMic() {
                    //document.getElementById("startButton").addEventListener("click", function() {

                    navigator.mediaDevices.getUserMedia({ audio: true })
                        .then(stream => {
                            const mediaRecorder = new MediaRecorder(stream);
                            mediaRecorder.start();
                            detectSilence(stream, onSilence, onSpeak);


                            const audioChunks = [];
                            mediaRecorder.addEventListener("dataavailable", event => {
                                audioChunks.push(event.data);

                            });
                            //document.getElementById("stopButton").addEventListener("click", function() {
                            //mediaRecorder.stop();
                            //});

                            mediaRecorder.addEventListener("stop", () => {
                                const audioBlob = new Blob(audioChunks, { type: 'audio/ogg' });
                                const audioUrl = URL.createObjectURL(audioBlob);
                                const audio = new Audio(audioUrl);
                                var reader = new FileReader();
                                reader.onload = function() {
                                    ws.send(reader.result);
                                };
                                reader.readAsArrayBuffer(audioBlob);
                                // convert blob to URL so it can be assigned to a audio src attribute
                                createAudioElement(URL.createObjectURL(audioBlob));

                                audio.play();
                                console.log(audioBlob);

                            });
                        });
                    //});
                };

                function onOpen(evt) {
                    //fileselection();
                    console.log("onOpen:" + JSON.stringify(message));
                    ws.send(JSON.stringify(message));
                };

                function onClose(evt) {
                    console.log("onClose:" + evt.code + evt.reason);
                    ws.close();
                };

                function onMessage(evt) {　
                    var object = JSON.parse(evt.data);
                    console.log("onMessage:" + evt.data);
                    if (evt.data.indexOf("results") >= 1) {
                        if (object["results"][0]["final"] == true) {
                            printout(
                                object["results"][0]["alternatives"][0]["timestamps"][0][2],
                                object["results"][0]["alternatives"][0]["confidence"],
                                object["results"][0]["alternatives"][0]["transcript"],
                                object["result_index"]
                            );
                        };
                    };
                };

                function onError(evt) {
                    console.log("onError:" + evt.data);
                };

                function disconnect() {
                    ws.send(JSON.stringify(message2));
                    console.log("disconnect");
                    ws.close();
                };
                // appends an audio element to playback and download recording
                function createAudioElement(blobUrl) {
                    const downloadEl = document.createElement('a');
                    downloadEl.style = 'display: block';
                    downloadEl.innerHTML = 'download';
                    downloadEl.download = 'audio.wav';
                    //downloadEl.download = 'audio.webm';
                    downloadEl.href = blobUrl;
                    const audioEl = document.createElement('audio');
                    audioEl.controls = true;
                    const sourceEl = document.createElement('source');
                    sourceEl.src = blobUrl;
                    sourceEl.type = 'audio/webm';
                    audioEl.appendChild(sourceEl);
                    document.body.appendChild(audioEl);
                    document.body.appendChild(downloadEl);
                    downloadEl.setAttribute("id", "audio");
                };

                //End of Voice/Mic capture
                //Function created to hide the content when user press Chatbot button on Smartphones.
                //$(".chat-closed").on("mouseover", function() {
                //changeMedia(x);
                //});

                //Function created to hide the content when user press Chatbot button on Smartphones.
                function changeMedia(x) {
                    if (!x.matches) { // If media query doesn't matches

                        console.log('changeMedia called for media more than 440');
                    } else {
                        document.getElementById("menu1").style.display = "none";
                        document.getElementById("menu2").style.display = "none";
                        document.getElementById("about").style.color = "transparent";
                        document.getElementById("contact").style.color = "transparent";
                        document.getElementById("about").style.display = "none";
                        document.getElementById("contact").style.display = "none";
                        document.getElementById("glob").style.color = "transparent";
                        document.getElementById("wht").style.color = "transparent";
                        document.getElementById("brief").style.color = "transparent";
                        document.getElementById("look").style.color = "transparent";
                        document.getElementById("p").style.color = "transparent";
                        document.getElementById("gtouch").style.color = "transparent";
                        document.getElementById("missing").style.color = "transparent";
                        document.getElementById("name").style.display = "none";
                        document.getElementById("email").style.display = "none";
                        document.getElementById("message").style.display = "none";
                        document.getElementById("send").style.display = "none";
                        document.getElementById("rights").style.display = "none";

                    }
                }

                var x = window.matchMedia("(max-width: 440px)")
                x.addListener(changeMedia) // Attach listener function on state changes

                //Function called to check if it's Smart screen, If yes it's going to hide elements on the page when user clicks on ChatBot
                function returnCSS() {
                    document.getElementById("menu1").style.display = "";
                    document.getElementById("menu2").style.display = "";
                    document.getElementById("about").style.color = "";
                    document.getElementById("contact").style.color = "";
                    document.getElementById("about").style.display = "";
                    document.getElementById("contact").style.display = "";
                    document.getElementById("glob").style.color = "";
                    document.getElementById("wht").style.color = "";
                    document.getElementById("brief").style.color = "";
                    document.getElementById("look").style.color = "";
                    document.getElementById("p").style.color = "";
                    document.getElementById("gtouch").style.color = "";
                    document.getElementById("missing").style.color = "";
                    document.getElementById("name").style.display = "";
                    document.getElementById("email").style.display = "";
                    document.getElementById("message").style.display = "";
                    document.getElementById("send").style.display = "";
                    document.getElementById("rights").style.display = "";
                }