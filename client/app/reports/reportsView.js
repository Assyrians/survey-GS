angular.module('GreenSaloon.reportsView', [])

.controller('reportsViewController', function ($scope, $window, $location, $routeParams,
	Reports, Question, Branch, Forms, DateFormat) {
 	
	var formType = 'Daily';
	if($routeParams.RecId){
		formType = 'Recurring';
	}

	var formObject, generalReport;

	window.generalReport = {};

	$window.localStorage.removeItem('GeneralReport');

 	$scope.reportDateClicked = false;

 	$scope.datepickerStart = new Date();
 	
 	$scope.datepickerEnd = new Date();

 	$scope.convertDateFormat = DateFormat.convertDateFormat;
	
	$scope.data = {};

	$scope.intialize = function(){
		Branch.getAllBranches()
		.then(function(branches){
			$scope.data.branches = branches;
		})
		.catch(function(error){
			console.log(error);
		});
	};

	$scope.getReports = function(branchId){
		if($scope.branchList){
			branchId = $scope.branchList;
		}
		Forms.getAll()
		.then(function(forms){
			var getFunc;
			// getting the id of the recurring form
			for(var i=0; i<forms.length; i++){
				if(forms[i].type === formType){
					formObject = forms[i];
					break;
				}
			}
			if(branchId){
				getFunc	= Reports.getAllByBranch.bind(this,branchId);
			} else {
				getFunc = Reports.getAll;
			}
			getFunc()
			.then(function(reports){
				$scope.data.reports = [];
				var highestMark = 0, lowestMark = 100, sumOfMarks = 0, Queryflag = false;
				// getting reports that match the query only
				for(var i=0; i<reports.length; i++){
					if(reports[i].form === formObject._id 
						&& DateFormat.compareDates($scope.datepickerStart,reports[i].date)
						&& DateFormat.compareDates(reports[i].date,$scope.datepickerEnd)
					){
						Queryflag = true;
						// getting each report mark
						var numOfTrueAnswers = 0;
						for(var j=0; j<reports[i].answer.length; j++){
							if(reports[i].answer[j].answer === 'true'){
								numOfTrueAnswers++;
							}
						}
						reports[i].numOfYes = numOfTrueAnswers;
						reports[i].numOfNo = reports[i].answer.length - numOfTrueAnswers;
						reports[i].mark = (reports[i].numOfYes/reports[i].answer.length) * 100;
						sumOfMarks += reports[i].mark;
						if(reports[i].mark > highestMark){
							highestMark	= reports[i].mark;
						}
						if(reports[i].mark < lowestMark){
							lowestMark = reports[i].mark;
						}
						$scope.data.reports.push(reports[i]);
					}
				}
				$scope.monthlyVisits = Queryflag ? $scope.data.reports.length : '-';
				$scope.avgMark = Queryflag ? sumOfMarks/$scope.monthlyVisits : '-';
				$scope.bestMark = Queryflag ? highestMark : '-';
				$scope.worstMark = Queryflag ? lowestMark : '-';

				$scope.generateGeneralReport();
			})
			.catch(function(error){
				console.log(error);
			})
		})
		.catch(function(error){
			console.log(error);
		});
	};

	$scope.generateGeneralReport = function(){
		Question.getSetOfQuestion(formObject.questions)
		.then(function(questions){
			for(var i=0; i<questions.length; i++){
				questions[i].numOfYes = 0;
				questions[i].numOfNo = 0;
				questions[i].questionNum = i+1;
				for(var j=0; j<$scope.data.reports.length; j++){
					for(var k=0; k<$scope.data.reports[j].answer.length; k++){
						if($scope.data.reports[j].answer[k].question === questions[i]._id){
							if($scope.data.reports[j].answer[k].answer === 'true'){
								questions[i].numOfYes++;
								break;
							} else {
								questions[i].numOfNo++;
								break;
							}
						}
					}
				}
			}

			generalReport = {
				questions : questions,
				avgMark: $scope.avgMark,
				bestMark: $scope.bestMark,
				worstMark: $scope.worstMark,
				monthlyVisits: $scope.monthlyVisits
			}

			$window.localStorage.setItem('GeneralReport', JSON.stringify(generalReport));
		})
		.catch(function(error){
			console.log(error);
		});
	};

	$scope.intialize();

});
