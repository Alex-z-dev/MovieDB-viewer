var MovieDB = {
    helpers: {},
    settings: {},
    models: {},
    enums: {}
};

$(document).ready(function () {
    var vm = new MainViewModel();
    ko.applyBindings(vm, document.getElementById('main-container'));
});