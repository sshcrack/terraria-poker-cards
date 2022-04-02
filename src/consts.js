/*jshint esversion: 8 */

import pkg from "canvas";
import fs from "fs";
const { createCanvas } = pkg;
import { getSizeByWidth } from './font.js';

//Base
export const baseFile = "./base/base.png";

export const jokerFile = e => `./pics/joker${e}.png`
export const jokerMax = [ 540, 995]



//Card info
export const numbers = [2,3, 4,5, 6,7 ,8, 9,10];
export const numberPositions = JSON.parse(fs.readFileSync("src/data/numberPos.json", "utf-8"));
export const specialPositions = JSON.parse(fs.readFileSync("src/data/specialScaling.json", "utf-8"));

export const other = ["J", "Q", "K", "A"];

export const symbols = ["crimson", "desert", "jungle", "snow"];
export const colors = ["#ff1100", "#FFD700", "#28650D", "#80B4E2"];

//Maximum width the icons should have
export const symbolSize = 85;

//Margin: side, top
export const marginText = [85, 195];
export const marginImageY = 40;
export const marginImageX = 0;


export const specialMargin = [0, 80]
export const specialMaxW = 450

const tempCanvas = createCanvas(symbolSize * 2, 1);
const tempCtx = tempCanvas.getContext("2d");

export const textStyle = `px 'Bodoni MT' bold`;
export const textSize = getSizeByWidth(tempCtx, numbers[0], symbolSize);