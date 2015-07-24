'use strict';

//Articles service used for communicating with the articles REST endpoints
angular.module('articles').factory('Articlesblog', ['$resource',
    function($resource) {
        return $resource('blogs/:blogId/:articleId', {
            blogId:'@_id',
            articleId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
]);