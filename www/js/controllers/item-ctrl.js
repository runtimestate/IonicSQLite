sqlite.controller('ItemCtrl', function ($scope, ItemService) {
    ItemService.getItems().then(function (result) {
        $scope.item = result[0];
    });

    $scope.goTo = function (action) {
        if (action === 'p') {
            $scope.item = $scope.item.previous;
        }
        if (action === 'n') {
            $scope.item = $scope.item.next;
        }
    };
});
