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

package org.jenkins.ci.plugins.keyboard_shortcuts;

import hudson.Extension;
import hudson.model.Item;
import hudson.model.PageDecorator;
import hudson.model.TopLevelItem;
import hudson.model.View;
import jenkins.model.Jenkins;
import net.sf.json.JSONArray;

import org.apache.commons.lang.StringUtils;
import org.kohsuke.stapler.DataBoundConstructor;

/**
 * The <a
 * href="http://wiki.jenkins-ci.org/display/JENKINS/Keyboard+Shortcuts+Plugin">
 * Keyboard Shortcuts Plugin</a> provides keyboard shortcuts to quickly navigate
 * and manage <a href="http://jenkins-ci.org">Jenkins</a>.
 * 
 * @author <a href="mailto:jieryn@gmail.com">Jesse Farinacci</a>
 */
@Extension
public final class KeyboardShortcutsPageDecorator extends PageDecorator
{
  public static String getAllJobNamesAsJson()
  {
    final JSONArray jobNames = new JSONArray();
    jobNames.addAll(JobUtils.getAllJobNames());
    return jobNames.toString();
  }

  public static String getAllViewNamesAsJson()
  {
    final JSONArray viewNames = new JSONArray();
    viewNames.addAll(ViewUtils.getAllViewNames());
    return viewNames.toString();
  }

  public static String getAllViewJobNamesAsJson()
  {
    final View view = ViewUtils.getView();

    if (view != null)
    {
      final JSONArray viewJobNames = new JSONArray();

      for (final TopLevelItem topLevelItem : view.getItems())
      {
        viewJobNames.add(topLevelItem.getDisplayName());
      }

      return viewJobNames.toString();
    }

    return "undefined";
  }

  public static String getBaseUrl()
  {
    return Jenkins.getInstance().getRootUrlFromRequest();
  }

  public static String getBaseJobUrl()
  {
    final Item job = JobUtils.getJob();

    if (job != null)
    {
      return job.getUrl();
    }

    return "undefined";
  }

  public static String getBaseViewUrl()
  {
    final View view = ViewUtils.getView();
    if (view != null)
    {
      final String viewUrl = view.getUrl();
      if (StringUtils.isEmpty(viewUrl))
      {
        return "/";
      }

      return viewUrl;
    }

    return "undefined";
  }

  @DataBoundConstructor
  public KeyboardShortcutsPageDecorator()
  {
    super();
  }

  @Override
  public String getDisplayName()
  {
    return Messages.Keyboard_Shortcuts_Plugin_DisplayName();
  }
}
