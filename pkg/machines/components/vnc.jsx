/*jshint esversion: 6 */
/*
 * This file is part of Cockpit.
 *
 * Copyright (C) 2016 Red Hat, Inc.
 *
 * Cockpit is free software; you can redistribute it and/or modify it
 * under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation; either version 2.1 of the License, or
 * (at your option) any later version.
 *
 * Cockpit is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with Cockpit; If not, see <http://www.gnu.org/licenses/>.
 */
import React from "react";
import cockpit from 'cockpit';

import { vmId } from '../helpers.es6';

const _ = cockpit.gettext;

const Frame = ({ url, containerId }) => {
    return (
        <iframe src={url} className='machines-console-frame-vnc' frameBorder='0' data-container-id={containerId}>
            {_("Your browser does not support iframes.")}
        </iframe>
    );
};
Frame.propTypes = {
    url: React.PropTypes.string.isRequired,
    containerId: React.PropTypes.string.isRequired,
};

const Vnc = ({ vm, consoleDetail }) => {
    if (!consoleDetail) {
        return null;
    }
    const uniqueFrameContainerId = `${vmId(vm.name)}-novnc-frame-container`;

    const encrypt = window.location.protocol === "https:";
    const port = consoleDetail.tlsPort || consoleDetail.port;

    let params = `?host=${consoleDetail.address}&port=${port}&encrypt=${encrypt}&true_color=1&resize=true&containerId=${encodeURIComponent(uniqueFrameContainerId)}`;
    params = consoleDetail.password ? params += `&password=${consoleDetail.password}` : params;

    return (
        <div id={uniqueFrameContainerId} className='machines-console-frame' style={{ height: '100px;' }}>
            <br />
            <Frame url={`vnc.html${params}`} containerId={uniqueFrameContainerId} />
        </div>
    );
};

export default Vnc;
