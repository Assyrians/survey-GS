angular.module('GreenSaloon.generalReportView', [])

.controller('generalReportViewController', function ($scope, $window, $location){

	$scope.report = {};

	$scope.initialize = function(){
		$scope.report = window.generalReport;
	}

	$scope.initialize();
});