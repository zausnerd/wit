''
app.controller('SocketCtrl', function ($log, $scope, chatSocket, messageFormatter, nickName) {

  $scope.messageQueue = [];
  $scope.nickName = 'anonymous';
  $scope.messageLog = 'Ready to chat!\n';

  $scope.changeNickname = function(name) {
    $scope.nickName = name;
    $scope.screenname = '';
  }

  $scope.encryptFunctionString = '$scope.function encrypter(input) {\n \n}';
  $scope.decryptFunctionString = 'function decrypter(input) {\n \n}';
  $scope.encrypt = function() {
    var str = 'var func = ' + $scope.encryptFunctionString;
    eval(str);
    func('test');
  }

  $scope.sendMessage = function() {
    $scope.messageQueue.push($scope.message);
    chatSocket.emit('message', $scope.nickName, $scope.message);
    $scope.message = '';
  };

  $scope.$on('socket:broadcast', function(event, data) {
    // $log.debug('got a message', event.name);
    if (!data.payload) {
      $log.error('invalid message', 'event', event, 'data', JSON.stringify(data));
      return;
    }
    $scope.$apply(function() {
      $scope.messageLog = $scope.messageLog + messageFormatter(new Date(), data.source, data.payload);
    });
  });

    $scope.listItems = [{
      name: "some name",
      title: "title1"
    }, {
      name: "some name2",
      title: "title2"
    }, {
      name: "some name3",
      title: "title3"
    }, ];

    $scope.droppedObjects = [];
  $scope.input = {};

  $scope.onDragComplete = function(data, evt) {
    console.log("drag success, data:", data);
    var index = $scope.droppedObjects.indexOf(data);
    if (index > -1) {
      $scope.droppedObjects.splice(index, 1);
    }
  }

  $scope.onDropComplete = function(data, evt) {
    console.log("drop success, data:", data);
    var index = $scope.droppedObjects.indexOf(data);
    if (index == -1)
      $scope.droppedObjects.push(data);
  }

  $scope.onDropCompleteInput = function(data, evt) {
    console.log("drop on input success, data:", data);
    $scope.input = data;
  }

  $scope.onDropCompleteRemove = function(data, evt) {
    console.log("drop success - remove, data:", data);
    var index = $scope.droppedObjects.indexOf(data);
    if (index != -1)
      $scope.droppedObjects.splice(index);
  }

  var onDraggableEvent = function(evt, data) {
    console.log("128", "onDraggableEvent", evt, data);
  }
  $scope.$on('draggable:start', onDraggableEvent);
  //$scope.$on('draggable:move', onDraggableEvent);
  $scope.$on('draggable:end', onDraggableEvent);
});
