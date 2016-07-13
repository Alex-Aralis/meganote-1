'use strict';

{
  var config = function config($urlRouterProvider) {
    $urlRouterProvider.otherwise('/notes/');
  };

  angular.module('meganote', ['ui.router', 'ngFlash', 'textAngular', 'meganote.notes', 'meganote.notesForm', 'meganote.signUp', 'meganote.users', 'meganote.navbar', 'meganote.home', 'meganote.profile', 'meganote.signIn']).config(config);

  config.$inject = ['$urlRouterProvider'];
}
'use strict';

{
    angular.module('meganote.home', []);
}
'use strict';

{
    angular.module('meganote.navbar', []);
}
'use strict';

{
  angular.module('meganote.notesForm', []);
}
'use strict';

{
  angular.module('meganote.notes', []);
}
'use strict';

{
    angular.module('meganote.profile', []);
}
'use strict';

{
    angular.module('meganote.signIn', []);
}
'use strict';

{
  angular.module('meganote.signUp', []);
}
'use strict';

{
  angular.module('meganote.users', []);
}
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

{
    angular.module('meganote').factory('Cacher', ['$window', function ($window) {
        var Cacher = function () {
            function Cacher(_key) {
                _classCallCheck(this, Cacher);

                this._key = _key;
                this._data = null;
            }

            _createClass(Cacher, [{
                key: 'reset',
                value: function reset() {
                    this._data = null;
                    $window.localStorage.removeItem(this._key);
                }
            }, {
                key: 'data',
                set: function set(data) {
                    $window.localStorage.setItem(this._key, JSON.stringify({ data: data }));
                    return this._data = data;
                },
                get: function get() {
                    this._data === null && $window.localStorage.getItem(this._key) !== null && (this._data = JSON.parse($window.localStorage.getItem(this._key)).data);

                    return this._data;
                }
            }]);

            return Cacher;
        }();

        return Cacher;
    }]);
}
'use strict';

{
    angular.module('meganote').constant('API_BASE', 'http://localhost:3030/api/v1/');
}
'use strict';

{
    var AuthInterceptor = function AuthInterceptor(AuthToken, API_BASE) {
        return {
            request: function request(config) {
                var token = AuthToken.token;

                if (token && config.url.includes(API_BASE)) {
                    config.headers.Authorization = token;
                }

                return config;
            }
        };
    };

    var interceptorConfig = function interceptorConfig($httpProvider) {
        return $httpProvider.interceptors.push('AuthInterceptor');
    };

    angular.module('meganote').factory('AuthInterceptor', AuthInterceptor).config(interceptorConfig);

    AuthInterceptor.$inject = ['AuthToken', 'API_BASE'];


    interceptorConfig.$inject = ['$httpProvider'];
}
'use strict';

{
    var homeConfig = function homeConfig($stateProvider) {
        $stateProvider.state('home', {
            url: '/home',
            templateUrl: 'home/home.html'
        });
    };

    angular.module('meganote.home').config(homeConfig);

    homeConfig.$inject = ['$stateProvider'];
}
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

{
    angular.module('meganote.navbar').directive('aaNavbar', ['AuthToken', 'CurrentUser', '$state', function (AuthToken, CurrentUser) {
        var NavbarController = function () {
            function NavbarController() {
                _classCallCheck(this, NavbarController);
            }

            _createClass(NavbarController, [{
                key: 'signOut',
                value: function signOut() {
                    CurrentUser.clear();
                    AuthToken.clear();
                }
            }, {
                key: 'user',
                get: function get() {
                    return CurrentUser.user;
                }
            }]);

            return NavbarController;
        }();

        return {
            scope: {},
            controller: NavbarController,
            controllerAs: 'vm',
            bindToController: true,
            templateUrl: 'layout/navbar.html'
        };
    }]);
}
'use strict';

