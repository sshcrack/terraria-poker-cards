/*jshint esversion: 8 */

import { getBaseSize } from './base.js';


export function getFontHeight(metrics) {
    let actualHeight = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
    return actualHeight;
}

export function getPosByMargin(margin, width, adjust) {
    const [ base_width ] = getBaseSize();
    const [margin_x, margin_y] = margin;

    const adj_defined = adjust !== null && adjust !== undefined;

    const pos = [];
    //Left

    const [adj_lx, adj_ly] = adj_defined ? adjust(true) : [0, 0];
    pos.push([margin_x + adj_lx, margin_y + adj_ly]);

    //Right
    const [adj_rx, adj_ry] = adj_defined ? adjust(false) : [0, 0];
    pos.push([base_width - margin_x - width + adj_rx, margin_y + adj_ry]);

    return pos;
}




export function scaleKeepRatio(width, height, max) {
    const ratio = Math.min(width / max, height / max);
    return [width / ratio, height / ratio];
}