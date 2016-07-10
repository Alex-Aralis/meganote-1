{
    angular.module('meganote')
        .factory('Cacher', ['$window', $window => {
            class Cacher {
                constructor(_key){
                    this._key = _key;
                    this.reset();
                }

                set data(data){
                    $window.localStorage.setItem(this._key, 
                        JSON.stringify({data}));
                    return this._data = data;
                }

                get data(){
                    this._data === null && 
                        (this._data = $window.localStorage.getItem(this._key).data);

                    return this._data;
                }

                reset(){
                    this._data = null;
                    $window.localStorage.removeItem(this._key);
                }
            }
    
            return Cacher;
        }]);
}