{
  var NotesFormController = function NotesFormController($state, Flash, NotesService) {
    var vm = this;
    vm.note = NotesService.find($state.params.noteId);
    vm.clearForm = clearForm;
    vm.save = save;
    vm.destroy = destroy;

    /////////////////

    function clearForm() {
      vm.note = { title: '', body_html: '' };
    }

    function save() {
      if (vm.note._id) {
        NotesService.update(vm.note).then(function (res) {
          vm.note = angular.copy(res.data.note);
          Flash.create('success', res.data.message);
        }, function () {
          return Flash.create('danger', 'Oops! Something went wrong.');
        });
      } else {
        NotesService.create(vm.note).then(function (res) {
          vm.note = res.data.note;
          Flash.create('success', res.data.note.message);
          $state.go('notes.form', { noteId: vm.note._id });
        }, function () {
          return Flash.create('danger', 'Oops! Something went wrong.');
        });
      }
    }

    function destroy() {
      NotesService.destroy(vm.note).then(function () {
        return vm.clearForm();
      });
    }
  };

  angular.module('meganote.notesForm').controller('NotesFormController', NotesFormController);

  NotesFormController.$inject = ['$state', 'Flash', 'NotesService'];
}
'use strict';

{
  var NotesController = function NotesController($scope, NotesService) {
    var vm = this;
    vm.notes = NotesService.notes;
  };

  angular.module('meganote.notes').controller('NotesController', NotesController);

  NotesController.$inject = ['$scope', 'NotesService'];
}
'use strict';

{
  var NotesService = function NotesService($http, API_BASE) {
    var apiURI = API_BASE + 'notes/';

    var service = {
      notes: [],
      getNotes: getNotes,
      create: create,
      update: update,
      destroy: destroy,
      removeById: removeById,
      find: find
    };

    return service;

    //////////////////////

    function getNotes() {
      var notesPromise = $http.get(apiURI);

      notesPromise.then(function (res) {
        return service.notes = res.data;
      });

      return notesPromise;
    }

    function create(note) {
      var notesPromise = $http.post(apiURI, {
        note: note
      });

      notesPromise.then(function (res) {
        service.notes.unshift(res.data.note);
      });

      return notesPromise;
    }

    function update(note) {
      var notesPromise = $http.put('' + apiURI + note._id, {
        note: note
      });

      notesPromise.then(function (res) {
        service.removeById(res.data.note._id);
        service.notes.unshift(res.data.note);
      });

      return notesPromise;
    }

    function destroy(note) {
      var notesPromise = $http.delete('' + apiURI + note._id);

      notesPromise.then(function (res) {
        service.removeById(res.data.note._id);
      });

      return notesPromise;
    }

    function removeById(id) {
      for (var i = 0; i < service.notes.length; i++) {
        if (service.notes[i]._id === id) {
          return service.notes.splice(i, 1);
        }
      }
    }

    function find(id) {
      for (var i = 0; i < service.notes.length; i++) {
        if (service.notes[i]._id === id) {
          return angular.copy(service.notes[i]);
        }
      }
    }
  };

  angular.module('meganote.notes').factory('NotesService', NotesService);

  NotesService.$inject = ['$http', 'API_BASE'];
}
'use strict';

{
  (function () {
    var notesConfig = function notesConfig($stateProvider) {
      $stateProvider.state('notes', {
        url: '/notes',
        templateUrl: 'notes/notes.html',
        controller: 'NotesController',
        controllerAs: 'vm',
        resolve: {
          notesLoaded: notesLoaded
        }
      }).state('notes.form', {
        url: '/:noteId',
        templateUrl: 'notes/notes-form/notes-form.html',
        controller: 'NotesFormController',
        controllerAs: 'vm'
      });
    };

    var notesLoaded = function notesLoaded(NotesService) {
      return NotesService.getNotes();
    };

    angular.module('meganote.notes').config(notesConfig);

    notesConfig.$inject = ['$stateProvider'];


    notesLoaded.$inject = ['NotesService'];
  })();
}
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

