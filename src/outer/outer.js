/*jshint esversion: 8 */
import { marginText, other, symbolSize, textSize, textStyle } from '../consts.js';
import { getSizeByWidth } from '../font.js';
import { getPosByMargin } from '../math.js';

import can_pkg from "canvas"
const { createCanvas } = can_pkg;

export function drawText(ctx, text, color) {
    const sizeToUse = typeof text === "number" ? getNumbSize(text) : textSize
    ctx.font = sizeToUse + textStyle;
    const measurement = ctx.measureText(text);
    const half = measurement.width / 2;
    console.log("half", half, "numb", text);


    const adjust = left => {
        if(measurement.width <= symbolSize || left)
            return [0, 0];

        if (other.includes(text)) {
            const percent = text == "J" ? .5 : .6
            return [-(half * percent), 0];
        }

        return [-half +40, 0];
    };
    const pos = getPosByMargin(marginText, symbolSize, adjust);


    pos.forEach(e => {
        const [x, y] = e;

        ctx.fillStyle = color;
        ctx.fillText(text, x, y);
    });

    return measurement;
}

function getNumbSize(numb) {
    const tempCanvas = createCanvas(symbolSize * 2, 1);
    const tempCtx = tempCanvas.getContext("2d");

    const size = getSizeByWidth(tempCtx, numb, symbolSize)
    return size
}