/*jshint esversion: 8 */

import {
    symbols,
    marginText, marginImageY, symbolSize, marginImageX
} from '../consts.js';
import can_pkg from "canvas";
import { getPosByMargin, scaleKeepRatio, scaleKeepRatioOne } from '../math.js';
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
        .map(e => `./pics/${e}/Symbol.png`)
        .map(e => loadImage(e))
    );
}