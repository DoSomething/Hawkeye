/*
 * Main App View. Creates the main container for the app, adds the campaigns to it.
 */
import $ from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';
import Campaign from '../models/CampaignModel';
import CampaignsCollection from '../collections/CampaignsCollection';
import CampaignView from '../views/CampaignView';
import UnscheduledView from '../views/UnscheduledView';
import ScheduledView from '../views/ScheduledView';

// Create the view.
var AppView = Backbone.View.extend({
  // Attach this view to the main app container
  el: "body",

  // Set the initialize function that is called when a new instance is created.
  initialize: function () {
    // Get all of the campaigns
    this.collection = new CampaignsCollection();
    this.collection.fetch({ reset : true });

    // Bind the reset listener to the view, so when the collection is updated the view is re-renderd
    this.listenTo(this.collection, 'reset', this.render);

    this.on("change:filter", this.filter, this);
  },

  render: function() {
    // Render views
    var unscheduledView = new UnscheduledView({collection : this.collection});
    unscheduledView.render();

    var scheduledView = new ScheduledView({collection : this.collection});
    scheduledView.render();

    // Render filters
    this.renderFilters(this.$el.find("#schedule .filters"));
    this.renderFilters(this.$el.find("#unscheduled .filters"));
  },

  events: {
    "change .filters select": "setFilter",
    "change .filters input": "searchTitle",
    "change .card select": "scheduleCampaign",
    "click .button" : "saveSchedule",
  },

  // Get the unique values for every campaign property.
  getUniqueValues: function(prop) {
    return _.uniq(this.collection.pluck(prop), false);
  },

  // Creates a select filter for a given campaign property.
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

  renderFilters: function($el) {
    $el.append(this.createFilter("primary_cause"));
    $el.append(this.createFilter("hours"));
    $el.append(this.createFilter("action_type"));
    $el.append(this.createFilter("staff_pick"));
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

  searchTitle: function(e) {
    var type = $(e.currentTarget).closest('section').attr('id');
    var letters = e.currentTarget.value;
    var filtered = this.collection.searchByTitle(letters);
    var filteredView;

    if (type === "unscheduled") {
      filteredView = new UnscheduledView({collection : filtered});
    }
    else {
      filteredView = new ScheduledView({collection : filtered});
    }

    filteredView.render();
  },

  setFilter: function (e) {
    var $section = $(e.currentTarget).closest('section');
    var $filters = $section.find(".filters select");
    var filterBy = {};

    $.each($filters, function(key, filter) {
      var id = $(filter).attr("id");
      var value = $(filter).val();

      if (value !== "All") {
        filterBy[id] = (id === "hours") ? parseInt(value) : value;
      }
    });

    this.filterType = $.extend(this.filterType, filterBy);

    // Trigger filtering, pass in the view that we need to filter.
    this.trigger("change:filter", $section.attr('id'));
  },

  filter: function(type) {
    var filtered = this.collection.where(this.filterType);
    var filteredCollection = new Backbone.Collection(filtered);
    var filteredView;

    if (type === "unscheduled") {
      filteredView = new UnscheduledView({collection : filteredCollection});
    }
    else {
      filteredView = new ScheduledView({collection : filteredCollection});
    }

    filteredView.render();

    // Reset filter object;
    this.filterType = {};
  },
});

export default AppView;
