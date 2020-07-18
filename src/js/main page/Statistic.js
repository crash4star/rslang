import getData, { getMidnight } from '../data/statistic';

import addElement, { getDateInString } from '../utils/utils';

import '../../css/statistic.scss';

const dashLength = 10;
const graphMargin = 50;
const amountOfDescriptionsY = 4;
const amountOfDescriptionsX = 4;
const millisecondsPerDay = 24 * 3600 * 1000;
const baseBlackColor = '#2F281E';
const graphColors = ['#c51b20', '#4d89f7'];
    

export default class Statistic  {
    constructor () {
        this.canvasParameters = {};
        this.date = getData();
        this.date.options.axisX.min = new Date(this.date.options.axisX.min.getTime() - millisecondsPerDay);
        this.date.options.axisX.max = new Date(this.date.options.axisX.max.getTime() + millisecondsPerDay * 2);
        this.init();
        this.drawGraph();
    }

    calculateAmountOfDaysDescriptions() {
        let amountOfDescriptions = amountOfDescriptionsX;
        const amountDays = Math.ceil(this.getDaysFromMilliseconds(this.date.options.axisX.max - this.date.options.axisX.min)) - 1;
        if (amountDays < amountOfDescriptions * 2) {
            amountOfDescriptions = amountDays;
        } else {
            let amount;
            for (let i = 2; i < (amountOfDescriptions * 2); i += 1) {
                if (amountDays % i === 0) {
                    amount = i;
                }
            }
            amountOfDescriptions = (amount) || amountOfDescriptions;
        }
        return amountOfDescriptions;
    }

    getAmountOfDays () {
        return Math.floor(this.getDaysFromMilliseconds(this.date.options.axisX.max - this.date.options.axisX.min + 1));
    }

    getAmountOfWords() {
        return this.date.options.axisY.max - this.date.options.axisY.min;;
    }

    init() {
        const main = document.querySelector('.main');
        const container = main.querySelector('.container');
        const wrapper = addElement('div', container, 'wrapper');
        this.canvas = addElement('canvas', wrapper, 'canvas');
        this.ctx = this.canvas.getContext('2d');
        this.alert = addElement('div', wrapper, 'statisticAlert statisticAlert-hidden', 'statisticAlert');
        addElement('div', this.alert, 'alert-date');
        addElement('div', this.alert, 'alert-value');

        this.setCanvasParameters();
        this.axisStartX = graphMargin;
        this.axisStartY = this.canvasParameters.height - graphMargin;
        
        this.amountOfDaysDescriptions = this.calculateAmountOfDaysDescriptions();
        this.stepX = (this.canvasParameters.width - graphMargin * 2) / this.getAmountOfDays();
        this.stepY = (this.axisStartY - graphMargin) / this.getAmountOfWords();

    }

