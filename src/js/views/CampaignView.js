/*
 * Creates a view for the Campaigns model.
 */

import Backbone from 'backbone';
import CampaignTemplate from '../templates/CampaignTemplate.html';

var CampaignView = Backbone.View.extend({
    // Will wrap each view in an li tag.
    tagName: "li",

    // Set the template.
    template: CampaignTemplate,

    // Called with instatiated.
    initialize: function () {
      console.log("model initialize");
      this.listenTo(this.collection, 'reset', this.render);
    },

    render: function () {
      var content = this.model.toJSON();
      console.log("render model");

      // Set a class property to use to determine
      // the color to use for the campaign card.
      switch (content.primary_cause) {
        case "physical health":
          content.cause_class = "physical";
          break;
        case "mental health":
          content.cause_class = "mental";
          break;
        default:
          content.cause_class = content.primary_cause;
          break;
      }

      var html = this.template(content);

      return html;
    }
})

export default CampaignView;

