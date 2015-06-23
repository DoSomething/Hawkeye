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
  el: "body",

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

    this.on("change:filterUnscheduled", this.filterUnscheduled, this);
    this.on("change:filterScheduled", this.filterScheduled, this);
  },

  render: function() {
    // @TODO - DRY this up.
    var unscheduledView = new UnscheduledView({collection : this.collection});
    unscheduledView.render();

    // @TODO - move this into Unscheduled view
    this.$el.find("#filters").append(this.createFilter("primary_cause"));
    this.$el.find("#filters").append(this.createFilter("hours"));
    this.$el.find("#filters").append(this.createFilter("action_type"));
    this.$el.find("#filters").append(this.createFilter("staff_pick"));


    this.$el.find("#filters-schedule").append(this.createFilter("primary_cause"));
    this.$el.find("#filters-schedule").append(this.createFilter("hours"));
    this.$el.find("#filters-schedule").append(this.createFilter("action_type"));
    this.$el.find("#filters-schedule").append(this.createFilter("staff_pick"));

    $(this.el).append(this.template());

    var scheduledView = new ScheduledView({collection : this.collection});
    scheduledView.render();

  },

  // Get the unique values for every campaign property.
  getUniqueValues: function(prop) {
    return _.uniq(this.collection.pluck(prop), false);
  },

  createFilter: function(type) {
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
    "change #filters select": "setFilter",
    "change #filters-schedule select": "setScheduleFilter",
    "change #filters input": "searchUnscheduledTitle",
    "change #filters-schedule input": "searchScheduledTitle",
    "change .card select": "scheduleCampaign",
    "click .button" : "saveSchedule",
  },

  saveSchedule: function() {
    var scheduled = this.collection.filter(function (campaign) {
      var date = campaign.get("date");
      return date !== 0;
    });

    _.each(scheduled, function (item) {
      var id = item.get("id");
      var date = item.get("date");
      item.save({ id: id, date: parseInt(date) }, {
        success: function(model, res) {
          console.log("success");
          console.log(res);
        },
        error: function() {
          console.log("error");
        }
      });
    });
  },

  scheduleCampaign: function(e) {
    var currentTarget = e.currentTarget;
    var campaignElement = $(currentTarget).closest(".card");
    var id = campaignElement.attr("id");
    var date = currentTarget.value;

    var campaignModel = this.collection.get(id);
    campaignModel.set({ date: date });
  },

  searchUnscheduledTitle: function(e) {
    console.log("searchTitle");
    var letters = e.currentTarget.value;
    var filtered = this.collection.searchByTitle(letters);
    var filteredView = new UnscheduledView({collection : filtered});
    filteredView.render();
  },

  searchScheduledTitle: function(e) {
    console.log("searchTitle");
    var letters = e.currentTarget.value;
    var filtered = this.collection.searchByTitle(letters);
    var filteredView = new ScheduledView({collection : filtered});
    filteredView.render();
  },

  setFilter: function (e) {
    console.log("setFilter");
    var filters = $("#filters select");
    var filterBy = {};

    $.each(filters, function(key, filter) {
      var id = $(filter).attr("id");
      var value = $("#filters #" + id).val();
      console.log(value);
      if (value !== "All") {
        filterBy[id] = (id === "hours") ? parseInt(value) : value;
      }
    });

    this.filterType = $.extend(this.filterType, filterBy);
    this.trigger("change:filterUnscheduled");
  },

  setScheduleFilter: function(e) {
    console.log("setScheduleFilter");
    var filters = $("#filters-schedule select");
    var filterBy = {};

    $.each(filters, function(key, filter) {
      var id = $(filter).attr("id");
      var value = $("#filters-schedule #" + id).val();
      console.log(value);
      if (value !== "All") {
        filterBy[id] = (id === "hours") ? parseInt(value) : value;
      }
    });

    this.filterType = $.extend(this.filterType, filterBy);
    this.trigger("change:filterScheduled");
  },

  filterUnscheduled: function () {
    console.log(this.filterType);
    var filtered = this.collection.where(this.filterType);

    var filteredCollection = new Backbone.Collection(filtered);

    var filteredView = new UnscheduledView({collection : filteredCollection});
    filteredView.render();

    // Reset filter object;
    this.filterType = {};
  },

  filterScheduled: function () {
    console.log(this.filterType);
    var filtered = this.collection.where(this.filterType);

    var filteredCollection = new Backbone.Collection(filtered);

    var filteredView = new ScheduledView({collection : filteredCollection});
    filteredView.render();

    // Reset filter object;
    this.filterType = {};
  }
});

export default AppView;
