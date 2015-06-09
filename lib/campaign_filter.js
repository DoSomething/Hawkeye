module.exports = function(app) {

  app.post('/filter', function(req, res) {
    var name = req.body.name;
    var cause = req.body.cause;
    var hours = req.body.hours;
    var action = req.body.action;
    var isStaffPick = req.body.isStaffPick;

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

    if(action) {
      campaignsCopy = campaignsCopy.filter(function(value) {
        return filterByActionType(value, action);
      });
    }

    if(isStaffPick) {
      campaignsCopy = campaignsCopy.filter(filterByStaffPick);
    }

    res.json(campaignsCopy);
  });

}

function filterByName(value, name) {
  return value.title.toLowerCase().indexOf(name.toLowerCase()) != -1;
}

function filterByCause(value, cause) {
  return value.primary_cause.toLowerCase() == cause.toLowerCase();
}

function filterByHours(value, hours) {
  return value.hours == hours;
}

function filterByActionType(value, action) {
  return value.action_type.toLowerCase() == action.toLowerCase();
}

function filterByStaffPick(value) {
  return value.staff_pick;
}
