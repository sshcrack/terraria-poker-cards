
import pkg from 'canvas';
import { drawBaseImage } from '../base.js';
const { createCanvas, loadImage} = pkg;

export async function mirror(img) {
    const { width, height} = img;
    const canvas = createCanvas(width, height * 2);
    const ctx = canvas.getContext("2d");

    const flipped = await loadImage(mirrorSingle(img));

    await drawBaseImage(ctx);
    ctx.drawImage(img, 0, 0);
    ctx.drawImage(flipped, 0, height);

    return canvas.toBuffer('image/png');
}

export async function rotate(img) {
    const { width, height} = img;
    const canvas = createCanvas(width, height * 2);
    const ctx = canvas.getContext("2d");

    const flipped = await loadImage(rotateSingle(img));

   await drawBaseImage(ctx);
    ctx.drawImage(img, 0, 0);
    ctx.drawImage(flipped, 0, height);

    return canvas.toBuffer('image/png');
}

export function rotateSingle(img) {
    const {
        width,
        height
    } = img;
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext("2d");

    ctx.translate(0, canvas.height);
    ctx.rotate(Math.PI)
    ctx.drawImage(img, -width, 0);

    return canvas.toBuffer("image/png");
}

export function mirrorSingle(img) {
    const {
        width,
        height
    } = img;
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext("2d");

    ctx.translate(0, canvas.height);
    ctx.scale(1, -1);
    ctx.drawImage(img, 0, 0);

    return canvas.toBuffer("image/png");
}