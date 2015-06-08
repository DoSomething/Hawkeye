var config = require("../config.json");
var mongoose = require('mongoose');
mongoose.connect(config.mongo_url);

var CampaignModel = mongoose.model('Campaign', {id: String, title: String, hours: Number, primary_cause: String, secondary_causes: Array, action_type: String, date: Number});

module.exports = function(app) {

  app.post('/schedule', function(req, res) {
    var id = req.body.id;
    var date = req.body.date;
    CampaignModel.findOne({id: id}, function(err, campaign) {
      if(!campaign) {
        console.log("NO CAMPAIGN");
        var campaignsCopy = global.CAMPAIGNS.slice();
        for(var index = 0; index < campaignsCopy.length; index++) {
          if(campaignsCopy[index].id == id) {
            console.log("FOUND IT");
            campaign = new CampaignModel(campaignsCopy[index]);
            break;
          }
        }
      }
      campaign.date = date;
      campaign.save(function(err) {
        res.json(campaign);
      });
    });
  });

  app.post('/remove', function(req, res) {

  });

}
