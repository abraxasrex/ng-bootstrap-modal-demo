var ModalApp;
(function (ModalApp) {
    var module = angular.module("modalApp", [
        'ui.bootstrap'
    ]);
    var modalOpener = (function () {
        function modalOpener($uibModal) {
            this.$uibModal = $uibModal;
            this.monsters = [
                { name: 'Rodan', strength: 'supersonic flight', attack: 'hurricane winds' },
                { name: 'Godzilla', strength: 'impervious to conventional weaponry', attack: 'atomic breath' }
            ];
            this.message = ' World!';
        }
        modalOpener.prototype.openModal = function (monster) {
            var modal = this.$uibModal.open({
                templateUrl: 'modalTemplate.html',
                controller: modalController,
                controllerAs: 'vm',
                size: 'lg',
                resolve: {
                    _monster: monster
                }
            });
            //optional promise resolve and reject
            modal.result.then(function (okMessage) {
                alert(okMessage);
            }, function (cancelMessage) {
                alert(cancelMessage);
            });
        };
        return modalOpener;
    }());
    var modalController = (function () {
        function modalController($uibModalInstance, _monster) {
            this.$uibModalInstance = $uibModalInstance;
            this._monster = _monster;
            this.monster = _monster;
        }
        modalController.prototype.ok = function () {
            this.$uibModalInstance.close(this.monster["name"] + " destroyed the city!");
        };
        ;
        modalController.prototype.cancel = function () {
            this.$uibModalInstance.dismiss(this.monster["name"] + " was defeated by humanity!");
        };
        ;
        return modalController;
    }());
    module.controller('modalOpener', modalOpener);
})(ModalApp || (ModalApp = {}));
//# sourceMappingURL=app.js.map