// App.js actualizado solo con rutas corregidas para GitHub Pages + sección "Regalo"
// + Botón de música de fondo con toggle

import React, { useState, useEffect, useRef } from 'react';
import './App.css';

import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import RegaloFlores from './RegaloFlores';

/* =================== MUSIC TOGGLE =================== */
function MusicToggle({ src, initialVolume = 0.35, className = "" }) {
  const audioRef = useRef(null);
  const [on, setOn] = useState(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem("bgMusicEnabled") === "true";
  });

  // Config inicial
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.loop = true;
    audio.preload = "auto";
    audio.volume = initialVolume;

    if (on) {
      audio.play().catch(() => {
        setOn(false);
        localStorage.setItem("bgMusicEnabled", "false");
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Reacciona a cambios de on/off
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (on) {
      audio.play().catch(() => setOn(false));
    } else {
      audio.pause();
    }
    localStorage.setItem("bgMusicEnabled", String(on));
  }, [on]);

  const iconOn = (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
      viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 5L6 9H3v6h3l5 4V5z" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
    </svg>
  );

  const iconOff = (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
      viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 5L6 9H3v6h3l5 4V5z" />
      <path d="M23 9l-6 6" />
      <path d="M17 9l6 6" />
    </svg>
  );

  return (
    <>
      <audio ref={audioRef} src={src} />
      <button
        onClick={() => setOn(v => !v)}
        aria-label={on ? "Silenciar música" : "Activar música"}
        title={on ? "Silenciar música" : "Activar música"}
        className={className}
        style={{
          position: 'fixed',
          right: 16,
          bottom: 16,
          zIndex: 9999,
          padding: 12,
          borderRadius: 9999,
          background: '#f06292',
          backdropFilter: 'blur(6px)',
          border: '1px solid rgba(0,0,0,.06)',
          boxShadow: '0 6px 20px rgba(0,0,0,.12)',
          transform: 'translateZ(0)',
          marginBottom: 'env(safe-area-inset-bottom)',
          marginRight: 'env(safe-area-inset-right)',
          cursor: 'pointer'
        }}
      >
        {on ? iconOn : iconOff}
      </button>
    </>
  );
}

/* =================== APP =================== */
function App() {
  const [fecha, setFecha] = useState('');
  const [acceso, setAcceso] = useState(false);
  const [vista, setVista] = useState('login'); // 'login', 'dashboard', 'historia', 'momentos', 'dibujos', 'mensaje', 'regalo'

  const fechaCorrecta = '2024-08-18';

  const verificarFecha = () => {
    if (fecha === fechaCorrecta) {
      setAcceso(true);
      setVista('dashboard');
    } else {
      Swal.fire({
        title: 'Como!!',
        text: 'Te dare una paliza',
        imageUrl: `${process.env.PUBLIC_URL}/error-amor.png`,
        imageWidth: 200,
        imageAlt: 'Error con amor',
        confirmButtonText: 'Intentar de nuevo',
        confirmButtonColor: '#f06292',
        background: '#fff0f6',
        customClass: {
          confirmButton: 'boton-alerta'
        },
        buttonsStyling: false // importante para que use tus estilos
      });
    }
  };

  return (
    <div className="contenedor">
      {vista === 'login' && (
        <div className="login login-card fade-in">
          <div className="bg-hearts" aria-hidden="true" />
          <div className="login-badge">💖 Aniversario</div>

          <h2 className="title-login">
            Ingresa la fecha y año de nuestro dia
          </h2>

          <p className="subtitle-login">
            Si no te acuerdas te hare mierdita<span className="twinkle">👊</span>
          </p>

          <div className="login-input">
            <input
              type="date"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
            />
          </div>

          <button className="btn-cta" onClick={verificarFecha}>
            <span>Desbloquear</span>
          </button>

          <small className="login-hint">Presiona el icono y sube el volumen 🎶</small>
        </div>
      )}

      {vista === 'dashboard' && acceso && (
        <Dashboard
          irAHistoria={() => setVista('historia')}
          irAMomentos={() => setVista('momentos')}
          irADibujos={() => setVista('dibujos')}
          irAMensaje={() => setVista('mensaje')}
          irARegalo={() => setVista('regalo')}
        />
      )}

      {vista === 'historia' && acceso && (
        <Historia volver={() => setVista('dashboard')} />
      )}

      {vista === 'momentos' && acceso && (
        <Momentos volver={() => setVista('dashboard')} />
      )}

      {vista === 'dibujos' && acceso && (
        <Dibujos volver={() => setVista('dashboard')} />
      )}

      {vista === 'mensaje' && acceso && (
        <MensajeFinal volver={() => setVista('dashboard')} />
      )}

      {vista === 'regalo' && acceso && (
        <RegaloFlores volver={() => setVista('dashboard')} />
      )}

      {/* Botón flotante de música (siempre visible) */}
      <MusicToggle src={`${process.env.PUBLIC_URL}/audio/musica.mp3`} initialVolume={0.35} />
    </div>
  );
}

