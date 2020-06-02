/**
 * Binding handler used for adding custom-styled scrollbar to a container, when content's height is bigger than container
 * 
 * Params:
 * Options<any> - an object that has a definition for function that should run when scroll reached end of the container. Attribute that defines this function is 'onReachEnd'
 * */
ko.bindingHandlers.scroll = {
    init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
        var el = $(element);
        var binding = allBindings.get('scroll');

        el.niceScroll();

        if (binding.options && typeof (binding.options.onReachEnd) == 'function') {
            el.on('scroll', function () {
                if ($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight) {
                    binding.options.onReachEnd();
                }
            });
        }
    }
};