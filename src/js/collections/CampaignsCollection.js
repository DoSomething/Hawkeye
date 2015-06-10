/*
 * Creates the Campaigns collection.
 */

define([
  'jquery',
  'backbone',
  '../models/CampaignModel'], function ($, Backbone, Campaign) {
  'use strict';

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

  return CampaignsList;
});