// =================== DASHBOARD (menú mosaico) ===================
function Dashboard({ irAHistoria, irAMomentos, irADibujos, irAMensaje, irARegalo }) {
  return (
    <div className="dashboard fade-in mosaic-menu">

      <h2 className="title-hero">
        <span className="sparkle">✨</span>
        Bienvenida corazón mio
        <span className="heart">💗</span>
      </h2>

      <p className="subtitle-hero">
        Puedes ir viendo cada tarjetita que te preparé mami linda
        <span className="twinkle">💕</span>
      </p>

      <div className="mosaic">
        <button type="button" className="mosaic-card" onClick={irAHistoria}
          style={{ '--img': `url(${process.env.PUBLIC_URL}/menu/historia.jpg)` }}>
          <span className="mc-emoji">📖</span>
          <span className="mc-title">Historia</span>
          <span className="mc-sub">Un breve resumen de nuestra historia</span>
        </button>

        <button type="button" className="mosaic-card" onClick={irAMomentos}
          style={{ '--img': `url(${process.env.PUBLIC_URL}/menu/momentos.jpg)` }}>
          <span className="mc-emoji">📸</span>
          <span className="mc-title">Momentos</span>
          <span className="mc-sub">Algunos de nuestros momentos</span>
        </button>

        <button type="button" className="mosaic-card" onClick={irADibujos}
          style={{ '--img': `url(${process.env.PUBLIC_URL}/menu/dibujos.png)` }}>
          <span className="mc-emoji">🎨</span>
          <span className="mc-title">Dibujos</span>
          <span className="mc-sub">Arte con amor</span>
        </button>

        <button type="button" className="mosaic-card" onClick={irAMensaje}
          style={{ '--img': `url(${process.env.PUBLIC_URL}/menu/mensaje.jpg)` }}>
          <span className="mc-emoji">💌</span>
          <span className="mc-title">Mensaje</span>
          <span className="mc-sub">De mí para ti</span>
        </button>

        <button type="button" className="mosaic-card hero" onClick={irARegalo}
          style={{ '--img': `url(${process.env.PUBLIC_URL}/menu/especial.png)` }}>
          <span className="mc-emoji">🎁</span>
          <span className="mc-title">Especial</span>
          <span className="mc-sub">Sorpresita para ti mi amor</span>
        </button>
      </div>

    </div>
  );
}


// =================== HISTORIA ===================

