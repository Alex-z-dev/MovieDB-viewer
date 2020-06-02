/**
 * Model used for structuring all the available options to retrieve movies list
 * @param {any} data
 */
MovieDB.models.loadMovieListParams = function (data) {
	var self = this;

	if (!data)
		data = {};

	self.sortBy = data.sortBy || '';
	self.page = data.page || 1;

};