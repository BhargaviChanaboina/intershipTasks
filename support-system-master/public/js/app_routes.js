angular.module('appRoutes',[])
.config(['$routeProvider','$locationProvider',function($routeProvider,$locationProvider){
	$routeProvider.when('/',{
		templateUrl :'../views/login.html',
		controller  : "loginCtrl"
	})
	.when("/users",{
		templateUrl : "../views/allusers.html",
		controller  : "userCtrl"
	})
	.when("/insights",{
		templateUrl : "../views/insights.html",
		controller  : "insightCtrl"
	})
	.when('/reset_password',{
		templateUrl : '../views/forgot_pwd.html',
		controller  : "resetCtrl"
	})
	.when('/mail_settings',{
		templateUrl : "../views/mail_templates.html",
		controller  : "mailCtrl"
	})
	.when('/add_mail_template',{
		templateUrl : "../views/mail_setup.html",
		controller  : "mailCtrl"
	})
	.when('/update_mail_template',{
		templateUrl : "../views/mail_page.html",
		controller  : "mailCtrl"
	})
	.when("/all_licenses",{
		templateUrl : "../views/all_licenses.html",
		controller  : "licenseCtrl"
	})
	.when('/log',{
		templateUrl : "../views/logs.html",
		controller  : "logCtrl"
	})
	.when('/notify',{
		templateUrl : "../views/notify.html",
		controller  : "notifyCtrl"
	})
	.when("/reset",{
		templateUrl : "../views/reset_pwd.html",
		controller  : "resetTokenCtrl"
	})
	.when("/new_client",{
		templateUrl : "../views/new_client.html",
		controller  : "clientCtrl"
	})
	.when('/change_password',{
		templateUrl : '../views/change_pwd.html',
		controller  : "changeCtrl"
	})
	.when("/client",{
		templateUrl : "../views/client_page.html",
		controller  : "singleClientCtrl"
	})
	.when("/services",{
		templateUrl : "../views/services.html",
		controller  : "serviceCtrl"
	})
	.when('/settings',{
		templateUrl : "../views/settings.html",
		controller	: "settingCtrl"
	})
	.when('/dashboard',{
		templateUrl :'../views/table.html',
		controller  : 'clientCtrl'
	});
	$locationProvider.html5Mode(false);
}]);

	
