'use strict';

angular.module('articles').controller('ArticlesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Articles','Blogs','Articlesblog',
	function($scope, $stateParams, $location, Authentication, Articles) {
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
        // Busca cual sera la view del contenido segun la url
        $scope.findContent = function () {
            if ($stateParams.articleId) {
                $scope.directionContent = '/modules/articles/views/view-article.client.view.html';
            }else{
                var auxUrl = $location.$$url;
                var auxLenght = auxUrl.length;
                auxUrl = auxUrl.substring(auxLenght-13,auxLenght);
                if ( auxUrl === 'createArticle'){
                    $scope.directionContent = '/modules/articles/views/create-article.client.view.html';
                }
            }
        };

        //Busca el articulo del blog
        $scope.findArticleBlog = function() {
            if ($stateParams.articleId){
                $scope.article = Articles.get({
                    articleId: $stateParams.articleId
                });
            }else{
                Articles.query({razon:'theLast',blogId:$stateParams.blogId}, function(article) {
                    if(article){
                        $scope.article = article[0];
                    }else{
                        $scope.article.title = 'No tienes ningun articulo';
                    }

                });
            }
        };

        //Creo que no se usa
        $scope.defineBlog = function(blogId){
          $scope.blogId = blogId;
        };

        // creo que tampoco se usa
        $scope.articlesBlog = function() {
            Articles.query({razon:'blog',blogId:$stateParams.blogId}, function(articles) {
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

