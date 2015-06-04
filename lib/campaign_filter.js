module.exports = function(app) {

  app.post('/filter', function(req, res) {
    var name = req.body.name;
    //Other filter variables are set here

    // Make a temporary duplicate set so each request has its own to work from
    var campaignsCopy = global.CAMPAIGNS.slice();

    // Run copied array through applicable filters
    if(name) {
      campaignsCopy = campaignsCopy.filter(function(value){
        return filterByName(value, name);
      });
    }

    res.json(campaignsCopy);
  });

}

//TODO: Make filter functions async so they don't block the main thread

function filterByName(value, name) {
  return value.title.toLowerCase().indexOf(name.toLowerCase()) != -1;
}
