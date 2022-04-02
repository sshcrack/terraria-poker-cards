/*jshint esversion: 8 */
import {
    textStyle
} from "./consts.js";

export function getSizeByWidth(ctx, text, width) {
    width = Math.round(width);

    let currWidth = -1;
    let currTxtSize = 0;
    const detail = 0.5;

    while (currWidth !== width && currWidth < width) {
        currTxtSize += detail;
        ctx.font = `${++currTxtSize}${textStyle}`;

        const info = ctx.measureText(text);
        currWidth = info.width;
    }


    return currTxtSize;
}