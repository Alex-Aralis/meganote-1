{
  angular.module('meganote.signUp')
    .directive('signUp', [

      '$state', 'UsersService', 'Flash',
      ($state, UsersService, Flash) => {

        class SignUpController {
          constructor() {
            this.user = {};
          }
          submit() {
            UsersService.create(this.user)
                .then(() => {
                    $state.go('notes');
                })
                .catch(err => {
                    console.log(err);
                    Flash.create('danger', err.data.message, 3000);
                });
          }
        }

        return {
          scope: {},
          controller: SignUpController,
          controllerAs: 'vm',
          bindToController: true,
          templateUrl: '/sign-up/sign-up.html',
        };
      }
    ]);
}
