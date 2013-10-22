A simple Node.JS IRC client for #jsoxford on irc.freenode.net 

At the moment, this is just for logging and reading.

Messages are saved in couchdb thus

```json
{
   "_id": "12761876127833",
   "_rev": "1-das12761876127833",
   "user": {
       "name": "skinofstars",
       "room": "#jsoxford"
   },
   "text": "yay js!",
   "date": "1367165205199",
   "raw" : {...}
}
```

## setup

Create a couchdb somewhere and create a config.js file in this directory (see config.sample.js for the structure)

## using with chat viewer

You need to have the following design document to use the viewer:

```json
{
  "_id":"_design/messages_by_date",
  "_rev":"1-ff934ccc7330cd9203d90b27643cf551",
  "language":"javascript",
  "views":{
    "messages_by_date":{
      "map":"function(doc) {\n  if(doc.text != undefined) {\n    emit([doc.date], {\n\t\t\"text\":doc.text,\n\t\t\"name\":doc.user.name,\n\t\t\"room\":doc.user.room,\n\t\t\"time\":doc.date\n\t});\n  }\n}"
    }
  }
}
```

If you've set up config.js, then you can put the contents of [this gist]}(https://gist.github.com/benfoxall/7109693) into the node repl and it will create that doc.