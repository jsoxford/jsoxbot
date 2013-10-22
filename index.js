var irc = require('irc'),
    config = require('./config'),
    nano = require('nano')(config.db.url);

var db = nano.use(config.db.name);

var client = new irc.Client(config.irc.server, config.irc.botNick, {
    channels: config.irc.channels,
    userName: config.irc.botName,
});

// add listeners
client.addListener('message', function (from, to, message, raw) {
    console.log(from + ' => ' + to + ': ' + message);

    var msg = {};
    msg.user = {
        name: from,
        room: raw.args[0] 
    };
    msg.text = message;
    msg.date = Date.now();
    msg.raw = raw; // *shurgs* might want this stuff

    db.insert(msg, '', function(err, body) {
        if (err) {
            console.log(err);            
        }
    });
});

client.addListener('pm', function (from, message) {
    console.log(from + ' => ME: ' + message);
    client.say(from, "I'm a bot!");
});

client.addListener('error', function(message) {
    console.log('error: ', message);
});

// to prevent server timeout
setInterval(function() {
    client.send('PONG', 'empty');
}, 5*60*1000);