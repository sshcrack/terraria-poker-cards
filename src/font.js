/*jshint esversion: 8 */
import {
    textStyle
} from "./consts.js";

let constSize = NaN;
export function getSizeByWidth(ctx, text, width) {
    if(!isNaN(constSize))
        return constSize;
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


    if (isNaN(constSize))
        constSize = currTxtSize;
    return currTxtSize;
}