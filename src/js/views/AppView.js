/*
 * Main App View. Creates the main container for the app, adds the campaigns to it.
 */
import $ from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';
import CampaignCollection from '../collections/CampaignsCollection';
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
    this.collection = new CampaignCollection();
    this.collection.fetch({reset:true});

    var filteredView = new UnscheduledView({collection : this.collection});

    // Bind the reset listener to the view, so when the collection is updated the view is re-renderd
    this.listenTo(this.collection, 'reset', this.render);

    this.on("change:filterType", this.filterByType, this);
  },

  render: function(){
    this.$el.find("#filter").append(this.createSelect());

    $(this.el).append(this.template());
  },

  getTypes: function () {
    return _.uniq(this.collection.pluck("primary_cause"), false, function (type) {
      return type.toLowerCase();
    });
  },

  createSelect: function () {
    var filter = $("body").find("#filter"),
      select = $("<select/>", {
        html: "<option>All</option>"
      });

    _.each(this.getTypes(), function (item) {
      var option = $("<option/>", {
        value: item.toLowerCase(),
        text: item.toLowerCase()
      }).appendTo(select);
    });

    return select;
  },

  events: {
    "change #filter select": "setFilter"
  },

  setFilter: function (e) {
    this.filterType = e.currentTarget.value;
    this.trigger("change:filterType");
  },

  filterByType: function () {
    if (this.filterType === "All") {
      // @TODO - DRY
      this.collection = new CampaignCollection();
      this.collection.fetch({reset:true});

      var filteredView = new UnscheduledView({collection : this.collection})
    }
    else {
      var filtered = this.collection.where({primary_cause : this.filterType});

      var filteredCollection = this.collection.customFilter({
        primary_cause : this.filterType
      });

      var filteredView = new UnscheduledView({collection : filteredCollection});
      filteredView.render();
    }
  }
});

export default AppView;