function Historia({ volver }) {
  return (
    <div className="historia fade-in">
      <header className="historia-header">
        <span className="historia-icon"></span>
        <h2 className="historia-title">
          <span>Nuestra historia</span> <em>juntos</em>
        </h2>
        <p className="historia-subtitle">
          Un pequeño recorrido por cómo empezó todo
        </p>
        <i className="historia-underline" aria-hidden="true" />
      </header>

      <div className="historia-card">
        <p className="historia-texto">
          Y pensar que todo comenzó con un “among us black?” jaja; así, de la
          manera más random, nos conocimos. Solo nos hablábamos a través de la
          Cami porque éramos solo conocidos, hasta nos caiamos mal jajaja. 
          En un momento en que la Cami nos dejó solos, de la nada comenzamos a hablar y, 
          sin darnos cuenta nos fuimos volviendo amigos ya que compartíamos muchas cosas en común.
        </p>

        <p className="historia-texto">
          Con el tiempo pasaron cositas entre tu y la cami que hizo que nos separemos un poco 
          hasta el momento que ya se pelearon y se dejaron de hablar por un largo tiempo.
          Y bueno yo me fui contigo ya que al final justos la pasabamos muy bien tranquilos sin que 
          nos molesten y era muy divertido jugar juntos. Pasamos tanto tiempo juntos que nos 
          conocimos y conectamos muchisimo mas hasta sin darnos cuenta haciamos cositas de pareja 
          o decirnos cositas lindas y eso que eramos bien amigos nomas.
        </p>

        <p className="historia-texto">
          Bueno despues de un tiempo juntos, por culpa de un tercero acabamos perdiendo la 
          conexion y dejamos de hablar por un largo timpo. Despues de ese largo tiempo, 
          la Cami me hablo para volver a jugar y bueno volvimos a jugar como antes y para mi sorpresa 
          me dijo que hablaba contigo, bueno gracias a la Cami volvimos a reencontrarnos y charlar 
          de todo lo que paso y de lo que hemos hecho. Y bueno con cada charla que haciamos 
          vi que no se perdio ni una pizca de esa conexion que teniamos antes y seguimos hablando mucho 
          tiempo hasta bien de noche como si estuvieramos recuperando todo ese tiempo que no hablamos.
        </p>

        <p className="historia-texto">
          Y así, mientras pasaba el tiempo sin darme cuenta me volvi mas cariñoso contigo (bueno peleabamos pero con love jajaja), tratandote 
          diferente al resto de los chicos, si hasta ellos lo decian que eramos muy unidos. Volvimos a compartir
          tantos momentos charlando, jugando, mirando cositas juntos y sin darme cuenta me fui enamorando de ti. 
          Luego vino los retos juasjuas, y pensar que eso dio inicio para que salgaramos jaja. Despues vino la web que 
          hicimos con los chicos y como era primera vez que te veia de frente me enamoraste mas aun. Y luego paso el tan esperado 
          ChupiWeb jiji, donde en principio mi apuesta era declararme pero termino siendo verdad y nos empezamos a decir las cositas y me 
          sorprendio tanto que sentias lo mismo por mi, me hizo muy feliz.
        </p>

        <p className="historia-texto">
          Y bueno despues de todo lo que hemos pasado de ser conocidos, odiados, amigos, muy amigos hasta ahora actualmente siendo novios.
          Quien lo iba a pensar y no nos tenian fe los masisis jajaja. Asi comenzamos nuestra nueva etapa pero juntitos mor mio ❤️.
        </p>
      </div>

      <figure className="historia-figure">
        <img
          src={`${process.env.PUBLIC_URL}/pareja.png`}
          alt="nuestra historia"
          className="historia-imagen"
        />
      </figure>

      <button className="boton-volver" onClick={volver}>← Volver</button>
    </div>
  );
}

// =================== MOMENTOS ===================

