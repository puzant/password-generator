  var Letters = 'abcdefghijklmnopwrstuvwxyz'.split('');
  var Capitals = 'ABCDEFGHIJKLMNOPWRSTUVWXYZ'.split('');
  var Numbers = '0123456789'.split('');
  var Symbols = '!@#$%^&*-_=+\|:;\',.>/?~'.split('');
  var passwordOutput = document.getElementById('password-output');

  // var length = parseInt(passwordLength);

  var newPassword = '';

  var criteria = {
    'numbers': true,
    'capitals': true,
    'symbols': true,
    'pronounceable': false,
    'length': 32,
  };

  function generatePassword(options) {
    document.getElementById('password-wrapper').classList.remove('yellow', 'green', 'red');
    document.getElementById('PasswordStrength').style.visibility = 'hidden';
    //generate the password
    newPassword = '';
    if (!criteria.pronounceable) {
      var dictionary = Letters.concat(
          criteria.numbers ? Numbers : [],
          criteria.capitals ? Capitals : [],
          criteria.symbols ? Symbols : [],
      );
      for (var i = 0; i < criteria.length; i++) {
        newPassword += dictionary[Math.floor(Math.random() * dictionary.length)];
      }
    } else {
      var letters = [
        'bcdfghjklmnpqrstvwxz', // Consonants
        'aeiouy', // Vowels
      ];

      if (criteria.capitals) {
        letters.push('BCDFGHJKLMNPQRSTVWXZ');
        letters.push('AEIOUY');
      }
      var curKey = Math.floor(Math.random() * letters.length);
      for (var i = 0; i < criteria.length; i++) {
        newPassword += randomItem(letters[curKey]);
        curKey = (curKey + 1) % letters.length;
      }
    }

    passwordOutput.innerHTML = newPassword.split('-').join('&#8209;');
    if (options && options.strength) passwordStrength(newPassword);
  }

  function randomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  var passwordLength = document.getElementById('password-length');
  var passwordLengthSpan = document.getElementById('display-password-length');

  passwordLength.addEventListener('input', function() {
    passwordLengthSpan.innerHTML = passwordLength.value;
    criteria.length = passwordLength.value;
    generatePassword();
    saveToLocalStorage(criteria);
  });

  passwordLength.addEventListener('touchend', function() {
    generatePassword({strength: true});
  });

  passwordLength.addEventListener('mouseup', function() {
    generatePassword({strength: true});
  });

  document.onkeydown = function(evt) {   //detect key presses
    evt = evt || window.event;
    if (evt.keyCode == 13) {
      generatePassword({strength: true});
    }
    else if (evt.keyCode == 67) {
      copyToClipboard();
    } else if (evt.keyCode == 85) {
      toggleButton('btnCapitals');
    } else if (evt.keyCode == 78) {
      toggleButton('btnNumbers');
    } else if (evt.keyCode == 83) {
      toggleButton('btnSymbols');
    } else if (evt.keyCode == 80) {
      toggleButton('btnPronoun');
    }
  };

  function applyLocalStorage() {
    // read from localstorage
    criteria = localStorage.getItem('userPrefs') ? JSON.parse(localStorage.getItem('userPrefs')) : criteria;
    if (typeof criteria.length === 'string') criteria.length = parseInt(criteria.length);
    passwordLength.value = criteria.length;
    passwordLengthSpan.innerHTML = criteria.length;
    applyCssClasses(criteria);
    generatePassword({strength: true});
  }

  function saveToLocalStorage(criteria) {
    // save to localstorage
    var prefs = criteria;
    localStorage.setItem('userPrefs', JSON.stringify(prefs));
  }

  function applyCssClasses(criteria) {
    // body...
    if (criteria.numbers) {
      document.getElementById('btnNumbers').classList.add('checked');
    } else {
      document.getElementById('btnNumbers').classList.remove('checked');
    }
    if (criteria.capitals) {
      document.getElementById('btnCapitals').classList.add('checked');
    } else {

    }
    if (criteria.symbols) {
      document.getElementById('btnSymbols').classList.add('checked');
    } else {
      document.getElementById('btnSymbols').classList.remove('checked');
    }
    if (criteria.pronounceable) {
      document.getElementById('btnPronoun').classList.add('checked');
    } else {
      document.getElementById('btnPronoun').classList.remove('checked');
    }

  }

  function passwordStrength(password) {
    var result = {};
    if (password.length > 100) {
      result = {score: 4};
    } else {
      result = zxcvbn(password);
    }
    if (result.score == 1 || result.score == 2) {
      var color = document.getElementById('password-wrapper').classList.add('red');
      var removeColor = document.getElementById('password-wrapper').classList.remove('yellow', 'green');
      document.getElementById('password-text').innerHTML = 'Weak password';
      //change backroud color based on result
      document.getElementById('invalidPass').style.display = 'block';
      document.getElementById('validPass').style.display = 'none';
      document.getElementById('password-generator').style.backgroundColor = '#4d0e0e';
      console.log('weak');
    } else if (result.score == 3) {
      var color = document.getElementById('password-wrapper').classList.add('yellow');
      var removeColor = document.getElementById('password-wrapper').classList.remove('red', 'green');
      document.getElementById('password-text').innerHTML = 'Safe password';
      document.getElementById('password-generator').style.backgroundColor = '#4a2101';

      document.getElementById('invalidPass').style.display = 'none';
      document.getElementById('validPass').style.display = 'block';

      console.log('somehow safe');
    } else if (result.score == 4) {
      var color = document.getElementById('password-wrapper').classList.add('green');
      var removeColor = document.getElementById('password-wrapper').classList.remove('red', 'yellow');
      document.getElementById('password-text').innerHTML = 'Strong password';

      document.getElementById('invalidPass').style.display = 'none';
      document.getElementById('validPass').style.display = 'block';

      document.getElementById('password-generator').style.backgroundColor = '#0d391d';

    }
    document.getElementById('PasswordStrength').style.visibility = 'visible';
  }

  function toggleButton(id) {
    switch (id) {
    case 'btnNumbers':
      criteria.numbers = !criteria.numbers;
      var active = document.getElementById(id);
      criteria.pronounceable = false;
      active.classList.toggle('checked');
      break;
    case 'btnCapitals':
      criteria.capitals = !criteria.capitals;
      var active = document.getElementById(id);
      active.classList.toggle('checked');
      break;
    case 'btnSymbols':
      criteria.symbols = !criteria.symbols;
      var active = document.getElementById(id);
      criteria.pronounceable = false;
      active.classList.toggle('checked');
      break;
    case 'btnPronoun':
      criteria.pronounceable = !criteria.pronounceable;
      if (criteria.pronounceable) {
        var active = document.getElementById(id);
        active.classList.toggle('checked');
        criteria.numbers = false;
        criteria.symbols = false;
      }
      break;
    }

    applyCssClasses(criteria);

    generatePassword({strength: true});
    saveToLocalStorage(criteria);
  }

  function copyToClipboard() {
    var copyText = document.getElementById("password-output");
    console.log(copyText);
    var textArea = document.createElement("textarea");
    var yPosition = window.pageYOffset || document.documentElement.scrollTop;
    textArea.style = "opacity:0; fontSize: 12pt; border:0; padding:0; margin:0; position: absolute; left: -99999px; top:"+yPosition+"px;";
    textArea.value = copyText.textContent;

    textArea.readOnly = true;
    document.body.appendChild(textArea);

    function isOS() {
      return navigator.userAgent.match(/ipad|iphone/i);
    }
    if (isOS()) {
      var range = document.createRange();
      range.selectNodeContents(textArea);
      var selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      textArea.setSelectionRange(0, 999999);
      window.scrollTo({top:yPosition})
    } else {
      textArea.select();
    }
    document.execCommand('copy');
    textArea.remove();

    var x = document.getElementById("snackbar");
    x.className = "show";
    setTimeout(function(){
      x.className = x.className.replace("show", "");
    }, 3000);

    // document.getElementById("copy-shortcut").style.visibility = "hidden";
    var text = document.getElementsByClassName('copy')[0].innerHTML = '<i class="fa fa-check"></i>';

    setTimeout(function(){
      document.getElementsByClassName("copy")[0].innerHTML = 'Copy password <span id="copy-shortcut" class="shortcuts">(C)</span>'
    }, 2000);
  }

  document.addEventListener('DOMContentLoaded', function() {
    applyLocalStorage();
  })
