define([
  'jquery',
  'underscore',
  'backbone',
  '../collections/Campaigns',
  '../views/Campaign',
], function ($, _, Backbone, Campaigns, CampaignView) {
  'use strict';

  var campaignsTemplate = _.template("<ul></ul>");
  var CampaignsView = Backbone.View.extend({
      el: "#mainContainer",
      template: campaignsTemplate,
      initialize: function () {
          console.log("CampaignsView initialize");
          this.listenTo(this.collection, 'reset', this.render);
          this.listenTo(this.collection, 'add', this.addOne);
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
        $("ul").append(view.render());
      }
  });

  return CampaignsView;
});
