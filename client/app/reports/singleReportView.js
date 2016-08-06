angular.module('GreenSaloon.singleReportView', [])

.controller('singleReportViewController', function ($scope, $window, $location, $routeParams, Reports, DateFormat) {
 	
 	$scope.report = {};

 	$scope.convertDateFormat = DateFormat.convertDateFormat;

 	$scope.getDateDay = DateFormat.getDateDay;

 	$scope.getDateTime = DateFormat.getDateTime;

 	$scope.initialize = function(){
 		Reports.getOne($routeParams.id)
 		.then(function(report){
 			var numOfTrueAnswers = 0;
			for(var i=0; i<report.answer.length; i++){
				if(report.answer[i].answer === 'true'){
					numOfTrueAnswers++;
				}
			}
			report.numOfYes = numOfTrueAnswers;
			report.numOfNo = report.answer.length - numOfTrueAnswers;
			report.mark = (report.numOfYes/report.answer.length) * 100;

 			$scope.report = report;
 		})
 		.catch(function(error){
 			console.log(error);
 		})
 	};

 	$scope.initialize();
});