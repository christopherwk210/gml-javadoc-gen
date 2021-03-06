// Get element references
var comment = document.getElementById('comment');
var output = document.getElementById('output');
var check = document.getElementById('arg');
var select = document.getElementById('select-text');

// Default JavaDoc strings
var desc = '/// @description ';
var param = '/// @param ';

// Change between arg and param based on checkbox state
var changeParam = function() {
  param = check.checked ? '/// @arg ' : '/// @param ';
}

var handleUpdate = function() {
  // Check the arg box
  changeParam();

  // Output string
  var javaDocStr = '';

  // Remove slashes in the front and trim
  var noSlashes = comment.value.replace(/(^[/]+)/g, '').trim();

  // Regex for GML function
  var pattern = /(^[A-Za-z_])([A-Za-z_0-9])*(\s?)(\()(\s*)(([A-Za-z_])([A-Za-z_0-9])*)+(((\s*)([,]?)(\s*)([A-Za-z_])([A-Za-z_0-9])*)*(\s*)(\)))/g;

  // Test the regex
  if (pattern.test(noSlashes)) {
    // Get just the function name
    var funcName = noSlashes.substring(0, noSlashes.indexOf('('));

    // Get the arguments
    var args = noSlashes.substring(noSlashes.indexOf('(') + 1, noSlashes.indexOf(')'));
    args = args.replace(/\s/g,'');
    args = args.split(',');

    // Set up output string
    javaDocStr += desc + funcName + '\n';

    // Add args to output
    for (var i = 0; i < args.length; i++) {
      javaDocStr += param + args[i] + '\n';
    }

    // Display output
    output.value = javaDocStr;
  } else {
    // Reset
    output.value = '';
  }
}

var handleSelectText = function() {
  // Select output box
  output.select();
}

// Listen for changes
check.addEventListener('change', handleUpdate);
comment.addEventListener('input', handleUpdate);
select.addEventListener('click', handleSelectText);
