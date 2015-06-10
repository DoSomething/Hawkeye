/*
 * Creates the Campaigns collection.
 */

import $ from 'jquery';
import Backbone from 'backbone';
import Campaign from '../models/CampaignModel';


var CampaignsList = Backbone.Collection.extend({
  // The model to use with this collection.
  model: Campaign,

  // The endpoint to hit to populate the collection.
  url: "/filter",

  // @TODO - Remove, debugging puposes only.
  initialize: function(){
      console.log("Movies initialize");
  }
});

export default CampaignsList;
