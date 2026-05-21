function StartScreen({ onStart }) {
  return (
    <section className="start-screen">
      <p className="game-kicker">Retro Arcade</p>
      <h1>Snake Game</h1>
      <p>Come, crece y evita chocar contra los bordes.</p>
      <button type="button" onClick={onStart}>
        Iniciar juego
      </button>
    </section>
  );
}

export default StartScreen;