function Momentos({ volver }) {
  const momentos = [
    { src: 'foto1.png', comentario: 'Una Cenita' },
    { src: 'foto2.png', comentario: 'En el bingo con una cami salvaje' },
    { src: 'foto3.png', comentario: 'Un poquito de love' },
    { src: 'foto4.png', comentario: 'Nuestros mickeys' },
    { src: 'foto5.png', comentario: 'Un Bailecito' },
    { src: 'foto6.png', comentario: 'En una fonda comiendo completos' },
    { src: 'foto7.png', comentario: 'Con un baby' },
    { src: 'foto8.png', comentario: 'Nuestros pebbles bonichos' },
    { src: 'foto9.png', comentario: 'Ganando juntitos como siempre' },
    { src: 'foto10.png', comentario: 'Siendo unas foquitas pescando' },
    { src: 'foto11.png', comentario: 'De payasos bien unidos' },
    { src: 'foto12.png', comentario: 'Ayudando a mi mujer' },
    { src: 'foto13.png', comentario: 'Dibujando cochinadas' },
    { src: 'foto14.png', comentario: 'Hasta el lol ya nos veia juntitos' },
    { src: 'foto15.png', comentario: 'Besito de payasos' },
    { src: 'foto16.png', comentario: 'No se porque pero me gusta esta foto' },
    { src: 'foto17.png', comentario: 'Un collage nuestro' },
    { src: 'foto18.png', comentario: 'Y si nos casamos asi?' },
    { src: 'foto19.png', comentario: 'Besito casados' },
    { src: 'foto20.png', comentario: 'De nuestros inicios solitos' },
    { src: 'foto21.png', comentario: 'Ya nos dabamos love' },
    { src: 'foto22.png', comentario: 'Cuando estabamos empezando' },
    { src: 'foto23.png', comentario: 'Halloween con los fifes' },
    { src: 'foto24.png', comentario: 'Un regalo muy apreciado' },
    { src: 'momentojuntos.mp4', comentario: 'Salvando a mi mujer como debe de ser' },
    { src: 'momentojuntos2.mp4', comentario: 'Batalla de bailes' },
    { src: 'momentojuntos3.mp4', comentario: 'Pelea de pelados' },
    { src: 'momentojuntos4.mp4', comentario: 'Lolcito' },
    { src: 'momentojuntos5.mp4', comentario: 'Las flores amarillas' },
  ];

  return (
    <div className="momentos fade-in">
      {/* Header con el mismo estilo de "Historia" */}
      <header className="historia-header">
        <span className="historia-icon"></span>
        <h2 className="historia-title">
          <span>Nuestros momentos</span> <em>juntitos</em>
        </h2>
        <p className="historia-subtitle">
          Algunas cositas de lo que hemos hecho mami 💖
        </p>
        <i className="historia-underline" aria-hidden="true" />
      </header>

      <div className="carrusel">
        {momentos.map((item, i) => (
          <div key={i} className="slide">
            <div className="media-momento">
              {item.src.endsWith('.mp4') ? (
                <video controls className="slide-video">
                  <source src={`${process.env.PUBLIC_URL}/${item.src}`} type="video/mp4" />
                  Tu navegador no soporta videos HTML5 😢
                </video>
              ) : (
                <img
                  src={`${process.env.PUBLIC_URL}/${item.src}`}
                  alt={`momento-${i}`}
                  className="slide-img"
                />
              )}
            </div>
            <p className="comentario-momento">{item.comentario}</p>
          </div>
        ))}
      </div>

      <button className="boton-volver" onClick={volver}>← Volver</button>
    </div>
  );
}

// =================== DIBUJOS ===================

function Dibujos({ volver }) {
  // Archivos (como tenías)
  const files = [
    'dibujo1.png', 'dibujo2.png', 'dibujo3.png', 'dibujo4.png',
    'dibujo5.png', 'dibujo6.png', 'dibujo7.png', 'dibujo8.png',
    'dibujo9.png', 'dibujo10.png', 'dibujo11.png', 'dibujo12.png',
  ];

  // (Opcional) Puedes poner textos para cada dibujo aquí; si no hay, mostrará "Dibujo #"
  const captions = [
    /* 'Retrato', 'Boceto 2', 'Caricatura', ... */
  ];

  // Construimos objetos {src, comentario}
  const dibujos = files.map((name, i) => ({
    src: `${process.env.PUBLIC_URL}/${name}`,
    comentario: captions[i] || `Dibujo ${i + 1}`,
  }));

  return (
    <div className="dibujos fade-in">
      {/* Header con el mismo estilo que "Historia" */}
      <header className="historia-header">
        
        <h2 className="historia-title">
          <span>Dibujos</span> <em>especiales</em>
        </h2>
        <p className="historia-subtitle">Dibujitos nuestros</p>
        <i className="historia-underline" aria-hidden="true" />
      </header>

      <div className="carrusel">
        {dibujos.map((item, i) => (
          <div key={i} className="slide">
            <div className="media-dibujo">
              <img src={item.src} alt={`dibujo-${i}`} className="slide-img" />
              {/* CHIP sobre la imagen */}
              <span className="comentario-chip chip-dibujo">{item.comentario}</span>
            </div>
          </div>
        ))}
      </div>

      <button className="boton-volver" onClick={volver}>← Volver</button>
    </div>
  );
}


// =================== MENSAJE FINAL ===================

