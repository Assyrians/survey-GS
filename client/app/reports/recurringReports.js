angular.module('GreenSaloon.recurringReports', [])

.controller('RecurringReportsController', function ($scope, $window, $location) {
 	
 	$scope.datepickerStart = new Date();
 	$scope.datepickerEnd = new Date();
	
	$scope.test = function(){
		console.log($scope.datepickerStart);
		console.log($scope.datepickerEnd);	
	}

});
