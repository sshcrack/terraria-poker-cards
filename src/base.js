/*jshint esversion: 8 */
import sizeOf from "image-size";
import can_pkg from "canvas";
const {
    loadImage
} = can_pkg;
import {
    baseFile
} from "./consts.js";

let base_width, base_height;

export function getBaseSize() {
    if(base_width && base_height)
        return [base_width, base_height];

    const {
        width,
        height
    } = sizeOf(baseFile);

    base_width = width;
    base_height = height;
    return [ width, height];
}

export async function drawBaseImage(ctx) {
    const baseImg = await loadImage(baseFile);
    //ctx.drawImage(baseImg, 0, 0);
}