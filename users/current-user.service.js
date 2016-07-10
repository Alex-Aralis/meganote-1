{
  angular.module('meganote.users')
    .service('CurrentUser', ['Cacher', Cacher => {

      class CurrentUser {
        constructor() {
          this.userCacher = new Cacher('user');
        }
        set user(user) {
          this.userCacher.data = user;
        }
        get user() {
          return this.userCacher.data;
        }
        clear() {
          this.userCacher.reset();
        }
      }
      return new CurrentUser();

    }]);
}
