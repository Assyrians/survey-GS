angular.module('GreenSaloon.recurringReports', [])

.controller('RecurringReportsController', function ($scope, $window, $location, Reports) {
 	
 	$scope.datepickerStart = new Date();
 	
 	$scope.datepickerEnd = new Date();
	
	$scope.data = {};

	// a function that returns true if the first date is 
	// older than the other, and returns false otherwise
	$scope.compareDates = function(olderDate, newerDate){
		olderDate = new Date(olderDate);
		newerDate = new Date(newerDate);

		if(olderDate.getFullYear() > newerDate.getFullYear()){
			return false;
		}
		if(olderDate.getMonth() > newerDate.getMonth()){
			return false;
		}
		if(olderDate.getDay() > newerDate.getDay()){
			return false;
		}
		return true;
	};

	$scope.convertDateFormat = function(date){
		var date = new Date(date);
		return date.getDay() + '/' + date.getMonth() + '/' + date.getFullYear();
	};

	$scope.getReports = function(){
		Reports.getAll()
		.then(function(result){
			console.log(result);
			$scope.data.reports = result;
		})
		.catch(function(error){
			console.log(error);
		});
	};

});
