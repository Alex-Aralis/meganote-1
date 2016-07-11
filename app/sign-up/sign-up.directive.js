{
  angular.module('meganote.signUp')
    .directive('signUp', [

      'UsersService', 'Flash',
      (UsersService, Flash) => {

        class SignUpController {
          constructor() {
            this.user = {};
          }
          submit() {
            UsersService.create(this.user)
                .catch(err => {
                    console.log(err);
                    Flash.create('danger', err, 3000);
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
