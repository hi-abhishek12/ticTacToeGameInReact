import { useEffect, useState } from "react";
import "./App.css";
import Cells from "./components/Cells";
import Button from "./components/Button";

const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function getWinner(board) {
  for (const combo of WINNING_COMBINATIONS) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { player: board[a], line: combo };
    }
  }
  return null;
}

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState("O");
  const [gameResult, setGameResult] = useState("");
  const [winningLine, setWinningLine] = useState(null);

  const winner = getWinner(board);
  const isDraw = !winner && board.every((cell) => cell !== null);
  const gameOver = Boolean(winner) || isDraw;

  const handleClick = (index) => {
    if (gameOver || board[index] !== null) return;

    const nextBoard = [...board];
    nextBoard[index] = currentPlayer;
    setBoard(nextBoard);
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  };

  useEffect(() => {
    if (winner) {
      setWinningLine(winner.line);
      setGameResult(`Player ${winner.player} wins`);
    } else if (isDraw) {
      setWinningLine(null);
      setGameResult("It's a draw");
    } else {
      setWinningLine(null);
      setGameResult("");
    }
  }, [board, winner, isDraw]);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer("O");
    setGameResult("");
    setWinningLine(null);
  };

  return (
    <div className="app-shell flex min-h-full flex-col items-center justify-center gap-6 px-4 py-8">
      <header className="animate-fade-up text-center">
        <h1 className="text-3xl font-semibold tracking-tight text-text sm:text-4xl">
          Tic Tac Toe
        </h1>
        <p className="mt-1 text-sm text-text-muted">
          Classic two-player game
        </p>
      </header>

      <div
        className="animate-fade-up flex items-center gap-4 text-sm font-medium"
        style={{ animationDelay: "0.08s" }}
      >
        <span
          className={[
            "rounded-full px-3 py-1 transition-all duration-200",
            currentPlayer === "X" && !gameOver
              ? "bg-indigo-50 text-player-x ring-1 ring-indigo-200"
              : "text-text-muted",
          ].join(" ")}
        >
          Player X
        </span>
        <span className="text-text-muted">·</span>
        <span
          className={[
            "rounded-full px-3 py-1 transition-all duration-200",
            currentPlayer === "O" && !gameOver
              ? "bg-teal-50 text-player-o ring-1 ring-teal-200"
              : "text-text-muted",
          ].join(" ")}
        >
          Player O
        </span>
      </div>

      {gameResult ? (
        <p
          className="animate-result-in text-base font-medium text-text"
          style={{ animationDelay: "0.05s" }}
        >
          {gameResult}
        </p>
      ) : (
        <p className="text-sm text-text-muted">
          {gameOver ? "" : `${currentPlayer}'s turn`}
        </p>
      )}

      <div
        className="animate-fade-up rounded-2xl border border-border bg-surface p-4 shadow-sm sm:p-5"
        style={{ animationDelay: "0.12s" }}
      >
        <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
          {board.map((cell, index) => (
            <Cells
              key={index}
              onClick={() => handleClick(index)}
              value={cell}
              disabled={gameOver}
              isWinning={winningLine?.includes(index)}
            />
          ))}
        </div>
      </div>

      <Button
        onClick={resetGame}
        className="animate-fade-up"
        style={{ animationDelay: "0.2s" }}
      >
        New Game
      </Button>
    </div>
  );
}

export default App;
