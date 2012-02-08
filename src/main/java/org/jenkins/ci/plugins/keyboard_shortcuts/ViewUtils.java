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

import hudson.model.View;

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
public final class ViewUtils {
    public static Collection<View> getAllViews() {
        return Jenkins.getInstance().getViews();
    }

    public static JSONArray getAllViewsAsJsonArray() {
        final JSONArray views = new JSONArray();

        int idx = 0;
        for (final View view : getAllViews()) {
            if (view == null) {
                continue;
            }

            views.add(toJSONObject(view, idx++));
        }

        return views;
    }

    public static View getView() {
        return getView(Stapler.getCurrentRequest());
    }

    protected static View getView(final StaplerRequest currentRequest) {
        if (currentRequest != null) {
            final String pathInfo = currentRequest.getPathInfo();

            if (StringUtils.isEmpty(pathInfo)) {
                return Jenkins.getInstance().getPrimaryView();
            }

            else if ("/".equals(pathInfo)) {
                return Jenkins.getInstance().getPrimaryView();
            }

            else {
                final int vidx = pathInfo.indexOf("/view/");

                if (vidx >= 0) {
                    final String viewPathInfo = pathInfo.substring(vidx + 6);

                    final int slash = viewPathInfo.indexOf("/");
                    if (slash >= 0) {
                        return Jenkins.getInstance().getView(
                                viewPathInfo.substring(0, slash));
                    }

                    return Jenkins.getInstance().getView(viewPathInfo);
                }
            }
        }

        return null;
    }

    protected static JSONObject toJSONObject(final String displayName,
            final String url, final int idx) {
        if (StringUtils.isEmpty(displayName)) {
            return null;
        }

        if (StringUtils.isEmpty(url)) {
            return null;
        }

        final TreeMap<String, String> map = new TreeMap<String, String>();

        map.put("idx", "ks_selector_" + Integer.toString(idx));
        map.put("url", url);
        map.put("name", displayName);

        return JSONObject.fromObject(map);
    }

    public static JSONObject toJSONObject(final View view, final int idx) {
        if (view == null) {
            return null;
        }

        return toJSONObject(view.getDisplayName(), view.getUrl(), idx);
    }

    /**
     * Static-only access.
     */
    private ViewUtils() {
        // static-only access
    }
}
