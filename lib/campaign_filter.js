Array.prototype.diff = function(a) {
    return this.filter(function(i) {return a.indexOf(i) < 0;});
};

module.exports = function(app) {

  app.get('/campaigns', function(req, res) {
    var name = req.query.name;
    var cause = req.query.cause;
    var hours = req.query.hours;
    var action = req.query.action;
    var date = req.query.date;
    var isStaffPick = req.query.isStaffPick;

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

    if(date) {
      campaignsCopy = campaignsCopy.filter(function(value) {
        return filterByDate(value, date);
      });
    }

    if(isStaffPick) {
      if(isStaffPick == 1) {
        campaignsCopy = campaignsCopy.filter(filterByStaffPick);
      }
      else {
        campaignsCopy = campaignsCopy.diff(campaignsCopy.filter(filterByStaffPick));
      }
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

function filterByDate(value, date) {
  return value.date == date;
}
