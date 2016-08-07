angular.module('GreenSaloon.generalReportView', [])

.controller('generalReportViewController', function ($scope, $window, $location){

	$scope.report = {};

	$scope.initialize = function(){
		$scope.report = JSON.parse($window.localStorage.getItem('GeneralReport'));//window.generalReport;
	}

	$scope.initialize();
});