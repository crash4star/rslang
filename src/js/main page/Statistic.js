import getData from '../data/statistic';
import addElement from '../utils/utils';
import { getDateInString } from '../utils/utils';
import '../../css/statistic.scss';

export default class Statistic  {
    constructor () {
        this.graphMargin = 40;
        this.countOfDescriptionsY = 4;
        this.countOfDescriptionsX = 4;
        this.canvasParameters = {};
        this.data = getData();
        this.renderStatistic();
    }

    createCanvas() {
        const main = document.querySelector('.main');
        const container = main.querySelector('.container');
        const wrapper = addElement('div', container, 'wrapper');
        this.canvas = addElement('canvas', wrapper, 'canvas');
    }

    setCanvasParameters () {
        this.canvas.setAttribute('height', Math.floor(this.canvas.offsetHeight));
        this.canvas.setAttribute('width', Math.floor(this.canvas.offsetWidth));
    }

    drawCoordinateAxes() {
        this.canvasParameters.width = this.canvas.offsetWidth;
        this.canvasParameters.height = this.canvas.offsetHeight;

        this.ctx = this.canvas.getContext('2d');
        this.ctx.fillStyle = "black";
        this.ctx.lineWidth = 1.0;
        this.ctx.beginPath();
        this.ctx.moveTo(this.graphMargin, this.graphMargin);
        this.ctx.lineTo(this.graphMargin, this.canvasParameters.height - this.graphMargin);
        this.ctx.lineTo(this.canvasParameters.width - this.graphMargin, this.canvasParameters.height - this.graphMargin);
        this.ctx.stroke();
    }

    drawDescriptionAxis(axisIsX, length, countOfDescriptions, maxValue, minValue) {
        if (axisIsX) countOfDescriptions = Math.ceil(this.getDaysFromMilliseconds(maxValue - minValue)) < countOfDescriptions ? Math.ceil(this.getDaysFromMilliseconds(maxValue - minValue)) : countOfDescriptions;
        let stepBetweenDescriptions = (length - this.graphMargin * 2) / (countOfDescriptions + 1);
        let stepBetweenValues = (maxValue - minValue) / (countOfDescriptions + 1);
        //if (axisIsX && countOfDescriptions !== 0) stepBetweenValues = this.getDaysFromMilliseconds(stepBetweenValues);

        for (let i = 1; i <= countOfDescriptions + 1; i+= 1) {
            const coefficient = axisIsX ? countOfDescriptions + 1 - i : i;
            const descriptionPositionX = axisIsX ? 
                length - this.graphMargin - stepBetweenDescriptions * coefficient - this.graphMargin / 2 :
                this.graphMargin / 3;
            const descriptionPositionY = axisIsX ? 
                length - this.graphMargin / 3 : 
                length - this.graphMargin - stepBetweenDescriptions * coefficient;
                const descriptionValue = Number(minValue) + Math.round(stepBetweenValues * i);
                if (axisIsX) {
                    descriptionValue = getDateInString(new Date(descriptionValue));
                }
            this.ctx.fillText(descriptionValue, descriptionPositionX, descriptionPositionY);
        }
    }

    getDaysFromMilliseconds(milliseconds) {
        return milliseconds / 1000 / 3600 / 24;
    }

    drawData() {
        const countOfDays = this.getDaysFromMilliseconds(this.data.options.axisX.max - this.data.options.axisX.min + 1);
        const stepX = (this.canvasParameters.width - this.graphMargin * 2) / countOfDays;
        const countOfWords = this.data.options.axisY.max - this.data.options.axisY.min;
        const stepY = (this.canvasParameters.height - this.graphMargin * 2) / countOfWords;
        const minData = this.data.options.axisX.min;
        const minValue = this.data.options.axisY.min;
        let moveFromX = this.graphMargin;
        let moveFromY = this.canvasParameters.height - this.graphMargin;
        this.ctx.moveTo(moveFromX, moveFromY);
        this.ctx.beginPath();
        this.data.arrayOfDatesAndValues.forEach(element => {
            //console.log(new Date(Number(element.data)), element.value);
            const moveToX = this.graphMargin + this.getDaysFromMilliseconds(element.data - minData) * stepX;
            const moveToY = this.canvasParameters.height - this.graphMargin - (element.value - minValue) * stepY;
            this.ctx.lineTo(moveToX, moveFromY)
            this.ctx.lineTo(moveToX, moveToY);
            moveFromX = moveToX;
            moveFromY = moveToY;
        });
        this.ctx.lineTo(this.canvasParameters.width - this.graphMargin, moveFromY);
        this.ctx.lineTo(this.canvasParameters.width - this.graphMargin, this.canvasParameters.height - this.graphMargin);

        this.ctx.stroke();
    }

    drawGraph() {
        this.setCanvasParameters();
        this.drawCoordinateAxes();
        this.drawDescriptionAxis(true, this.canvasParameters.width, this.countOfDescriptionsX, this.data.options.axisX.max, this.data.options.axisX.min);
        this.drawDescriptionAxis(false, this.canvasParameters.height, this.countOfDescriptionsY, this.data.options.axisY.max, this.data.options.axisY.min);
        this.drawData();
        document.querySelector('.canvas').addEventListener('mousemove', (e) => {
            const x = e.pageX - e.target.offsetLeft;
            const y = e.pageY - e.target.offsetTop;
            console.log(x, y);
        });
    }

    renderStatistic() {
        this.createCanvas();
        this.drawGraph();
    }
}