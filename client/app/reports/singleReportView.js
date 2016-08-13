angular.module('GreenSaloon.singleReportView', [])

.controller('singleReportViewController', function ($scope, $window, $location, $routeParams, 
	Email, Reports, Question, DateFormat, Dialogs, $mdDialog, $mdMedia) {
 	
 	$scope.report = {};

 	$scope.location = $location.path();

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
 			arert("تم ارسال التقرير")
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

