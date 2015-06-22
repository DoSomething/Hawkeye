/*
 * Creates a view for the Campaigns model.
 */
import $ from 'jquery';
import Backbone from 'backbone';
import _ from 'underscore';
import CampaignTemplate from '../templates/CampaignTemplate.html';

var CampaignView = Backbone.View.extend({
  // el: 'body',

  // Set the template.
  template: CampaignTemplate,

  initialize: function () {
    // this.on('change', this.scheduleCampaign, this);
  },

  render: function () {
    var content = this.model.toJSON();

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
  },

  // events: {
  //   "change .card select": "scheduleCampaign",
  // },

  // scheduleCampaign: function(e) {
  //   console.log(e.currentTarget.value);
  // }
});

export default CampaignView;

