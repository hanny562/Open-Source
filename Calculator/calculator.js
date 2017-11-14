var keys = document.querySelectorAll('#calculator span');
var operators = ['+', '-', 'x', '/', '%', 'Xy'];
var decimalAdded = false;

function calculate(select) {

    var symbol = {
        sum: '+',
        minus: '-',
        div: '/',
        mul: '*',
        mod: '%',
        power: '^'
    };

    symbol.ooo = [[[symbol.sum], [symbol.minus], [symbol.div], [symbol.mul]], [[symbol.mod], [symbol.power]]];

    select = select.replace(/[^0-9%^*\/()\-+.]/g, '');

    var output;
    for (var i = 0, n = symbol.ooo.length; i < n; i++) {

        var re = new RegExp('(\\d+\\.?\\d*)([\\' + symbol.ooo[i].join('\\') + '])(\\d+\\.?\\d*)');
        re.lastIndex = 0;

        while (re.test(select)) {
            output = calc_internal(RegExp.$1, RegExp.$2, RegExp.$3);
            if (isNaN(output) || !isFinite(output)) return output;
            select = select.replace(re, output);
        }
    }

    return output;

    function calc_internal(a, op, b) {
        a = a * 1; b = b * 1;

        if (op == symbol.sum) {
            return a + b;
        }
        else if (op == symbol.minus) {
            return a - b;
        }
        else if (op == symbol.div) {
            return a / b;
        }
        else if (op == symbol.mul) {
            return a * b;
        }
        else if (op == symbol.mod) {
            return a % b
        }
        else if (op == symbol.power) {
            return Math.pow(a, b);
        }
        else {
            return null;
        }
    }
}

