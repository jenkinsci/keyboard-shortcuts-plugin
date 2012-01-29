/*
 * The MIT License
 * 
 * Copyright (c) 2012, Jesse Farinacci
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, entribute, sublicense, and/or sell
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
import hudson.model.UserProperty;
import hudson.model.UserPropertyDescriptor;
import hudson.model.User;
import net.sf.json.JSONException;
import net.sf.json.JSONObject;

import org.kohsuke.stapler.DataBoundConstructor;
import org.kohsuke.stapler.StaplerRequest;

/**
 * @author <a href="mailto:jieryn@gmail.com">Jesse Farinacci</a>
 */
public final class KeyboardShortcutsUserProperty extends UserProperty {
    @Extension
    public static final class DescriptorImpl extends UserPropertyDescriptor {
        @Override
        public String getDisplayName() {
            return Messages.Keyboard_Shortcuts_Plugin_DisplayName();
        }

        @Override
        public KeyboardShortcutsUserProperty newInstance(
                final StaplerRequest request, final JSONObject formData)
                throws FormException {
            try {
                return request.bindJSON(KeyboardShortcutsUserProperty.class,
                        formData);
            }

            catch (final JSONException e) {
                throw new FormException(e, "disabled");
            }
        }

        @Override
        public KeyboardShortcutsUserProperty newInstance(final User user) {
            if (user != null) {
                final KeyboardShortcutsUserProperty existing = user
                        .getProperty(KeyboardShortcutsUserProperty.class);
                if (existing != null) {
                    return existing;
                }
            }

            return new KeyboardShortcutsUserProperty();
        }
    }

    public static final boolean DEFAULT_DISABLED = false;

    private boolean             disabled;

    public KeyboardShortcutsUserProperty() {
        this(DEFAULT_DISABLED);
    }

    @DataBoundConstructor
    public KeyboardShortcutsUserProperty(final boolean disabled) {
        super();
        this.disabled = disabled;
    }

    public boolean isDisabled() {
        return disabled;
    }

    public void setDisabled(final boolean disabled) {
        this.disabled = disabled;
    }
}
