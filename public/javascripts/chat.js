        var sockjs_url = '/chat';
        var sockjs = new SockJS(sockjs_url);

        var userid = 'guest' + new Date().getSeconds();
        var div  = $('#first div');
        var inp  = $('#first input');
        var form = $('#first form');

        var print = function(message){
            div.append($("<code>").text(message));
            div.append($("<br>"));
            div.scrollTop(div.scrollTop()+10000);
        }

        sockjs.onopen    = function()  {print('Connected.');};
        sockjs.onmessage = function(e) {print(e.data);};
        sockjs.onclose   = function()  {print('Closing Connection.');};

        form.submit(function() {
            print('Sending to server...');
            sockjs.send(userid + ': ' + inp.val());
            inp.val('');
            return false;
        });
