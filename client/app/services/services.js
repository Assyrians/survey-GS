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

	// a function for adding new form
	var addOne = function (form) {
		return $http({
			method: 'POST',
			url: '/api/forms',
			data: form
		})
		.then(function(res){

		});
	};

	return {
		getAll: getAll,
		getOne: getOne,
		addOne: addOne
	};
})
.factory('Auth', function ($http, $location, $window) {
  
});
