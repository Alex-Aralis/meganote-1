{
    angular.module('meganote.profile')
        .controller('ProfileEditController', [ 

        '$http', 'CurrentUser', 'AuthToken', 'API_BASE',
        ($http, CurrentUser, AuthToken, API_BASE) => {
            
            class ProfileEditController{
                constructor(){

                }
                
                updateUser(){
                    $http({
                        method: 'PATCH',
                        url: `${API_BASE}users`,
                        data: {
                            token: AuthToken.token,
                            newUser: {
                                name: this.name,
                                username: this.username,
                            },
                        },
                    })
                    .then(res => {
                        CurrentUser.user = res.data.user;
                    })
                    .catch(err => {
                        console.log(err);
                    });
                }
                
                get user(){
                    return CurrentUser.user;
                }
            }

            return new ProfileEditController;
        }
    ]);
}
