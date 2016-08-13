angular.module('GreenSaloon.home',[])

.controller('HomeController', function($scope, $window, $mdDialog, $mdMedia, Auth, User, Dialogs){
  $scope.username = $window.localStorage.getItem('com.GS');
  

  $scope.signout = function(){
    Auth.signout();
  };

  $scope.answer = function(value){
  	$mdDialog.hide(value);
  };

  $scope.addUser = function(ev){
  	Dialogs.showDialog($scope,$mdDialog,$mdMedia,
		    'HomeController','app/home/addUser.html',ev,
		    {},function(answer){
		      if(answer){
		      	User.addOne(answer)
		      	.then(function(resp){
		      		alert('تمت اضافة المستخدم بنجاح');
		      	})
		      	.catch(function(error){
		      		alert('حدث خطأ اثناء الاضافة, تأكد ان اسم المستخدم غير موجود');
		      	});
		      }
		    },function(){
		      console.log('You cancelled the dialog.');
		    });
  };

  $scope.deleteUser = function(){

  };
});