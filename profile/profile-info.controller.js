{
    angular.module('meganote.profile')
        .controller('ProfileInfoController', [

        'CurrentUser',
        (CurrentUser) => {
            class ProfileInfoController {
                constructor(){

                }

                get user (){
                    return CurrentUser.user;
                }
            }

            return new ProfileInfoController;
        }]);
}
