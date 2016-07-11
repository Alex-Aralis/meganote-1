{
    angular.module('meganote.profile')
        .controller('ProfileEditController', [ 

        '$http', 'CurrentUser', 'UsersService', 'AuthToken', 'API_BASE',
        ($http, CurrentUser, UsersService, AuthToken, API_BASE) => {
            
            class ProfileEditController{
                constructor(){
                    this.user = {
                        name: CurrentUser.user.name,
                        username: CurrentUser.user.username,
                    };
                }
                
                updateUser(){
                    UsersService.updateUser(this.user)
                    .catch(err => {
                        console.log(err);
                    });
                }
            }

            return new ProfileEditController;
        }
    ]);
}
