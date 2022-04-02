
import can_pkg from "canvas";
import { numberPositions } from '../consts.js';
import { scaleKeepRatioOne } from '../math.js';
import { mirrorSingle } from '../outer/mirror.js';
const { loadImage, createCanvas } = can_pkg;

/**
 * 
 * @param {Buffer} img - The image to draw on
 * @param {number} number - Number to  draw
 * @param {Buffer} symbol - The symbol to draw
 */
export async function drawNumbers (buff, number, symbol) {
    const img = await loadImage(buff)

    const symbolMirrored = await loadImage(await mirrorSingle(symbol))

    const {
        width,
        height
    } = img;


    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;

    const info = numberPositions.find(e => e.card === number)
    if (!info || !info.positions) {
        console.log("Error for card", number)
        return buff
    }

    ctx.drawImage(img, 0, 0);

    info.positions.forEach(({ x, y, width, mirrored}) => {
        const sWidth = symbol.width
        const sHeight = symbol.height

        const [ rWidth, rHeight ] = scaleKeepRatioOne(sWidth, sHeight, width, true)
        const draw_x = x - width / 2 + rWidth / 2
        const draw_y = y

        ctx.drawImage(mirrored ? symbolMirrored : symbol, draw_x, draw_y, rWidth, rHeight)
    })

    return canvas.toBuffer("image/png")
}