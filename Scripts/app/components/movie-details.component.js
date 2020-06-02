/*
 * Component that loads and shows movie details
 * 
 * Params:
 * selectedMovieId<Observable | int> - preselected movie ID
 */
ko.components.register('movie-details', {
    template: {
        element: 'moviedb-component-template-movie-details'
    },
    viewModel: function (params) {
        var self = this;

        self.helpers = MovieDB.helpers;

        if (ko.isObservable(params.selectedMovieId))
            self.selectedMovieId = params.selectedMovieId;
        else
            self.selectedMovieId = ko.observable(params.selectedMovieId);

        //load movie details every time that selectedMovieId is changed
        self.selectedMovieId.subscribe(function (newId) {
            if (newId)
                self.loadMovieDetails(newId);
            else {
                self.selectedMovie(null);
                self.helpers.setQueryStringMovieId(null)
            }
        });

        self.selectedMovie = ko.observable();

        //states for loading state from Api call and used by e.g. preloader
        self.loading = ko.observable(false);

        self.errorThrown = ko.observable();

        /**
         * Load movie details from Api call
         * @param {int} movieId
         */
        self.loadMovieDetails = function (movieId) {
            if (!movieId)
                return;

            self.loading(true);
            self.errorThrown(null);

            self.helpers.loadMovieDetails(movieId)
                .done(function (data) {
                    if (!data) {
                        var error = new MovieDB.models.error(
                            {
                                code: '10',
                                severity: MovieDB.enums.error.severity.warning,
                                message: 'No data loaded for current movie'
                            }
                        );

                        self.errorThrown(error);
                        return false;
                    }

                    self.selectedMovie(new MovieDB.models.movie(data));
                })
                .fail(function (jqXHR, textStatus, errorThrown) {
                    var error = new MovieDB.models.error(
                        {
                            code: '11',
                            severity: MovieDB.enums.error.severity.error,
                            message: '{0}<br/>{1}'.format('An error has been occured with following message:', jqXHR.responseJSON.status_message)
                        }
                    );
                    self.errorThrown(error);
                })
                .always(function () {
                    self.loading(false);
                });

            return false;
        };

        self.unselectMovie = function () {
            self.selectedMovieId(null);
            return false;
        };

        self.reloadMovieDetails = function () {
            self.loadMovieDetails(self.selectedMovieId());
            return false;
        };

        //loads movie details if movieId is initially set
        if (self.selectedMovieId()) {
            self.loadMovieDetails(self.selectedMovieId());
        }
    }
});