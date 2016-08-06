angular.module('GreenSaloon.reportsView', [])

.controller('reportsViewController', function ($scope, $window, $location, Reports, Branch, Forms) {
 	
 	$scope.reportDateClicked = false;

 	$scope.datepickerStart = new Date();
 	
 	$scope.datepickerEnd = new Date();
	
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

	// a function that returns true if the first date is 
	// older than the other, and returns false otherwise
	$scope.compareDates = function(olderDate, newerDate){
		olderDate = new Date(olderDate);
		newerDate = new Date(newerDate);

		if(olderDate.getFullYear() > newerDate.getFullYear()){
			return false;
		}
		if(olderDate.getMonth() > newerDate.getMonth()){
			return false;
		}
		if(olderDate.getDate() > newerDate.getDate()){
			return false;
		}
		return true;
	};

	$scope.convertDateFormat = function(date){
		var date = new Date(date);
		return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
	};

	$scope.getDateTime = function(date){
		var date = new Date(date);
		var hours = date.getHours();
		var minutes = date.getMinutes();
		return hours+':'+minutes;
	};

	$scope.getDateDay = function(date){
		var date = new Date(date);
		var day = date.getDay();
		switch(day){
			case 0:
				return 'الأحد';
			case 1:
				return 'الاثنين';
			case 2:
				return 'الثلاثاء';
			case 3:
				return 'الأربعاء';
			case 4:
				return 'الخميس';
			case 5:
				return 'الجمعة';
			case 6:
				return 'السبت';
		};
	};

	$scope.getReports = function(branchId){
		if($scope.branchList){
			branchId = $scope.branchList;
		}
		Forms.getAll()
		.then(function(forms){
			var getFunc, formObject;
			// getting the id of the recurring form
			for(var i=0; i<forms.length; i++){
				if(forms[i].type === 'Daily'){
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
						&& $scope.compareDates($scope.datepickerStart,reports[i].date)
						&& $scope.compareDates(reports[i].date,$scope.datepickerEnd)
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
			})
			.catch(function(error){
				console.log(error);
			})
		})
		.catch(function(error){
			console.log(error);
		});
	};

	$scope.showDetails = function(report){
		$scope.reportDateClicked = !$scope.reportDateClicked;
		$scope.data.detailedReport = report;
	};

	$scope.navigateToPage = function(report){
		console.log(report);
	};

	$scope.intialize();

});
