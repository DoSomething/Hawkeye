/*
 * Creates the Scheduled Campaigns collection.
 */

import $ from 'jquery';
import _ from  'underscore';
import Backbone from 'backbone';
import Campaign from '../models/CampaignModel';


var ScheduledCampaigns = Backbone.Collection.extend({
  // The model to use with this collection.
  model: Campaign,

  // The endpoint to hit to populate the collection.
  url: "/campaigns?date=1",

  initialize: function() {
    this.on( "change:date", this.scheduleCampaign, this);
  }

  // @TODO - Move filtering here so that it also returns a collection.
  // searchByTitle : function(letters) {
  //   if(letters == "") return this;

  //   var pattern = new RegExp(letters,"gi");

  //   return _(this.filter(function(data) {
  //     return pattern.test(data.get("title"));
  //   }));
  // }
});

export default ScheduledCampaigns;
