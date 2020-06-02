/**
 * Model used in lists of movies. Contains minimal info required in order to be displayed.
 * @param {any} data
 */
MovieDB.models.movieListItem = function (data) {
	var self = this;

	if (!data)
		data = {};

	self.id = data.id || 0;
	self.title = data.title || '';
};