import can_pkg from "canvas";
import fs from "fs";
import { specialMargin, specialMaxW, specialPositions, symbols } from '../consts.js';
import { scaleKeepRatioSpecific } from '../math.js';
import { mirrorSingle } from '../outer/mirror.js';
const { loadImage, createCanvas } = can_pkg;


export async function drawSpecial (buff, specialStr, _, i) {
    const currSymbol = symbols[i]
    const { crop, overlap} = specialPositions[currSymbol]?.[specialStr] ?? {}


    const img = await loadImage(buff)
    const symbolRaw = fs.readFileSync(`pics/${currSymbol}/${specialStr}.png`);
    return drawMainCard(img, symbolRaw, crop, overlap, specialMaxW)

}

export async function drawMainCard(img, specialRaw, crop, overlap, maxW) {
    const special = await loadImage(specialRaw)
    const specialMirrored = await loadImage(await mirrorSingle(special))

    const { width, height } = img

    const [ marginX, marginY ] = specialMargin
    const mirrorPointY = height / 2

    const topHeight = mirrorPointY - marginY
    const topWidth = width - marginX *2

    const canvas = createCanvas(width, height)
    const ctx = canvas.getContext('2d')
    ctx.imageSmoothingEnabled = false;

    ctx.drawImage(img, 0, 0)

    let symbolWidth = special.width
    let symbolHeight = special.height

    let secondSourceX = 0
    let secondSourceY = 0

    if(crop) {
        secondSourceX = symbolWidth * (1 - (crop.w ?? 1))
        secondSourceY = symbolHeight * (1 - (crop.h ?? 1))
        symbolWidth *= crop.w ?? 1
        symbolHeight *= crop.h ?? 1
    }

    const [ scaleWidth, scaleHeight ] = scaleKeepRatioSpecific(symbolWidth, symbolHeight, maxW, topHeight, true)
    let firstX = width / 2 - scaleWidth / 2 + marginX
    let firstY = mirrorPointY - scaleHeight

    let secondX = firstX
    let secondY = firstY + scaleHeight

    if(overlap) {
        firstX += overlap.x ?? 0
        firstY += overlap.y ?? 0

        secondX += overlap.x ?? 0
        secondY -= overlap.y ?? 0
    }

    ctx.drawImage(special,
        0, 0,
        symbolWidth, symbolHeight,

        firstX, firstY,
        scaleWidth, scaleHeight
    )
    ctx.drawImage(specialMirrored,
        secondSourceX, secondSourceY,
        symbolWidth, symbolHeight,

        secondX, secondY,
        scaleWidth, scaleHeight
    )

    return canvas.toBuffer("image/png")
}