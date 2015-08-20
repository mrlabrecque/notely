'use strict';

var nevernoteBasePath = 'https://nevernote-1150.herokuapp.com/api/v1/',
    apiKey = '$2a$10$YLCkHrKAzImFxWcZ4559GOnS9KFKG9UFPyQsQIwR0J4KHH0zMcJEG';

    var noteApp = angular.module('notely.notes', ['ngRoute']);

    noteApp.config(['$routeProvider', function($routeProvider) {
      $routeProvider.when('/notes', {
        templateUrl: 'notes/notes.html'
      });
    }]);

    noteApp.controller('NotesController', ['$scope', '$http', function($scope, $http) {
      $scope.note = {};

      $http.get(nevernoteBasePath + 'notes?api_key=' + apiKey)
        .success(function(notesData) {
          $scope.notes = notesData;
        });

      $scope.commit = function() {
        $http.post(nevernoteBasePath + 'notes', {
          api_key: apiKey,
          note: $scope.note
        }).success(function(newNoteData) {
          $scope.notes.unshift(newNoteData.note);
        });
      };
    }]);
