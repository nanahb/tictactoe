import {
  createBoard,
  updateBoard,
  checkWinner,
  isBoardFull,
} from './tictactoe';

describe('createBoard', () => {
  it('creates a 3x3 board with all cells set to null', () => {
    const board = createBoard();
    expect(board).toEqual([
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ]);
  });
});

describe('updateBoard', () => {
  it('updates the board with the player symbol at the specified cell', () => {
    const board = [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ];
    const newBoard = updateBoard(board, 1, 1, 'X');
    expect(newBoard).toEqual([
      [null, null, null],
      [null, 'X', null],
      [null, null, null],
    ]);
  });

  it('throws an error if the cell is already occupied', () => {
    const board = [
      [null, null, null],
      [null, 'X', null],
      [null, null, null],
    ];
    expect(() => updateBoard(board, 1, 1, 'O')).toThrow(
      'Cell at row 1, column 1 is already occupied',
    );
  });
});

describe('checkWinner', () => {
  it('returns null if there is no winner', () => {
    const board = [
      ['X', 'O', null],
      [null, 'O', null],
      [null, 'X', null],
    ];
    const winner = checkWinner(board);
    expect(winner).toBeNull();
  });

  it('returns the winner symbol if there is a horizontal win', () => {
    const board = [
      ['X', 'X', 'X'],
      [null, 'O', null],
      [null, 'O', null],
    ];
    const winner = checkWinner(board);
    expect(winner).toBe('X');
  });

  it('returns the winner symbol if there is a vertical win', () => {
    const board = [
      ['O', 'X', 'O'],
      ['X', 'X', 'O'],
      [null, 'X', null],
    ];
    const winner = checkWinner(board);
    expect(winner).toBe('X');
  });

  it('returns the winner symbol if there is a diagonal win', () => {
    const board = [
      ['X', 'O', null],
      [null, 'X', 'O'],
      ['O', null, 'X'],
    ];
    const winner = checkWinner(board);
    expect(winner).toBe('X');
  });
});

describe('isBoardFull', () => {
  it('returns false if the board is not full', () => {
    const board = [
      ['X', null, null],
      [null, 'O', null],
      [null, null, null],
    ];
    const result = isBoardFull(board);
    expect(result).toBe(false);
  });

  it('returns true if the board is full', () => {
    const board = [
      ['X', 'O', 'X'],
      ['O', 'X', 'X'],
      ['X', 'O', 'O'],
    ];
    const result = isBoardFull(board);
    expect(result).toBe(true);
  });
});