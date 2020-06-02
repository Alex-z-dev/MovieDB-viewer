/**
 * ViewModel of the movies list page
 * */
function MainViewModel() {
    var self = this;

    self.helpers = MovieDB.helpers;
    self.settings = MovieDB.settings;

    self.selectedMovieId = ko.observable(null);

    //TODO: should be preloaded from URL (if parameter exist)
    self.searchKeyword = ko.observable('');

    var uriMovieId = parseInt(MovieDB.helpers.getUrlParameter(MovieDB.enums.urlParams.movieDetails.movieId));
    if (uriMovieId) {
        self.selectedMovieId(uriMovieId);
    }
}