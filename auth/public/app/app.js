var app = angular.module('gcproxy', ['ngMaterial', 'ngAria', 'ngMessages', 'ngResource', 'ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/app");
    $stateProvider.state({
        name: "app",
        url: "/app",
        templateUrl: "app/views/app.html"
    }).state({
        name: "app.nav",
        url: "/nav",
        templateUrl: "app/views/nav/nav.html",
        controller: "nav"
    }).state({
        name: "app.body",
        url: "/dashboard",
        templateUrl: "app/views/dashboard/dashboard.html",
    })


}).config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('grey')
    .accentPalette('orange');
});