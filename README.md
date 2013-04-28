A simple Node.JS IRC client for #jsoxford on irc.freenode.net 

At the moment, this is just for logging and reading.

Messages are saved in couchdb thus

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