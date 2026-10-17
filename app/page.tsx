import EstadoConexion from "@/components/EstadoConexion";

const rewards = [
  {
    number: "01",
    title: "Cada paso cuenta",
    description:
      "Empieza con lo que ya haces. Los pequeños avances también merecen celebrarse.",
    className: "reward-card--peach",
  },
  {
    number: "02",
    title: "Suma tus puntitos",
    description:
      "Convierte tus logros cotidianos en una colección de momentos para sentirte bien.",
    className: "reward-card--lavender",
  },
  {
    number: "03",
    title: "Date un extra",
    description:
      "Mira cuánto has avanzado y elige cómo celebrar todo lo que conseguiste.",
    className: "reward-card--mint",
  },
];

function DotMark() {
  return (
    <span aria-hidden="true" className="dot-mark">
      <span />
      <span />
      <span />
      <span />
    </span>
  );
}

export default function Home() {
  return (
    <>
      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="Puntitos Extra, inicio">
          <DotMark />
          <span>
            puntitos <strong>extra</strong>
          </span>
        </a>
        <nav className="main-nav" aria-label="Navegación principal">
          <a href="#idea">La idea</a>
          <a href="#pasos">Cómo funciona</a>
        </nav>
        <a className="header-cta" href="#pasos">
          Descubre más <span aria-hidden="true">↗</span>
        </a>
      </header>

      <main id="inicio">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow">
              <span aria-hidden="true" /> Lo bueno también se suma
            </p>
            <h1 id="hero-title">
              Un poquito más de alegría en cada <span>logro.</span>
            </h1>
            <p className="hero-description">
              Tus pequeños avances merecen algo grande. Suma puntitos, celebra
              tu esfuerzo y date ese extra que te hace sonreír.
            </p>
            <div className="hero-actions">
              <a className="button button--dark" href="#pasos">
                Así de fácil <span aria-hidden="true">→</span>
              </a>
              <a className="text-link" href="#idea">
                Conoce la idea
              </a>
            </div>
            <div className="hero-note">
              <span className="avatar-dots" aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
              <span>Los logros pequeños también son logros.</span>
            </div>
          </div>

          <div
            className="hero-art"
            role="img"
            aria-label="Tarjeta ilustrativa con 128 puntitos extra y una barra de progreso"
          >
            <div className="orbit orbit--one" />
            <div className="orbit orbit--two" />
            <span className="float-dot float-dot--one" />
            <span className="float-dot float-dot--two" />
            <span className="float-dot float-dot--three" />
            <div className="points-card">
              <div className="points-card-top">
                <span className="card-label">TU RACHA BONITA</span>
                <span className="card-sparkle" aria-hidden="true">
                  ✳
                </span>
              </div>
              <div className="points-number">
                128<span>pts</span>
              </div>
              <p className="points-caption">Un puntito a la vez. ¡Mira todo lo que sumaste!</p>
              <div
                className="progress-track"
                role="progressbar"
                aria-label="Progreso de ejemplo"
                aria-valuenow={72}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <span />
              </div>
              <div className="card-footer">
                <span>Tu próximo extra</span>
                <strong>¡Casi ahí!</strong>
              </div>
            </div>
            <div className="sticker sticker--top">
              <span aria-hidden="true">✦</span> ¡Bien hecho!
            </div>
            <div className="sticker sticker--bottom">
              <span aria-hidden="true">●</span> +12 puntitos
            </div>
          </div>
        </section>

        <section className="idea-section" id="idea" aria-labelledby="idea-title">
          <div className="section-intro">
            <p className="eyebrow eyebrow--center">Una idea sencilla</p>
            <h2 id="idea-title">
              Porque un poco <span>extra</span> se siente mucho.
            </h2>
            <p>
              Puntitos Extra convierte el esfuerzo de cada día en una razón más
              para celebrar. Sin complicaciones: haces, sumas y disfrutas.
            </p>
          </div>
          <div className="reward-grid" id="pasos">
            {rewards.map((reward) => (
              <article
                className={`reward-card ${reward.className}`}
                key={reward.number}
              >
                <span className="reward-number">{reward.number}</span>
                <span className="reward-spark" aria-hidden="true">
                  ·
                </span>
                <h3>{reward.title}</h3>
                <p>{reward.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="closing-banner" aria-labelledby="closing-title">
          <div className="closing-dots" aria-hidden="true">
            <i />
            <i />
            <i />
            <i />
            <i />
          </div>
          <div>
            <p className="eyebrow">Tu esfuerzo vale</p>
            <h2 id="closing-title">Sigue sumando cosas bonitas.</h2>
          </div>
          <a className="button button--light" href="#inicio">
            Volver arriba <span aria-hidden="true">↑</span>
          </a>
        </section>
      </main>

      <footer className="site-footer">
        <a className="brand brand--footer" href="#inicio">
          <DotMark />
          <span>
            puntitos <strong>extra</strong>
          </span>
        </a>
        <p>Hecho para celebrar cada pequeño gran paso.</p>
        <span className="footer-year">© Puntitos Extra</span>
      </footer>

      <EstadoConexion />
    </>
  );
}
