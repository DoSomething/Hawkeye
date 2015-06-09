var config = require("../config.json");
var mongoose = require('mongoose');
mongoose.connect(config.mongo_url);

var CampaignModel = mongoose.model('Campaign', {id: String, title: String, hours: Number, primary_cause: String, secondary_causes: Array, action_type: String, date: Number, staff_pick: Boolean});

module.exports = function(app) {

  app.post('/schedule', function(req, res) {
    var id = req.body.id;
    var date = req.body.date;
    CampaignModel.findOne({id: id}, function(err, campaign) {
      if(!campaign) {
        var campaignsCopy = global.CAMPAIGNS.slice();
        for(var index = 0; index < campaignsCopy.length; index++) {
          if(campaignsCopy[index].id == id) {
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
    var id = req.body.id;
    CampaignModel.findOneAndRemove({id: id}, function(err, campaign) {
      if(!campaign){
        res.status(400).send("Invalid ID");
      }
      else {
        res.status(200).send("Removed");
      }
    });
  });

}
