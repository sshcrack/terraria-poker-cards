/*jshint esversion: 8 */
import { getPosByMargin } from '../math.js';
import { marginText, symbolSize, textStyle, textSize, numbers, symbols, other } from '../consts.js';

export function drawText(ctx, text, color) {
    ctx.font = textSize + textStyle;
    const measurement = ctx.measureText(text);
    const half = measurement.width / 2;
    console.log("half", half, "numb", text);


    const adjust = left => {
        if(measurement.width <= symbolSize || left)
            return [0, 0];

        if (other.includes(text))
            return [-(half * 0.25), 0];

        return [-half, 0];
    };
    const pos = getPosByMargin(marginText, symbolSize, adjust);


    pos.forEach(e => {
        const [x, y] = e;

        ctx.fillStyle = color;
        ctx.fillText(text, x, y);
    });

    return measurement;
}
