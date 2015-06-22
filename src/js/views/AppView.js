/*
 * Main App View. Creates the main container for the app, adds the campaigns to it.
 */
import $ from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';
import Campaign from '../models/CampaignModel';
import CampaignsCollection from '../collections/CampaignsCollection';
import AppTemplate from '../templates/AppTemplate.html';
import CampaignView from '../views/CampaignView';
import UnscheduledView from '../views/UnscheduledView';
import ScheduledView from '../views/ScheduledView';

// Create the view.
var AppView = Backbone.View.extend({
  // Attach this view to the main app container
  el: "#main",

  // Set the template.
  template: AppTemplate,

  // Set the initialize function that is called when a new instance is created.
  initialize: function () {
    // Get all of the campaigns
    this.collection = new CampaignsCollection();
    this.collection.fetch({ reset : true });

    // Bind the reset listener to the view, so when the collection is updated the view is re-renderd
    this.listenTo(this.collection, 'reset', this.render);
    // this.listenTo(this.collection, 'change', this.delegateEvents);

    this.on("change:filterType", this.filterByType, this);
  },

  render: function() {
    // @TODO - DRY this up.
    // Try to move this to the unscheduled view and have this render function just initialize the unscheduled and scheduled views.

    // Get all of the unscheduled campaigns and create a view with them.
    // var unscheduled = this.collection.where({ date : 0 });
    // this.unscheduledCollection = new Backbone.Collection(unscheduled);
    var unscheduledView = new UnscheduledView({collection : this.collection});
    unscheduledView.render();

    // @TODO - move this into Unscheduled view
    this.$el.find("#filter").append(this.createFilter("primary_cause"));
    this.$el.find("#filter").append(this.createFilter("hours"));
    this.$el.find("#filter").append(this.createFilter("action_type"));
    this.$el.find("#filter").append(this.createFilter("staff_pick"));

    $(this.el).append(this.template());


    // Get all of the Scheduled campaigns and create a view with them.
    // var scheduled = this.collection.filter(function (campaign) {
    //   var date = campaign.get("date");
    //   return date !== 0;
    // });
    // this.scheduledCollection = new Backbone.Collection(scheduled);
    var scheduledView = new ScheduledView({collection : this.collection});
    scheduledView.render();

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
    "change #filter select": "setFilter",
    "change input#title": "searchTitle",
    "change .card select": "scheduleCampaign",
  },

  scheduleCampaign: function(e) {
    var currentTarget = e.currentTarget;
    var campaignElement = $(currentTarget).closest(".card");
    var id = campaignElement.attr("id");
    var date = currentTarget.value;

    var campaignModel = this.collection.get(id);
    campaignModel.set({ date: date });
  },

  searchTitle: function(e) {
    var letters = e.currentTarget.value;
    var filtered = this.collection.searchByTitle(letters);
    var filteredView = new UnscheduledView({collection : filtered});
    filteredView.render();
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