function MensajeFinal({ volver }) {
  const paragraphs = [
    "Bueno mi mami linda, esta página la hice con todo mi amor para ti, pensando cada detalle y algunos de los tantos momentos que hemos compartido juntos 👉👈.",
    "Nuestro primer año juntitos como pareja fue increíble, lleno de momentos hermosos como también tuvimos algunos de bajon pero siempre juntitos apoyándonos mutuamente 💞.",
    "Este es el primero de muchos años que estaremos juntitos corazon mio apoyandonos en las buenas y no tan buenas 🫂.",
    "Si Dios quiere, el otro año nos veremos en persona y podremos hacer muchos recuerdos que serán inolvidables, momentos que recordaremos por siempre, morcita mía ✈️.",
    "Te amo demasiado corazón como nunca he amado a nadie eres el amor de mi vida y alma, mi mujer preciosa espero el dia que se acabe esta distancia y podamos formar una vida juntitos para toda la vida mi amor 💖."
  ];

  return (
    <div className="mensaje-final fade-in">
      {/* Header con el mismo estilo de Historia */}
      <header className="historia-header">
      
        <h2 className="historia-title">
          <span>Mi mensaje</span> <em>para ti</em>
        </h2>
        <p className="historia-subtitle">De mí, con todo mi amor</p>
        <i className="historia-underline" aria-hidden="true" />
      </header>

      {/* Tarjeta con párrafos */}
      <div className="historia-card">
        {paragraphs.map((t, i) => (
          <p key={i} className="historia-texto">{t}</p>
        ))}
      </div>

      {/* Imagen/GIF enmarcado igual que en Historia */}
      <figure className="historia-figure">
        <img
          src={`${process.env.PUBLIC_URL}/final.gif`}
          alt="gif romántico"
          className="gif-final"
        />
      </figure>

      <button className="boton-volver" onClick={volver}>← Volver</button>
    </div>
  );
}

