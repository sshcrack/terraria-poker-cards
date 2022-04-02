import can_pkg from 'canvas';
import fs from "fs/promises";
import { drawBaseImage } from '../base.js';
import { baseFile, colors, jokerFile, jokerMax, marginText, textStyle } from '../consts.js';
import { getFontHeight } from '../math.js';
import { drawMainCard } from './special.js';
const { createCanvas, loadImage } = can_pkg



// Variant either 0 or 1
export async function drawJoker(variant) {
    const baseImg = await loadImage(baseFile)
    const joker = await fs.readFile(jokerFile(variant))

    const { width, height } = baseImg

    const canvas = createCanvas(width, height)
    const ctx = canvas.getContext("2d")
    ctx.imageSmoothingEnabled = false
    await drawBaseImage(ctx)

    const [marginX, marginY] = marginText
    const jokerText = "JOKER".split("").join("\n")

    let x = marginX + 20
    let y = marginY * .7

    const draw = (x = 0, y = 0) => {
        console.log("----------------")
        jokerText.split("\n")
            .forEach((e, i) => {
                ctx.shadowColor = 'black';
                ctx.shadowBlur = 15;
                const currColor = "#000"//colors[i % colors.length]
                const yOffset = i * 80
                console.log("Using color", currColor, e)
                ctx.fillStyle = currColor
                ctx.font = `70${textStyle}`
                ctx.textAlign = "center"
                ctx.fillText(e, x, y + yOffset)
            })
        console.log("----------------")

    }

    draw(x, y)
    const metrics = ctx.measureText(jokerText)

    const fontHeight = getFontHeight(metrics);
    const fontWidth = metrics.width

    ctx.save()
    ctx.scale(1, -1)
    draw(width - x + fontWidth - 55, - (height - y))

    ctx.restore()

    const end = await loadImage(canvas.toBuffer("image/png"))
    return variant === 0 ?
        drawMainCard(end, joker, { h: .9 }, {}, jokerMax[0]) :
        drawMainCard(end, joker, {}, { y: -2 }, jokerMax[0])
}