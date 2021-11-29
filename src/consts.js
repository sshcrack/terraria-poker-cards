/*jshint esversion: 8 */

import pkg from "canvas";
const { createCanvas } = pkg;
import { getSizeByWidth } from './font.js';

//Base
export const baseFile = "./base/base.png";



//Card info
export const numbers = [2,3, 4,5, 6,7 ,8, 9,10];
export const numberPositions = JSON.parse(fs.readFileSync("src/numberPositions.json", "utf-8"));

export const other = ["J", "Q", "K", "A"];

export const symbols = ["crimson", "desert", "jungle", "snow"];
export const colors = ["#ff1100", "#ff1100", "#000", "#000"];

//Maximum width/height the icons should have
export const symbolSize = 85;

//Margin: side, top
export const marginText = [80, 190];
export const marginImageY = 40;


const tempCanvas = createCanvas(symbolSize * 2, 1);
const tempCtx = tempCanvas.getContext("2d");

export const textStyle = `px 'Bodoni MT' bold`;
export const textSize = getSizeByWidth(tempCtx, numbers[0], symbolSize);
