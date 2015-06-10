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
      var html = this.template(content);
      return html;
    }
})

export default CampaignView;