{
    angular.module('meganote.profile').controller('ProfileEditController', ['$http', 'CurrentUser', 'UsersService', 'AuthToken', 'API_BASE', function ($http, CurrentUser, UsersService, AuthToken, API_BASE) {
        var ProfileEditController = function () {
            function ProfileEditController() {
                _classCallCheck(this, ProfileEditController);

                this.user = {
                    name: CurrentUser.user.name,
                    username: CurrentUser.user.username
                };
            }

            _createClass(ProfileEditController, [{
                key: 'updateUser',
                value: function updateUser() {
                    UsersService.updateUser(this.user).catch(function (err) {
                        console.log(err);
                    });
                }
            }]);

            return ProfileEditController;
        }();

        return new ProfileEditController();
    }]);
}
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

{
    angular.module('meganote.profile').controller('ProfileInfoController', ['CurrentUser', function (CurrentUser) {
        var ProfileInfoController = function () {
            function ProfileInfoController() {
                _classCallCheck(this, ProfileInfoController);
            }

            _createClass(ProfileInfoController, [{
                key: 'user',
                get: function get() {
                    return CurrentUser.user;
                }
            }]);

            return ProfileInfoController;
        }();

        return new ProfileInfoController();
    }]);
}
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

{
    var ProfileController = function () {
        function ProfileController() {
            _classCallCheck(this, ProfileController);

            this.tabs = [{
                active: 'active',
                state: 'profile.info',
                innerText: 'Info'
            }, {
                active: '',
                state: 'profile.edit',
                innerText: 'Edit'
            }];
        }

        _createClass(ProfileController, [{
            key: 'tabClicked',
            value: function tabClicked(clickedTab) {
                this.tabs.forEach(function (tab) {
                    tab.active = '';
                });

                clickedTab.active = 'active';
            }
        }]);

        return ProfileController;
    }();

    angular.module('meganote.profile').controller('ProfileController', ProfileController);
}
'use strict';

{
    var profileConfig = function profileConfig($stateProvider) {
        $stateProvider.state('profile', {
            url: '/profile',
            templateUrl: 'profile/profile.html',
            controller: 'ProfileController',
            controllerAs: 'vm'
        }).state('profile.info', {
            url: '/info',
            templateUrl: 'profile/profile-info.html',
            controller: 'ProfileInfoController',
            controllerAs: 'vm'
        }).state('profile.edit', {
            parent: 'profile',
            url: '^/profile/edit',
            templateUrl: 'profile/profile-edit.html',
            controller: 'ProfileEditController',
            controllerAs: 'vm'
        });
    };

    angular.module('meganote.profile').config(profileConfig);

    profileConfig.$inject = ['$stateProvider'];
}
'use strict';

{
    var signInConfig = function signInConfig($stateProvider) {
        $stateProvider.state('sign-in', {
            url: '/sign-in',
            templateUrl: 'sign-in/sign-in.html',
            controller: 'SignInController',
            controllerAs: 'vm'
        });
    };

    angular.module('meganote.signIn').config(signInConfig);

    signInConfig.$inject = ['$stateProvider'];
}
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

{
    angular.module('meganote.signIn').controller('SignInController', ['$state', '$http', 'API_BASE', 'CurrentUser', 'AuthToken', 'Flash', 'UsersService', function ($state, $http, API_BASE, CurrentUser, AuthToken, Flash, UsersService) {
        var SignInController = function () {
            function SignInController() {
                _classCallCheck(this, SignInController);

                this.user = {
                    username: '',
                    password: ''
                };
            }

            _createClass(SignInController, [{
                key: 'signIn',
                value: function signIn() {
                    UsersService.signIn(this.user).then(function (res) {
                        $state.go('profile.info');
                    }).catch(function (err) {
                        Flash.create('danger', err.statusText, 3000);
                    });
                }
            }]);

            return SignInController;
        }();

        return new SignInController();
    }]);
}
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

