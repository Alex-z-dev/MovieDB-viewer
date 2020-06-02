/**
 * Model used for movie data handling
 * @param {any} data
 */
MovieDB.models.movie = function (data) {
	var self = this;
	var settings = MovieDB.settings;

	if (!data)
		data = {};

	self.id = data.id || 0;
	self.title = data.title || '';
	self.overview = data.overview || '';
	self.popularity = data.popularity || 0;
	self.vote_average = data.vote_average || 0;
	self.adult = data.adult != undefined ? data.adult : false;
	self.release_date = data.release_date;
	self.genre_ids = data.genre_ids || [];
	self.original_language = data.original_language;
	self.video = data.video != undefined ? data.video : false;

	self.getPosterUrl = function (posterSize) {
		return '{0}{1}{2}'.format(settings.images.secure_base_url, posterSize, data.poster_path);
	};
};