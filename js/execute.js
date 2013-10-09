jQuery(function() {

  if(typeof(Worker) == 'undefined') {
    alert('Your browser does not support web Workers');
    return false;
  }

  // Build a worker
  var worker = new Worker("js/algebra_worker.js");

  // Listen for incoming messages
  worker.onmessage = function(e) {

    window[e.data.cmd].apply(this||window, e.data.parameters);

  };

  $('button').on('click', function() {

    $('textarea').html('');

    digits          = $('input#digits').val().replace(/ /g, '').split(',');
    digits_once     = $('input#digits_once').is(':checked');
    operators       = $('input#operators').val().replace(/ /g, '').split(',');
    operators_once  = $('input#operators_once').is(':checked');
    desired_result  = $('input#desired_result').val();
    max_length      = $('input#max_length').val() || 10;

    worker.postMessage({
      cmd: 'calculate',
      parameters: [
        digits,
        digits_once,
        operators,
        operators_once,
        desired_result,
        max_length
      ]
    });
  });
});

var log = function(message, textarea) {

  if(typeof(textarea) !== 'object') {
    if(typeof(textarea) == 'string') {
      textarea = $('textarea#' + textarea);
    }
    else {
      textarea = $('textarea#debug');
    }
  }

  if(textarea.html() !== '') {
    textarea.append('\n');
  }
  
  textarea.append(message);
  textarea.scrollTop(textarea[0].scrollHeight);

}