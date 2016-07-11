{
  angular.module('meganote.users')
    .service('UsersService', [
      '$http',
      'API_BASE',
      'AuthToken',
      'CurrentUser',
      ($http, API_BASE, AuthToken, CurrentUser) => {

        const apiUserURI = `${API_BASE}users`;
        const apiSessionURI = `${API_BASE}sessions`;

        class UsersService {

          // Sign Up
          create(user) {
            return $http.post(apiUserURI, {
              user,
            })
              .then(
                res => {
                  AuthToken.token = res.data.authToken;
                  CurrentUser.user = res.data.user;
                }
              )
              .catch(
                err => {
                  console.log(err);
                }   
              );
          }

          updateUser(user){
              return $http({
                  method: 'PATCH',
                  url: apiUserURI,
                  data: {
                      token: AuthToken.token,
                      newUser: user,
                  },
              })
              .then(res => {
                  console.log(res);
                  CurrentUser.user = res.data.user;
              });
          }

          signIn(user){
            console.log(user);
            return $http.post(apiSessionURI, {user})
                .then(res => {
                    CurrentUser.user = res.data.user;
                    AuthToken.token = res.data.authToken;
                });
          }
        }
        return new UsersService();

      }
    ]);
}
