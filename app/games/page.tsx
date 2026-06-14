"use client";

import React, { useState, useEffect } from 'react';
import { RotateCcw, Trophy } from 'lucide-react';

// ==================== TIC TAC TOE ====================
type Player = 'X' | 'O' | null;

const TicTacToe = () => {
  const [board, setBoard] = useState<Player[]>(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState<Player | 'Draw' | null>(null);

  const winningLines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  const calculateWinner = (squares: Player[]): Player | 'Draw' | null => {
    for (let line of winningLines) {
      const [a, b, c] = line;
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    if (squares.every(cell => cell !== null)) return 'Draw';
    return null;
  };

  const handleClick = (index: number) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);

    const gameWinner = calculateWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
    } else {
      setXIsNext(!xIsNext);
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
    setWinner(null);
  };

  const status = winner 
    ? (winner === 'Draw' ? "It's a draw" : `${winner} wins`) 
    : `${xIsNext ? 'X' : 'O'} to move`;

  return (
    <div className="card rounded-3xl p-8 md:p-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="uppercase tracking-[3px] text-xs text-zinc-500 font-mono mb-1">CLASSIC</div>
          <h3 className="font-serif text-4xl tracking-[-1px]">Tic-Tac-Toe</h3>
        </div>
        <button onClick={resetGame} className="btn flex items-center gap-2 text-sm">
          <RotateCcw className="h-4 w-4" /> Reset
        </button>
      </div>

      <div className="mb-6 flex items-center justify-between text-sm">
        <div className={`font-mono tracking-widest ${winner ? 'text-emerald-400' : 'text-zinc-400'}`}>
          {status}
        </div>
        {winner && winner !== 'Draw' && <Trophy className="h-4 w-4 text-emerald-400" />}
      </div>

      <div className="game-grid grid-cols-3 max-w-[320px] mx-auto">
        {board.map((cell, index) => (
          <button
            key={index}
            onClick={() => handleClick(index)}
            disabled={!!cell || !!winner}
            className="game-cell text-5xl font-light active:scale-[0.96] transition-transform disabled:cursor-default"
          >
            {cell && (
              <span className={cell === 'X' ? "text-white" : "text-zinc-400"}>
                {cell}
              </span>
            )}
          </button>
        ))}
      </div>
      
      <p className="mt-6 text-center text-xs text-zinc-600">Play locally with a friend. First to three in a row wins.</p>
    </div>
  );
};

// ==================== MEMORY MATCH ====================
interface MemoryCard {
  id: number;
  symbol: string;
  matched: boolean;
}

const symbols = ['🥊', '✍︎', '♪', '⌘', '◉', '△', '∞', '✧'];

const MemoryGame = () => {
  const [cards, setCards] = useState<MemoryCard[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matchedCount, setMatchedCount] = useState(0);
  const [moves, setMoves] = useState(0);
  const [isLocked, setIsLocked] = useState(false);

  // Initialize / shuffle cards
  const initGame = () => {
    const duplicated = [...symbols, ...symbols]
      .sort(() => Math.random() - 0.5)
      .map((symbol, index) => ({
        id: index,
        symbol,
        matched: false,
      }));
    setCards(duplicated);
    setFlipped([]);
    setMatchedCount(0);
    setMoves(0);
    setIsLocked(false);
  };

  useEffect(() => {
    initGame();
  }, []);

  const handleCardClick = (index: number) => {
    if (isLocked || flipped.includes(index) || cards[index].matched) return;

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setIsLocked(true);
      setMoves(m => m + 1);

      const [first, second] = newFlipped;
      
      if (cards[first].symbol === cards[second].symbol) {
        // Match!
        setTimeout(() => {
          const newCards = cards.map((card, i) =>
            i === first || i === second ? { ...card, matched: true } : card
          );
          setCards(newCards);
          setMatchedCount(prev => prev + 2);
          setFlipped([]);
          setIsLocked(false);
        }, 420);
      } else {
        // No match - flip back
        setTimeout(() => {
          setFlipped([]);
          setIsLocked(false);
        }, 820);
      }
    }
  };

  const isWon = matchedCount === cards.length && cards.length > 0;

  return (
    <div className="card rounded-3xl p-8 md:p-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="uppercase tracking-[3px] text-xs text-zinc-500 font-mono mb-1">FOCUS GAME</div>
          <h3 className="font-serif text-4xl tracking-[-1px]">Memory</h3>
        </div>
        <button onClick={initGame} className="btn flex items-center gap-2 text-sm">
          <RotateCcw className="h-4 w-4" /> New Game
        </button>
      </div>

      <div className="flex items-center justify-between mb-5 text-sm px-1">
        <div>Moves: <span className="font-mono text-white">{moves}</span></div>
        {isWon && <div className="flex items-center gap-1.5 text-emerald-400"><Trophy className="h-4 w-4" /> Perfect memory</div>}
      </div>

      <div className="game-grid grid-cols-4 max-w-[380px] mx-auto gap-3 p-4">
        {cards.map((card, index) => {
          const isFlipped = flipped.includes(index) || card.matched;
          return (
            <div
              key={card.id}
              onClick={() => handleCardClick(index)}
              className={`memory-card aspect-square ${isFlipped ? 'flipped' : ''}`}
            >
              <div className="memory-card-inner">
                {/* Back (hidden) */}
                <div className="memory-card-front text-4xl text-zinc-700">◌</div>
                {/* Front (symbol) */}
                <div className="memory-card-back text-5xl">
                  {card.symbol}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <p className="mt-6 text-center text-xs text-zinc-600">Match all pairs. Fewer moves is better.</p>
    </div>
  );
};

// ==================== MAIN GAMES PAGE ====================
export default function GamesLab() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <div className="mb-14 text-center">
        <div className="uppercase tracking-[3px] text-xs text-zinc-500 font-mono mb-4">PLAY</div>
        <h1 className="font-serif text-6xl tracking-[-2px]">Games Lab</h1>
        <p className="mt-3 max-w-sm mx-auto text-xl text-zinc-400">Small, elegant games built to be played and felt.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <TicTacToe />
        <MemoryGame />
      </div>

      <div className="mt-12 text-center text-xs text-zinc-600 max-w-xs mx-auto">
        Both games run entirely in the browser. No data is stored. Refresh to reset.
      </div>
    </div>
  );
}
