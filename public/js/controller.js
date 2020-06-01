var app = angular.module('AppCtrl', []);


app.controller('angularController', ['$scope', '$http', function($scope, $http) {
  console.log('Controller has started!');
  $scope.newTask = {};
  console.log('newTask: ', $scope.newTask);

  var refresh = function(){
    $http.get('/api/tasks/').then(function(response){
      $scope.tasksList = response.data;
      console.log('Refreshed: ', $scope.tasksList);
    });
  };

  refresh();

  $scope.logTest = (text) => {
    console.log(text);
  };

  $scope.deselect = function(){
    $scope.newTask = {};
  };

  $scope.addTask = function(newTitle){
    let newTask = {};
    newTask['title'] = newTitle;
    newTask['done'] = false;
    console.log('newTask: ', newTask);
    $http.post('/api/tasks/task/', newTask).then(function(response){
      $scope.newTask = {};
      refresh();
    });
  };

  $scope.editTask = function(id){
    console.log(id);
    $http.get('/api/tasks/task/' + id).then(function(response){
      console.log(response.data._id);
      $scope.newTask = response.data;        //Put the response in the InputBoxes
    });
  };

  $scope.markDone = function(id){
    let tempTask = $scope.tasksList.find(task => {
      return task._id === id;
    });
    let doneVal = {
      done: !tempTask.done
    };
    console.log(doneVal);
    $http.put('/api/tasks/task/' + id, doneVal).then(function(response){
      console.log(response.data.done);
    });
  };

  $scope.updateTask = function(id, updatedTitle){
    console.log('updateTask.id', id);
    let updatedTask = {
      title: updatedTitle
    };
    console.log('updatedTask', updatedTask);
    $http.put('/api/tasks/task/' + id, updatedTask).then(function(response){
      console.log(response.data.title);
      refresh();
    });
  };

  $scope.removeTask = function(id){
    console.log('Deleting:', id);
    $http.delete('/api/tasks/task/' + id).then(function(response){
      refresh();
    })
  };

}]);

//CRUD Task through AJAX
app.controller('ajaxController', ['$scope2', function($scope2){

  $scope2.createTask = function() {
    var value = {
      "title": "title",
      "isDone": "isDone"
    };
    console.log(value);
    var send = {
      url: '/api/tasks/task',
      method: 'POST',
      data: value
    };
    $.ajax(send).done(function(data){
      console.log(data);
    });
  };

  $scope2.readTask = function() {
    var send = {
      url: '/api/tasks/task/' + id,
      method: 'GET',
      data: 'This Task is Read!'
    };
    $.ajax(send).done(function(data){
      console.log(data);
    });
  };

  $scope2.updateTask = function() {
    var value = {
      "title": "title",
      "isDone": "isDone"
    };
    var send = {
      url: '/api/tasks/task/' + id,
      method: 'PUT',
      data: value
    };
    $.ajax((send)).done(function(data){
      console.log(data);
    });
  };

  $scope2.removeTask = function(id) {
    console.log(id);
    var send = {
      url: '/api/tasks/task/' + id,
      method: 'DELETE',
      data: 'This Task is Deleted!'
    };
    $.ajax(send).done(function(data){
      console.log(data);
    });
  };

}]);