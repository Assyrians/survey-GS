angular.module('GreenSaloon.newReport', [])

.controller('newReportController', function ($scope, $window, $location, $routeParams, 
	Reports, DateFormat, Question, Branch, Forms) {
 	
	$scope.routeParams = $routeParams;

 	var formType = 'Daily';
	if($routeParams.RecId){
		formType = 'Recurring';
	}

	var formObject = {};

	$scope.questions = {};

	$scope.branches = {};

	$scope.initialize = function(){
		Forms.getAll()
		.then(function(forms){
			for(var i=0; i<forms.length; i++){
				if(forms[i].type === formType){
					formObject = forms[i];
				}
			}
			Question.getSetOfQuestion(formObject.questions)
	 			.then(function(questions){
	 				$scope.questions = questions;
	 			})
	 			.catch(function(error){
	 				console.log(error);
	 			});
		})
		.catch(function(error){
			console.log(error);
		})

		Branch.getAllBranches()
		.then(function(branches){
			$scope.branches = branches;
		})
		.catch(function(error){
			console.log(error);
		});
	};

	$scope.getCurrentTime = function(){
		return DateFormat.getDateTime(new Date());
	};

	$scope.getCurrentDate = function(){
		return DateFormat.convertDateFormat(new Date());
	};

	$scope.getCurrentDay = function(){
		return DateFormat.getDateDay(new Date());
	};

	$scope.sendReport = function(){
		console.log($scope.branchManger);
		console.log($scope.branchCare);
	};

	$scope.initialize();
});