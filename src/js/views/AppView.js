/*
 * Main App View. Creates the main container for the app, adds the campaigns to it.
 */
import $ from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';
import UnscheduledCollection from '../collections/UnscheduledCollection';
import AppTemplate from '../templates/AppTemplate.html';
import CampaignView from '../views/CampaignView';
import UnscheduledView from '../views/UnscheduledView';

// Create the view.
var AppView = Backbone.View.extend({
  // Attach this view to the main app container
  el: "#main",

  // Set the template.
  template: AppTemplate,

  // Set the initialize function that is called when a new instance is created.
  initialize: function () {
    this.collection = new UnscheduledCollection();
    this.collection.fetch({reset:true});

    var filteredView = new UnscheduledView({collection : this.collection});

    // Bind the reset listener to the view, so when the collection is updated the view is re-renderd
    this.listenTo(this.collection, 'reset', this.render);

    this.on("change:filterType", this.filterByType, this);
  },

  render: function(){
    this.$el.find("#filter").append(this.createFilter("primary_cause"));
    this.$el.find("#filter").append(this.createFilter("hours"));
    this.$el.find("#filter").append(this.createFilter("action_type"));
    this.$el.find("#filter").append(this.createFilter("staff_pick"));

    $(this.el).append(this.template());
  },

  // Get the unique values for every campaign property.
  getUniqueValues: function(prop) {
    return _.uniq(this.collection.pluck(prop), false);
  },

  createFilter: function(type) {
    var filter = $("#main").find("#filter");
    var label = $("<label>", {
      html: type + ": "
    });
    var select = $("<select/>", {
      id: type,
      html: "<option>All</option>"
    });

    _.each(this.getUniqueValues(type), function (item) {
      var option = $("<option/>", {
        value: item,
        text: item
      }).appendTo(select);
    });

    return label.add(select);
  },

  events: {
    "change #filter select": "setFilter"
  },

  setFilter: function (e) {
    var filters = $("#filter select");
    var filterBy = {};

    $.each(filters, function(key, filter) {
      var id = $(filter).attr("id");
      var value = $("#" + id).val();

      if (value !== "All") {
        filterBy[id] = (id === "hours") ? parseInt(value) : value;
      }
    });

    this.filterType = $.extend(this.filterType, filterBy);
    this.trigger("change:filterType");
  },

  filterByType: function () {
    var filtered = this.collection.where(this.filterType);

    var filteredCollection = new Backbone.Collection(filtered);

    var filteredView = new UnscheduledView({collection : filteredCollection});
    filteredView.render();

    // Reset filter object;
    this.filterType = {};
  }
});

export default AppView;
