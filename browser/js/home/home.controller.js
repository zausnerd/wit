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
      name: "ceaserCipher",
      title: "ceaserCipher"
    }, {
      name: "reverse",
      title: "reverse"
    }, {
      name: "interleave",
      title: "interleave"
    }, ];

  $scope.droppedObjects = [];
  $scope.input = {};

   $scope.caesarCipher = function(str, rev) {
        var shiftFactor = rev ? 19 : 7;
        var output = '';
        for (var i = 0; i < str.length; i++) {
            var c = str[i];
            if (c.match(/[a-z]/i)) {
                var code = str.charCodeAt(i);
                if ((code >= 65) && (code <= 90))
                    c = String.fromCharCode(((code - 65 + shiftFactor) % 26) + 65);
                else if ((code >= 97) && (code <= 122))
                    c = String.fromCharCode(((code - 97 + shiftFactor) % 26) + 97);
            }
            output += c;
        }
        return output;
    };

    $scope.reverse = function(str) {
        return str.split("").reverse().join("");
    }

    $scope.interleave = function(str) {
        var result = '';
        var midPoint = Math.ceil(str.length / 2);
        for (var i = 0; i < midPoint; i++) {
            result += str[i] + (str[i + midPoint] || '');
        }
        return result;
    }

    $scope.releave = function(str) {
        var firstHalf = '';
        var secondHalf = '';
        for (var i = 0; i < str.length; i += 2) {
            firstHalf += str[i];
            secondHalf += (str[i + 1] || '')
        }
        return firstHalf + secondHalf;
    }

    $scope.chainFunctions = function(str, ...funcs) {
        return funcs.reduce((text, func) => func(text), str)
    }

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
