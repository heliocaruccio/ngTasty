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

    $scope.notSortBy = ['firstname'];
    $scope.useCols = ['firstname', 'lastname', 'title', 'state', 'admincomment'];

    $scope.getResource = function (params, paramsObj) {
      
      var urlApi = 'http://localhost:8000/users/list/?' + params;
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
          'sortBy': response.data['sort-by'],
          'sortOrder': response.data['sort-order']
        }
      });
    }    

  });
