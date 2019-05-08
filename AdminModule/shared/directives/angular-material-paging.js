(function () {
    "use strict";

    function ClPagingDirective() {
        return {
            restrict: "EA",
            scope: {
                clPages: "=",
                clAlign: "@",
                clAlignModel: "=",
                clPageChanged: "&",
                clSteps: "=",
                clCurrentPage: "="
            },
            controller: ClPagingController,
            controllerAs: "vm",
            template: ['<div layout="row" layout-align="{{ clAlign || clAlignModel }}">', '<md-button class="pageNumberBtn" aria-label="First" ng-click="vm.gotoFirst()">{{ vm.first }}</md-button>', '<md-button class="pageNumberBtn" aria-label="Previous" ng-click="vm.gotoPrev()" ng-show="vm.index - 1 >= 0">&#8230;</md-button>', '<md-button class="pageNumberBtn" aria-label="Go to page {{i+1}}" ng-repeat="i in vm.stepInfo"', ' ng-click="vm.goto(vm.index + i)" ng-show="vm.page[vm.index + i]" ', " ng-class=\"{'primary': vm.page[vm.index + i] == clCurrentPage}\">", " {{ vm.page[vm.index + i] }}", "</md-button>", '<md-button class="pageNumberBtn" aria-label="Next" ng-click="vm.gotoNext()" ng-show="vm.index + vm.clSteps < clPages">&#8230;</md-button>', '<md-button class="pageNumberBtn" aria-label="Last" ng-click="vm.gotoLast()">{{ vm.last }}</md-button>', "</div>"].join("")
        }
    }

    function ClPagingController($scope) {
        var vm = this;
        vm.first = "<<", vm.last = ">>", vm.index = 0, vm.clSteps = $scope.clSteps, vm["goto"] = function (index) {
            $scope.clCurrentPage = vm.page[index]
        }, vm.gotoPrev = function () {
            $scope.clCurrentPage = vm.index, vm.index -= vm.clSteps
        }, vm.gotoNext = function () {
            vm.index += vm.clSteps, $scope.clCurrentPage = vm.index + 1
        }, vm.gotoFirst = function () {
            vm.index = 0, $scope.clCurrentPage = 1
        }, vm.gotoLast = function () {
            vm.index = parseInt($scope.clPages / vm.clSteps) * vm.clSteps, vm.index === $scope.clPages ? vm.index = vm.index - vm.clSteps : "", $scope.clCurrentPage = $scope.clPages
        }, $scope.$watch("clCurrentPage", function (value) {
            vm.index = parseInt((value - 1) / vm.clSteps) * vm.clSteps, $scope.clPageChanged()
        }), $scope.$watch("clPages", function () {
            vm.init()
        }), vm.init = function () {
            vm.stepInfo = function () {
                for (var result = [], i = 0; i < vm.clSteps; i++) result.push(i);
                return result
            }(), vm.page = function () {
                for (var result = [], i = 1; i <= $scope.clPages; i++) result.push(i);
                return result
            }()
        }
    }
    var app = angular.module("cl.paging", []);
    app.directive("clPaging", ClPagingDirective), ClPagingDirective.$inject = [], ClPagingController.$inject = ["$scope"]
}());