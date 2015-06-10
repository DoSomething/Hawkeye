// import _ from 'underscore';
// import { Collection } from 'backbone';
// import Campaign from 'models/Campaign';

define(['jquery','backbone', '../models/Campaign'], function ($, Backbone, Campaign) {
  'use strict';

  var CampaignsList = Backbone.Collection.extend({
      model: Campaign,
      url: "/filter",
      initialize: function(){
          console.log("Movies initialize");
      }
  });

  return CampaignsList;
});
