import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

// Bheem Laddoo Run Game
export const BheemLaddooRun = ({ onClose }) => {
  const [position, setPosition] = useState(50);
  const [jumping, setJumping] = useState(false);
  const [laddoos, setLaddoos] = useState([]);
  const [obstacles, setObstacles] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const gameRef = useRef(null);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowLeft') setPosition(prev => Math.max(10, prev - 20));
      if (e.key === 'ArrowRight') setPosition(prev => Math.min(90, prev + 20));
      if (e.key === ' ' && !jumping) {
        setJumping(true);
        setTimeout(() => setJumping(false), 500);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [jumping]);

  useEffect(() => {
    if (gameOver) return;

    const gameLoop = setInterval(() => {
      // Generate laddoos
      if (Math.random() < 0.1) {
        setLaddoos(prev => [...prev, { id: Date.now(), x: Math.random() * 80 + 10, y: 0 }]);
      }

      // Generate obstacles
      if (Math.random() < 0.05) {
        setObstacles(prev => [...prev, { id: Date.now(), x: Math.random() * 80 + 10, y: 0 }]);
      }

      // Move laddoos and obstacles
      setLaddoos(prev => prev.map(l => ({ ...l, y: l.y + 2 })).filter(l => l.y < 100));
      setObstacles(prev => prev.map(o => ({ ...o, y: o.y + 3 })).filter(o => o.y < 100));

      // Check collisions
      laddoos.forEach(l => {
        if (Math.abs(l.x - position) < 10 && Math.abs(l.y - 80) < 10 && !jumping) {
          setScore(s => s + 10);
          setLaddoos(prev => prev.filter(item => item.id !== l.id));
        }
      });

      obstacles.forEach(o => {
        if (Math.abs(o.x - position) < 10 && Math.abs(o.y - 80) < 10 && !jumping) {
          setGameOver(true);
        }
      });
    }, 100);

    return () => clearInterval(gameLoop);
  }, [position, jumping, gameOver]);

  const restartGame = () => {
    setPosition(50);
    setJumping(false);
    setLaddoos([]);
    setObstacles([]);
    setScore(0);
    setGameOver(false);
  };

  return (
    <div className="game-container p-4 text-center">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="fw-bold" style={{ color: '#FF6B35' }}>Bheem Laddoo Run</h3>
        <div className="score-display fs-4 fw-bold">Score: {score}</div>
      </div>

      <div 
        ref={gameRef}
        className="game-area position-relative mx-auto border rounded"
        style={{ 
          width: '100%', 
          height: '400px', 
          backgroundColor: '#FFF9C4',
          overflow: 'hidden'
        }}
      >
        {/* Player (Bheem) */}
        <motion.div
          className="position-absolute"
          style={{
            left: `${position}%`,
            bottom: jumping ? '120px' : '80px',
            fontSize: '2rem',
            transition: 'bottom 0.3s'
          }}
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        >
          💪
        </motion.div>

        {/* Laddoos */}
        {laddoos.map(l => (
          <div
            key={l.id}
            className="position-absolute"
            style={{
              left: `${l.x}%`,
              top: `${l.y}%`,
              fontSize: '1.5rem'
            }}
          >
            🍛
          </div>
        ))}

        {/* Obstacles */}
        {obstacles.map(o => (
          <div
            key={o.id}
            className="position-absolute"
            style={{
              left: `${o.x}%`,
              top: `${o.y}%`,
              fontSize: '1.5rem'
            }}
          >
            🪨
          </div>
        ))}

        {/* Ground */}
        <div 
          className="position-absolute w-100"
          style={{ 
            bottom: 0, 
            height: '80px', 
            backgroundColor: '#8BC34A' 
          }}
        />

        {gameOver && (
          <div className="position-absolute top-50 start-50 translate-middle text-center">
            <div className="bg-white p-4 rounded shadow-lg">
              <h4 className="text-danger">Game Over!</h4>
              <p className="fs-5">Final Score: {score}</p>
              <button 
                className="btn btn-primary me-2"
                onClick={restartGame}
              >
                Play Again
              </button>
              <button 
                className="btn btn-secondary"
                onClick={onClose}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="instructions mt-3 p-3 bg-light rounded">
        <p className="mb-1"><strong>Controls:</strong></p>
        <p className="mb-0">← → Arrow Keys to Move | Spacebar to Jump</p>
        <p className="mb-0">Collect laddoos (🍛) and avoid rocks (🪨)</p>
      </div>
    </div>
  );
};

// Shinchan Puzzle Challenge
export const ShinchanPuzzle = ({ onClose }) => {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [solved, setSolved] = useState([]);
  const [moves, setMoves] = useState(0);

  const shinchanFaces = ['😜', '😂', '🤪', '😎', '🥳', '🤠'];

  useEffect(() => {
    startGame();
  }, []);

  const startGame = () => {
    const gameCards = [...shinchanFaces, ...shinchanFaces]
      .sort(() => Math.random() - 0.5)
      .map((face, index) => ({ id: index, face, flipped: false }));
    setCards(gameCards);
    setFlipped([]);
    setSolved([]);
    setMoves(0);
  };

  const handleCardClick = (id) => {
    if (flipped.length === 2 || flipped.includes(id) || solved.includes(id)) return;

    const newFlipped = [...flipped, id];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(moves + 1);
      const [first, second] = newFlipped;
      
      if (cards[first].face === cards[second].face) {
        setSolved([...solved, first, second]);
        setFlipped([]);
      } else {
        setTimeout(() => setFlipped([]), 1000);
      }
    }
  };

  return (
    <div className="game-container p-4 text-center">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bold" style={{ color: '#FFD93D' }}>Shinchan Puzzle Challenge</h3>
        <div className="score-display">
          <span className="fw-bold">Moves: {moves}</span>
        </div>
      </div>

      <div className="row justify-content-center">
        {cards.map((card, index) => (
          <div key={card.id} className="col-3 mb-3">
            <motion.div
              className="card-game-card rounded-3 shadow-sm"
              style={{
                width: '80px',
                height: '80px',
                cursor: 'pointer',
                backgroundColor: flipped.includes(index) || solved.includes(index) ? '#FFD93D' : '#6c757d',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2rem'
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleCardClick(index)}
            >
              {(flipped.includes(index) || solved.includes(index)) ? card.face : '?'}
            </motion.div>
          </div>
        ))}
      </div>

      {solved.length === cards.length && cards.length > 0 && (
        <motion.div
          className="mt-4 p-3 bg-success text-white rounded"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
        >
          <h4>🎉 Congratulations! 🎉</h4>
          <p>You completed the puzzle in {moves} moves!</p>
          <button className="btn btn-light me-2" onClick={startGame}>
            Play Again
          </button>
          <button className="btn btn-outline-light" onClick={onClose}>
            Close
          </button>
        </motion.div>
      )}

      <div className="instructions mt-3">
        <button className="btn btn-warning me-2" onClick={startGame}>
          Restart Game
        </button>
        <button className="btn btn-secondary" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

// Motu Patlu Samosa Factory
export const SamosaFactory = ({ onClose }) => {
  const [samosas, setSamosas] = useState(0);
  const [customers, setCustomers] = useState([]);
  const [money, setMoney] = useState(100);
  const [level, setLevel] = useState(1);

  useEffect(() => {
    const customerInterval = setInterval(() => {
      if (customers.length < 3) {
        setCustomers(prev => [...prev, {
          id: Date.now(),
          patience: 30,
          order: Math.floor(Math.random() * 3) + 1
        }]);
      }
    }, 5000);

    const patienceInterval = setInterval(() => {
      setCustomers(prev => prev.map(customer => ({
        ...customer,
        patience: customer.patience - 1
      })).filter(customer => customer.patience > 0));
    }, 1000);

    return () => {
      clearInterval(customerInterval);
      clearInterval(patienceInterval);
    };
  }, [customers.length]);

  const makeSamosa = () => {
    if (money >= 5) {
      setSamosas(prev => prev + 1);
      setMoney(prev => prev - 5);
    }
  };

  const serveCustomer = (customerId) => {
    const customer = customers.find(c => c.id === customerId);
    if (customer && samosas >= customer.order) {
      setSamosas(prev => prev - customer.order);
      setMoney(prev => prev + (customer.order * 15));
      setCustomers(prev => prev.filter(c => c.id !== customerId));
      
      if (money >= level * 100) {
        setLevel(prev => prev + 1);
      }
    }
  };

  return (
    <div className="game-container p-4">
      <h3 className="text-center fw-bold mb-4" style={{ color: '#4ECDC4' }}>Motu Patlu Samosa Factory</h3>
      
      <div className="row text-center mb-4">
        <div className="col-4">
          <div className="bg-light p-3 rounded">
            <h5>💰 Money</h5>
            <h3 className="text-success">${money}</h3>
          </div>
        </div>
        <div className="col-4">
          <div className="bg-light p-3 rounded">
            <h5>🥟 Samosas</h5>
            <h3 className="text-warning">{samosas}</h3>
          </div>
        </div>
        <div className="col-4">
          <div className="bg-light p-3 rounded">
            <h5>📈 Level</h5>
            <h3 className="text-primary">{level}</h3>
          </div>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-md-6">
          <div className="bg-warning p-4 rounded text-center">
            <h5>Make Samosas</h5>
            <p>Cost: $5 each</p>
            <motion.button
              className="btn btn-danger btn-lg"
              onClick={makeSamosa}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={money < 5}
            >
              Make Samosa 🥟
            </motion.button>
          </div>
        </div>
        
        <div className="col-md-6">
          <div className="bg-info p-4 rounded">
            <h5 className="text-center">Customers</h5>
            {customers.map(customer => (
              <motion.div
                key={customer.id}
                className="customer-card bg-white p-3 rounded mb-2 d-flex justify-content-between align-items-center"
                initial={{ x: 100 }}
                animate={{ x: 0 }}
              >
                <div>
                  <span className="fw-bold">Wants {customer.order} samosas</span>
                  <br />
                  <small>Patience: {customer.patience}s</small>
                </div>
                <button
                  className="btn btn-success btn-sm"
                  onClick={() => serveCustomer(customer.id)}
                  disabled={samosas < customer.order}
                >
                  Serve
                </button>
              </motion.div>
            ))}
            {customers.length === 0 && (
              <p className="text-center text-muted">Waiting for customers...</p>
            )}
          </div>
        </div>
      </div>

      <div className="text-center">
        <button className="btn btn-secondary" onClick={onClose}>
          Close Game
        </button>
      </div>
    </div>
  );
};

// Add more game components for other characters...
export const LittleSinghamChase = ({ onClose }) => {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [thieves, setThieves] = useState([]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  useEffect(() => {
    const thiefInterval = setInterval(() => {
      if (timeLeft > 0) {
        setThieves(prev => [...prev, {
          id: Date.now(),
          x: Math.random() * 80 + 10,
          caught: false
        }]);
      }
    }, 1000);

    return () => clearInterval(thiefInterval);
  }, [timeLeft]);

  const catchThief = (thiefId) => {
    setThieves(prev => prev.map(t => 
      t.id === thiefId ? { ...t, caught: true } : t
    ));
    setScore(prev => prev + 10);
  };

  return (
    <div className="game-container p-4 text-center">
      <h3 className="fw-bold mb-3" style={{ color: '#EF233C' }}>Little Singham Crime Chase</h3>
      
      <div className="d-flex justify-content-around mb-4">
        <div className="fs-4">Time: {timeLeft}s</div>
        <div className="fs-4">Score: {score}</div>
      </div>

      <div className="game-area position-relative mx-auto border rounded bg-primary bg-opacity-10"
        style={{ height: '300px' }}>
        
        {/* Little Singham */}
        <div className="position-absolute"
          style={{ left: '50%', bottom: '20px', fontSize: '3rem' }}>
          🚓
        </div>

        {/* Thieves */}
        {thieves.map(thief => (
          <motion.div
            key={thief.id}
            className="position-absolute"
            style={{
              left: `${thief.x}%`,
              top: '20px',
              fontSize: '2rem',
              cursor: thief.caught ? 'default' : 'pointer'
            }}
            animate={{ y: [0, 200, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            onClick={() => !thief.caught && catchThief(thief.id)}
          >
            {thief.caught ? '✅' : '👤'}
          </motion.div>
        ))}
      </div>

      {timeLeft === 0 && (
        <div className="mt-4 p-3 bg-info text-white rounded">
          <h4>Game Over!</h4>
          <p>Final Score: {score}</p>
          <button className="btn btn-light" onClick={onClose}>
            Close
          </button>
        </div>
      )}

      <div className="instructions mt-3">
        <p>Click on the thieves (👤) to catch them!</p>
      </div>
    </div>
  );
};