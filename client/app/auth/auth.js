angular.module('GreenSaloon.auth', [])

.controller('AuthController', function ($scope, $window, $location) {

	$scope.user = {};

	$scope.signIn = function(){
		console.log($scope.user.username);
		console.log($scope.user.password);
	};
	
});
