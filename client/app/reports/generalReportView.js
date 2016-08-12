angular.module('GreenSaloon.generalReportView', [])

.controller('generalReportViewController', function ($scope, $window, $location, GeneralReport, $routeParams){

	$scope.report = {};

	$scope.initialize = function(){
		GeneralReport.getOne($routeParams.id)
		.then(function (generalReport) {
			$scope.report=generalReport;
		})
		.catch(function (err) {
			console.log(err);
		})
		//$scope.report = JSON.parse($window.localStorage.getItem('GeneralReport'));//window.generalReport;

	};

	/*
 	// to be implemented if we want to make the email flexible
 	$scope.email = 'housam993@gmail.com'
 	$scope.enterEmail = function (ev) {
 		Dialogs.showDialog($scope,$mdDialog,$mdMedia,
		    'singleReportViewController','app/reports/emailTemplate.html',ev,
		    {},function(answer){
		      if(answer){
		      	$scope.email = answer;
		      }
		    },function(){
		      console.log('You cancelled the dialog.');
		    });
 	}
 	*/

 	$scope.sendEmail = function(){
	  	var reportUrl = $location.path();
	  	// if we make the email flexible we have to pass another
	  	// attribute to the sendEmail function, to be like
	  	// Email.sendEmail({ email: $scope.email, reportUrl: reportUrl})
 		Email.sendEmail({
 			reportUrl: reportUrl
 		})
 		.then(function(resp){
 			console.log(resp);
 		})
 		.catch(function(error){
 			console.log(error);
 		});
 	};

 	$scope.print = function(){
 		window.print();
 	};

	$scope.initialize();
});