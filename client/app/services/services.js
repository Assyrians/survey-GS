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

  var signinUser = function (user) {
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
	
	var getAllQuestions = function () {
		return $http({
			method: 'GET',
			url: '/api/questions'
		})
		.then(function (res){
			return res.data;
		});
	};

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
