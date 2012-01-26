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
    Event.observe(document, 'keydown', ks_keydown);
    Event.observe(document, 'keypress', ks_keypress);
  });

  /* try to play nicely with forms, so no keyboard shortcuts */
  function ks_in_form() {
    return document.activeElement == null || 'INPUT' == document.activeElement.tagName
        || 'TEXTAREA' == document.activeElement.tagName;
  }

  function ks_get_keycode(event) {
    if (event == null) {
      event = window.event;
    }

    if (event.keyCode) {
      return event.keyCode;
    }

    if (event.which) {
      return event.which;
    }

    return null;
  }

  function ks_keydown(e) {
    /* always hide the shortcuts help, if user hits '?' again, re-display it */
    ks_hide_help();

    // ---

    if (ks_in_form()) {
      return;
    }

    // ---

    var ks_code = ks_get_keycode(e);

    if (ks_code != null) {
      switch (ks_code) {
        case Event.KEY_RETURN:
          if (ks_is_view_selector) {
            ks_view_selector_open();
          }
          else if (ks_is_job_selector) {
            ks_job_selector_open();
          }
          else if (ks_is_permalink_selector) {
            ks_permalink_selector_open();
          }
          break;

        case Event.KEY_ESC:
          if (ks_is_view_selector) {
            ks_view_selector_hide();
          }
          else if (ks_is_job_selector) {
            ks_job_selector_hide();
          }
          else if (ks_is_permalink_selector) {
            ks_permalink_selector_hide();
          }
          break;

        case Event.KEY_LEFT:
        case Event.KEY_UP:
          if (ks_is_view_selector) {
            ks_view_selector_prev();
          }
          else if (ks_is_job_selector) {
            ks_job_selector_prev();
          }
          else if (ks_is_permalink_selector) {
            ks_permalink_selector_prev();
          }
          break;

        case Event.KEY_RIGHT:
        case Event.KEY_DOWN:
          if (ks_is_view_selector) {
            ks_view_selector_next();
          }
          else if (ks_is_job_selector) {
            ks_job_selector_next();
          }
          else if (ks_is_permalink_selector) {
            ks_permalink_selector_next();
          }
          break;

        case Event.KEY_HOME:
        case Event.KEY_PAGEUP:
          if (ks_is_view_selector) {
            ks_view_selector_first();
          }
          else if (ks_is_job_selector) {
            ks_job_selector_first();
          }
          else if (ks_is_permalink_selector) {
            ks_permalink_selector_first();
          }
          break;

        case Event.KEY_END:
        case Event.KEY_PAGEDOWN:
          if (ks_is_view_selector) {
            ks_view_selector_last();
          }
          else if (ks_is_job_selector) {
            ks_job_selector_last();
          }
          else if (ks_is_permalink_selector) {
            ks_permalink_selector_last();
          }
          break;
      }
    }
  }

  function ks_keypress(e) {
    /* always hide the shortcuts help, if user hits '?' again, re-display it */
    ks_hide_help();

    // ---

    if (ks_in_form()) {
      return;
    }

    // ---

    var ks_code = ks_get_keycode(e);
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
          ks_job_selector_show();
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
            ks_permalink_selector_show();
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
          ks_view_selector_show();
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
        // console.debug('code: ' + ks_code + ', character: ' + ks_character);
        break;
    }

    ks_previous_code = ks_code;
    ks_previous_character = String.fromCharCode(ks_code);
  }

  function ks_is_job() {
    return typeof ks_is_job_page != 'undefined' && ks_is_job_page;
  }

  function ks_is_view() {
    return typeof ks_is_view_page != 'undefined' && ks_is_view_page;
  }

  function ks_show_help() {
    $('ks-help').show();
  }

  function ks_hide_help() {
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
    ks_hide_help();
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
    if (typeof ks_view_job_selected != 'undefined') {
      window.location.href = ks_url + '/' + ks_url_view + '/job/' + ks_view_job_selected;
    }
  }

  // ----------------------------------------------------------------------- //
  // ----------------------------------------------------------------------- //

  /*
   * View Selector stuff
   */

  var ks_view_selector_input;
  var ks_view_selector_selected;

  function ks_view_selector_select(view) {
    console.debug('ks_view_selector_select(' + view + ')');
    if (typeof ks_is_view_selector != 'undefined') {
      if (ks_is_view_selector) {
        ks_view_names.each(function(v) {
          $('view_selector_' + v).removeClassName('ks-view-selector-selected');
        });

        ks_view_selector_selected = view
        $('view_selector_' + view).addClassName('ks-view-selector-selected');
      }
    }
  }

  function ks_view_selector_first() {
    ks_view_selector_select(ks_view_names[0]);
  }

  function ks_view_selector_hide() {
    $('ks-view-selector').hide();
    ks_is_view_selector = false;
  }

  function ks_view_selector_last() {
    ks_view_selector_select(ks_view_names[ks_view_names.length - 1]);
  }

  function ks_view_selector_next() {
    var idx = ks_view_names.indexOf(ks_view_selector_selected) + 1;
    if (idx >= ks_view_names.length) {
      idx = 0;
    }

    ks_view_selector_select(ks_view_names[idx]);
  }

  function ks_view_selector_open() {
    if (typeof ks_view_selector_selected != 'undefined') {
      ks_view_selector_hide();
      window.location.href = ks_url + '/view/' + ks_view_selector_selected;
    }
  }

  function ks_view_selector_prev() {
    var idx = ks_view_names.indexOf(ks_view_selector_selected) - 1;
    if (idx < 0) {
      idx = ks_view_names.length - 1;
    }

    ks_view_selector_select(ks_view_names[idx]);
  }

  function ks_view_selector_show() {
    $('ks-view-selector').show();
    if (typeof ks_view_names != 'undefined') {
      $('ks-view-selector-views').innerHTML = ks_view_names.map(function(view) {
        return '<li id="view_selector_#{view}">#{view}</li>'.interpolate({
          view : view
        });
      }).join('');
    }
    ks_is_view_selector = true;
  }

  // ----------------------------------------------------------------------- //
  // ----------------------------------------------------------------------- //

  /*
   * Job Selector stuff
   */

  var ks_job_selector_input;
  var ks_job_selector_selected;

  function ks_job_selector_select(job) {
    console.debug('ks_job_selector_select(' + job + ')');
    if (typeof ks_is_job_selector != 'undefined') {
      if (ks_is_job_selector) {
        ks_job_names.each(function(v) {
          $('job_selector_' + v).removeClassName('ks-job-selector-selected');
        });

        ks_job_selector_selected = job
        $('job_selector_' + job).addClassName('ks-job-selector-selected');
      }
    }
  }

  function ks_job_selector_first() {
    ks_job_selector_select(ks_job_names[0]);
  }

  function ks_job_selector_hide() {
    $('ks-job-selector').hide();
    ks_is_job_selector = false;
  }

  function ks_job_selector_last() {
    ks_job_selector_select(ks_job_names[ks_job_names.length - 1]);
  }

  function ks_job_selector_next() {
    var idx = ks_job_names.indexOf(ks_job_selector_selected) + 1;
    if (idx >= ks_job_names.length) {
      idx = 0;
    }

    ks_job_selector_select(ks_job_names[idx]);
  }

  function ks_job_selector_open() {
    if (typeof ks_job_selector_selected != 'undefined') {
      ks_job_selector_hide();
      window.location.href = ks_url + '/job/' + ks_job_selector_selected;
    }
  }

  function ks_job_selector_prev() {
    var idx = ks_job_names.indexOf(ks_job_selector_selected) - 1;
    if (idx < 0) {
      idx = ks_job_names.length - 1;
    }

    ks_job_selector_select(ks_job_names[idx]);
  }

  function ks_job_selector_show() {
    $('ks-job-selector').show();
    if (typeof ks_job_names != 'undefined') {
      $('ks-job-selector-jobs').innerHTML = ks_job_names.map(function(job) {
        return '<li id="job_selector_#{job}">#{job}</li>'.interpolate({
          job : job
        });
      }).join('');
    }
    ks_is_job_selector = true;
  }

  // ----------------------------------------------------------------------- //
  // ----------------------------------------------------------------------- //

  /*
   * Permalink Selector stuff
   */

  var ks_permalink_selector_input;
  var ks_permalink_selector_selected;

  function ks_permalink_selector_select(permalink) {
    console.debug('ks_permalink_selector_select(' + permalink + ')');
    if (ks_is_permalink_selector) {
      ks_permalinks.collect(function(e) {
        return $H(e).get('id');
      }).each(function(id) {
        $('permalink_selector_' + id).removeClassName('ks-permalink-selector-selected');
      });

      ks_permalink_selector_selected = permalink
      $('permalink_selector_' + permalink).addClassName('ks-permalink-selector-selected');
    }
  }

  function ks_permalink_selector_first() {
    ks_permalink_selector_select($H(ks_permalinks[0]).get('id'));
  }

  function ks_permalink_selector_hide() {
    $('ks-permalink-selector').hide();
    ks_is_permalink_selector = false;
  }

  function ks_permalink_selector_last() {
    ks_permalink_selector_select($H(ks_permalinks[ks_permalinks.length - 1]).get('id'));
  }

  function ks_permalink_selector_next() {
    var idx = ks_permalinks.collect(function(e) {
      return $H(e).get('id');
    }).indexOf(ks_permalink_selector_selected) + 1;
    if (idx >= ks_permalinks.length) {
      idx = 0;
    }

    ks_permalink_selector_select($H(ks_permalinks[idx]).get('id'));
  }

  function ks_permalink_selector_open() {
    if (typeof ks_permalink_selector_selected != 'undefined') {
      ks_permalink_selector_hide();
      window.location.href = ks_url + ks_url_job + '/' + ks_permalink_selector_selected;
    }
  }

  function ks_permalink_selector_prev() {
    var idx = ks_permalinks.collect(function(e) {
      return $H(e).get('id');
    }).indexOf(ks_permalink_selector_selected) - 1;
    if (idx < 0) {
      idx = ks_permalinks.length - 1;
    }

    ks_permalink_selector_select($H(ks_permalinks[idx]).get('id'));
  }

  function ks_permalink_selector_show() {
    $('ks-permalink-selector').show();
    if (typeof ks_permalinks != 'undefined') {
      $('ks-permalink-selector-permalinks').innerHTML = ks_permalinks.map(function(permalink) {
        return '<li id="permalink_selector_#{id}">#{displayName}</li>'.interpolate($H(permalink));
      }).join('');
    }
    ks_is_permalink_selector = true;
  }
}

0;
