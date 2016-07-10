{
  angular.module('meganote.users')
    .service('AuthToken', ['Cacher', Cacher => {

      class AuthToken {
        constructor() {
          this.tokenCacher = new Cacher('authToken');
        }
        set token(token) {
          this.tokenCacher.data = token;
        }
        get token() {
          return this.tokenCacher.data;
        }
        clear() {
          this.tokenCacher.reset();
        }
      }
      return new AuthToken();

    }]);
}
