namespace ModalApp {
    let module: ng.IModule = angular.module("modalApp", [
        'ui.bootstrap'
    ]);
   /// core modules angular:
     // home-ish controller VVV
    class modalOpener {
        public message: string;
        public searchText;
      //  public myCoolSearch;
        // public monsters: Object[] = [
        //     {name: 'Rodan', strength: 'supersonic flight', attack: 'hurricane winds'},
        //     {name: 'Godzilla', strength: 'impervious to conventional weaponry', attack: 'atomic breath'},
        //     {name: 'A Shark', strength: 'jaws', attack: 'bite?'}
        // ];
       /// ? filter
        // public search (monster){
        //   //console.log(idx);
        //   let _search = this.searchText;
        //   console.log(this.searchText);
        //   console.log(monster);
        // //  return monster.name.match(_search) != -1
        // }

        public openModal(show): void {

            let query = this.queryType;
            let modal = this.$uibModal.open({
                templateUrl: 'modalTemplate.html',
                controller: modalController,
                controllerAs: 'vm',
                size: 'lg',
                resolve: {
                    showInstance: show,
                    _query: { val: query }
                }
            });
            //optional promise resolve and reject
           modal.result.then( (okMessage) => {
                alert(okMessage);
           }, (cancelMessage)=>{
                alert(cancelMessage);
           });
        }

        public shows;
        public apiQuery;

        public searchAPI(){
        //  console.log('query:', this.apiQuery);
          let query = this.apiQuery || '42';
          this.$http.get('http://api.tvmaze.com/shows/' + query + '/' + this.queryType).then((results)=>{
            this.shows = results.data;
          }).catch( (err)=>{ console.log(err); });
        }
        //TODO:
        // 0. limit the view in our ui XXX
        // 1. use uib dropdown to select episodes, cast, seasons endpoints XXX
        // 2. use modal to inspect individual object XXX
        // 3  make it look nice enough XXX
        
        //TODO bonus:
        // 0. orderBy / sort
        // 1. figure out custom filters
        // 3. limit results within API call

        public queryType;
        public queryTypes = ['episodes', 'seasons', 'cast'];

        public selectQuery(query){
          this.queryType = query;
          this.searchAPI();
        }

        constructor(
            private $uibModal: ng.ui.bootstrap.IModalService,
            private $http: ng.IHttpService
        ){
            this.queryType = 'episodes';
            // episodes, seasons, cast
            this.searchAPI();

            this.message = ' World!';
        }
    }

    //// modal controller
    class modalController {
        public show;
        public queryType;
        public ok() {
            this.$uibModalInstance.close(`ok!`);
        };
        public cancel () {
            this.$uibModalInstance.dismiss(`canceled.`);
        };
        constructor(
            private $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance,
            private showInstance,
            private _query
        ){
            this.show = showInstance;
            this.queryType = _query.val;
        }
    }

    module.controller('modalOpener', modalOpener);

}
