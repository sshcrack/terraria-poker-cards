/*jshint esversion: 8 */

import can_pkg from "canvas";
import { marginImageX, marginImageY, marginText, symbols, symbolSize } from '../consts.js';
import { getPosByMargin, scaleKeepRatioOne } from '../math.js';
const {
    loadImage
} = can_pkg;

export function drawSymbols(ctx, img, txtSize) {
    const {
        width: img_width,
        height: img_height
    } = img;

    const [txtX, txtY] = marginText;
    const { width: txtSizeW } = txtSize
    const [scaled_w, scaled_h] = scaleKeepRatioOne(img_width, img_height, symbolSize, true);

    const numberMarginX = marginImageX + 90
    const pos = getPosByMargin([numberMarginX, marginImageY + txtY], symbolSize);

    pos.forEach(e => {
        const [x, y] = e;

        ctx.drawImage(img, x, y, scaled_w, scaled_h);
    });
}

export async function getSymbols() {
    return await Promise.all(
        symbols
        .map(capFirst)
        .map(e => `./pics/${e}/Symbol.png`)
        .map(e => loadImage(e))
    );
}

function capFirst(string) { return string.charAt(0).toUpperCase() + string.slice(1); }
