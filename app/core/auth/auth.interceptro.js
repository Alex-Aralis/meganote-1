{
    angular.module('meganote')
        .factory('AuthInterceptor', AuthInterceptor)
        .config(interceptorConfig);

    AuthInterceptor.$inject = ['AuthToken', 'API_BASE'];
    function AuthInterceptor(AuthToken, API_BASE){
        return {
            request(config){
                const token = AuthToken.token;
                
                if(token && config.url.includes(API_BASE))
                    config.headers.Autherization = token;

                return config;
            },
        };
    }

    interceptorConfig.$inject = ['$httpProvider'];
    function interceptorConfig($httpProvider){
        return $httpProvider.interceptors.push('AuthInterceptor');
    }
}
