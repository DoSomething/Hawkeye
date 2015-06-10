import $ from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';

// Models
import CampaignModel from './models/Campaign';

// Collections
import CampaignCollection from './collections/Campaigns';

// Views
// import CampaignView from './views/Campaign';
import CampaignsView from './views/Campaigns';

$(document).ready(function() {
  var CampaignObj = {};
  // var campaignsView = new CampaignsView();
  new CampaignsView();

  // var campaignsTemplate = _.template($("#tmplt-Movies").html());
  // var CampaignsView = Backbone.View.extend({
  //     el: $("#mainContainer"),
  //     template: campaignsTemplate,
  //     initialize: function () {
  //         this.listenTo(this.collection, 'reset', this.render);
  //         this.listenTo(this.collection, 'add', this.addOne);
  //         this.listenTo(this.collection, 'addAll', this.addAll);
  //     },

  //     render: function(){
  //       console.log("render");
  //       console.log(this.collection.length);
  //       $(this.el).html(this.template());
  //       this.addAll();
  //     },

  //     addAll: function() {
  //       console.log("addAll");
  //       this.collection.each(this.addOne);
  //     },

  //     addOne: function(model) {
  //       console.log("addOne");
  //       console.log(model);
  //       var view = new CampaignView({ model: model });
  //       $("ul").append(view.render());
  //     }
  // })

  // var campaignTemplate = _.template($("#tmplt-Movie").html());
  // var CampaignView = Backbone.View.extend({
  //     tagName: "li",
  //     template: campaignTemplate,
  //     initialize: function () {
  //       this.listenTo(this.collection, 'render', this.render);
  //     },
  //     render: function () {
  //         return $(this.el).append(this.template(this.model.toJSON())) ;
  //     }
  // })

  var Router = Backbone.Router.extend({
      routes: {
          "": "defaultRoute"
      },

      defaultRoute: function () {
          console.log("defaultRoute");
          CampaignObj.collection = new CampaignCollection();
          new CampaignsView({ collection: CampaignObj.collection });
          CampaignObj.collection.fetch({reset:true});
          console.log("right after fetch: " + CampaignObj.collection.length);
      }
  });

  var appRouter = new Router();
  Backbone.history.start();
});
