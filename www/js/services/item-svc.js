sqlite.service('ItemService', function ($cordovaSQLite, $q) {

    function getItems() {
        var items = [];
        var deferred = $q.defer();
        var query = "SELECT id, question, answer FROM test_table";
        $cordovaSQLite.execute(db, query, []).then(function (res) {
            for (var i = 0; i < res.rows.length; i++) {
                items[i] = res.rows.item(i);
                items[i].previous = res.rows.item(i - 1);
                items[i].next = res.rows.item(i + 1);
            }
            deferred.resolve(items);
        }, function (err) {
            deferred.reject(err);
            console.error(err);
        });
        return deferred.promise;
    }

    return {
        getItems: getItems
    }
});
