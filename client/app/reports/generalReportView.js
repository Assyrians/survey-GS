angular.module('GreenSaloon.generalReportView', [])

.controller('generalReportViewController', function ($scope, $window, $location){

	$scope.report = {};

	// $scope.initialize = function(){
	// 	$scope.report = $window.generalReport;
	// 	console.log($scope.report);
	// }

	// $scope.initialize();

	$scope.$on('General_Report', function(response) {
      console.log(response);
	});
});