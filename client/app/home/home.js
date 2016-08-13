angular.module('GreenSaloon.home',[])

.controller('HomeController', function($scope, $window, $mdDialog, $mdMedia, Auth, User, Dialogs){
  $scope.username = $window.localStorage.getItem('com.GS');
  
  $scope.data = {};

  $scope.initialize = function(){
  	User.getAll()
  	.then(function(resp){
  		$scope.data.users = resp.data;
  	})
  	.catch(function(error){
  		console.log(error);
  	});
  };

  $scope.initialize();

  $scope.signout = function(){
    Auth.signout();
  };

  $scope.answer = function(value){
  	$mdDialog.hide(value);
  };

  $scope.cancel = function(){
  	$mdDialog.cancel();
  }

  $scope.addUser = function(ev){
		Dialogs.showDialog($scope,$mdDialog,$mdMedia,
	    'HomeController','app/home/addUser.html',ev,
	    {},function(answer){
	      if(answer){
	      	User.addOne(answer)
	      	.then(function(resp){
	      		alert('تم اضافة المستخدم بنجاح');
	      	})
	      	.catch(function(error){
	      		alert('حدث خطأ اثناء الاضافة, تأكد ان اسم المستخدم غير موجود');
	      	});
	      }
	    },function(){
	    });
  };

  $scope.deleteUser = function(ev){
		Dialogs.showDialog($scope,$mdDialog,$mdMedia,
	    'HomeController','app/home/deleteUser.html',ev,
	    {},function(answer){
	      if(answer){
	      	User.deleteOne(answer)
	      	.then(function(resp){
	      		alert('تم حذف المستخدم بنجاح');
	      		$scope.deleteUser(ev);
	      	})
	      	.catch(function(error){
	      		alert('حدث خطأ اثناء الاضافة, حاول مجددا');
	      		$scope.deleteUser(ev);
	      	});
	      }
	    },function(){
	    });
  };
});