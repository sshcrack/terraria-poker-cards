/*jshint esversion: 8 */

import fs from "fs";
import can_pkg from "canvas";
const {
    createCanvas,
    loadImage
} = can_pkg;
import {
    symbols,
    numbers,
    colors,
    other
} from "./consts.js";
import {
    drawSymbols,
    getSymbols
} from "./outer/symbols.js";
import {
    drawText as drawCardText
} from './outer/outer.js';
import {
    getBaseSize
} from './base.js';
import {
    mirror
} from './outer/mirror.js';

const [base_width, base_height] = getBaseSize();
const asyncRun = async () => {
    const imgs = await getSymbols();

    let done = 0;
    let topScore  = 0;
    let mirrorScore = 0;

    const together = [...numbers, ...other];
    const proms = imgs.map((img, i) => {
        return Promise.all(together.map(async e => {
                const buff = await drawCardTop(img, e, colors[i]);
                const top = await loadImage(buff);

                const mirrored = await mirror(top);
                const func = other.includes(e) ? drawSpecial : drawNumbers;
                const final = await func(mirrored, e);

                fs.writeFileSync(`base/edited/${e}${symbols[i]}.png`, final);
        }));
    });

    await Promise.all(proms);
    console.log("Done!");
};


asyncRun();



async function drawCardTop(img, text, color) {

    const canvas = createCanvas(base_width, base_height / 2);
    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;


    const textSize = drawCardText(ctx, text, color);
    drawSymbols(ctx, img, textSize);

    return canvas.toBuffer('image/png');
}