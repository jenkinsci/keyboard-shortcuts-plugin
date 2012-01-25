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

if (ks_enabled) {
  var ks_previous_code;
  var ks_previous_char;
  var ks_view_job_selected;

  Event.observe(window, 'load', function() {
    Event.observe(document, 'keypress', function(e) {

      /* try to play nicely with forms, so no keyboard shortcuts */
      var activeElement = document.activeElement;
      if (activeElement == null || 'INPUT' == activeElement.tagName || 'TEXTAREA' == activeElement.tagName) {
        return;
      }

      // ---

      var ks_code;

      if (!e) {
        e = window.event;
      }

      if (e.keyCode) {
        ks_code = e.keyCode;
      }

      else if (e.which) {
        ks_code = e.which;
      }

      /* always hide the shortcuts help, if user hits '?' again, re-display it */
      ks_hide_ks_help();

      var ks_character = String.fromCharCode(ks_code);

      switch (ks_character) {

        case '?':
          ks_show_help();
          break;

        case '/':
          $('search-box').focus();
          break;

        case 'b':
          if (ks_is_job()) {
            window.location.href = ks_url + '/' + ks_url_job + '/build?delay=0sec';
          }
          else if (ks_is_view()) {
            if (typeof ks_view_job_selected != 'undefined') {
              window.location.href = ks_url + '/job/' + ks_view_job_selected + '/build?delay=0sec';
            }
          }
          break;

        case 'c':
          if (ks_previous_character_was_character('g')) {
            if (ks_is_job()) {
              window.location.href = ks_url + '/' + ks_url_job + '/changes';
            }
          }
          break;

        case 'C':
          if (ks_previous_character_was_character('g')) {
            if (ks_is_job()) {
              window.location.href = ks_url + '/' + ks_url_job + '/configure';
            }
            else if (ks_is_view()) {
              window.location.href = ks_url + '/' + ks_url_view + '/configure';
            }
            else {
              window.location.href = ks_url + '/configure';
            }
          }
          break;

        case 'h':
          if (ks_previous_character_was_character('g')) {
            window.location.href = ks_url;
          }
          break;

        case 'H':
          if (ks_previous_character_was_character('g')) {
            if (ks_is_view()) {
              window.location.href = ks_url + '/' + ks_url_view + '/builds';
            }
          }
          break;

        case 'j':
          if (ks_previous_character_was_character('g')) {
            window.alert('ks_app_job_selector');
          }
          else {
            if (ks_is_view()) {
              ks_view_job_next();
            }
          }
          break;

        case 'k':
          if (ks_is_view()) {
            ks_view_job_prev();
          }
          break;

        case 'm':
          if (ks_previous_character_was_character('g')) {
            if (ks_is_job()) {
              window.location.href = ks_url + '/' + ks_url_job + '/modules';
            }
            else {
              window.location.href = ks_url + '/manage';
            }
          }
          break;

        case 'n':
          if (ks_previous_character_was_character('g')) {
            window.location.href = ks_url + '/computer';
          }
          else {
            if (ks_is_view()) {
              ks_view_job_next();
            }
          }
          break;

        case 'o':
          if (ks_is_view()) {
            ks_view_job_open();
          }
          break;

        case 'p':
          if (ks_previous_character_was_character('g')) {
            if (ks_is_job()) {
              window.alert('ks_job_permalink_selector');
            }
            else {
              window.location.href = ks_url + '/people';
            }
          }
          else {
            if (ks_is_view()) {
              ks_view_job_prev();
            }
          }
          break;

        case 'P':
          if (ks_previous_character_was_character('g')) {
            if (ks_is_job()) {
              window.location.href = ks_url + '/' + ks_url_job + '/scmPollLog';
            }
            else {
              window.location.href = ks_url + '/pluginManager';
            }
          }
          break;

        case 'r':
          window.location.href = window.location.href;
          break;

        case 's':
          if (ks_previous_character_was_character('g')) {
            if (ks_is_job()) {
              window.location.href = ks_url + '/' + ks_url_job;
            }
          }
          break;

        case 't':
          if (ks_previous_character_was_character('g')) {
            if (ks_is_job()) {
              window.location.href = ks_url + '/' + ks_url_job + '/buildTimeTrend';
            }
          }
          break;

        case 'v':
          if (ks_previous_character_was_character('g')) {
            window.alert('ks_app_view_selector');
          }
          break;

        case 'w':
          if (ks_previous_character_was_character('g')) {
            if (ks_is_job()) {
              window.location.href = ks_url + '/' + ks_url_job + '/ws';
            }
          }
          break;

        default:
          console.debug('code: ' + ks_code + ', character: ' + ks_character);
          break;
      }

      ks_previous_code = ks_code;
      ks_previous_character = String.fromCharCode(ks_code);
    });
  });

  function ks_is_job() {
    return typeof ks_is_job_page != 'undefined' && ks_is_job_page;
  }

  function ks_is_view() {
    return typeof ks_is_view_page != 'undefined' && ks_is_view_page;
  }

  function ks_show_help() {
    $('ks-help').show();
  }

  function ks_hide_ks_help() {
    $('ks-help').hide();
  }

  function ks_previous_character_was_character(character) {
    if (typeof ks_previous_character == 'undefined') {
      return false;
    }

    if (typeof character == 'undefined') {
      return false;
    }

    return ks_previous_character == character;
  }

  function ks_view_job_next() {
    ks_hide_ks_help();
    if (typeof ks_view_job_names != 'undefined') {
      if (ks_view_job_names.length > 0) {
        ks_view_job_names.each(function(job) {
          $('job_' + job).removeClassName('ks-view-job-selected');
        });
        var idx = ks_view_job_names.indexOf(ks_view_job_selected) + 1;
        if (idx >= ks_view_job_names.length) {
          idx = 0;
        }
        ks_view_job_selected = ks_view_job_names[idx];
        $('job_' + ks_view_job_selected).addClassName('ks-view-job-selected');
      }
    }
  }

  function ks_view_job_prev() {
    if (typeof ks_view_job_names != 'undefined') {
      if (ks_view_job_names.length > 0) {
        ks_view_job_names.each(function(job) {
          $('job_' + job).removeClassName('ks-view-job-selected');
        });
        var idx = ks_view_job_names.indexOf(ks_view_job_selected) - 1;
        if (idx < 0) {
          idx = ks_view_job_names.length - 1;
        }
        ks_view_job_selected = ks_view_job_names[idx];
        $('job_' + ks_view_job_selected).addClassName('ks-view-job-selected');
      }
    }
  }

  function ks_view_job_open() {
    ks_hide_ks_help();
    if (typeof ks_view_job_selected != 'undefined') {
      window.location.href = ks_url + '/' + ks_url_view + '/job/' + ks_view_job_selected;
    }
  }
}

0;
