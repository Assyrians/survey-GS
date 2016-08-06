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
	var set = function (array) {
		return $http({
			method: 'POST',
			url: '/api/reports',
			data: array
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
		set: set,
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

	var getSetOfQuestion = function (arrayOfObjectIds) {
		return $http({
			method: 'POST',
			url: '/api/questions',
			data: arrayOfObjectIds
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
		return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
	};

	var getDateTime = function(date){
		var date = new Date(date);
		var hours = date.getHours();
		var minutes = date.getMinutes();
		return hours+':'+minutes;
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
});
