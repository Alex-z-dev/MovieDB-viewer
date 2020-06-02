/*
 * Component for simple preloader
 * 
 * Params:
 * loading<Observable> - controls the preloader and its visibility
 */
ko.components.register('preloader', {
    template: {
        element: 'moviedb-component-template-preloader'
    },
    viewModel: function (params) {
        var self = this;

        self.loading = params.loading != undefined ? params.loading : false;
    }
});