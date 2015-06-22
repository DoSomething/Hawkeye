/*
 * Main App View. Creates the main container for the app, adds the campaigns to it.
 */
import $ from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';
import UnscheduledTemplate from '../templates/UnscheduledTemplate.html';
import CampaignView from '../views/CampaignView';

// Create the view.
var UnscheduledView = Backbone.View.extend({
  el: "#campaigns",

  // Set the template.
  // @TODO - might not need this.
  template: UnscheduledTemplate,

  // Set the initialize function that is called when a new instance is created.
  initialize: function () {
    // Bind the reset listener to the view, so when the collection is updated the view is re-renderd
    this.listenTo(this.collection, 'reset', this.render);

    // Call addOne when something is added to collection.
    this.listenTo(this.collection, 'add', this.addOne);

    // Adds all of the models in this collection to the view when called.
    this.listenTo(this.collection, 'addAll', this.addAll);

    this.listenTo(this.collection, 'change', this.render);
    // this.collection.bind('add', this.onModelAdded, this);
  },

  render: function(){
    console.log("unscheduled render");  
    $(this.el).html(this.template());
    this.addAll();
  },

  addAll: function() {
    this.collection.each(this.addOne);
  },

  addOne: function(model) {
    if (parseInt(model.get("date")) === 0) {
      var view = new CampaignView({model : model});
      $("#unscheduled").append(view.render());
    }
  },
});

export default UnscheduledView;
