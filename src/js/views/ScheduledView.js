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
    console.log("ScheduledView init");
    // Bind the reset listener to the view, so when the collection is updated the view is re-renderd
    this.listenTo(this.collection, 'reset', this.render);
    this.listenTo(this.collection, 'change', this.render);

    this.on("change:filterType", this.filterByType, this);

    // this.$el.find("#filters-schedule").html("");
    // this.$el.find("#filters-schedule").append(this.createFilter("primary_cause"));
    // this.$el.find("#filters-schedule").append(this.createFilter("hours"));
    // this.$el.find("#filters-schedule").append(this.createFilter("action_type"));
    // this.$el.find("#filters-schedule").append(this.createFilter("staff_pick"));
    // Call addOne when something is added to collection.
    // this.listenTo(this.collection, 'add', this.addOne);

    // Adds all of the models in this collection to the view when called.
    // this.listenTo(this.collection, 'addAll', this.addAll);
  },

  render: function(){

    $(this.el).find("#schedule-campaigns").html(this.template());
    this.addAll();
  },

  events: {
    // "change #filters-schedule select": "setFilter",
    // "change input#title": "searchTitle",
    // "change .card select": "scheduleCampaign",
    // "click .button" : "saveSchedule",
  },

  // Get the unique values for every campaign property.
  // getUniqueValues: function(prop) {
  //   return _.uniq(this.collection.pluck(prop), false);
  // },

  // createFilter: function(type) {
  //   var label = $("<label>", {
  //     html: type + ": "
  //   });
  //   var select = $("<select/>", {
  //     id: type,
  //     html: "<option>All</option>"
  //   });

  //   _.each(this.getUniqueValues(type), function (item) {
  //     var option = $("<option/>", {
  //       value: item,
  //       text: item
  //     }).appendTo(select);
  //   });

  //   return label.add(select);
  // },

  addAll: function() {
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
  },

  // setFilter: function (e) {
  //   console.log("setFilter");
  //   var filters = $("#filters-schedule select");
  //   var filterBy = {};

  //   $.each(filters, function(key, filter) {
  //     var id = $(filter).attr("id");
  //     var value = $("#filters-schedule #" + id).val();

  //     if (value !== "All") {
  //       filterBy[id] = (id === "hours") ? parseInt(value) : value;
  //     }
  //   });

  //   this.filterType = $.extend(this.filterType, filterBy);
  //   this.trigger("change:filterType");
  // },

  // filterByType: function () {
  //   console.log(this.filterType);
  //   var filtered = this.collection.where(this.filterType);
  //   // console.log(filtered.length);
  //   // console.log(this.collection.length);
  //   var filteredCollection = new Backbone.Collection(filtered);
  //   // console.log(filteredCollection.length);

  //   // var filteredView = new ScheduledView({collection : filteredCollection});
  //   this.render(filteredCollection);

  //   // Reset filter object;
  //   this.filterType = {};
  // }
});

export default ScheduledView;
