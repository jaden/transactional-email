// var services = require('./services');

var app = angular.module('TransactEmailApp', ['TransactEmail.Services']);

// TODO Create a page (using routing) per service with more info and all pricing
// 	ask people to email me if the prices change
// TODO Add unit tests
// TODO Use webpack

app.controller('MainController', ['$scope', 'ServiceList', function($scope, ServiceList) {

	$scope.config = {
		emails_a_month: 10000,
		predicate: 'cost' // For sorting, cost attribute added by calculate_price()
	};

	$scope.services = ServiceList;

	window.scope = $scope;

	$scope.calculate_price = function(service) {
        
        var emails_a_month = $scope.config.emails_a_month;
        
		for (var i = 0, n = service.prices.length; i < n; i++) {
			
			var price = service.prices[i];
            
            if (service.hasOwnProperty('free')) {
                if (emails_a_month <= service.free) {
                    return service.cost = 0; // Within the free range
                } else {
                    // Reduce total monthly emails by the number of free emails
                    emails_a_month -= service.free;
                }
            }
			
            if (price.hasOwnProperty('price_per_email') && emails_a_month <= price.emails_a_month) {
			
				service.cost = emails_a_month * price.price_per_email;
				break;
			}
			else if (price.hasOwnProperty('price_per_month') && emails_a_month <= price.emails_a_month) {
			
				service.cost = price.price_per_month;
				break;
			}
		}

		// Add cost to services object for sorting
		return service.cost;
	};
}]);

// module.exports = app;