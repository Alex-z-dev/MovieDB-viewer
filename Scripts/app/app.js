//predefine app's settings object
var MovieDB = {
    helpers: {},
    settings: {},
    models: {},
    enums: {}
};

//loads MainViewModel to element with id 'main-container'
$(document).ready(function () {
    var vm = new MainViewModel();
    ko.applyBindings(vm, document.getElementById('main-container'));
});