var myApp = angular.module('myApp', ['ngRoute', 'ngAnimate']);

myApp.config(function ($routeProvider) {
    $routeProvider
        .when('/books', {
            template: `
            <div class="container">

    <div class="form-group">
        <input type="text" class="form-control" placeholder="Search..." ng-model="searchString">
    </div>

    <div class="row">
        <div class="col-sm-12">
            <div class="media" ng-repeat="book in books | filter:searchString ">
                <div class="media-left media-middle">
                    <img class="img-thumbnail" ng-src="{{ book.imageUrl }}" style="max-width: 200px;">
                </div>
                <div class="media-body">
                    <button class="btn btn-success pull-right" ng-click="addToKart(book)"> + Add to Kart</button>
                    <h4 class="media-heading"> {{ book.name }}</h4>
                    <ul class="nav nav-pills">
                        <li class="lead no-margin">{{ book.price | currency }}</li>
                        <br class="clear">
                        <li><b>Rating:</b> {{ book.rating }}/5 |</li>
                        <li><b>Binding:</b> {{ book.binding }} |</li>
                        <li><b>Publisher:</b> {{ book.publisher}} |</li>
                        <li><b>Released:</b> {{ book.releaseDate }} |</li>
                    </ul>
                    <hr>
                    <p> {{ book.description.substring(0, 300) }}...</p>

                </div>
            </div>
        </div>
    </div>

</div>
            `,
            controller: 'BookListCtrl'
        })
        .when('/kart', {
            template: ` 
            <div class="container">

    <div class="row">
        <div class="col-sm-12">
            <div class="media" ng-repeat="book in kart track by $index">

                <div class="media-left media-middle">
                    <img class="img-thumbnail" ng-src="{{ book.imageUrl }}" alt="{{ book.name }}"
                         style="max-width: 200px;"/>
                </div>

                <div class="media-body">
                    <button class="btn btn-danger btn-xs pull-right" ng-click="remove(book)">X</button>
                    <h4 class="media-heading"> {{ book.name }}</h4>
                    <ul class="nav nav-pills">
                        <li class="lead no-margin">{{ book.price | currency }}</li>
                        <br class="clear">
                        <li><b>Rating:</b> {{ book.rating }}/5 |</li>
                        <li><b>Binding:</b> {{ book.binding }} |</li>
                        <li><b>Publisher:</b> {{ book.publisher}} |</li>
                        <li><b>Released:</b> {{ book.releaseDate }} |</li>
                    </ul>
                    <hr>
                    <p> {{ book.description.substring(0, 300) }}...</p>
                </div>

            </div>
        </div>
    </div>

    <div class="well" style="margin-top: 15px;">
        <ul class="nav">
            <li ng-repeat="book in kart track by $index" style="margin-top: 15px;">
                <h4 class="no-margin">{{ book.price | currency}}</h4>
                <div>{{ book.name }}</div>
            </li>
        </ul>
        <hr>
        <div class="lead">Total Cost: <span class="label label-default">{{ cost | currency }}</span>
        </div>

    </div>
</div>
            `,
            controller: 'KartListCtrl'
        })
        .otherwise({
            redirectTo: '/books'
        })
});

myApp.factory('kartService', function () {
    var kart = [];

    return {
        getKart: function () {
            return kart;
        },
        addToKart: function (book) {
            var copyBook = Object.assign({}, book);
            kart.push(copyBook);
        },
        remove: function (book) {
            const index = kart.indexOf(book);
            kart.splice(index, 1);
        },
        getCost: function () {
            var temp = 0;
            for (var i = 0; i < kart.length; i++) {
                temp += kart[i].price;
            }
            return temp;
        }
    }
});

myApp.factory('bookService', function () {
    var books = [
        {
            name: 'Marvel Colouring Book',
            imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/61bFqcCcf9L._SX379_BO1,204,203,200_.jpg',
            price: (10 + Math.round(Math.random() * 100)),
            rating: Math.round(Math.random() * 5),
            binding: 'Paperback',
            publisher: 'None',
            releaseDate: '1 December 2015',
            description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.'
        }, {
            name: 'School Zone Learning To Write I Know It Book',
            imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/61DdSRo2LTL.jpg',
            price: (10 + Math.round(Math.random() * 100)),
            rating: Math.round(Math.random() * 5),
            binding: 'Paperback',
            publisher: 'Hinkler Books',
            releaseDate: '12 December 2016',
            description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.'
        }, {
            name: 'Lift The Flap Questions and Answers about our world',
            imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/51p83MXbvQL._SX390_BO1,204,203,200_.jpg',
            price: (10 + Math.round(Math.random() * 100)),
            rating: Math.round(Math.random() * 5),
            binding: 'Paperback',
            publisher: 'Daynes',
            releaseDate: '21 Semptember 2016',
            description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.'
        }, {
            name: 'Ivy and the Inky Butterfly',
            imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/71bw3t1sLxL._SX422_BO1,204,203,200_.jpg',
            price: (10 + Math.round(Math.random() * 100)),
            rating: Math.round(Math.random() * 5),
            binding: 'Paperback',
            publisher: 'Johanna Basford ',
            releaseDate: '16 October 2016',
            description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.'
        },
    ]

    return {
        getBooks: function () {
            return books;
        }
    }
});

myApp.controller('HeaderCtrl', function ($scope, $location) {
    $scope.appDetails = {
        title: 'Bookart',
        tagline: 'We have a huge collection of books for you'
    };

    $scope.nav = {};
    $scope.nav.isActive = function (path) {
        if (path === $location.path()) {
            return true;
        }
        return false;
    }
});

myApp.controller('BookListCtrl', function ($scope, bookService, kartService) {
    $scope.books = bookService.getBooks();

    $scope.addToKart = function (book) {
        kartService.addToKart(book);
    }
});

myApp.controller('KartListCtrl', function ($scope, kartService) {
    $scope.kart = kartService.getKart();
    $scope.cost = kartService.getCost();

    $scope.remove = function (book) {
        kartService.remove(book);
        $scope.cost = kartService.getCost();
    }

});