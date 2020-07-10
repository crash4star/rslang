import getData from '../data/statistic';
import { getMidnight } from '../data/statistic';
import addElement from '../utils/utils';
import { getDateInString } from '../utils/utils';
import fillCanvas from '../utils/fillCanvas';
import '../../css/statistic.scss';

const dashLength = 20;
const graphMargin = 50;
const amountOfDescriptionsY = 4;
const amountOfDescriptionsX = 4;
const millisecondsPerDay = 24 * 3600 * 1000;


export default class Statistic  {
    constructor () {
        this.canvasParameters = {};
        this.data = getData();
        this.data.options.axisX.min = new Date(this.data.options.axisX.min.getTime() - millisecondsPerDay);
        this.data.options.axisX.max = new Date(this.data.options.axisX.max.getTime() + millisecondsPerDay * 2);
        // this.data.options.axisX.min = new Date (2020, 6, 8);
        // this.data.options.axisX.max = new Date (2020, 6, 11);
        // this.data.arrayOfDatesAndValues = [
        //     {
        //         'data': new Date(2020,6,5),
        //         'value': 360,
        //     },
        //     {
        //         'data': new Date(2020,6,6),
        //         'value': 720,
        //     },
        //     {
        //         'data': new Date(2020,6,7),
        //         'value': 1000,
        //     },
        //     {
        //         'data': new Date(2020,6,8),
        //         'value': 2000,
        //     },
        //     {
        //         'data': new Date(2020,6,9),
        //         'value': 3000,
        //     },
        // ]
//! remove next
            // this.data.arrayOfDatesAndValues.forEach(element => {
            //     console.log(new Date((Number(element.data))), Number(element.value));
            // });
        this.init();
        this.drawGraph();
        //this.renderStatistic();
    }

    calculateAmountOfDaysDescriptions() {
        let amountOfDescriptions = amountOfDescriptionsX;
        const amountDays = Math.ceil(this.getDaysFromMilliseconds(this.data.options.axisX.max - this.data.options.axisX.min)) - 1;
            console.log('--------------------');
            console.log('min', this.data.options.axisX.min);
            console.log('max', this.data.options.axisX.max);
            console.log('days', amountDays);
        if (amountDays < amountOfDescriptions * 2) {
            amountOfDescriptions = amountDays;
        } else {
            let amount;
            for (let i = 2; i < (amountOfDescriptions * 2); i += 1) {
                if (amountDays % i === 0) {
                    amount = i;
                }
            }
            amountOfDescriptions = (amount) ? amount: amountOfDescriptions;
        }
        return amountOfDescriptions;
    }

    getAmountOfDays () {
        return Math.floor(this.getDaysFromMilliseconds(this.data.options.axisX.max - this.data.options.axisX.min + 1));
    }

    getAmountOfWords() {
        return this.data.options.axisY.max - this.data.options.axisY.min;;
    }

    init() {
        const main = document.querySelector('.main');
        const container = main.querySelector('.container');
        const wrapper = addElement('div', container, 'wrapper');
        this.canvas = addElement('canvas', wrapper, 'canvas');
        this.ctx = this.canvas.getContext('2d');

        this.setCanvasParameters();
        this.axisStartX = graphMargin;
        this.axisStartY = this.canvasParameters.height - graphMargin;
        
        this.amountOfDaysDescriptions = this.calculateAmountOfDaysDescriptions();
        console.log (' amount ', this.amountOfDaysDescriptions);
        console.log('--------------------');    
        //this.stepX = (this.canvasParameters.width - graphMargin * 2) / this.amountOfDaysDescriptions;
        this.stepX = (this.canvasParameters.width - graphMargin * 2) / this.getAmountOfDays();
        this.stepY = (this.axisStartY - graphMargin) / this.getAmountOfWords();

    }

    setCanvasParameters () {
        this.canvas.setAttribute('height', Math.floor(this.canvas.offsetHeight));
        this.canvas.setAttribute('width', Math.floor(this.canvas.offsetWidth));
        this.canvasParameters.width = this.canvas.offsetWidth;
        this.canvasParameters.height = this.canvas.offsetHeight;
        
        this.ctx.fillStyle = "black";
        this.ctx.lineWidth = 1.0;
    }

