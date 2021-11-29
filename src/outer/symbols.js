/*jshint esversion: 8 */

import {
    symbols,
    marginText, marginImageY, symbolSize
} from '../consts.js';
import can_pkg from "canvas";
import { getPosByMargin, scaleKeepRatio } from '../math.js';
const {
    loadImage
} = can_pkg;

export function drawSymbols(ctx, img) {
    const {
        width: img_width,
        height: img_height
    } = img;

    const [txtX, txtY] = marginText;
    const [scaled_w, scaled_h] = scaleKeepRatio(img_width, img_height, symbolSize);

    const pos = getPosByMargin([txtX, marginImageY + txtY], symbolSize);

    pos.forEach(e => {
        const [x, y] = e;

        ctx.drawImage(img, x, y, scaled_w, scaled_h);
    });
}

export async function getSymbols() {
    return await Promise.all(
        symbols
        .map(e => `./pics/${e}/Symbol.png`)
        .map(e => loadImage(e))
    );
}