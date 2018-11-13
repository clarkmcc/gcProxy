var app = angular.module('gcproxy', ['ngMaterial', 'ngAria', 'ngMessages', 'ngResource', 'ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/app");
    $stateProvider.state({
        name: "app",
        url: "/app",
        templateUrl: "app/views/app.html",
        views: {
            "nav@app": {
                templateUrl: "app/views/nav/nav.html"
            }
        }
    })


}).config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('grey')
    .accentPalette('orange');
});