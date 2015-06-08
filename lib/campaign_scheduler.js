var config = require("../config.json");
var mongoose = require('mongoose');
mongoose.connect(config.mongo_url);

var CampaignModel = mongoose.model('Campaign', {id: String, title: String, hours: Number, primary_cause: String, secondary_causes: Array, action_type: String});

module.exports = function(app) {

  app.get('/scheldue', function(req, res) {
    var id = req.body.id;
    var month = req.body.month;

  });

}
