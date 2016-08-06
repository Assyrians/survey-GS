angular.module('GreenSaloon.singleReportView', [])

.controller('singleReportViewController', function ($scope, $window, $location, $routeParams, Reports, Question, DateFormat) {
 	
 	$scope.report = {};

 	$scope.convertDateFormat = DateFormat.convertDateFormat;

 	$scope.getDateDay = DateFormat.getDateDay;

 	$scope.getDateTime = DateFormat.getDateTime;

 	$scope.initialize = function(){
 		Reports.getOne($routeParams.id)
 		.then(function(report){
 			var numOfTrueAnswers = 0;
 			var questionsArray = [];
			for(var i=0; i<report.answer.length; i++){
				if(report.answer[i].answer === 'true'){
					numOfTrueAnswers++;
				}
				questionsArray.push(report.answer[i].question);
			}
			
			report.numOfYes = numOfTrueAnswers;
			report.numOfNo = report.answer.length - numOfTrueAnswers;
			report.mark = (report.numOfYes/report.answer.length) * 100;

 			$scope.report = report;

 			// getting the questions body
 			Question.getSetOfQuestion(questionsArray)
 			.then(function(questions){
 				var counter = 1;
 				for(var i=0; i<report.answer.length; i++){
 					for(var j=0; j<questions.length; j++){
 						if(report.answer[i].question === questions[j]._id){
 							report.answer[i].questionBody = questions[j].text;
 							report.answer[i].questionNum = counter++;
 							break;
 						}
 					}
 				}
 			})
 			.catch(function(error){
 				console.log(error);
 			});
 		})
 		.catch(function(error){
 			console.log(error);
 		})
 	};

 	$scope.initialize();
});