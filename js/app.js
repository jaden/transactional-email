// var services = require('./services');

var app = angular.module('TransactEmailApp', ['TransactEmail.Services']);

// TODO Create a page (using routing) per service with more info and all pricing
// 	ask people to email me if the prices change
// TODO Add unit tests
// TODO Use webpack

app.controller('MainController', ['$scope', 'ServiceList', function ($scope, ServiceList) {

  $scope.config = {
    emails_a_month: 10000,
    predicate: 'cost' // For sorting, cost attribute added by calculate_price()
  };

  $scope.services = ServiceList;

  window.scope = $scope;

  $scope.calculate_price = function (service) {

    console.log(service.name);

    var emails_a_month = $scope.config.emails_a_month;

    service.cost = 0; // Initialize cost.

    for (var i = 0, n = service.prices.length; i < n; i++) {

      var price = service.prices[i];

      if (service.hasOwnProperty('free')) {
        if (emails_a_month <= service.free) {
          service.cost = 0; // Within the free range
          return service.cost;
        } else {
          // Reduce total monthly emails by the number of free emails
          emails_a_month -= service.free;
        }
      }

      if (service.hasOwnProperty('base_plan')) {
        if (emails_a_month <= service.base_plan.emails) {
          service.cost = service.base_plan.price; // Within base plan
          return service.cost;
        } else {
          emails_a_month -= service.base_plan.emails; // Subtract base plan emails.
          service.cost += service.base_plan.price; // Start with base plan price
        }
      }

      if (price.hasOwnProperty('price_per_email') && emails_a_month <= price.emails_a_month) {

        service.cost += emails_a_month * price.price_per_email;
        break;
      }
      else if (price.hasOwnProperty('price_per_month') && emails_a_month <= price.emails_a_month) {

        service.cost += price.price_per_month;
        break;
      }
      else if (price.hasOwnProperty('price_per_block') && emails_a_month <= price.emails_a_month) {
        service.cost += price.price_per_block * Math.ceil(emails_a_month / service.emails_per_block);
        console.log(service.cost);
      }
    }

    // Add cost to services object for sorting
    return service.cost;
  };
}]);

// module.exports = app;