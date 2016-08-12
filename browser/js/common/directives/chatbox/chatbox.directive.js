app.directive('chatBox', function() {
    return {
        restrict: 'E',
        template: '<textarea style="width: 100%; height: 200px" ng-disabled="true" ng-model="messageLog"></textarea>',
        controller: function($scope, $element) {
            $scope.$watch('messageLog', function() {
                var textArea = $element[0].children[0];
                textArea.scrollTop = textArea.scrollHeight;
            });
        }
    };
});
