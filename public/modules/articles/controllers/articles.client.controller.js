'use strict';

angular.module('articles').controller('ArticlesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Articles','Blogs',
	function($scope, $stateParams, $location, Authentication, Articles,Blogs) {
		$scope.authentication = Authentication;

		$scope.create = function() {
			var article = new Articles({
				title: this.title,
				content: this.content,
                topic: this.topic
			});
			article.$save(function(response) {
				$location.path('articles/' + response._id);

				$scope.title = '';
				$scope.content = '';
                $scope.topic = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.remove = function(article) {
			if (article) {
				article.$remove();

				for (var i in $scope.articles) {
					if ($scope.articles[i] === article) {
						$scope.articles.splice(i, 1);
					}
				}
			} else {
				$scope.article.$remove(function() {
					$location.path('articles');
				});
			}
		};


		$scope.update = function() {
			var article = $scope.article;

			article.$update(function() {
				$location.path('articles/' + article._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.find = function() {
			$scope.articles = Articles.query();
		};

		$scope.findOne = function() {
			$scope.article = Articles.get({
				articleId: $stateParams.articleId
			});
		};
        $scope.defineBlog = function(blogId){
          $scope.blogId = blogId;
        };

        $scope.articlesBlog = function() {

            Articles.query({razon:'blog',blogid:$stateParams.blogId}, function(articles) {
                $scope.articles = articles;
            });
        };

        // Articulos por topic
        $scope.articlesDeportes = function() {
            Articles.query({razon:'topic',topic:'deportes'}, function(articles) {
                $scope.articles = articles;
            });
        };
        $scope.articlesPolitica = function() {
            Articles.query({razon:'topic',topic:'politica'}, function(articles) {
                $scope.articles = articles;
            });
        };
        $scope.articlesCiencia = function() {
            Articles.query({razon:'topic',topic:'ciencia'}, function(articles) {
                $scope.articles = articles;
            });
        };
        $scope.articlesModa = function() {
            Articles.query({razon:'topic',topic:'moda'}, function(articles) {
                $scope.articles = articles;
            });
        };


        // rating stars
        $scope.max = 5;
        $scope.hoveringOver = function(value) {
            $scope.overStar = value;
            $scope.percent = 100 * (value / $scope.max);

            $scope.article.rate = ($scope.article.rate + value) / 2;
            $scope.article.vote = $scope.article.vote + 1;
           // $scope.article.isReadonly = true;
            $scope.update();
        };
        $scope.ratingStates = [
            {stateOn: 'glyphicon-ok-sign', stateOff: 'glyphicon-ok-circle'},
            {stateOn: 'glyphicon-star', stateOff: 'glyphicon-star-empty'},
            {stateOn: 'glyphicon-heart', stateOff: 'glyphicon-ban-circle'},
            {stateOn: 'glyphicon-heart'},
            {stateOff: 'glyphicon-off'}
        ];

	}
]);

