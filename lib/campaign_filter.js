module.exports = function(app) {

  app.post('/filter', function(req, res) {
    var name = req.body.name;
    var cause = req.body.cause;
    var hours = req.body.hours;

    // Make a temporary duplicate set so each request has its own to work from
    var campaignsCopy = global.CAMPAIGNS.slice();

    // Run copied array through applicable filters
    if(name) {
      campaignsCopy = campaignsCopy.filter(function(value){
        return filterByName(value, name);
      });
    }

    if(cause) {
      campaignsCopy = campaignsCopy.filter(function(value) {
        return filterByCause(value, cause);
      });
    }

    if(hours) {
      campaignsCopy = campaignsCopy.filter(function(value) {
        return filterByHours(value, hours);
      });
    }

    res.json(campaignsCopy);
  });

}

function filterByName(value, name) {
  return value.title.toLowerCase().indexOf(name.toLowerCase()) != -1;
}

function filterByCause(value, cause) {
  return value.primary_cause.toLowerCase() == cause;
}

function filterByHours(value, hours) {
  return value.hours == hours;
}