    drawCoordinateAxes() {
        this.ctx.beginPath();
        this.ctx.moveTo(this.axisStartX, graphMargin - dashLength / 2);
        this.ctx.lineTo(this.axisStartX, this.axisStartY - dashLength / 2);
        this.ctx.moveTo(this.axisStartX + dashLength / 2, this.axisStartY);
        this.ctx.lineTo(this.canvasParameters.width - graphMargin + dashLength / 2, this.axisStartY);
        this.ctx.stroke();
    }

    drawDescriptionAxis(axisIsX, length, amountOfDescriptions, maxValue, minValue) {
        
        let stepBetweenDescriptions = length / (amountOfDescriptions + 1);
        let stepBetweenValues = (maxValue - minValue) / (amountOfDescriptions + 1);
        
        for (let i = 0; i <= amountOfDescriptions + 1; i+= 1) {
            this.ctx.beginPath();
            const coefficient = axisIsX ? i : i;
            const descriptionPositionX = axisIsX ? 
                this.axisStartX + stepBetweenDescriptions * coefficient :
                graphMargin / 3;
            const descriptionPositionY = axisIsX ? 
                this.axisStartY + graphMargin / 2 : 
                this.axisStartY - stepBetweenDescriptions * coefficient;
                const descriptionValue = Number(minValue) + Math.round(stepBetweenValues * i);
                if (axisIsX) {
                    descriptionValue = getDateInString(new Date(descriptionValue));
                    this.ctx.moveTo(descriptionPositionX, this.axisStartY - dashLength / 2);
                    this.ctx.lineTo(descriptionPositionX, this.axisStartY + dashLength / 2)
                    this.ctx.fillText(descriptionValue, descriptionPositionX - graphMargin  /2, descriptionPositionY);
                } else {
                    this.ctx.moveTo(this.axisStartX - dashLength / 2, descriptionPositionY);
                    this.ctx.lineTo(this.axisStartX + dashLength / 2, descriptionPositionY);
                    this.ctx.fillText(descriptionValue, this.axisStartX - graphMargin * 4 / 5, descriptionPositionY);
                }
            this.ctx.stroke();
        }
    }

    getDaysFromMilliseconds(milliseconds) {
        return milliseconds / 1000 / 3600 / 24;
    }

    drawData() {
        const minData = this.data.options.axisX.min;
        const minValue = this.data.options.axisY.min;
        this.ctx.lineTo(this.axisStartX, this.axisStartY);
        this.data.arrayOfDatesAndValues.forEach(el => {
            console.log(getDateInString(new Date(Number(el.data))), el.value);
        });
        
        this.ctx.beginPath();
        for (let i = 0; i < this.data.arrayOfDatesAndValues.length; i += 1) {
            const elementFrom = this.data.arrayOfDatesAndValues[i];
            const moveFromX = graphMargin + this.getDaysFromMilliseconds(Number(elementFrom.data) - minData) * this.stepX;
            const moveFromY = this.axisStartY - (elementFrom.value - minValue) * this.stepY;
            let moveToX;
            if (i === this.data.arrayOfDatesAndValues.length - 1) {
                moveToX = graphMargin + this.getDaysFromMilliseconds(Number(getMidnight(Date())) - minData) * this.stepX + this.stepX;
            } else {
                const elementTo = this.data.arrayOfDatesAndValues[i + 1];
                moveToX = graphMargin + this.getDaysFromMilliseconds(Number(elementTo.data) - minData) * this.stepX;
            }
            this.ctx.lineTo(moveFromX, this.axisStartY);
            this.ctx.lineTo(moveFromX, moveFromY);
            this.ctx.lineTo(moveToX, moveFromY);
            this.ctx.lineTo(moveToX, this.axisStartY);
            this.ctx.stroke();
        }
    }

    drawGraph() {
        this.drawCoordinateAxes();
        this.drawDescriptionAxis(true, this.canvasParameters.width - graphMargin * 2, this.amountOfDaysDescriptions - 1, this.data.options.axisX.max, this.data.options.axisX.min);
        this.drawDescriptionAxis(false, this.canvasParameters.height - graphMargin * 2, amountOfDescriptionsY, this.data.options.axisY.max, this.data.options.axisY.min);
        this.drawData();
        document.querySelector('.canvas').addEventListener('mousemove', (e) => {
            const x = e.pageX - e.target.offsetLeft;
            const y = e.pageY - e.target.offsetTop;
            //console.log(x, y);
            console.log(Math.ceil((x - graphMargin) / this.stepX));
        });
    }
}