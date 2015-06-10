/*
 * Creates a view for the Campaigns model.
 */

define([
  'jquery',
  'underscore',
  'backbone',
], function ($, _, Backbone) {
  'use strict';

  // @TODO - Move template in to it's own file.
  var campaignTemplate = _.template("<h3><%- title %></h3>");

  var CampaignView = Backbone.View.extend({
      // Will wrap each view in an li tag.
      tagName: "li",

      // Set the template.
      template: campaignTemplate,

      // Called with instatiated.
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
