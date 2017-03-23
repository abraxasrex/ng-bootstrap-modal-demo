namespace ModalApp {
    let module: ng.IModule = angular.module("modalApp", [
        'ui.bootstrap'
    ]);

    class modalOpener {
        public message: string;

        public monsters: Object[] = [
            {name: 'Rodan', strength: 'supersonic flight', attack: 'hurricane winds'},
            {name: 'Godzilla', strength: 'impervious to conventional weaponry', attack: 'atomic breath'}
        ]

        public openModal(monster:Object): void{

            let modal = this.$uibModal.open({
                templateUrl: 'modalTemplate.html',
                controller: modalController,
                controllerAs: 'vm',
                size: 'lg',
                resolve: {
                    _monster: monster
                }
            });

            //optional promise resolve and reject
           modal.result.then( (okMessage) => {
                alert(okMessage);
           }, (cancelMessage)=>{
                alert(cancelMessage);
           });

        }

        constructor(
            private $uibModal: ng.ui.bootstrap.IModalService
        ){
            this.message = ' World!';
        }
    }

    class modalController {
        public monster: Object;
        public ok() {
            this.$uibModalInstance.close(`${this.monster["name"]} destroyed the city!`);
        };
        public cancel () {
            this.$uibModalInstance.dismiss(`${this.monster["name"]} was defeated by humanity!`);
        };
        constructor(
            private $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance,
            private _monster: Object
        ){
            this.monster = _monster;

        }
    }

    module.controller('modalOpener', modalOpener);

}