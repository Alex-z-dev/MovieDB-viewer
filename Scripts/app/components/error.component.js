/*
 * Component for simple error message display
 * 
 * Params:
 * error<MovieDB.models.error> - error data
 * callback<function> - callback function that should be called when clicking the action button. 
 *                      Also, when callback is not set, action button is not showed.
 */
ko.components.register('error-message', {
    template: {
        element: 'moviedb-component-template-error'
    },
    viewModel: function (params) {
        var self = this;

        self.error = params.error;
        self.callback = params.actionCallback;
    }
});