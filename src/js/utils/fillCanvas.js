/** *****************fill bucket****************** */
export default function fill(ctx, x, y, fillColor) {
    function CanvasFloodFiller() {
    // Ширина и высота канвы
      let cWidth = -1;
      let cHeight = -1;
  
      // Заменяемый цвет
      let rR = 0;
      let rG = 0;
      let rB = 0;
      let rA = 0;
  
      // Цвет закраски
      let nR = 0;
      let nG = 0;
      let nB = 0;
      let nA = 0;
  
      let data = null;
  
      /*
       * Получить точку из данных
       * */
      const getDot = function (x, y) {
      // Точка: y * ширину_канвы * 4 + (x * 4)
        const dstart = (y * cWidth * 4) + (x * 4);
        const dr = data[dstart];
        const dg = data[dstart + 1];
        const db = data[dstart + 2];
        const da = data[dstart + 3];
  
        return {
          r: dr, g: dg, b: db, a: da,
        };
      };
  
      /*
       * Пиксель по координатам x,y - готовый к заливке?
       * */
      const isNeededPixel = function (x, y) {
        const dstart = (y * cWidth * 4) + (x * 4);
        const dr = data[dstart];
        const dg = data[dstart + 1];
        const db = data[dstart + 2];
        const da = data[dstart + 3];
  
        return (dr === rR && dg === rG && db === rB && da === rA);
      };
  
      /*
       * Найти левый пиксель, по пути закрашивая все попавшиеся
       * */
      const findLeftPixel = function (x, y) {
      // Крутим пикселы влево, заодно красим. Возвращаем левую границу.
      // Во избежание дубляжа и ошибок, findLeftPixel НЕ красит текущий
      // пиксел! Это сделает обязательный поиск вправо.
        let lx = x - 1;
        let dCoord = (y * cWidth * 4) + (lx * 4);
  
        while (lx >= 0 && data[dCoord] === rR && data[dCoord + 1] === rG
              && data[dCoord + 2] === rB && data[dCoord + 3] === rA) {
          data[dCoord] = nR;
          data[dCoord + 1] = nG;
          data[dCoord + 2] = nB;
          data[dCoord + 3] = nA;
  
          lx -= 1;
          dCoord -= 4;
        }
  
        return lx + 1;
      };
  
      /*
       * Найти правый пиксель, по пути закрашивая все попавшиеся
       * */
      const findRightPixel = function (x, y) {
        let rx = x;
        let dCoord = (y * cWidth * 4) + (x * 4);
  
        while (rx < cWidth && data[dCoord] === rR && data[dCoord + 1] === rG
              && data[dCoord + 2] === rB && data[dCoord + 3] === rA) {
          data[dCoord] = nR;
          data[dCoord + 1] = nG;
          data[dCoord + 2] = nB;
          data[dCoord + 3] = nA;
  
          rx += 1;
          dCoord += 4;
        }
  
        return rx - 1;
      };
  
      /*
       * Эффективная (строчная) заливка
       * */
      const effectiveFill = function (cx, cy) {
        const lineQueue = [];
  
        const fx1 = findLeftPixel(cx, cy);
        const fx2 = findRightPixel(cx, cy);
  
        lineQueue.push({ x1: fx1, x2: fx2, y: cy });
  
        while (lineQueue.length > 0) {
          const cLine = lineQueue.shift();
          let nx1 = cLine.x1;
          let nx2 = cLine.x1;
          let currx = nx2;
  
          // Сперва для первого пиксела, если верхний над ним цвет подходит,
          // пускаем поиск левой границы.
          // Можно искать вверх?
          if (cLine.y > 0) {
          // Сверху строка может идти левее текущей?
            if (isNeededPixel(cLine.x1, cLine.y - 1)) {
            // Ищем в том числе влево
              nx1 = findLeftPixel(cLine.x1, cLine.y - 1);
              nx2 = findRightPixel(cLine.x1, cLine.y - 1);
              lineQueue.push({ x1: nx1, x2: nx2, y: cLine.y - 1 });
            }
  
            currx = nx2;
            // Добираем недостающее, ищем только вправо, но пока не
            // доползли так или иначе далее края текущей строки
            while (cLine.x2 >= nx2 && currx <= cLine.x2 && currx < (cWidth - 1)) {
              currx += 1;
  
              if (isNeededPixel(currx, cLine.y - 1)) {
              // Сохраняем найденный отрезок
                nx1 = currx;
                nx2 = findRightPixel(currx, cLine.y - 1);
                lineQueue.push({ x1: nx1, x2: nx2, y: cLine.y - 1 });
                // Прыгаем далее найденного
                currx = nx2;
              }
            }
          }
  
          nx1 = cLine.x1;
          nx2 = cLine.x1;
          // Мо можно ли искать вниз?
          if (cLine.y < (cHeight - 1)) {
          // Снизу строка может идти левее текущей?
            if (isNeededPixel(cLine.x1, cLine.y + 1)) {
            // Ищем в том числе влево
              nx1 = findLeftPixel(cLine.x1, cLine.y + 1);
              nx2 = findRightPixel(cLine.x1, cLine.y + 1);
              lineQueue.push({ x1: nx1, x2: nx2, y: cLine.y + 1 });
            }
  
            currx = nx2;
            // Добираем недостающее, ищем только вправо, но пока не
            // доползли так или иначе далее края текущей строки
            while (cLine.x2 >= nx2 && currx <= cLine.x2 && currx < (cWidth - 1)) {
              currx += 1;
  
              if (isNeededPixel(currx, cLine.y + 1)) {
              // Сохраняем найденный отрезок
                nx1 = currx;
                nx2 = findRightPixel(currx, cLine.y + 1);
                lineQueue.push({ x1: nx1, x2: nx2, y: cLine.y + 1 });
                // Прыгаем далее найденного
                currx = nx2;
              }
            }
          }
        } // while (main loop)
      };
  
      /*
       * void floodFill(CanvasContext2D canvasContext, int x, int y)
       * Выполняет заливку на канве
       * canvasContext - контекст
       * int x, y - координаты точки заливки
       * color - цвет заливки
       */
      this.floodFill = function (canvasContext, x, y, color) {
        cWidth = canvasContext.canvas.width;
        cHeight = canvasContext.canvas.height;
        // debugger;
        nR = color.r;
        nG = color.g;
        nB = color.b;
        nA = color.a;
  
        const idata = canvasContext.getImageData(0, 0, cWidth, cHeight);
        const pixels = idata.data;
        data = pixels;
  
        const toReplace = getDot(x, y);
        rR = toReplace.r;
        rG = toReplace.g;
        rB = toReplace.b;
        rA = toReplace.a;
  
        // Всё зависнет, если цвета совпадают
        if (rR === nR && rG === nG && rB === nB && rA === nA) {
          return;
        }
  
        effectiveFill(x, y);
  
        canvasContext.putImageData(idata, 0, 0);
      };
    }
  
    function getCurrentColorObj(color) {
      return {
        r: parseInt(color.slice(1, 3), 16),
        g: parseInt(color.slice(3, 5), 16),
        b: parseInt(color.slice(5, 7), 16),
        a: 255,
      };
    }

    function getCurrentColorObj(color) {
      return {
        r: parseInt(color.slice(1, 3), 16),
        g: parseInt(color.slice(3, 5), 16),
        b: parseInt(color.slice(5, 7), 16),
        a: 255,
      };
    }
  
    const filler = new CanvasFloodFiller();
    const color = getCurrentColorObj(fillColor);
    filler.floodFill(ctx, x, y, color);
  }
  
  /** *****************fill bucket****************** */