// =================== REGALO (full-screen, cielo canvas, bouquet realista) ===================
function Regalo({ volver }) {
  const [flores, setFlores] = React.useState([]);
  const [stems, setStems] = React.useState([]);

  // Genera un bouquet en filas centradas con ancho decreciente (forma de ramo)
  const generarRamo = () => {
    // y = % vertical dentro de .ramo-area-full (0 top, 100 bottom)
    // width = ancho total de la fila en %, centrado en 50%
    const filas = [
      { count: 7, y: 56, width: 46 },
      { count: 6, y: 48, width: 40 },
      { count: 5, y: 40, width: 32 },
      { count: 3, y: 33, width: 22 },
    ];

    const nuevasFlores = [];
    const nuevosStems = [];

    filas.forEach((fila, fIdx) => {
      const startX = 50 - fila.width / 2;             // inicio centrado
      const paso = fila.width / (fila.count - 1 || 1);

      for (let i = 0; i < fila.count; i++) {
        const x = startX + paso * i + (Math.random() * 2 - 1); // ±1%
        const y = fila.y + (Math.random() * 1.6 - 0.8);        // ±0.8%
        const size = 26 + Math.random() * 8;                   // 26–34 px
        const petalos = 6 + Math.floor(Math.random() * 3);     // 6–8
        const hue = 350 + Math.random() * 10;                  // rosados
        const delay = Math.random() * 0.35;
        nuevasFlores.push({ id: `${fIdx}-${i}`, x, y, size, petalos, hue, delay });
      }
    });

    // Orden por Y para que las flores "de abajo" queden al frente
    const ordenadas = [...nuevasFlores].sort((a, b) => a.y - b.y);
    setFlores(ordenadas.map((f, i) => ({ ...f, id: i })));
    setStems(nuevosStems);
  };

  // Genera ramo y bloquea scroll del fondo
  React.useEffect(() => {
    generarRamo();
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, []);

  // Cielo nocturno en canvas con ESTRELLAS FUGACES 🌠
  React.useEffect(() => {
    const canvas = document.querySelector('.sky-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let rafId = 0;                 // ✅ se declara una sola vez
    let last = performance.now();

    const METEOR_RATE = 2.0; // meteoro/s aprox.

    // --- Resize con DPR para nitidez ---
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    // --- Estrellas parpadeando ---
    const N = 140;
    const stars = Array.from({ length: N }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.2 + 0.4,
      p: Math.random() * Math.PI * 2,
      s: 0.35 + Math.random() * 0.65
    }));

    // --- Estrellas fugaces ---
    const meteors = [];
    const spawnMeteor = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;

      const fromTop = Math.random() < 0.6;
      const startX = fromTop ? Math.random() * w * 0.7 : -20;
      const startY = fromTop ? -20 : Math.random() * h * 0.4;

      const ang = (25 + Math.random() * 10) * (Math.PI / 180);
      const speed = 400 + Math.random() * 300; // px/s
      const vx = Math.cos(ang) * speed;
      const vy = Math.sin(ang) * speed;

      meteors.push({
        x: startX, y: startY,
        vx, vy,
        len: 120 + Math.random() * 100,
        life: 900 + Math.random() * 800,
        age: 0
      });
    };

    const draw = (t) => {
      const dt = Math.min((t - last) / 1000, 0.05);
      last = t;

      const w = window.innerWidth, h = window.innerHeight;

      // Fondo
      const grd = ctx.createRadialGradient(
        w / 2, -200, 200,
        w / 2, h / 2, Math.max(w, h)
      );
      grd.addColorStop(0, '#1c245b');
      grd.addColorStop(0.45, '#0b1031');
      grd.addColorStop(0.75, '#070a22');
      grd.addColorStop(1, '#040617');
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, w, h);

      // Estrellas
      stars.forEach(st => {
        const a = st.s * (0.6 + 0.4 * Math.sin(st.p + t * 0.0016));
        ctx.globalAlpha = a;
        ctx.beginPath();
        ctx.arc(st.x, st.y, st.r, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
      });
      ctx.globalAlpha = 1;

      // Spawner de meteoros
      if (Math.random() < METEOR_RATE * dt) spawnMeteor();

      // Dibujo de meteoros
      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i];
        m.x += m.vx * dt;
        m.y += m.vy * dt;
        m.age += dt * 1000;

        const mag = Math.hypot(m.vx, m.vy);
        const ux = m.vx / mag;
        const uy = m.vy / mag;
        const tailX = m.x - ux * m.len;
        const tailY = m.y - uy * m.len;

        const lifeK = 1 - m.age / m.life; // 1->0
        const alpha = Math.max(lifeK, 0) * 0.9;

        const g = ctx.createLinearGradient(m.x, m.y, tailX, tailY);
        g.addColorStop(0, `rgba(255,255,255,${alpha})`);
        g.addColorStop(1, `rgba(255,255,255,0)`);
        ctx.strokeStyle = g;
        ctx.lineWidth = 2.2;
        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();

        ctx.save();
        ctx.shadowColor = `rgba(255,255,255,${alpha})`;
        ctx.shadowBlur = 12;
        ctx.fillStyle = `rgba(255,255,255,${alpha})`;
        ctx.beginPath();
        ctx.arc(m.x, m.y, 2.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        if (m.age > m.life || m.x > w + 60 || m.y > h + 60) {
          meteors.splice(i, 1);
        }
      }

      // ✅ guarda SIEMPRE el último id para poder cancelarlo
      rafId = requestAnimationFrame(draw);
    };

    // primer frame
    rafId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className="regalo-fullscreen">
      <div className="night-sky">
        <canvas className="sky-canvas" />
      </div>

      <div className="regalo-content fade-in">
        <h2 className="regalo-title">Un ramo de flores para mi mujer hermosa 💗</h2>
        <p className="regalo-sub">Eres todo para mi✨</p>

        <div className="ramo-area-full">
          {/* tallos detrás (si los usas) */}
          {stems.map(s => (
            <div
              key={s.id}
              className="tallo-css"
              style={{ left: `${s.x}%`, height: `${s.stemH}px`, animationDelay: `${s.delay}s` }}
            />
          ))}

          {/* flores por encima del cono */}
          {flores.map(f => (
            <div
              key={f.id}
              className="flor-css"
              style={{
                left: `${f.x}%`,
                top: `${f.y}%`,
                width: `${f.size * 2.2}px`,
                height: `${f.size * 2.2}px`,
                '--h': f.hue,
                '--sz': `${f.size}px`,
                animationDelay: `${f.delay}s`
              }}
            >
              {Array.from({ length: f.petalos }).map((_, i) => {
                const ang = (360 / f.petalos) * i;
                return (
                  <div
                    key={i}
                    className="petalo rosa"
                    style={{
                      transform: `rotate(${ang}deg) translateY(calc(var(--sz)*-0.6))`,
                      width: `var(--sz)`,
                      height: `calc(var(--sz)*1.3)`
                    }}
                  />
                );
              })}
              <div className="centro centro-rosa" />
            </div>
          ))}

          {/* cono en medio (cubre tallos, NO tapa flores) */}
          <div className="cono cono-rosa" />
        </div>

        <div className="regalo-actions">
          <button className="boton-volver" onClick={volver}>← Volver</button>
        </div>
      </div>
    </div>
  );
}

export default App;
