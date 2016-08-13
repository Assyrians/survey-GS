angular.module('GreenSaloon.generalReportView', [])

.controller('generalReportViewController', function ($scope, $window, $location, GeneralReport, $routeParams, Email){

	$scope.report = {};

	$scope.initialize = function(){
		GeneralReport.getOne($routeParams.id)
		.then(function (generalReport) {
			$scope.report=generalReport;
		})
		.catch(function (err) {
			console.log(err);
		})
	};

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
 			alert("تم ارسال التقرير الى البريد الإلكتروني بنجاح")
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