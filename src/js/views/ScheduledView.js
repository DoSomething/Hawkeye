/*
 * Main App View. Creates the main container for the app, adds the campaigns to it.
 */
import $ from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';
import ScheduledCollection from '../collections/ScheduledCollection';
import ScheduledTemplate from '../templates/ScheduledTemplate.html';
import CampaignView from '../views/CampaignView';

// Create the view.
var ScheduledView = Backbone.View.extend({
  el: "#schedule",

  // Set the template.
  template: ScheduledTemplate,

  // Set the initialize function that is called when a new instance is created.
  initialize: function () {
    // Bind the reset listener to the view, so when the collection is updated the view is re-renderd
    this.listenTo(this.collection, 'reset', this.render);
    this.listenTo(this.collection, 'change', this.render);

    // Call addOne when something is added to collection.
    // this.listenTo(this.collection, 'add', this.addOne);

    // Adds all of the models in this collection to the view when called.
    // this.listenTo(this.collection, 'addAll', this.addAll);
  },

  render: function(){
    console.log("ScheduledView render");
    $(this.el).html(this.template());
    this.addAll();
  },

  addAll: function() {
    console.log("ScheduledView addAll");
    this.collection.each(this.addOne);
  },

  addOne: function(model) {
    var view = new CampaignView({model : model});
    var date = parseInt(model.get("date"));

    if (date === 1) {
      $("#january").append(view.render());
    }
    if (date === 2) {
      $("#february").append(view.render());
    }
    if (date === 3) {
      $("#march").append(view.render());
    }
    if (date === 4) {
      $("#april").append(view.render());
    }
    if (date === 5) {
      $("#may").append(view.render());
    }
    if (date === 6) {
      $("#june").append(view.render());
    }
    if (date === 7) {
      $("#july").append(view.render());
    }
    if (date === 8) {
      $("#august").append(view.render());
    }
    if (date === 9) {
      $("#september").append(view.render());
    }
    if (date === 10) {
      $("#october").append(view.render());
    }
    if (date === 11) {
      $("#november").append(view.render());
    }
    if (date === 12) {
      $("#december").append(view.render());
    }

  }
});

export default ScheduledView;
