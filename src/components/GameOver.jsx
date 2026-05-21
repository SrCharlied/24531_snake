function GameOver({ score, onRestart }) {
  return (
    <section className="game-over" role="dialog" aria-label="Juego terminado">
      <h2>Game Over</h2>
      <p>Puntaje final: {score}</p>
      <button type="button" onClick={onRestart}>
        Reiniciar
      </button>
    </section>
  );
}

export default GameOver;
