import { Cell, CellStatus } from "../components/CellComponent";

export function boardFunction() {
    const width = 50;
    const heigth = 50;
    const cells = width * heigth;
    //const delay = 5000;

    //let generation = 0;



    /**
     * массив ячеек в сетке
     */
    let board: Cell[] = [];

    /**
     * функция очистки поля, для игры
     */
    function clearBoard(): void {
        board = [];
        for (var i = 0; i < cells; i++) {
            board[i] = { id: i, status: CellStatus.Dead };
        }
    }

    /**
     * генератор случайных чисел
     * @param max максимальное значение, для генератора,возвращает знание от 0 до max
     * @returns 
     */
    function getRandomInt(max: number): number {
        return Math.floor(Math.random() * max);
    }

    /**
     * функция инициализации начального состоянии игры
     */
    function randomBoard(): void {
        board = [];
        for (var i = 0; i < cells; i++) {
            let randomVal = getRandomInt(2);
            if (randomVal === 0) {
                board[i] = { id: i, status: CellStatus.Dead };
            } else {
                board[i] = { id: i, status: CellStatus.Alive };
            }
        }
    }

    /**
     * функция по обработке массива ячеек, на очередном тике жизни
     * @returns массив ячеек, после очередного цикла работы
     */
    function runGeneration(): Cell[] {

        let newBoard = [];

        //let cellStatus = null;

        for (var i = 0; i < (cells); i++) {

            newBoard.push({ id: i, status: CellStatus.Dead });

            var check = cellCheck(i);

            //keeps the living cell alive if it has 2 or 3 living neighbors
            if ((board[i].status === CellStatus.Alive || board[i].status === CellStatus.AliveOld) && (check === 3 || check === 2)) {
                newBoard[i] = { id: i, status: CellStatus.AliveOld };
            }
            //brings the dead cell to life if there are exactly 3 neighbors
            if (board[i].status === CellStatus.Dead && check === 3) {
                newBoard[i] = { id: i, status: CellStatus.Alive };
            }

        }

        //check to see if all of the cells are dead.  Stops the run.
        /*for (var i = 0; i < cells; i++) {
            if (board[i].status === CellStatus.Alive || board[i].status === CellStatus.AliveOld) {break;}
            if (i === cells - 1) {
                //alert("They're all dead! Reseting.  :)");
          
          
            }
        }*/

        return newBoard;
    }

        /**
     * функция проверки ячейки, на то, сколько воркуг неё живых ячеек
     * @param i номер ячейки в массиве, которую проверяем
     * @returns количество живых ячеек вокруг заданной
     */
        function cellCheck(i: number) {

            let count = 0;
            let borderCell = 0;
            //checks wrap-around for the top row going upward to the bottom
            if (i >= 0 && i <= (width - 1)) {
                borderCell = 1;
                let dif = width - i;
                //console.log('i:' + i + ' dif:' + dif + ' cell:' + (cells - dif));
                if (board[cells - dif].status === CellStatus.Alive
                    || board[cells - dif].status === CellStatus.AliveOld) {
                    count++;
                    //console.log(status + ' 1 high center one for: ' + i + ' cell: ' + (cells - dif));
                }
                if (i !== 0 && (board[cells - dif - 1].status === CellStatus.Alive
                    || board[cells - dif - 1].status === CellStatus.AliveOld)) {
                    count++;
                    //console.log(status + ' 1 high left one for: ' + i + ' cell: ' + (cells - dif - 1));
                }
                if (i !== (width - 1) && (board[cells - dif + 1].status === CellStatus.Alive
                    || board[cells - dif + 1].status === CellStatus.AliveOld)) {
                    count++;
                    //console.log(status + ' 1 high right one for: ' + i + ' cell: ' + (cells - dif + 1));
                }
                //normal checks, not involving wrap-arounds
                if (i !== 0 && (board[i + width - 1].status === CellStatus.Alive
                    || board[i + width - 1].status === CellStatus.AliveOld)) {
                    count++;
                    //console.log(status + ' 1 low left one for: ' + i + ' cell: ' + (i + width - 1));
                }
                if (board[i + width].status === CellStatus.Alive
                    || board[i + width].status === CellStatus.AliveOld) {
                    count++;
                    //console.log(status + ' 1 low center one for: ' + i + ' cell: ' + (i + width));
                }
                if (i !== (width - 1) && (board[i + width + 1].status === CellStatus.Alive
                    || board[i + width + 1].status === CellStatus.AliveOld)) {
                    count++;
                    //console.log(status + ' 1 low right one for: ' + i + ' cell: ' + (i + width + 1));
                }
                if (i !== 0 && (board[i - 1].status === CellStatus.Alive
                    || board[i - 1].status === CellStatus.AliveOld)) {
                    count++;
                    //console.log(status + ' 1 left one for: ' + i + ' cell: ' + (i - 1));
                }
                if (i !== (width - 1) && (board[i + 1].status === CellStatus.Alive
                    || board[i + 1].status === CellStatus.AliveOld)) {
                    count++;
                    //console.log(status + ' 1 right right one for: ' + i + ' cell: ' + (i + 1));
                }
            }
            //checks wrap-around for the bottom row going down to the top row
            if (i >= (cells - width) && i <= (cells - 1)) {
                borderCell = 1;
                let dif = i + width - cells;
                //console.log('i:' + i + ' dif:' + dif + ' cell:' + (cells - dif));
                if (board[dif].status === CellStatus.Alive
                    || board[dif].status === CellStatus.AliveOld) {
                    count++;
                    //console.log(status + ' 2 low center one for: ' + i + ' cell: ' + (cells - dif));
                }
                if (i !== (cells - width) && (board[dif - 1].status === CellStatus.Alive
                    || board[dif - 1].status === CellStatus.AliveOld)) {
                    count++;
                    //console.log(status + ' 2 low left one for: ' + i + ' cell: ' + (cells - dif - 1));
                }
                if (i !== (cells - 1) && (board[dif + 1].status === CellStatus.Alive
                    || board[dif + 1].status === CellStatus.AliveOld)) {
                    count++;
                    //console.log(status + ' 2 low right one for: ' + i + ' cell: ' + (cells - dif + 1));
                }
                //normal checks, not involving wrap-arounds
                if (i !== (cells - width) && (board[i - width - 1].status === CellStatus.Alive
                    || board[i - width - 1].status === CellStatus.AliveOld)) {
                    count++;
                    //console.log(status + ' 2 high left for: ' + i + ' cell: ' + (i - width - 1));
                }
                if (board[i - width].status === CellStatus.Alive
                    || board[i - width].status === CellStatus.AliveOld) {
                    count++;
                    //console.log(status + ' 2 high center for: ' + i + ' cell: ' + (i + width));
                }
                if (i !== (cells - 1) && (board[i - width + 1].status === CellStatus.Alive
                    || board[i - width + 1].status === CellStatus.AliveOld)) {
                    count++;
                    //console.log(status + ' 2 high right for: ' + i + ' cell: ' + (i - width - 1));
                }
                if (i !== (cells - width) && (board[i - 1].status === CellStatus.Alive
                    || board[i - 1].status === CellStatus.AliveOld)) {
                    count++;
                    //console.log(status + ' 2 left for: ' + i + ' cell: ' + (i - 1));
                }
                if (i !== (cells - 1) && (board[i + 1].status === CellStatus.Alive
                    || board[i + 1].status === CellStatus.AliveOld)) {
                    count++;
                    //console.log(status + ' 2 right for: ' + i + ' cell: ' + (i + 1));
                }
    
            }
            //checks for cells on the right border (wraping around to left)
            if (((i + 1) % width) === 0) {
                borderCell = 1;
    
                //to the 'immediate right' with wrap-around
                if (board[i - width + 1].status === CellStatus.Alive
                    || board[i - width + 1].status === CellStatus.AliveOld) {
                    count++;
                    //console.log(status + ' 3 right for: ' + i + ' cell: ' + (i - width + 1));
                }
                //to the 'lower right' with wrap-around
                if (i !== (cells - 1) && (board[i + 1].status === CellStatus.Alive
                    || board[i + 1].status === CellStatus.AliveOld)) {
                    count++;
                    //console.log(status + ' 3 lower right: ' + i + ' cell: ' + (i + 1));
                }
                //to the 'lower right' with wrap-around for the last cell
                if (i === (cells - 1) && (board[0].status === CellStatus.Alive
                    || board[0].status === CellStatus.AliveOld)) {
                    count++;
                    //console.log(status + ' 3 lower right for last cell: ' + i + ' cell: 0');
                }
                //to the 'upper right' with wrap-around for all but the cell
                //in the upper right
                if (i > width && (board[i - (2 * width) + 1].status === CellStatus.Alive
                    || board[i - (2 * width) + 1].status === CellStatus.AliveOld)) {
                    count++;
                    //console.log(status + ' 3 upper right: ' + i + ' cell: ' + (i - (2 * width) + 1));
                }
                //to the 'upper right' with wrap-around for the
                //cell in the upper right
                if (i === width - 1 && (board[(cells - width)].status === CellStatus.Alive
                    || board[(cells - width)].status === CellStatus.AliveOld)) {
                    count++;
                    //console.log(status + ' 3 highdiag one for upper right cell: ' + i + ' cell: ' + (cells + 1 - width));
                }
    
                //normal checks for normal cells that don't wrap around
    
                //checks for the cell directly above (non-wrapping)
                if (i !== (width - 1) && i !== (cells - 1) && (board[i - width].status === CellStatus.Alive
                    || board[i - width].status === CellStatus.AliveOld)) {
                    count++;
                    //console.log(status + ' 3 center top for: ' + i + ' cell: ' + (i - width));
                }
                //checks for the cell directly below (non-wrapping)
                if (i !== (cells - 1) && i !== (width - 1) && (board[i + width].status === CellStatus.Alive
                    || board[i + width].status === CellStatus.AliveOld)) {
                    count++;
                    //console.log(status + ' 3 center bottom for: ' + i + ' cell: ' + (i + width));
                }
                if (i !== (cells - 1) && i !== (width - 1) && (board[i + width - 1].status === CellStatus.Alive
                    || board[i + width - 1].status === CellStatus.AliveOld)) {
                    count++;
                    //console.log(status + ' 3 lower left: ' + i + ' cell: ' + (i + width - 1));
                }
                if (i !== (cells - 1) && i !== (width - 1) && (board[i - 1].status === CellStatus.Alive
                    || board[i - 1].status === CellStatus.AliveOld)) {
                    count++;
                    //console.log(status + ' 3 left: ' + i + ' cell: ' + (i - 1));
                }
                if (i !== (width - 1) && i !== (cells - 1) && (board[i - width - 1].status === CellStatus.Alive
                    || board[i - width - 1].status === CellStatus.AliveOld)) {
                    count++;
                    //console.log(status + ' 3 upper left: ' + i + ' cell: ' + (i - width - 1));
                }
                if (i === (width - 1) && (board[cells - width - 1].status === CellStatus.Alive
                    || board[cells - width - 1].status === CellStatus.AliveOld)) {
                    count++;
                    //console.log(status + ' 3 upper left for top left cell: ' + i + ' cell: ' + (i + width - 1));
                }
    
            }
            //checks for cells on the left border (wraping around to right)
            if (((i) % width) === 0 || i === 0) {
                borderCell = 1;
    
                //to the 'immediate left' with wrap-around
                if (board[i + width - 1].status === CellStatus.Alive
                    || board[i + width - 1].status === CellStatus.AliveOld) {
                    count++;
                    //console.log(status + ' 4 left one for: ' + i + ' cell: ' + (i + width - 1));
                }
                //to the 'lower left' with wrap-around for all but lowest left cell
                if (i !== (cells - width) && (board[i + (width * 2) - 1].status === CellStatus.Alive
                    || board[i + (width * 2) - 1].status === CellStatus.AliveOld)) {
                    count++;
                    //console.log(status + ' 4 lower left one for: ' + i + ' cell: ' + (i + (width * 2) - 1));
                }
                //to the 'lower right' with wrap-around for the low left cell
                if (i === (cells - width) && (board[width - 1].status === CellStatus.Alive
                    || board[width - 1].status === CellStatus.AliveOld)) {
                    count++;
                    //console.log(status + ' 4 low left one for lowest left cell: ' + i + ' cell: ' + (width - 1));
                }
                //to the 'upper left' with wrap-around for all but the cell in the upper left
                if (i >= width && (board[i - 1].status === CellStatus.Alive
                    || board[i - 1].status === CellStatus.AliveOld)) {
                    count++;
                    //console.log(status + ' 4 highleft one for: ' + i + ' cell: ' + (i - 1));
                }
                //to the 'upper left' with wrap-around for the cell in the upper left
                if (i === 0 && (board[cells - 1].status === CellStatus.Alive
                    || board[cells - 1].status === CellStatus.AliveOld)) {
                    count++;
                    //console.log(status + ' 4 highleft one for upper left cell: ' + i + ' cell: ' + (cells - 1));
                }
    
                //normal checks for normal cells that don't wrap around
    
                //checks for the cell directly above (non-wrapping)
                if (i !== (width + 1) && i !== (cells - width) && i !== 0 && (board[i - width].status === CellStatus.Alive
                    || board[i - width].status === CellStatus.AliveOld)) {
                    count++;
                    //console.log(status + ' 4 center top for: ' + i + ' cell: ' + (i - width));
                }
                //checks for the cell directly below (non-wrapping) for all but cell 0
                //or the lower left cell
                if (i < (cells - width) && i !== 0 && (board[i + width].status === CellStatus.Alive
                    || board[i + width].status === CellStatus.AliveOld)) {
                    count++;
                    //console.log(status + ' 4 center bottom for: ' + i + ' cell: ' + (i + width));
                }
                //checks for the cell to the upper right (non-wrapping) for all but cell 0
                //or the lower left cell
                if (i !== 0 && i !== (cells - width) && (board[i - width + 1].status === CellStatus.Alive
                    || board[i - width + 1].status === CellStatus.AliveOld)) {
                    count++;
                    //console.log(status + ' 4 upper right for: ' + i + ' cell: ' + (i - width + 1));
                }
                //checks for the cell to the immediate right (non-wrapping)
                if (i !== 0 && i !== (cells - width) && (board[i + 1].status === CellStatus.Alive
                    || board[i + 1].status === CellStatus.AliveOld)) {
                    count++;
                    //console.log(status + ' 4 right for: ' + i + ' cell: ' + (i + 1));
                }
                //checks for the cell to the lower right (non-wrapping) for all
                //but lower left cell and cell 0
    
                if (i < (cells - width) && i !== 0) {
                    if (board[i + width + 1].status === CellStatus.Alive
                        || board[i + width + 1].status === CellStatus.AliveOld) {
                        count++;
                        //console.log(status + ' 4 lower right for: ' + i + ' cell: ' + (i + width + 1));
                    }
                }
    
            }
    
            if (borderCell === 0) {
                if (board[i - width].status === CellStatus.Alive
                    || board[i - width].status === CellStatus.AliveOld) {
                    count++;
                    //console.log(status + ' non-border -- upper center for: ' + i);
                }
                if (board[i - width - 1].status === CellStatus.Alive
                    || board[i - width - 1].status === CellStatus.AliveOld) {
                    count++;
                    //console.log(status + ' non-border -- upper left for: ' + i);
                }
                if (board[i - width + 1].status === CellStatus.Alive
                    || board[i - width + 1].status === CellStatus.AliveOld) {
                    count++;
                    //console.log(status + ' non-border -- upper right for: ' + i);
                }
                if (board[i - 1].status === CellStatus.Alive
                    || board[i - 1].status === CellStatus.AliveOld) {
                    count++;
                    //console.log(status + ' non-border -- left for: ' + i);
                }
                if (board[i + 1].status === CellStatus.Alive
                    || board[i + 1].status === CellStatus.AliveOld) {
                    count++;
                    //console.log(status + ' non-border -- right for: ' + i);
                }
                if (board[i + width].status === CellStatus.Alive
                    || board[i + width].status === CellStatus.AliveOld) {
                    count++;
                    //console.log(status + ' non-border -- lower center for: ' + i);
                }
                if (board[i + width - 1].status === CellStatus.Alive
                    || board[i + width - 1].status === CellStatus.AliveOld) {
                    count++;
                    //console.log(status + ' non-border -- lower left for: ' + i);
                }
                if (board[i + width + 1].status === CellStatus.Alive
                    || board[i + width + 1].status === CellStatus.AliveOld) {
                    count++;
                    //console.log(status + ' non-border -- lower right for: ' + i);
                }
            }
            return count;
        }


    /*function runIt() {
        randomBoard();
        //setBroad(board);
        setTimeout(function () {
            generation++;
            board = runGeneration();
            setTimeout(function () {
                setBroad(board);
                //runIt();
            }, delay);
        }, 0);

    };

    runIt();*/

    randomBoard();

    return {
        board,
    }
}