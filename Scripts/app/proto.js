/**
 * Prototype used for string formatting, replacing the '{0}', '{1}' definitions with related arguments passed.
 * E.g. '{0}|{1}'.format('a', 'b') => 'a|b'
 * */
String.prototype.format = function () {
    var formatted = this;
    for (var arg in arguments) {
        formatted = formatted.replace("{" + arg + "}", arguments[arg]);
    }
    return formatted;
};