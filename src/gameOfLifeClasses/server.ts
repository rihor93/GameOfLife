import { Cell, CellStatus } from "./CellComponentClasses";

const width = 50;
const heigth = 50;
const cells = width * heigth;

export {
    width,
    heigth,
    cells
}

export async function getServerData(error: boolean) {

    let board: Cell[] = [];
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
            //board[i] = { id: i, status: CellStatus.Dead };
        }
    }

    randomBoard();
    if (error) {
        throw 'Ошибка сервера'
    }
    return board;
}


export async function getServerDataCells(error: boolean, cells2: number) {

    let board: Cell[] = [];
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
        for (var i = 0; i < cells2; i++) {
            let randomVal = getRandomInt(2);
            if (randomVal === 0) {
                board[i] = { id: i, status: CellStatus.Dead };
            } else {
                board[i] = { id: i, status: CellStatus.Alive };
            }
            //board[i] = { id: i, status: CellStatus.Dead };
        }
    }

    randomBoard();
    if (error) {
        throw 'Ошибка сервера'
    }
    return board;
}