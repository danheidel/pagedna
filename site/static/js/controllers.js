'use strict';
/*global angular*/

angular.module('pagednaApp.controllers', ['pagednaApp.services'])

.controller('mainController', function($scope, $rootScope, dataServices){
  $scope.columns = [
    {name: 'A', totalCells: 0},
    {name: 'B', totalCells: 0}
  ];
  $scope.columns = $scope.sourceColumns;
  $scope.rows = [];
  $scope.displayRows = [];
  $scope.JsonError;
  $scope.newColumn = '';
  $scope.invalidColumnName = false;
  $scope.duplicateColumnName = false;

  $scope.initializeData = function(){
    $scope.columns = [
      {name: 'A', totalCells: 0},
      {name: 'B', totalCells: 0}
    ];

    dataServices.getJsonData(function(err, data){
      if(err){
        console.log(err);
        $scope.rows = [];
        $scope.JsonError = err;
      } else {
        console.log('loaded JSON data');
        $scope.rows = $scope.parseJson(data);
        $scope.JsonError = undefined;
        $scope.refreshData();
      }
    });

    $scope.refreshData();
    console.log('initialized data to defaults');
  }

  $scope.refreshData = function(){
    //was having issues with $watch not firing when variables sub properties
      //are update via reference, just do it manually
    $scope.displayRows = $scope.displayFormat($scope.rows);
    $scope.columns = $scope.getCellsPerColumn($scope.columns);
    console.log('data refreshed');
  }

  $scope.parseJson = function(rawJSON){
    var rows = [];
    _.each(rawJSON, function(JsonRow){
      var tempSourceRow = [];
      _.each(JsonRow.sequence, function(item, index){
        tempSourceRow.push({
          color: item,
          order: index,
          column: JsonRow.states[item]
        });
      });
      rows.push(tempSourceRow);
    });
    return rows;
  };

  $scope.displayFormat = function(rows){
    var newRows = [];
    _.each(rows, function(row){
      var displayRow = {
        totalCells: row.length,
        columns: []
      };
      _.each($scope.columns, function(column, index){
        var tempColumn = {
          name: column.name,
          cells: []
        };
        _.each(row, function(cell){
          if(cell.column === tempColumn.name){
            tempColumn.cells.push(cell);
          }
        });
        //cells should stay in order but for paranoia sake...
        tempColumn.cells = _.sortBy(tempColumn.cells, function(cell){
          return cell.order;
        });
        displayRow.columns.push(tempColumn);
      });
      newRows.push(displayRow);
    });
    return newRows;
  };

  $scope.cellClicked = function(cell){
    var currentColumn = -1;
    _.each($scope.columns, function(column, index){
      if(cell.column === column.name){
        currentColumn = index;
      }
    });
    if(currentColumn === -1){
      //cell column was not matched with a column for some reason
      console.error('column mismatch error');
      cell.column = $scope.columns[0].name;
    }
    currentColumn++;
    cell.column = $scope.columns[currentColumn % $scope.columns.length].name;
    $scope.refreshData();
  }

  $scope.getCellsPerColumn = function(columns){
    _.each(columns, function(column){
      column.totalCells = 0;
    });
    _.each($scope.rows, function(row){
      _.each(row, function(cell){
        _.each(columns, function(column){
          if(column.name === cell.column){
            column.totalCells ++;
          }
        });
      });
    });
    return columns;
  };

  $scope.addNewColumn = function(form){
    if(!form.$valid) return;

    for(var rep=0;rep<$scope.columns.length;rep++){
      if($scope.newColumn === $scope.columns[rep].name){
        return;
      }
    }

    $scope.columns.push({
      name: $scope.newColumn,
      totalCells: 0
    });

    $scope.refreshData();
  }

  $scope.initializeData();
});
