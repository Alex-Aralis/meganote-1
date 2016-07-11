{
    angular.module('meganote.signIn')
        .controller('SignInController', [
            
            '$http', 'API_BASE', 'CurrentUser', 'AuthToken', 
            ($http, API_BASE, CurrentUser, AuthToken) => {
            class SignInController {
                constructor(){
                    this.user = {
                        username: '',
                        password: '',
                    };
                }

                signIn(){
                    $http.post(`${API_BASE}users/sign-in`, {
                        user: this.user,
                    })
                    .then(res => {
                        CurrentUser.user = res.data.user;
                        AuthToken.token = res.data.authToken;
                    });
                }
            }

            return new SignInController;
        }]);
}
