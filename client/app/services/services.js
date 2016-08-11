angular.module('GreenSaloon.services', [])

.factory('Forms', function ($http) {

	// a fuction for getting all forms
	var getAll = function () {
		return $http({
			method: 'GET',
			url: '/api/forms'
		})
		.then(function (res) {
			return res.data;
		});
	};

	// a function for getting one form depending on the id
	var getOne = function (id) {
		return $http({
			method: 'GET',
			url: '/api/forms/form/'+id
		})
		.then(function(res){
			return res.data;
		});
	};

	// a function for setting forms
	var set = function (array) {
		return $http({
			method: 'POST',
			url: '/api/forms',
			data: array
		})
		.then(function(res){
			return res;
		});
	};

	return {
		getAll: getAll,
		getOne: getOne,
		set: set
	};
})
.factory('Reports', function ($http) {

	// a fuction for getting all reports
	var getAll = function () {
		return $http({
			method: 'GET',
			url: '/api/reports'
		})
		.then(function (res) {
			return res.data;
		});
	};

	// a function for getting one report depending on the id
	var getOne = function (id) {
		return $http({
			method: 'GET',
			url: '/api/reports/report/'+id
		})
		.then(function(res){
			return res.data;
		});
	};

	// a function for setting reports
	var getSet = function (array) {
		return $http({
			method: 'POST',
			url: '/api/reports',
			data: {
				arrayOfObjectIds: array
			}
		})
		.then(function(res){
			return res;
		});
	};

	// a function for creating new report
	var addOne = function (report) {
		return $http({
			method: 'POST',
			url: '/api/reports/create',
			data: report
		})
		.then(function(res){
			return res;
		});
	};

	// a fuction for getting all reports by branch id
	var getAllByBranch = function (id) {
		return $http({
			method: 'GET',
			url: '/api/reports/branch/'+id
		})
		.then(function (res) {
			return res.data;
		});
	};

	return {
		getAll: getAll,
		getOne: getOne,
		getSet: getSet,
		addOne: addOne,
		getAllByBranch: getAllByBranch
	};
})
.factory('Auth', function ($http, $location, $window) {

  var signin = function (user) {
    return $http({
      method: 'POST',
      url: '/api/users/signin',
      data: user
    })
    .then(function (resp) {
      return resp.data.token;
    });
  };

  var isAuth = function () {
    return !!$window.localStorage.getItem('com.GS');
  };

  var signout = function () {
    $window.localStorage.removeItem('com.GS');
    $location.path('/signin');
  };

  return {
    signin: signin,
    signout: signout,
    isAuth: isAuth
	};
})
.factory('User', function ($http) {

	// a function for getting one user depending on the id
	var getOne = function (userID) {
		return $http({
			method: 'GET',
			url: '/api/users/user/'+ userID
		})
		.then(function (res){
			return res.data;
		});
	}

	return {
		getOne: getOne
	};
})

.factory('Question', function ($http) {

	// a fuction for getting all questions
	var getAllQuestions = function () {
		return $http({
			method: 'GET',
			url: '/api/questions'
		})
		.then(function (res){
			return res.data;
		});
	};

	// a function for getting one question depending on the id
	var getOneQuestion = function (id) {
		return $http({
			method: 'GET',
			url: '/api/questions/question/' + id 
		})
		.then(function (res) {
			return res.data;
		})
	};

	var getSetOfQuestion = function (array) {
		return $http({
			method: 'POST',
			url: '/api/questions',
			data: {
				arrayOfObjectIds: array
			}
		})
		.then(function (res) {
			return res.data;
		})
	}

	return {
		getAllQuestions: getAllQuestions,
		getOneQuestion: getOneQuestion,
		getSetOfQuestion: getSetOfQuestion
	}
})
.factory('Branch', function ($http) {
	
	// a fuction for getting all branches
	var getAllBranches = function () {
		return $http({
			method: 'GET',
			url: '/api/branches'
		})
		.then(function (res) {
			return res.data;
		})
	};

	// a function for getting one branch depending on the branchID
	var getOneBranch = function (branchID) {
		return $http({
			method: 'GET',
			url: '/api/branches/branch/' + branchID
		})
		.then(function (res) {
			return res.data;
		})
	};

	return {
		getAllBranches: getAllBranches,
		getOneBranch: getOneBranch
	}
})
.factory('DateFormat', function(){
	// a function that returns true if the first date is 
	// older than the other, and returns false otherwise
	var compareDates = function(olderDate, newerDate){
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

	var convertDateFormat = function(date){
		var date = new Date(date);
		var day = date.getDate();
		var month = date.getMonth() + 1;
		var year = date.getFullYear();
		if(day < 10){
			day = '0'+ day;
		}
		if(month < 10){
			month = '0' + month;
		}
		return day + '/' + month + '/' + year;
	};

	var getDateTime = function(date){
		var date = new Date(date);
		var hours = date.getHours();
		var minutes = date.getMinutes();
		var postFix = '';
		if(hours < 12){
			postFix = ' AM';
		} else {
			hours = 24 - hours;
			postFix = ' PM';
		}
		if(hours < 10){
			hours = '0' + hours;
		}
		if(minutes < 10){
			minutes = '0' + minutes;
		}
		return hours+':'+minutes + postFix;
	};

	var getDateDay = function(date){
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

	return {
		compareDates: compareDates,
		convertDateFormat: convertDateFormat,
		getDateTime: getDateTime,
		getDateDay: getDateDay
	}
})
.factory('Email', function ($http) {

	var sendEmail = function (email) {
		return $http({
			method: 'POST',
			url: 'api/email',
			data: {
				email: 'ahmad@alayyangroupco.com',
				reportUrl: email.reportUrl
			}
		})
		.then(function (res) {
			return res.data;
		});
	};
	
	return {
		sendEmail: sendEmail
	}
})
.factory('Dialogs', function () {
  // function to show the dialogs
  var showDialog = function($scope,$mdDialog,$mdMedia,controller,htmlTemplate,event,paramsObj,successCB,failureCB){

    // variable to make the pop-up get the max size always
    // in a way to look good for the user
    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
    
    // calling $mdDialog.show to show a pop-up
    $mdDialog.show({
      controller: controller, // we pass here the handling of the pop-up to a specific controller
      templateUrl: htmlTemplate, // we pass here the html template that's gonna be displayed in the pop-up
      parent: angular.element(document.body), // we pass here the parent window so when we close the pop-up we get redirected back to the parent
      targetEvent: event,
      locals: paramsObj, // we pass here parameters if any to the controller
      clickOutsideToClose:true,
      fullscreen: useFullScreen
    })
    .then(function(answer) {
      // callback to be executed when we close the pop-up
      successCB(answer);

    }, function() {
      // callback to be executed in case of an error
      failureCB();
    });

    // keep watching the browser's size to make the pop-up responsive
    $scope.$watch(function() {
      return $mdMedia('xs') || $mdMedia('sm');
    }, function(wantsFullScreen) {
      $scope.customFullscreen = (wantsFullScreen === true);
    });

  };

  return {
    showDialog:showDialog
  };

})