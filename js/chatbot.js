$(document).ready(function() {
    $(".chat-closed").on("mouseover", function(e) {
        $(".chat-header,.chat-content").removeClass("hide");
        $(this).addClass("hide");
    });

    $(".chat-header").on("click", function(e) {
        $(".chat-header,.chat-content").addClass("hide");
        $(".chat-closed").removeClass("hide");
        //clearInterval();
    });
});
$(document).ready(function($) {
    javascriptCheck();
    $('#id_contextdump').hide();
    enterbutton();
    invokeAjax("Hello");
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
    changechatclsed();

    function changechatclsed() {
        var timer;
        timer = setInterval(changing, 300);
        //$('#home').on("click", function() {
        $(".chat-header").on("click", function() {
            clearInterval(timer);
        });
    }

    function changing() {
        var x = document.getElementById("chat-clsed");
        x.style.backgroundColor = x.style.backgroundColor == "blue" ? "red" : "blue";
    }
}
/*$('#chat-clsed').on("processNotOK", function() {
    document.getElementById("chat-clsed").style.cssText = 'background-color: red; color: white;'
    console.log('function actived');
});
*/
function processNotOK() {


    //var timer = setInterval(changechatclsed, 3000);

    //function changechatclsed() {
    //document.getElementById("chat-clsed").style.cssText = 'background-color: red; color: white;'
    //myStopFunction();
    //} //document.getElementsByClassName("chat-closed").style.cssText = 'background-color: red; color: white;'
    //--alert("New message arrived");
    insertChat('Erro', 'Erro de acesso ao tentar se comunicar com o bot, contact o developer. Versao beta');
    //myStopFunction();
    //chat('Erro', 'Erro de acesso ao tentar se comunicar com o bot, contact o developer. Versao beta');
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

//Audio capture
var socketaddy = "wss://" + window.location.host + "/ws/audio";
$(document).ready(function() {

    //If users click on Off button, Voice is disconnected
    $('#button2').on("click", function() {
        document.getElementById('button2').style.cssText = 'background-color: red; color: white;'
        document.getElementById('button').style.cssText = ''
        sock.close();
        console.log("Voice audio was clicked and disabled.");
    });
    //If users click on Off button, Voice is connected
    $('#button').on("click", function() {
        document.getElementById('button').style.cssText = 'background-color: blue; color: white;'
        document.getElementById('button2').style.cssText = ''
        console.log("Voice audio was clicked and enabled.");

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
    });

});




//End of Audio capture