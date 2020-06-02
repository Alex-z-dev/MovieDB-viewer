/**
 * Model for handling error messages.
 * @param {any} data
 */
MovieDB.models.error = function (data) {
    var self = this;

    if (!data)
        data = {};

    self.code = data.code || '';
    self.severity = data.severity || MovieDB.enums.error.severity.error;
    self.message = data.message || '';

    self.getErrorCssClass = ko.pureComputed(function () {
        var alertClass = 'alert';
        switch (self.severity) {
            case MovieDB.enums.error.severity.info:
                alertClass = '{0} {1}'.format(alertClass, 'alert-info');
                break;
            case MovieDB.enums.error.severity.warning:
                alertClass = '{0} {1}'.format(alertClass, 'alert-warning');
                break;
            case MovieDB.enums.error.severity.error:
                alertClass = '{0} {1}'.format(alertClass, 'alert-danger');
                break;
            default:
                alertClass = '{0} {1}'.format(alertClass, 'alert-danger');
        }

        return alertClass;
    });
}