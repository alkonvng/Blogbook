'use strict';

//Articles service used for communicating with the articles REST endpoints
angular.module('articles').factory('Articlescreate', ['$resource',
    function($resource) {
        return $resource('blogs/:blogId/articles/createArticle', {
            blogId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
]);