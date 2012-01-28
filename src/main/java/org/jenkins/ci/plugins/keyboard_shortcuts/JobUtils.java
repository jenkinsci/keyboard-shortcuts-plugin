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

import hudson.model.Item;
import hudson.model.TopLevelItem;

import java.util.Collection;
import java.util.SortedSet;
import java.util.TreeSet;

import jenkins.model.Jenkins;

import org.apache.commons.lang.StringUtils;
import org.kohsuke.stapler.Stapler;
import org.kohsuke.stapler.StaplerRequest;

/**
 * Common utilities for {@link hudson.model.View}s.
 * 
 * @author <a href="mailto:jieryn@gmail.com">Jesse Farinacci</a>
 */
public final class JobUtils {
    public static SortedSet<String> getAllJobNames() {
        final SortedSet<String> set = new TreeSet<String>();

        final Collection<String> jobNames = Jenkins.getInstance().getJobNames();

        if (jobNames != null) {
            set.addAll(jobNames);
        }

        return set;
    }

    public static TopLevelItem getJob() {
        return getJob(Stapler.getCurrentRequest());
    }

    public static TopLevelItem getJob(final StaplerRequest currentRequest) {
        if (currentRequest != null) {
            final String pathInfo = currentRequest.getPathInfo();

            if (StringUtils.isNotEmpty(pathInfo)) {
                final int jidx = pathInfo.indexOf("/job/");
                if (jidx >= 0) {
                    final String jobPathInfo = pathInfo.substring(jidx + 5);

                    final int slash = jobPathInfo.indexOf("/");
                    if (slash >= 0) {
                        return Jenkins.getInstance().getItem(
                                jobPathInfo.substring(0, slash));
                    }

                    return Jenkins.getInstance().getItem(jobPathInfo);
                }
            }
        }

        return null;
    }

    public static String getJobName() {
        return getJobName(getJob());
    }

    public static String getJobName(final Item item) {
        if (item != null) {
            return item.getName();
        }

        return null;
    }

    /**
     * Static-only access.
     */
    private JobUtils() {
        // static-only access
    }
}
