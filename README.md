# Hawkeye

![Hawkeye](http://i.annihil.us/u/prod/marvel/i/mg/3/60/537bad8219731/standard_xlarge.jpg)

## Installation 
- Install modules ```npm install```
- Start Mongo ```mongod```
- Run the server ```node app.js```

## Fender
Following tools are installed for fender dev
- Neue
- Backbone
- Jquery 
- Underscore
- sass 
- auto browser refresh* (Doesn't work yet :/)

## Endpoints

#### /schedule
Scheldues a campaign as hot. Parameters are,
- Campaign ID
- Date

#### /remove
Removes a campaign from being hot. Only parameter is,
- Campaign ID

#### /filter
Filters through all of the available campaigns based on the given parameters. No parameters will return the entire list. Available filter parameters are,
- Name. (Note: Can be a partial name)
- Cause. (Eg: 'education')
- Hours.
- Action (eg: 'make something')

## Configuration
The current configuration is for runtime use, no sensitive credentials are in it at the moment. The config options are,

#### import_campaigns_from_drupal
When starting the app there is two options on how to boot. You can either load a static file containing many campaigns or pull in all of the available campaigns from Drupal. When developing this property should be set to false because loading from file is quicker, however in production this should always be true.

#### mongo_url
The URL of the Mongo database to connect to. Default is 'mongodb://localhost/'



