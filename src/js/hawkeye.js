/*
 * This is the main entry point for this app.
 */

// Grab the tools we need.
import $ from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';

// Models
import CampaignModel from './models/CampaignModel';

// Collections
import CampaignCollection from './collections/CampaignsCollection';

// Views
import AppView from './views/AppView';

$(document).ready(function() {

  var Router = Backbone.Router.extend({
    routes: {
      "": "defaultRoute"
    },

    defaultRoute: function () {
      console.log("defaultRoute");
      // var campaignsCollection = new CampaignCollection();
      new AppView();
    }
  });

  var appRouter = new Router();
  Backbone.history.start();
});
