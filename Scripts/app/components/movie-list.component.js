/*
 * Component that represents a list of movies
 * 
 * Params:
 * movies<array> - array of movies that should be showed
 * selectedMovieId<Observable | int> - preselected movie ID
 * preloadMovies<bool> - defines if component should preload popular movies on its own or not
 */
ko.components.register('movie-list', {
    template: {
        element: 'moviedb-component-template-movie-list'
    },
    viewModel: function (params) {
        var self = this;

        self.helpers = MovieDB.helpers;
        var urlParamEnums = MovieDB.enums.urlParams;

        if (ko.isObservable(params.movies))
            self.movies = params.movies;
        else
            self.movies = ko.observableArray(params.movies);

        if (ko.isObservable(params.selectedMovieId))
            self.selectedMovieId = params.selectedMovieId;
        else
            self.selectedMovieId = ko.observable(params.selectedMovieId);

        self.preloadMovies = params.preloadMovies != undefined ? params.preloadMovies : true;

        //states for loading state from Api call and used by e.g. preloader
        self.loading = ko.observable(false);

        self.errorThrown = ko.observable();

        self.selectMovie = function (movieData) {
            self.selectedMovieId(movieData.id);
            self.helpers.setQueryStringMovieId(movieData.id)
            return false;
        };

        //total number of movie list pages in the db
        self.totalPages = ko.observable(1000);

        //page number of the list
        self.page = ko.observable(1);
        self.page.subscribe(function (newPageNum) {
            if (newPageNum < 0 || newPageNum >= self.totalPages())
                return;

            self.loadPopularMovies();
        });
        

        /**
         * loads a list with all popular movies
         * */
        self.loadPopularMovies = function () {

            self.loading(true);
            self.errorThrown = ko.observable(null);

            var params = new MovieDB.models.loadMovieListParams();
            params.sortBy = urlParamEnums.movieListSorting.popularityDesc;
            params.page = self.page();

            self.helpers.loadMoviesList(params)
                .done(function (data) {
                    if (!data || !data.results) {
                        var error = new MovieDB.models.error(
                            {
                                code: '101',
                                severity: MovieDB.enums.error.severity.error,
                                message: 'No data loaded for movies'
                            }
                        );

                        self.errorThrown(error);
                        return;
                    }

                    if (data.results.length == 0) {
                        var error = new MovieDB.models.error(
                            {
                                code: '102',
                                severity: MovieDB.enums.error.severity.info,
                                message: 'Currently there are no movies in the list. Please visit us later.'
                            }
                        );

                        self.errorThrown(error);
                    }

                    self.totalPages(data.total_pages);

                    //load all movie data list
                    ko.utils.arrayForEach(data.results, function (itm) {
                        self.movies.push(new MovieDB.models.movieListItem(itm));
                    });
                })
                .fail(function (jqXHR, textStatus, errorThrown) {
                    var error = new MovieDB.models.error(
                        {
                            code: '103',
                            severity: MovieDB.enums.error.severity.error,
                            message: jqXHR.responseJSON.status_message
                        }
                    );

                    self.errorThrown(error);
                })
                .always(function () {
                    self.loading(false);
                });
        };

        //increases page number to load next part of movie list
        self.increasePageNumber = function () {
            if (self.page() >= self.totalPages())
                return;

            self.page(self.page() + 1);
        }

        if (self.preloadMovies) {
            self.loadPopularMovies();
        }

    }    
});