/*
 * Main App View. Creates the main container for the app, adds the campaigns to it.
 */

define([
  'jquery',
  'underscore',
  'backbone',
  '../collections/CampaignsCollection',
  '../views/CampaignView',
], function ($, _, Backbone, Campaigns, CampaignView) {
  'use strict';

  // Grab the template
  // @TODO - Move this into it's own file.
  var campaignsTemplate = _.template("<div id='app' class='contatiner'></div>");

  // Create the view.
  var CampaignsView = Backbone.View.extend({
      // Attach this view to the main app container
      el: "#main",

      // Set the template.
      template: campaignsTemplate,

      // Set the initialize function that is called when a new instance is created.
      initialize: function () {
          console.log("CampaignsView initialize");

          // Bind the reset listener to the view, so when the collection is updated the view is re-renderd
          this.listenTo(this.collection, 'reset', this.render);

          // Call addOne when something is added to collection.
          this.listenTo(this.collection, 'add', this.addOne);

          // Adds all of the models in this collection to the view when called.
          this.listenTo(this.collection, 'addAll', this.addAll);
      },

      render: function(){
        console.log("render");
        console.log(this.collection.length);
        $(this.el).html(this.template());
        this.addAll();
      },

      addAll: function() {
        console.log("addAll");
        this.collection.each(this.addOne);
      },

      addOne: function(model) {
        console.log("addOne");
        var view = new CampaignView({ model: model });
        $("#app").append(view.render());
      }
  });

  return CampaignsView;
});
