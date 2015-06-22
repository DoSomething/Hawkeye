/*
 * Creates the Campaigns collection.
 * @TODO - Rename to unscheduled campagins
 */

import $ from 'jquery';
import _ from  'underscore';
import Backbone from 'backbone';
import Campaign from '../models/CampaignModel';


var Campaigns = Backbone.Collection.extend({
  // The model to use with this collection.
  model: Campaign,

  // The endpoint to hit to populate the collection.
  url: "/campaigns",

  // @TODO - Move filtering here so that it also returns a collection.
  searchByTitle : function(letters) {
    if(letters == "") return this;

    var pattern = new RegExp(letters,"gi");

    return _(this.filter(function(data) {
      return pattern.test(data.get("title"));
    }));
  }
});

export default Campaigns;
