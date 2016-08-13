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
});
