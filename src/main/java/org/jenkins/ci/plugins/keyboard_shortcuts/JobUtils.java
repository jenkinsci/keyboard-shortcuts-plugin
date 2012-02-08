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
import java.util.TreeMap;

import jenkins.model.Jenkins;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.commons.lang.StringUtils;
import org.kohsuke.stapler.Stapler;
import org.kohsuke.stapler.StaplerRequest;

/**
 * Common utilities for {@link hudson.model.View}s.
 * 
 * @author <a href="mailto:jieryn@gmail.com">Jesse Farinacci</a>
 */
public final class JobUtils {
    public static Collection<Item> getAllJobs() {
        return Jenkins.getInstance().getAllItems();
    }

    public static JSONArray getAllJobsAsJsonArray() {
        return getJobsAsJsonArray(getAllJobs());
    }

    private static JSONArray getJobsAsJsonArray(final Collection<Item> jobs) {
        final JSONArray array = new JSONArray();

        int idx = 0;
        for (final Item job : jobs) {
            array.add(toJSONObject(job, idx++));
        }

        return array;
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

    public static JSONObject toJSONObject(final Item job, final int idx) {
        if (job == null) {
            return null;
        }

        return toJSONObject(job.getUrl(), job.getDisplayName(), idx);
    }

    protected static JSONObject toJSONObject(final String url,
            final String displayName, final int idx) {
        if (StringUtils.isEmpty(url)) {
            return null;
        }

        if (StringUtils.isEmpty(displayName)) {
            return null;
        }

        final TreeMap<String, String> map = new TreeMap<String, String>();
        map.put("idx", "ks_selector_" + Integer.toString(idx));
        map.put("url", url);
        map.put("name", displayName);
        return JSONObject.fromObject(map);
    }

    /**
     * Static-only access.
     */
    private JobUtils() {
        // static-only access
    }
}
