importScripts('math.min.js');

onmessage = function(e) {

  algebra[e.data.cmd].apply(algebra, e.data.parameters);

};


var algebra = {

  calculate: function(digits, digits_once, operators, operators_once, desired_result) {

    this.log('Starting calculations...');

    this.desired_result = desired_result;
    this.max_length     = digits.length;

    this.run_digits(digits, digits_once, operators, operators_once, []);

    this.log('All done.');
    this.log('Have a nice day!');


  },

  run_digits: function(digits, digits_once, operators, operators_once, current) {

    if(digits.length < 1) {
      return;
    }

    if(math.floor(current.length / 2) >= this.max_length) {
      return;
    }

    for (var i = 0; i < digits.length; i++) {
      var current_new = current.slice(0);
      current_new.push(digits[i]);
      this.check_calculation(current_new);

      if(current_new.length == 1) {
        this.log('Calculating posibilities with ' + digits[i]);
      }

      if(digits.length > 1) {
        var digits_new = digits.slice(0);
        if(digits_once) {
          digits_new.splice(i, 1);
        }

        this.run_operators(digits_new, digits_once, operators, operators_once, current_new);
      }
    }

  },

  run_operators: function(digits, digits_once, operators, operators_once, current) {

    if(operators.length < 1) {
      return;
    }

    for (var i = 0; i < operators.length; i++) {
      var current_new = current.slice(0);
      current_new.push(operators[i]);

      var operators_new = operators.slice(0);
      if(operators_once) {
        operators_new.splice(i, 1);
      }

      this.run_digits(digits, digits_once, operators_new, operators_once, current_new);
    }

  },

  check_calculation: function(current) {

    expression = current.join('');
    //this.log('Calculating: ' + expression);

    outcome = math.eval(expression);
    //this.log('Result: ' + outcome);

    if(outcome == this.desired_result) {
      this.log(expression, 'results');
    }

  },

  log: function(message, textarea) {

    postMessage({
      cmd: 'log',
      parameters: [message, textarea]
    });

  }
};