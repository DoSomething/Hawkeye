//TODO: Have a 'dev' option to just load a file containing campaign data

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
  //For the rare campaigns with no cause attached
  var primaryCause = '';
  var secondaryCause = [];
  if(rawCampaignData.causes) {
    //For the rare campaigns with primary or secondary only causes
    if(rawCampaignData.causes.primary){
      primaryCause = rawCampaignData.causes.primary.name;
    }
    if(rawCampaignData.causes.secondary) {
      secondaryCause = rawCampaignData.causes.secondary;
    }
  }
  var actionType = '';
  if(rawCampaignData.action_types) {
    actionType = rawCampaignData.action_types.primary.name;
  }
  var campaignObj = {
    id: rawCampaignData.id,
    title: rawCampaignData.title,
    hours: rawCampaignData.time_commitment,
    primary_cause: primaryCause,
    secondary_causes: secondaryCause,
    action_type: actionType
  }
  tempCampaigns.push(campaignObj);
}
