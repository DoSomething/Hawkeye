/*
 * Creates the Campaigns collection.
 * @TODO - Rename to unscheduled campagins
 */

import $ from 'jquery';
import Backbone from 'backbone';
import Campaign from '../models/CampaignModel';


var UnscheduledCampaigns = Backbone.Collection.extend({
  // The model to use with this collection.
  model: Campaign,

  // The endpoint to hit to populate the collection.
  url: "/campaigns?date=0",
});

export default UnscheduledCampaigns;