{
  angular.module('meganote.signUp').directive('signUp', ['$state', 'UsersService', 'Flash', function ($state, UsersService, Flash) {
    var SignUpController = function () {
      function SignUpController() {
        _classCallCheck(this, SignUpController);

        this.user = {};
      }

      _createClass(SignUpController, [{
        key: 'submit',
        value: function submit() {
          UsersService.create(this.user).then(function () {
            $state.go('notes');
          }).catch(function (err) {
            console.log(err);
            Flash.create('danger', err.data.message, 3000);
          });
        }
      }]);

      return SignUpController;
    }();

    return {
      scope: {},
      controller: SignUpController,
      controllerAs: 'vm',
      bindToController: true,
      templateUrl: '/sign-up/sign-up.html'
    };
  }]);
}
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

{
  angular.module('meganote.users').service('AuthToken', ['Cacher', function (Cacher) {
    var AuthToken = function () {
      function AuthToken() {
        _classCallCheck(this, AuthToken);

        this.tokenCacher = new Cacher('authToken');
      }

      _createClass(AuthToken, [{
        key: 'clear',
        value: function clear() {
          this.tokenCacher.reset();
        }
      }, {
        key: 'token',
        set: function set(token) {
          this.tokenCacher.data = token;
        },
        get: function get() {
          return this.tokenCacher.data;
        }
      }]);

      return AuthToken;
    }();

    return new AuthToken();
  }]);
}
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

{
  angular.module('meganote.users').service('CurrentUser', ['Cacher', function (Cacher) {
    var CurrentUser = function () {
      function CurrentUser() {
        _classCallCheck(this, CurrentUser);

        this.userCacher = new Cacher('user');
      }

      _createClass(CurrentUser, [{
        key: 'clear',
        value: function clear() {
          this.userCacher.reset();
        }
      }, {
        key: 'user',
        set: function set(user) {
          this.userCacher.data = user;
        },
        get: function get() {
          return this.userCacher.data;
        }
      }]);

      return CurrentUser;
    }();

    return new CurrentUser();
  }]);
}
'use strict';

{
  var usersConfig = function usersConfig($stateProvider) {
    $stateProvider.state('sign-up', {
      url: '/sign-up',
      template: '<sign-up></sign-up>'
    });
  };

  angular.module('meganote.users').config(usersConfig);

  usersConfig.$inject = ['$stateProvider'];
}
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

{
    angular.module('meganote.users').service('UsersService', ['$http', 'API_BASE', 'AuthToken', 'CurrentUser', function ($http, API_BASE, AuthToken, CurrentUser) {

        var apiUserURI = API_BASE + 'users';
        var apiSessionURI = API_BASE + 'sessions';

        var UsersService = function () {
            function UsersService() {
                _classCallCheck(this, UsersService);
            }

            _createClass(UsersService, [{
                key: 'create',


                // Sign Up
                value: function create(user) {
                    return $http.post(apiUserURI, {
                        user: user
                    }).then(function (res) {
                        AuthToken.token = res.data.authToken;
                        CurrentUser.user = res.data.user;
                    });
                }
            }, {
                key: 'updateUser',
                value: function updateUser(user) {
                    return $http({
                        method: 'PATCH',
                        url: apiUserURI,
                        data: {
                            token: AuthToken.token,
                            newUser: user
                        }
                    }).then(function (res) {
                        console.log(res);
                        CurrentUser.user = res.data.user;
                    });
                }
            }, {
                key: 'signIn',
                value: function signIn(user) {
                    console.log(user);
                    return $http.post(apiSessionURI, { user: user }).then(function (res) {
                        CurrentUser.user = res.data.user;
                        AuthToken.token = res.data.authToken;
                    });
                }
            }]);

            return UsersService;
        }();

        return new UsersService();
    }]);
}
//# sourceMappingURL=bundle.js.map
