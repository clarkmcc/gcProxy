var app = angular.module('gcproxy', ['ngMaterial', 'ngAria', 'ngMessages', 'ngResource', 'ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/app");
    $stateProvider.state('app', {
        url: "/app",
        views: {
            "nav": {
                templateUrl: "app/views/nav/nav.html",
            },
            "dashboard": {
                templateUrl: "app/views/dashboard/dashboard.html",
            }
        }
    })



}).config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('grey')
    .accentPalette('orange');
});