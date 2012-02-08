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

import hudson.model.Node;

import java.util.List;
import java.util.TreeMap;

import jenkins.model.Jenkins;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.commons.lang.StringUtils;

/**
 * Common utilities for {@link hudson.model.Node}s.
 * 
 * @author <a href="mailto:jieryn@gmail.com">Jesse Farinacci</a>
 */
public final class NodeUtils {
    public static List<Node> getAllNodes() {
        return Jenkins.getInstance().getNodes();
    }

    public static JSONArray getAllNodesAsJsonArray() {
        final JSONArray nodes = new JSONArray();

        int idx = 0;

        // why isn't master a node? i don't get it
        nodes.add(toJSONObject("(master)", "master", idx++));

        for (final Node node : getAllNodes()) {
            nodes.add(toJSONObject(node, idx++));
        }

        return nodes;
    }

    public static JSONObject toJSONObject(final Node node, final int idx) {
        if (node == null) {
            return null;
        }

        return toJSONObject(node.getNodeName(), node.getDisplayName(), idx);
    }

    protected static JSONObject toJSONObject(final String nodeName,
            final String displayName, final int idx) {
        if (StringUtils.isEmpty(nodeName)) {
            return null;
        }

        if (StringUtils.isEmpty(displayName)) {
            return null;
        }

        final TreeMap<String, String> map = new TreeMap<String, String>();
        map.put("idx", "ks_selector_" + Integer.toString(idx));
        map.put("url", nodeName);
        map.put("name", displayName);
        return JSONObject.fromObject(map);
    }

    /**
     * Static-only access.
     */
    private NodeUtils() {
        // static-only access
    }
}
