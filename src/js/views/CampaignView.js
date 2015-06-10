/*
 * Creates a view for the Campaigns model.
 */

define([
  'jquery',
  'underscore',
  'backbone',
  '../templates/CampaignTemplate.html',
], function ($, _, Backbone, CampaignTemplate) {
  'use strict';

  var CampaignView = Backbone.View.extend({
      // Will wrap each view in an li tag.
      tagName: "li",

      // Set the template.
      template: CampaignTemplate,

      // Called with instatiated.
      initialize: function () {
        console.log("model initialize");
        console.log(CampaignTemplate({title: "hi"}));
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
