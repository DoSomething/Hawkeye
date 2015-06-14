/*
 * Main App View. Creates the main container for the app, adds the campaigns to it.
 */
import $ from 'jquery';
import Backbone from 'backbone';
import AppTemplate from '../templates/AppTemplate.html';
import CampaignView from '../views/CampaignView';

// Create the view.
var CampaignsView = Backbone.View.extend({
  // Attach this view to the main app container
  el: "#main",

  // Set the template.
  template: AppTemplate,

  // Set the initialize function that is called when a new instance is created.
  initialize: function () {
    console.log("CampaignsView initialize");
    console.log(AppTemplate);

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
    var view = new CampaignView({model : model});
    $("#app").append(view.render());
  }
});

export default CampaignsView;
