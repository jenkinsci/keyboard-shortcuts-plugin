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

  Event.observe(window, 'load', function() {
    Event.observe(document, 'keypress', function(e) {
      var keyboard_shortcuts_code;

      console.log('activeElement: ' + document.activeElement);

      if (!e) {
        e = window.event;
      }

      if (e.keyCode) {
        keyboard_shortcuts_code = e.keyCode;
      }

      else
        if (e.which) {
          keyboard_shortcuts_code = e.which;
        }

      switch (keyboard_shortcuts_code) {
        case Event.KEY_BACKSPACE:
        case Event.KEY_DELETE:
        case Event.KEY_ESC:
        case Event.KEY_HOME:
        case Event.KEY_PAGEUP:
        case Event.KEY_PAGEDOWN:
        case Event.KEY_RETURN:
          keyboard_shortcuts_hide_keyboard_shortcuts_help();
          break;

        default: {
          var keyboard_shortcuts_character = String.fromCharCode(keyboard_shortcuts_code);

          switch (keyboard_shortcuts_character) {

            /* generic keyboard shortcuts */

            case 'r':
              keyboard_shortcuts_do_refresh();
              break;

            case '/':
              keyboard_shortcuts_do_focus_search_box();
              break;

            case '?':
              keyboard_shortcuts_show_keyboard_shortcuts_help();
              break;

            /* job related keyboard shortcuts */

            case 'b':
              if (keyboard_shortcuts_is_job()) {
                keyboard_shortcuts_job_do_build_now();
              }
              break;

            case 'c':
              if (keyboard_shortcuts_is_job()) {
                if (keyboard_shortcuts_previous_character_was_character('g')) {
                  keyboard_shortcuts_job_go_changes();
                }
              }
              break;

            case 'C':
              if (keyboard_shortcuts_is_job()) {
                if (keyboard_shortcuts_previous_character_was_character('g')) {
                  keyboard_shortcuts_job_go_configure();
                }
              }
              break;

            case 'h':
              if (keyboard_shortcuts_previous_character_was_character('g')) {
                keyboard_shortcuts_go_home();
              }
              break;

            case 'm':
              if (keyboard_shortcuts_is_job()) {
                if (keyboard_shortcuts_previous_character_was_character('g')) {
                  keyboard_shortcuts_job_go_modules();
                }
              }
              break;

            case 'P':
              if (keyboard_shortcuts_is_job()) {
                if (keyboard_shortcuts_previous_character_was_character('g')) {
                  keyboard_shortcuts_job_go_scm_poll_log();
                }
              }
              break;

            case 's':
              if (keyboard_shortcuts_is_job()) {
                if (keyboard_shortcuts_previous_character_was_character('g')) {
                  keyboard_shortcuts_job_go_status();
                }
              }
              break;

            case 'w':
              if (keyboard_shortcuts_is_job()) {
                if (keyboard_shortcuts_previous_character_was_character('g')) {
                  keyboard_shortcuts_job_go_workspace();
                }
              }
              break;

            default:
              console.debug('code: ' + keyboard_shortcuts_code + ', character: ' + keyboard_shortcuts_character);
              break;
          }
        }
      }

      keyboard_shortcuts_previous_code = keyboard_shortcuts_code;
      keyboard_shortcuts_previous_character = String.fromCharCode(keyboard_shortcuts_code);
    });
  });

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

  function keyboard_shortcuts_is_job() {
    return typeof keyboard_shortcuts_url_job != undefined;
  }

  function keyboard_shortcuts_is_view() {
    return typeof keyboard_shortcuts_url_view != undefined;
  }

  function keyboard_shortcuts_do_refresh() {
    window.location.href = window.location.href;
  }

  function keyboard_shortcuts_do_focus_search_box() {
    $('search-box').focus();
  }

  function keyboard_shortcuts_go_home() {
    window.location.href = keyboard_shortcuts_url;
  }

  function keyboard_shortcuts_job_do_build_now() {
    window.location.href = keyboard_shortcuts_url + '/' + keyboard_shortcuts_url_job + '/build?delay=0sec';
  }

  function keyboard_shortcuts_job_go_changes() {
    window.location.href = keyboard_shortcuts_url + '/' + keyboard_shortcuts_url_job + '/changes';
  }

  function keyboard_shortcuts_job_go_configure() {
    window.location.href = keyboard_shortcuts_url + '/' + keyboard_shortcuts_url_job + '/configure';
  }

  function keyboard_shortcuts_job_go_modules() {
    window.location.href = keyboard_shortcuts_url + '/' + keyboard_shortcuts_url_job + '/modules';
  }

  function keyboard_shortcuts_job_go_scm_poll_log() {
    window.location.href = keyboard_shortcuts_url + '/' + keyboard_shortcuts_url_job + '/scmPollLog';
  }

  function keyboard_shortcuts_job_go_status() {
    window.location.href = keyboard_shortcuts_url + '/' + keyboard_shortcuts_url_job;
  }

  function keyboard_shortcuts_job_go_workspace() {
    window.location.href = keyboard_shortcuts_url_job + '/ws';
  }
}

0;
