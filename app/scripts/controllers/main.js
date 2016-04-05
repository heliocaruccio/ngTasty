'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('MainCtrl', function ($scope, $http) {

    $scope.baseURL = 'http://localhost:8000/users/list/?';
    $scope.useCols = ['userID', 'firstname', 'lastname', 'title', 'state', 'admincomment'];
    $scope.itemsPerPage = 100;
    $scope.listItemsPerPage = [50, 100];
    $scope.openSearchPane = false;

    $scope.init = {
      'count': $scope.itemsPerPage,
      'sortBy': 'firstname',
      'sortOrder': 'asc',
      'filterBase': 1, // set false to disable
    };

    $scope.filterBy = {};

    
    $scope.toggleSearchPane = function(){
        $scope.openSearchPane = !$scope.openSearchPane;
    }

    $scope.searchOnNames = function(){
      $scope.filterBy = {
        'name': $scope.search_names,
        'filtrar': 1
      };
    };

    $scope.getResource = function (params, paramsObj) {
      
      var urlApi = $scope.baseURL + params;
      return $http.get(urlApi).then(function (response) {
        var rows = [];
        var header = [];

        angular.forEach(response.data.rows, function(objUser, key) {
            var thisUserCols = {};
            angular.forEach(objUser, function(val, property) {
                if ($scope.useCols.indexOf(property) !== -1) {
                    this[property] = val;
                }
            }, thisUserCols);
            this.push(thisUserCols);  
        }, rows);


        angular.forEach(response.data.header, function(colDef, key) {
            if ($scope.useCols.indexOf(colDef.key) !== -1) {
                this.push(colDef);
            }
        }, header);

        return {
          'rows': rows,
          'header': header,
          'pagination': response.data.pagination,
          'sortBy': response.data['sort-by'],
          'sortOrder': response.data['sort-order']
        }
      });
    }    

  });
