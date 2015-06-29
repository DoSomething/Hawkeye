/*
 * Main App View. Creates the main container for the app, adds the campaigns to it.
 */
import $ from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';
import CampaignView from '../views/CampaignView';

// Create the view.
var UnscheduledView = Backbone.View.extend({
  el: "#unscheduled-campaigns",

  // Set the initialize function that is called when a new instance is created.
  initialize: function () {
    console.log(this.collection);
    // Bind the reset listener to the view, so when the collection is updated the view is re-renderd
    this.listenTo(this.collection, 'reset', this.render);

    // Call addOne when something is added to collection.
    this.listenTo(this.collection, 'add', this.addOne);

    // Adds all of the models in this collection to the view when called.
    this.listenTo(this.collection, 'addAll', this.addAll);

    this.listenTo(this.collection, 'change', this.render);
  },

  render: function(){
    $(this.el).empty();
    this.addAll();
  },

  addAll: function() {
    this.collection.each(this.addOne);
  },

  addOne: function(model) {
    if (parseInt(model.get("date")) === 0) {
      var view = new CampaignView({model : model});
      $("#unscheduled-campaigns").append(view.render());
    }
  },
});

export default UnscheduledView;
