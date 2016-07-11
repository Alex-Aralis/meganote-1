{
  angular.module('meganote.users')
    .service('UsersService', [
      '$http',
      'API_BASE',
      'AuthToken',
      'CurrentUser',
      ($http, API_BASE, AuthToken, CurrentUser) => {

        const apiURI = `${API_BASE}users`;

        class UsersService {

          // Sign Up
          create(user) {
            return $http.post(apiURI, {
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
                  url: apiURI,
                  data: {
                      token: AuthToken.token,
                      newUser: user,
                  },
              })
              .then(res => {
                  CurrentUser.user = res.data.user;
              });
          }

        }
        return new UsersService();

      }
    ]);
}
