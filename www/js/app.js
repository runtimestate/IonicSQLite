// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var db = null;

var sqlite = angular.module('sqlite', ['ionic', 'ngCordova'])

    .run(function ($ionicPlatform, $cordovaSQLite) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);

            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleLightContent();
            }

            db = $cordovaSQLite.openDB({name: "my.db", bgType: 1});
            if (!db) {
                db = $cordovaSQLite.openDB({name: "my.db"});
                $cordovaSQLite.execute(db, 'DROP TABLE IF EXISTS test_table');
                $cordovaSQLite.execute(db, 'CREATE TABLE IF NOT EXISTS test_table (id INTEGER PRIMARY KEY, question TEXT, answer TEXT)');

                for (var i = 0; i < 100; i++) {
                    $cordovaSQLite.execute(db, "INSERT INTO test_table (question, answer) VALUES (?, ?)", ["test" + i, i]).then(function (res) {
                        console.log("INSERT ID -> " + res.insertId);
                    }, function (err) {
                        console.error(err);
                    });
                }
            }
        });
    })

    .config(function ($stateProvider, $urlRouterProvider) {

        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js
        $stateProvider

            // setup an abstract state for the tabs directive
            .state('home', {
                cache: false,
                url: '/home',
                templateUrl: 'templates/home.html',
                controller: 'HomeCtrl'
            })

            .state('item', {
                cache: false,
                url: '/item',
                templateUrl: 'templates/item.html',
                controller: 'ItemCtrl'
            });

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/home');

    });
