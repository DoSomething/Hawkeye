define([
  'jquery',
  'underscore',
  'backbone',
  '../collections/Campaigns',
], function ($, _, Backbone, Campaigns) {
  'use strict';

  var campaignTemplate = _.template("<h3><%- title %></h3>");

  var CampaignView = Backbone.View.extend({
      tagName: "li",

      template: campaignTemplate,

      initialize: function () {
        console.log("model initialize");
        console.log(this.model);
        this.listenTo(this.collection, 'reset', this.render);
      },

      render: function () {
        var content = this.model.toJSON();
        var html = this.template(content);
        return html;
      }
  })

  return CampaignView;
});
