/**
 * Makes a request to a parsed url and returns a jQuery object to caller in order to handle result states
 * @param {string} url - full path or relative path url
 */
MovieDB.helpers.request = function (url) {

    //for full path urls
    if (url.indexOf('http') != 0) {

        //add missing '/'
        if (url.indexOf('/') != 0)
            url = '/' + url;

        url = MovieDB.settings.apiBaseUrl + url;
    }

    if (url.indexOf(MovieDB.enums.urlParams.apiKey + '=') < 0)
        url += '{0}{1}={2}'.format(url.indexOf('?') > 0 ? '&' : '?', MovieDB.enums.urlParams.apiKey, MovieDB.settings.apiKey);

    return $.ajax({
        url: url,
        method: 'GET',
        contentType: 'application/json;charset=utf-8'
    });
};

/**
 * Loads an array of 'MovieDB.models.movieListItem' objects from Api call.
 * @param {MovieDB.models.loadMovieListParams} params - contains all params that should be used in order to retrieve correct data
 */
MovieDB.helpers.loadMoviesList = function (params) {
    var path = '/discover/movie';
    var qsParams = [];

    //if for any case params are not parsed, return a call without parameters
    if (!params)
        return MovieDB.helpers.request(path);

    if (params.sortBy)
        qsParams.push('{0}={1}'.format(MovieDB.enums.urlParams.movieList.sortBy, params.sortBy));

    if (params.page)
        qsParams.push('{0}={1}'.format(MovieDB.enums.urlParams.movieList.page, params.page));

    return MovieDB.helpers.request('{0}?{1}'.format(path, qsParams.join('&')));
}

MovieDB.helpers.loadMovieDetails = function (movieId) {
    return MovieDB.helpers.request('/movie/{0}'.format(movieId))
}

MovieDB.helpers.setQueryStringMovieId = function (movieId) {

    var newUrl = null;
    if (movieId != undefined) {
        newUrl = '{0}{1}?{2}={3}'.format(window.location.origin, window.location.pathname, MovieDB.enums.urlParams.movieDetails.movieId, movieId);
    }
    else {
        newUrl = '{0}{1}'.format(window.location.origin, window.location.pathname);
    }

    window.history.pushState(null, "Movie Url change", newUrl);
}

MovieDB.helpers.getUrlParameter = function (paramName) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === paramName) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
};