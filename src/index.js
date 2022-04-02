/*jshint esversion: 8 */

import can_pkg from "canvas";
import fs from "fs";
import {
    getBaseSize
} from './base.js';
import {
    colors, numbers, other, symbols
} from "./consts.js";
import { drawJoker } from './inner/joker.js';
import { drawNumbers } from './inner/numbers.js';
import { drawSpecial } from './inner/special.js';
import {
    rotate
} from './outer/mirror.js';
import {
    drawText as drawCardText
} from './outer/outer.js';
import {
    drawSymbols,
    getSymbols
} from "./outer/symbols.js";
const {
    createCanvas,
    loadImage
} = can_pkg;

const [base_width, base_height] = getBaseSize();
const asyncRun = async () => {
    const imgs = await getSymbols();

    let done = 0;
    let topScore  = 0;
    let mirrorScore = 0;

    const together =[...numbers,...other];
    const proms = imgs.map((img, i) => {
        return Promise.all(together.map(async e => {
                const buff = await drawCardTop(img, e, colors[i]);
                const top = await loadImage(buff);

                console.log("Rotating")
                const rotated = await rotate(top);
                const func = other.includes(e) ? drawSpecial : drawNumbers;
                console.log("Drawing...")
                const final = await func(rotated, e, img, i, colors[i]).catch(e => console.error("Error", e));

                console.log("Writing", `base/edited/${e}${symbols[i]}.png`)
                fs.writeFileSync(`base/edited/${e}${symbols[i]}.png`, final);
        }));
    });

    await Promise.all(proms)
        .catch(e => console.error("Error", e));

    const joker = await drawJoker(0)
    const joker1 = await drawJoker(1)
    fs.writeFileSync("base/edited/joker.png", joker)
    fs.writeFileSync("base/edited/joker1.png", joker1)
    console.log("Done!");
};


asyncRun().catch(e => console.error(e));


async function drawCardTop(img, text, color) {

    const canvas = createCanvas(base_width, base_height / 2);
    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;


    const textSize = drawCardText(ctx, text, color);
    drawSymbols(ctx, img, textSize);

    return canvas.toBuffer('image/png');
}

function capFirst(string) { return string.charAt(0).toUpperCase() + string.slice(1); }
