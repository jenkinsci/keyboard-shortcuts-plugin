/*
 * The MIT License
 * 
 * Copyright (c) 2012, Jesse Farinacci
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

if (keyboard_shortcuts_enabled) {
  var keyboard_shortcuts_previous_code;
  var keyboard_shortcuts_previous_char;
  var keyboard_shortcuts_view_job_selected;

  Event.observe(window, 'load', function() {
    Event.observe(document, 'keypress', function(e) {

      /* try to play nicely with forms, so no keyboard shortcuts */
      var activeElement = document.activeElement;
      if (activeElement == null || 'INPUT' == activeElement.tagName) {
        return;
      }

      // ---

      var keyboard_shortcuts_code;

      if (!e) {
        e = window.event;
      }

      if (e.keyCode) {
        keyboard_shortcuts_code = e.keyCode;
      }

      else if (e.which) {
        keyboard_shortcuts_code = e.which;
      }

      /* always hide the shortcuts help, if user hits '?' again, re-display it */
      keyboard_shortcuts_hide_keyboard_shortcuts_help();

      var keyboard_shortcuts_character = String.fromCharCode(keyboard_shortcuts_code);

      switch (keyboard_shortcuts_character) {

        case '?':
          keyboard_shortcuts_show_keyboard_shortcuts_help();
          break;

        case '/':
          $('search-box').focus();
          break;

        case 'b':
          if (keyboard_shortcuts_is_job()) {
            window.location.href = keyboard_shortcuts_url + '/' + keyboard_shortcuts_url_job + '/build?delay=0sec';
          }
          break;

        case 'c':
          if (keyboard_shortcuts_previous_character_was_character('g')) {
            if (keyboard_shortcuts_is_job()) {
              window.location.href = keyboard_shortcuts_url + '/' + keyboard_shortcuts_url_job + '/changes';
            }
          }
          break;

        case 'C':
          if (keyboard_shortcuts_previous_character_was_character('g')) {
            if (keyboard_shortcuts_is_job()) {
              window.location.href = keyboard_shortcuts_url + '/' + keyboard_shortcuts_url_job + '/configure';
            }
          }
          break;

        case 'h':
          if (keyboard_shortcuts_previous_character_was_character('g')) {
            window.location.href = keyboard_shortcuts_url;
          }
          break;

        case 'H':
          if (keyboard_shortcuts_previous_character_was_character('g')) {
            if (keyboard_shortcuts_is_view()) {
              window.location.href = keyboard_shortcuts_url + '/' + keyboard_shortcuts_url_view + '/builds';
            }
          }
          break;

        case 'j':
          if (keyboard_shortcuts_previous_character_was_character('g')) {
            window.alert('keyboard_shortcuts_app_job_selector');
          }
          else {
            if (keyboard_shortcuts_is_view()) {
              keyboard_shortcuts_view_job_next();
            }
          }
          break;

        case 'k':
          if (keyboard_shortcuts_is_view()) {
            keyboard_shortcuts_view_job_prev();
          }
          break;

        case 'm':
          if (keyboard_shortcuts_previous_character_was_character('g')) {
            if (keyboard_shortcuts_is_job()) {
              window.location.href = keyboard_shortcuts_url + '/' + keyboard_shortcuts_url_job + '/modules';
            }
            else if (keyboard_shortcuts_is_app()) {
              window.location.href = keyboard_shortcuts_url + '/manage';
            }
          }
          break;

        case 'n':
          if (keyboard_shortcuts_is_view()) {
            keyboard_shortcuts_view_job_next();
          }
          break;

        case 'o':
          if (keyboard_shortcuts_is_view()) {
            keyboard_shortcuts_view_job_open();
          }
          break;

        case 'p':
          if (keyboard_shortcuts_previous_character_was_character('g')) {
            if (keyboard_shortcuts_is_job()) {
              window.alert('keyboard_shortcuts_job_permalink_selector');
            }
            else if (keyboard_shortcuts_is_app()) {
              window.location.href = keyboard_shortcuts_url + '/people';
            }
          }
          else {
            if (keyboard_shortcuts_is_view()) {
              keyboard_shortcuts_view_job_prev();
            }
          }
          break;

        case 'P':
          if (keyboard_shortcuts_previous_character_was_character('g')) {
            if (keyboard_shortcuts_is_job()) {
              window.location.href = keyboard_shortcuts_url + '/' + keyboard_shortcuts_url_job + '/scmPollLog';
            }
            else if (keyboard_shortcuts_is_app()) {
              window.location.href = keyboard_shortcuts_url + '/pluginManager';
            }
          }
          break;

        case 'r':
          window.location.href = window.location.href;
          break;

        case 's':
          if (keyboard_shortcuts_previous_character_was_character('g')) {
            if (keyboard_shortcuts_is_job()) {
              window.location.href = keyboard_shortcuts_url + '/' + keyboard_shortcuts_url_job;
            }
          }
          break;

        case 'v':
          if (keyboard_shortcuts_previous_character_was_character('g')) {
            window.alert('keyboard_shortcuts_app_view_selector');
          }
          break;

        case 'w':
          if (keyboard_shortcuts_previous_character_was_character('g')) {
            if (keyboard_shortcuts_is_job()) {
              window.location.href = keyboard_shortcuts_url_job + '/ws';
            }
          }
          break;

        default:
          console.debug('code: ' + keyboard_shortcuts_code + ', character: ' + keyboard_shortcuts_character);
          break;
      }

      keyboard_shortcuts_previous_code = keyboard_shortcuts_code;
      keyboard_shortcuts_previous_character = String.fromCharCode(keyboard_shortcuts_code);
    });
  });

  function keyboard_shortcuts_is_job() {
    return typeof keyboard_shortcuts_url_job != 'undefined';
  }

  function keyboard_shortcuts_is_view() {
    return typeof keyboard_shortcuts_url_view != 'undefined';
  }

  function keyboard_shortcuts_show_keyboard_shortcuts_help() {
    $('keyboard-shortcuts-help').show();
  }

  function keyboard_shortcuts_hide_keyboard_shortcuts_help() {
    $('keyboard-shortcuts-help').hide();
  }

  function keyboard_shortcuts_previous_character_was_character(character) {
    if (typeof keyboard_shortcuts_previous_character == 'undefined') {
      return false;
    }

    if (typeof character == 'undefined') {
      return false;
    }

    return keyboard_shortcuts_previous_character == character;
  }

  function keyboard_shortcuts_view_job_next() {
    keyboard_shortcuts_hide_keyboard_shortcuts_help();
    if (typeof keyboard_shortcuts_view_job_names != 'undefined') {
      if (keyboard_shortcuts_view_job_names.length > 0) {
        keyboard_shortcuts_view_job_names.each(function(job) {
          $('job_' + job).removeClassName('keyboard-shortcuts-view-job-selected');
        });
        var idx = keyboard_shortcuts_view_job_names.indexOf(keyboard_shortcuts_view_job_selected) + 1;
        if (idx >= keyboard_shortcuts_view_job_names.length) {
          idx = 0;
        }
        keyboard_shortcuts_view_job_selected = keyboard_shortcuts_view_job_names[idx];
        $('job_' + keyboard_shortcuts_view_job_selected).addClassName('keyboard-shortcuts-view-job-selected');
      }
    }
  }

  function keyboard_shortcuts_view_job_prev() {
    if (typeof keyboard_shortcuts_view_job_names != 'undefined') {
      if (keyboard_shortcuts_view_job_names.length > 0) {
        keyboard_shortcuts_view_job_names.each(function(job) {
          $('job_' + job).removeClassName('keyboard-shortcuts-view-job-selected');
        });
        var idx = keyboard_shortcuts_view_job_names.indexOf(keyboard_shortcuts_view_job_selected) - 1;
        if (idx < 0) {
          idx = keyboard_shortcuts_view_job_names.length - 1;
        }
        keyboard_shortcuts_view_job_selected = keyboard_shortcuts_view_job_names[idx];
        $('job_' + keyboard_shortcuts_view_job_selected).addClassName('keyboard-shortcuts-view-job-selected');
      }
    }
  }

  function keyboard_shortcuts_view_job_open() {
    keyboard_shortcuts_hide_keyboard_shortcuts_help();
    if (typeof keyboard_shortcuts_view_job_selected != 'undefined') {
      window.location.href = keyboard_shortcuts_url + '/' + keyboard_shortcuts_url_view + '/job/'
          + keyboard_shortcuts_view_job_selected;
    }
  }
}

0;
