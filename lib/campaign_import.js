var CAMPAIGN_URL = "https://www.dosomething.org/api/v1/campaigns";

var request = require('superagent');
var callback;
var tempCampaigns = [];

module.exports = function(call) {
  callback = call;
  fetchCampaigns();
}

function fetchCampaigns(customUrl) {
  var url = CAMPAIGN_URL;
  if(customUrl) {
    url = customUrl;
  }
  request
   .get(url)
   .end(function(err, res) {
     if(err) {
       console.log("Import error, aborting startup" + err);
       return;
     }
     var response = res.body;
     response.data.forEach(function(element, index, array) {
       buildCampaignObj(element);
     });
     if(response.pagination.current_page != response.pagination.total_pages) {
       fetchCampaigns(response.pagination.next_uri);
     }
     else {
       callback(tempCampaigns);
     }
   });
}

function buildCampaignObj(rawCampaignData) {
  var campaignObj = {
    id: rawCampaignData.id,
    title: rawCampaignData.title,
    hours: rawCampaignData.time_commitment
  }
  tempCampaigns.push(campaignObj);
}