    setCanvasParameters () {
        this.canvas.setAttribute('height', Math.floor(this.canvas.offsetHeight));
        this.canvas.setAttribute('width', Math.floor(this.canvas.offsetWidth));
        this.canvasParameters.width = this.canvas.offsetWidth;
        this.canvasParameters.height = this.canvas.offsetHeight;
        
        this.ctx.fillStyle = baseBlackColor;
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
        
        const stepBetweenDescriptions = length / (amountOfDescriptions + 1);
        const stepBetweenValues = (maxValue - minValue) / (amountOfDescriptions + 1);
        
        for (let i = 0; i <= amountOfDescriptions + 1; i+= 1) {
            this.ctx.beginPath();
            const coefficient = axisIsX ? i : i;
            const descriptionPositionX = axisIsX ? 
                this.axisStartX + stepBetweenDescriptions * coefficient :
                graphMargin / 3;
            const descriptionPositionY = axisIsX ? 
                this.axisStartY + graphMargin / 2 : 
                this.axisStartY - stepBetweenDescriptions * coefficient;
                let descriptionValue = Number(minValue) + Math.round(stepBetweenValues * i);
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

    drawRectangle (x0, y0, x1, y1) {
        let y = y0;
        while (y >= y1) {
            this.ctx.beginPath();
            this.ctx.moveTo(x0, y);
            this.ctx.lineTo(x1, y);
            this.ctx.stroke();
            y -= 1;
        }
    }

    drawData() {
        const minDate = this.date.options.axisX.min;
        const minValue = this.date.options.axisY.min;
        this.ctx.lineTo(this.axisStartX, this.axisStartY);   
        this.ctx.beginPath();
        let lastPointY = this.axisStartY;
        for (let i = 0; i < this.date.arrayOfDatesAndValues.length; i += 1) {
            const colorIndex = i % 2;
            this.ctx.strokeStyle = graphColors[colorIndex];
            const elementFrom = this.date.arrayOfDatesAndValues[i];
            const moveFromX = Math.round(graphMargin + this.getDaysFromMilliseconds(Number(elementFrom.date) - minDate) * this.stepX);
            let moveToX;
            if (i === this.date.arrayOfDatesAndValues.length - 1) {
                moveToX = Math.round(graphMargin + this.getDaysFromMilliseconds(Number(getMidnight(Date())) - minDate) * this.stepX + this.stepX);
            } else {
                const elementTo = this.date.arrayOfDatesAndValues[i + 1];
                moveToX = Math.round(graphMargin + this.getDaysFromMilliseconds(Number(elementTo.date) - minDate) * this.stepX);
            }
            const moveToY = Math.round(this.axisStartY - (elementFrom.value - minValue) * this.stepY);
            
            this.ctx.beginPath();
            this.ctx.moveTo(moveFromX, lastPointY);
            lastPointY = moveToY;
            this.drawRectangle(moveFromX, this.axisStartY + 1, moveToX, moveToY);
        }
    }

    setAlertValue(node, date, value) {
        node.querySelector('.alert-date').innerText = `Date: ${date}`;
        node.querySelector('.alert-value').innerText = `Learned words: ${value}`;
    }

    setAlertPosition(x, y) {
        statisticAlert.style.left = `${x + graphMargin / 2}px`;
        statisticAlert.style.top = `${y - graphMargin / 2}px`;
    }

    getValueToShow(day, data) {
        let index = data.length - 1;
        while (day < Number(data[index].date)) {
            index -= 1;
        }
        return data[index].value;
    }

    showAlert(e, stepX, minDate, data) {
        const x = e.pageX - e.target.offsetLeft;
        const dayOrdinal = Math.ceil((x - graphMargin) / stepX);
        const activeDay = minDate.getTime() + (dayOrdinal - 1) * millisecondsPerDay;
        const cursorOverTheDate = new Date(Number(activeDay));
        if (activeDay >= data[0].date && activeDay <= new Date().getTime()) {
            if (statisticAlert.classList.contains('statisticAlert-hidden')) statisticAlert.classList.remove('statisticAlert-hidden');
            const dateToShow = getDateInString(cursorOverTheDate);
            const valueToShow = this.getValueToShow(activeDay, data);
            this.setAlertPosition(e.pageX, e.pageY);
            this.setAlertValue(statisticAlert, dateToShow, valueToShow);
        } else {
            statisticAlert.classList.add('statisticAlert-hidden');
        }
    }
    
    addGraphListeners() {
        const statisticAlert = document.querySelector('#statisticAlert');
        const stepX = this.stepX;
        const minDate = this.date.options.axisX.min;
        const data = this.date.arrayOfDatesAndValues;

        document.querySelector('.canvas').addEventListener('mousemove', (e) => {
            this.showAlert(e, stepX, minDate, data);
        });

        document.querySelector('.canvas').addEventListener('click', (e) => { // for phones
            this.showAlert(e, stepX, minDate, data);
        });

        document.querySelector('.canvas').addEventListener('mouseleave', () => {
            statisticAlert.classList.add('statisticAlert-hidden');
        });
    }

    drawGraph() {
        this.drawCoordinateAxes();
        this.drawDescriptionAxis(true, this.canvasParameters.width - graphMargin * 2, this.amountOfDaysDescriptions - 1, this.date.options.axisX.max, this.date.options.axisX.min);
        this.drawDescriptionAxis(false, this.canvasParameters.height - graphMargin * 2, amountOfDescriptionsY, this.date.options.axisY.max, this.date.options.axisY.min);
        this.drawData();
        this.addGraphListeners();
    }
}