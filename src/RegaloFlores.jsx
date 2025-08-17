import React, { useEffect, useMemo, useRef, useState } from "react";

/**
 * RegaloFlores.jsx
 * Sección "Especial" con flores animadas + overlay para iniciar audio.
 * - Todo el CSS está encapsulado bajo .regalo-flowers para evitar colisiones.
 * - Usa botón ← Volver con tu clase existente `boton-volver`.
 * - Cambia el audio con la prop `audioSrc` o deja el default en /audio/regalo.mp3
 */
export default function RegaloFlores({
  volver,
  titulo = "Flores para ti, mi amor",
  audioSrc = `${process.env.PUBLIC_URL || ""}/audio/regalo.mp3`,
  overlayImg = "https://www.dropbox.com/scl/fi/cmqvcdkq1ddgvhzwk2pn6/image.png?rlkey=79mreuh53xqegx80hy6drn77p&raw=1",
  fondo = "https://www.dropbox.com/scl/fi/2v9cvj88qhkbhcmdfd5w9/back.png?rlkey=jcjesxgfdyylfwqprt13kcz1d&raw=1",
}) {
  const [started, setStarted] = useState(false);
  const audioRef = useRef(null);

  // partículas de fondo (valores fijos por render)
  const particles = useMemo(
    () =>
      Array.from({ length: 60 }).map(() => ({
        left: Math.random() * 100,              // vw
        dur: 5 + Math.random() * 8,             // s
        delay: Math.random() * 10,              // s
        size: [3, 4, 5, 6][Math.floor(Math.random() * 4)],
      })),
    []
  );

  const start = () => {
    setStarted(true);
    const a = audioRef.current;
    if (!a) return;
    // asegura loop y reproduce dentro del gesto
    a.loop = true;
    if (a.readyState < 2) a.load();
    a.play().catch(() => {
      // si falla, no rompemos la UI
    });
  };

  // por si ya venía activada por navegación previa
  useEffect(() => {
    if (started) {
      const a = audioRef.current;
      if (a) {
        a.loop = true;
        a.play().catch(() => {});
      }
    }
  }, [started]);

  return (
    <div className={`regalo-flowers ${started ? "started" : "paused"}`} style={{ backgroundImage: `url("${fondo}")` }}>
      {/* CSS encapsulado */}
      <style>{css}</style>

      {/* Overlay para iniciar experiencia/música */}
      {!started && (
        <div className="rf-audio-overlay" onClick={start}>
          <div className="rf-overlay-content">
            <h2>Toca para abrir</h2>
            <img className="rf-overlay-image" src={overlayImg} alt="Tocar para iniciar" />
          </div>
        </div>
      )}

      {/* Partículas de fondo */}
      <div className="rf-particles">
        {particles.map((p, i) => (
          <div
            key={i}
            className="rf-particle"
            style={{
              left: `${p.left}vw`,
              animationDuration: `${p.dur}s`,
              animationDelay: `${p.delay}s`,
              width: p.size,
              height: p.size,
            }}
          />
        ))}
      </div>

      {/* Audio */}
      <audio ref={audioRef} src={audioSrc} playsInline />

      {/* Capa de oscurecimiento */}
      <div className="rf-night" />

      {/* Título */}
      <div className="rf-title">
        <h1 className="rf-main-title">{titulo}</h1>
      </div>

      {/* Flores */}
      <div className="flowers">
        <div className="flower flower--1">
          <div className="flower__leafs flower__leafs--1">
            <div className="flower__leaf flower__leaf--1"></div>
            <div className="flower__leaf flower__leaf--2"></div>
            <div className="flower__leaf flower__leaf--3"></div>
            <div className="flower__leaf flower__leaf--4"></div>
            <div className="flower__white-circle"></div>

            <div className="flower__light flower__light--1"></div>
            <div className="flower__light flower__light--2"></div>
            <div className="flower__light flower__light--3"></div>
            <div className="flower__light flower__light--4"></div>
            <div className="flower__light flower__light--5"></div>
            <div className="flower__light flower__light--6"></div>
            <div className="flower__light flower__light--7"></div>
            <div className="flower__light flower__light--8"></div>
          </div>
          <div className="flower__line">
            <div className="flower__line__leaf flower__line__leaf--1"></div>
            <div className="flower__line__leaf flower__line__leaf--2"></div>
            <div className="flower__line__leaf flower__line__leaf--3"></div>
            <div className="flower__line__leaf flower__line__leaf--4"></div>
            <div className="flower__line__leaf flower__line__leaf--5"></div>
            <div className="flower__line__leaf flower__line__leaf--6"></div>
          </div>
        </div>

        <div className="flower flower--2">
          <div className="flower__leafs flower__leafs--2">
            <div className="flower__leaf flower__leaf--1"></div>
            <div className="flower__leaf flower__leaf--2"></div>
            <div className="flower__leaf flower__leaf--3"></div>
            <div className="flower__leaf flower__leaf--4"></div>
            <div className="flower__white-circle"></div>

            <div className="flower__light flower__light--1"></div>
            <div className="flower__light flower__light--2"></div>
            <div className="flower__light flower__light--3"></div>
            <div className="flower__light flower__light--4"></div>
            <div className="flower__light flower__light--5"></div>
            <div className="flower__light flower__light--6"></div>
            <div className="flower__light flower__light--7"></div>
            <div className="flower__light flower__light--8"></div>
          </div>
          <div className="flower__line">
            <div className="flower__line__leaf flower__line__leaf--1"></div>
            <div className="flower__line__leaf flower__line__leaf--2"></div>
            <div className="flower__line__leaf flower__line__leaf--3"></div>
            <div className="flower__line__leaf flower__line__leaf--4"></div>
          </div>
        </div>

        <div className="flower flower--3">
          <div className="flower__leafs flower__leafs--3">
            <div className="flower__leaf flower__leaf--1"></div>
            <div className="flower__leaf flower__leaf--2"></div>
            <div className="flower__leaf flower__leaf--3"></div>
            <div className="flower__leaf flower__leaf--4"></div>
            <div className="flower__white-circle"></div>

            <div className="flower__light flower__light--1"></div>
            <div className="flower__light flower__light--2"></div>
            <div className="flower__light flower__light--3"></div>
            <div className="flower__light flower__light--4"></div>
            <div className="flower__light flower__light--5"></div>
            <div className="flower__light flower__light--6"></div>
            <div className="flower__light flower__light--7"></div>
            <div className="flower__light flower__light--8"></div>
          </div>
          <div className="flower__line">
            <div className="flower__line__leaf flower__line__leaf--1"></div>
            <div className="flower__line__leaf flower__line__leaf--2"></div>
            <div className="flower__line__leaf flower__line__leaf--3"></div>
            <div className="flower__line__leaf flower__line__leaf--4"></div>
          </div>
        </div>

        <div className="grow-ans" style={{ "--d": "1.2s" }}>
          <div className="flower__g-long">
            <div className="flower__g-long__top"></div>
            <div className="flower__g-long__bottom"></div>
          </div>
        </div>

        <div className="growing-grass">
          <div className="flower__grass flower__grass--1">
            <div className="flower__grass--top"></div>
            <div className="flower__grass--bottom"></div>
            <div className="flower__grass__leaf flower__grass__leaf--1"></div>
            <div className="flower__grass__leaf flower__grass__leaf--2"></div>
            <div className="flower__grass__leaf flower__grass__leaf--3"></div>
            <div className="flower__grass__leaf flower__grass__leaf--4"></div>
            <div className="flower__grass__leaf flower__grass__leaf--5"></div>
            <div className="flower__grass__leaf flower__grass__leaf--6"></div>
            <div className="flower__grass__leaf flower__grass__leaf--7"></div>
            <div className="flower__grass__leaf flower__grass__leaf--8"></div>
            <div className="flower__grass__overlay"></div>
          </div>
        </div>

        <div className="growing-grass">
          <div className="flower__grass flower__grass--2">
            <div className="flower__grass--top"></div>
            <div className="flower__grass--bottom"></div>
            <div className="flower__grass__leaf flower__grass__leaf--1"></div>
            <div className="flower__grass__leaf flower__grass__leaf--2"></div>
            <div className="flower__grass__leaf flower__grass__leaf--3"></div>
            <div className="flower__grass__leaf flower__grass__leaf--4"></div>
            <div className="flower__grass__leaf flower__grass__leaf--5"></div>
            <div className="flower__grass__leaf flower__grass__leaf--6"></div>
            <div className="flower__grass__leaf flower__grass__leaf--7"></div>
            <div className="flower__grass__leaf flower__grass__leaf--8"></div>
            <div className="flower__grass__overlay"></div>
          </div>
        </div>

        <div className="grow-ans" style={{ "--d": "2.4s" }}>
          <div className="flower__g-right flower__g-right--1">
            <div className="leaf"></div>
          </div>
        </div>

        <div className="grow-ans" style={{ "--d": "2.8s" }}>
          <div className="flower__g-right flower__g-right--2">
            <div className="leaf"></div>
          </div>
        </div>

        <div className="grow-ans" style={{ "--d": "2.8s" }}>
          <div className="flower__g-front">
            <div className="flower__g-front__leaf-wrapper flower__g-front__leaf-wrapper--1">
              <div className="flower__g-front__leaf"></div>
            </div>
            <div className="flower__g-front__leaf-wrapper flower__g-front__leaf-wrapper--2">
              <div className="flower__g-front__leaf"></div>
            </div>
            <div className="flower__g-front__leaf-wrapper flower__g-front__leaf-wrapper--3">
              <div className="flower__g-front__leaf"></div>
            </div>
            <div className="flower__g-front__leaf-wrapper flower__g-front__leaf-wrapper--4">
              <div className="flower__g-front__leaf"></div>
            </div>
            <div className="flower__g-front__leaf-wrapper flower__g-front__leaf-wrapper--5">
              <div className="flower__g-front__leaf"></div>
            </div>
            <div className="flower__g-front__leaf-wrapper flower__g-front__leaf-wrapper--6">
              <div className="flower__g-front__leaf"></div>
            </div>
            <div className="flower__g-front__leaf-wrapper flower__g-front__leaf-wrapper--7">
              <div className="flower__g-front__leaf"></div>
            </div>
            <div className="flower__g-front__leaf-wrapper flower__g-front__leaf-wrapper--8">
              <div className="flower__g-front__leaf"></div>
            </div>
            <div className="flower__g-front__line"></div>
          </div>
        </div>

        <div className="grow-ans" style={{ "--d": "3.2s" }}>
          <div className="flower__g-fr">
            <div className="leaf"></div>
            <div className="flower__g-fr__leaf flower__g-fr__leaf--1"></div>
            <div className="flower__g-fr__leaf flower__g-fr__leaf--2"></div>
            <div className="flower__g-fr__leaf flower__g-fr__leaf--3"></div>
            <div className="flower__g-fr__leaf flower__g-fr__leaf--4"></div>
            <div className="flower__g-fr__leaf flower__g-fr__leaf--5"></div>
            <div className="flower__g-fr__leaf flower__g-fr__leaf--6"></div>
            <div className="flower__g-fr__leaf flower__g-fr__leaf--7"></div>
            <div className="flower__g-fr__leaf flower__g-fr__leaf--8"></div>
          </div>
        </div>

        <div className="long-g long-g--0">
          <div className="grow-ans" style={{ "--d": "3s" }}>
            <div className="leaf leaf--0"></div>
          </div>
          <div className="grow-ans" style={{ "--d": "2.2s" }}>
            <div className="leaf leaf--1"></div>
          </div>
          <div className="grow-ans" style={{ "--d": "3.4s" }}>
            <div className="leaf leaf--2"></div>
          </div>
          <div className="grow-ans" style={{ "--d": "3.6s" }}>
            <div className="leaf leaf--3"></div>
          </div>
        </div>

        <div className="long-g long-g--1">
          <div className="grow-ans" style={{ "--d": "3.6s" }}>
            <div className="leaf leaf--0"></div>
          </div>
          <div className="grow-ans" style={{ "--d": "3.8s" }}>
            <div className="leaf leaf--1"></div>
          </div>
          <div className="grow-ans" style={{ "--d": "4s" }}>
            <div className="leaf leaf--2"></div>
          </div>
          <div className="grow-ans" style={{ "--d": "4.2s" }}>
            <div className="leaf leaf--3"></div>
          </div>
        </div>

        <div className="long-g long-g--2">
          <div className="grow-ans" style={{ "--d": "4s" }}>
            <div className="leaf leaf--0"></div>
          </div>
          <div className="grow-ans" style={{ "--d": "4.2s" }}>
            <div className="leaf leaf--1"></div>
          </div>
          <div className="grow-ans" style={{ "--d": "4.4s" }}>
            <div className="leaf leaf--2"></div>
          </div>
          <div className="grow-ans" style={{ "--d": "4.6s" }}>
            <div className="leaf leaf--3"></div>
          </div>
        </div>

        <div className="long-g long-g--3">
          <div className="grow-ans" style={{ "--d": "4s" }}>
            <div className="leaf leaf--0"></div>
          </div>
          <div className="grow-ans" style={{ "--d": "4.2s" }}>
            <div className="leaf leaf--1"></div>
          </div>
          <div className="grow-ans" style={{ "--d": "3s" }}>
            <div className="leaf leaf--2"></div>
          </div>
          <div className="grow-ans" style={{ "--d": "3.6s" }}>
            <div className="leaf leaf--3"></div>
          </div>
        </div>

        <div className="long-g long-g--4">
          <div className="grow-ans" style={{ "--d": "4s" }}>
            <div className="leaf leaf--0"></div>
          </div>
          <div className="grow-ans" style={{ "--d": "4.2s" }}>
            <div className="leaf leaf--1"></div>
          </div>
          <div className="grow-ans" style={{ "--d": "3s" }}>
            <div className="leaf leaf--2"></div>
          </div>
          <div className="grow-ans" style={{ "--d": "3.6s" }}>
            <div className="leaf leaf--3"></div>
          </div>
        </div>

        <div className="long-g long-g--5">
          <div className="grow-ans" style={{ "--d": "4s" }}>
            <div className="leaf leaf--0"></div>
          </div>
          <div className="grow-ans" style={{ "--d": "4.2s" }}>
            <div className="leaf leaf--1"></div>
          </div>
          <div className="grow-ans" style={{ "--d": "3s" }}>
            <div className="leaf leaf--2"></div>
          </div>
          <div className="grow-ans" style={{ "--d": "3.6s" }}>
            <div className="leaf leaf--3"></div>
          </div>
        </div>

        <div className="long-g long-g--6">
          <div className="grow-ans" style={{ "--d": "4.2s" }}>
            <div className="leaf leaf--0"></div>
          </div>
          <div className="grow-ans" style={{ "--d": "4.4s" }}>
            <div className="leaf leaf--1"></div>
          </div>
          <div className="grow-ans" style={{ "--d": "4.6s" }}>
            <div className="leaf leaf--2"></div>
          </div>
          <div className="grow-ans" style={{ "--d": "4.8s" }}>
            <div className="leaf leaf--3"></div>
          </div>
        </div>

        <div className="long-g long-g--7">
          <div className="grow-ans" style={{ "--d": "3s" }}>
            <div className="leaf leaf--0"></div>
          </div>
          <div className="grow-ans" style={{ "--d": "3.2s" }}>
            <div className="leaf leaf--1"></div>
          </div>
          <div className="grow-ans" style={{ "--d": "3.5s" }}>
            <div className="leaf leaf--2"></div>
          </div>
          <div className="grow-ans" style={{ "--d": "3.6s" }}>
            <div className="leaf leaf--3"></div>
          </div>
        </div>
      </div>

      {/* Acciones */}
      <div className="rf-actions">
        <button className="boton-volver" onClick={volver}>← Volver</button>
      </div>
    </div>
  );
}

/* ================= CSS encapsulado ================= */
const css = `
@import url('https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap');

.regalo-flowers {
  position: relative;
  min-height: 100vh;
  width: 100%;
  overflow: hidden;
  background-color: rgba(5,5,5,0.43);
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  perspective: 1000px;
}

/* pausa/continuación de animaciones */
.regalo-flowers.paused * { animation-play-state: paused !important; }
.regalo-flowers.started .rf-title { opacity: 1; }

.rf-night {
  position: absolute; inset: 0;
  background: rgba(10, 0, 20, 0.85);
  z-index: 0;
}

.rf-title {
  position: absolute;
  top: 6%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  width: 90%;
  max-width: 1200px;
  text-align: center;
  opacity: 0;
  transition: opacity .9s ease .4s;
}
.rf-main-title{
  color:#ff0000;
  font-family:'Great Vibes', cursive;
  font-size: clamp(2.5rem, 10vw, 5.5rem);
  text-shadow: 0 0 5px rgba(9,0,25,0.8), 0 0 10px rgba(238,0,67,.5), 0 0 15px rgba(238,0,67,.5), 2px 2px 5px rgba(0,0,0,.7);
  margin:0;
}

/* Overlay para iniciar audio */
.rf-audio-overlay{
  position: absolute; inset:0; z-index: 999;
  background: rgba(0,0,0,.85);
  display:flex; align-items:center; justify-content:center;
  cursor:pointer; transition: opacity .8s ease;
}
.rf-overlay-content{ text-align:center; color:#fff; }
.rf-overlay-content h2{
  font-family:'Great Vibes', cursive;
  font-size: clamp(2rem, 8vw, 3rem);
  margin-bottom: 28px;
  text-shadow: 0 0 8px rgba(255,255,255,.7);
  font-weight: 400;
}
.rf-overlay-image{
  max-width: 350px; width: 90vw; height: auto;
  animation: rf-heartbeat 1.2s ease-in-out infinite;
  filter: drop-shadow(0 0 10px rgba(255,40,40,.8)) drop-shadow(0 0 25px rgba(255,40,40,.8));
}
@keyframes rf-heartbeat{
  0% { transform: scale(1); filter: drop-shadow(0 0 10px rgba(255,40,40,.8)); }
  30% { transform: scale(1.2); filter: drop-shadow(0 0 25px rgba(255,40,40,.8)) drop-shadow(0 0 45px rgba(255,40,40,.8)); }
  40% { transform: scale(1.15); }
  60% { transform: scale(1.2); filter: drop-shadow(0 0 25px rgba(255,40,40,.8)) drop-shadow(0 0 55px rgba(255,40,40,.8)); }
  100% { transform: scale(1); filter: drop-shadow(0 0 10px rgba(255,40,40,.8)); }
}

/* Partículas */
.rf-particles{ position:absolute; inset:0; z-index:1; pointer-events:none; }
.rf-particle{
  position:absolute; bottom:0;
  background: rgba(255,255,255,.5);
  border-radius:50%;
  opacity:.5; filter: blur(1px);
  animation: rf-sparkle 25s linear infinite;
}
@keyframes rf-sparkle{
  0% { transform: translateY(0) scale(1); opacity: .5; }
  50% { opacity: 1; }
  100% { transform: translateY(-100vh) scale(1.5); opacity: 0; }
}

/* Flores (estilos principales; idénticos al HTML, encapsulados) */
.flowers{
  position: relative;
  transform: scale(0.9);
  z-index: 5;
}
.flower{ position:absolute; bottom:10vmin; transform-origin:bottom center; z-index:10; --fl-speed:.8s; }
.flower--1{ animation: moving-flower-1 4s linear infinite; }
.flower--1 .flower__line{ height:70vmin; animation-delay:.3s; }
.flower--1 .flower__line__leaf--1{ animation:blooming-leaf-right var(--fl-speed) 1.6s backwards; }
.flower--1 .flower__line__leaf--2{ animation:blooming-leaf-right var(--fl-speed) 1.4s backwards; }
.flower--1 .flower__line__leaf--3{ animation:blooming-leaf-left var(--fl-speed) 1.2s backwards; }
.flower--1 .flower__line__leaf--4{ animation:blooming-leaf-left var(--fl-speed) 1s backwards; }
.flower--1 .flower__line__leaf--5{ animation:blooming-leaf-right var(--fl-speed) 1.8s backwards; }
.flower--1 .flower__line__leaf--6{ animation:blooming-leaf-left var(--fl-speed) 2s backwards; }
.flower--2{ left:50%; transform: rotate(20deg); animation: moving-flower-2 4s linear infinite; }
.flower--2 .flower__line{ height:60vmin; animation-delay:.6s; }
.flower--2 .flower__line__leaf--1{ animation:blooming-leaf-right var(--fl-speed) 1.9s backwards; }
.flower--2 .flower__line__leaf--2{ animation:blooming-leaf-right var(--fl-speed) 1.7s backwards; }
.flower--2 .flower__line__leaf--3{ animation:blooming-leaf-left var(--fl-speed) 1.5s backwards; }
.flower--2 .flower__line__leaf--4{ animation:blooming-leaf-left var(--fl-speed) 1.3s backwards; }
.flower--3{ left:50%; transform: rotate(-15deg); animation: moving-flower-3 4s linear infinite; }
.flower--3 .flower__line{ animation-delay:.9s; }
.flower--3 .flower__line__leaf--1{ animation:blooming-leaf-right var(--fl-speed) 2.5s backwards; }
.flower--3 .flower__line__leaf--2{ animation:blooming-leaf-right var(--fl-speed) 2.3s backwards; }
.flower--3 .flower__line__leaf--3{ animation:blooming-leaf-left var(--fl-speed) 2.1s backwards; }
.flower--3 .flower__line__leaf--4{ animation:blooming-leaf-left var(--fl-speed) 1.9s backwards; }

.flower__leafs{ position:relative; animation:blooming-flower 2s backwards; }
.flower__leafs--1{ animation-delay:1.1s; } .flower__leafs--2{ animation-delay:1.4s; } .flower__leafs--3{ animation-delay:1.7s; }
.flower__leafs::after{ content:""; position:absolute; left:0; top:0; transform: translate(-50%,-100%); width:8vmin; height:8vmin; background:#004b1f; filter: blur(10vmin); }
.flower__leaf{ position:absolute; bottom:0; left:50%; width:8vmin; height:11vmin; border-radius:51% 49% 47% 53%/44% 45% 55% 69%; background: linear-gradient(to top, #0c00008a, rgb(255,0,38)); transform-origin: bottom center; opacity:.9; box-shadow: inset 0 0 2vmin rgba(255,255,255,.5); }
.flower__leaf--1{ transform: translate(-10%,1%) rotateY(40deg) rotateX(-50deg); }
.flower__leaf--2{ transform: translate(-50%,-4%) rotateX(40deg); }
.flower__leaf--3{ transform: translate(-90%,0%) rotateY(45deg) rotateX(50deg); }
.flower__leaf--4{ width:8vmin; height:8vmin; transform-origin: bottom left; border-radius: 4vmin 10vmin 4vmin 4vmin; transform: translate(0%,18%) rotateX(70deg) rotate(-43deg); background: linear-gradient(to top, #0c00008a, rgb(255,0,38)); z-index:1; opacity:.8; }
.flower__white-circle{ position:absolute; left:-3.5vmin; top:-3vmin; width:9vmin; height:4vmin; border-radius:50%; background:#fff4fb; }
.flower__white-circle::after{
  content:""; position:absolute; left:50%; top:45%; transform: translate(-50%,-50%);
  width:60%; height:60%; border-radius:inherit;
  background-image: repeating-linear-gradient(135deg, rgba(0,0,0,0.03) 0px, rgba(0,0,0,0.03) 1px,transparent 1px, transparent 12px),
                    repeating-linear-gradient(45deg, rgba(0,0,0,0.03) 0px, rgba(0,0,0,0.03) 1px,transparent 1px, transparent 12px),
                    repeating-linear-gradient(67.5deg, rgba(0,0,0,0.03) 0px, rgba(0,0,0,0.03) 1px,transparent 1px, transparent 12px),
                    linear-gradient(90deg, #ffd500, #ffd500);
}
.flower__line{ height:55vmin; width:1.5vmin; background-image: linear-gradient(to left, rgba(27,0,35,.2), transparent, rgba(0,75,31,1)), linear-gradient(to top, transparent 10%, #064600, #064600); box-shadow: inset 0 0 2px rgba(0,0,0,.5); animation: grow-flower-tree 4s backwards; }
.flower__line__leaf{ --w:7vmin; --h:calc(var(--w) + 2vmin); position:absolute; top:20%; left:90%; width:var(--w); height:var(--h); border-top-right-radius: var(--h); border-bottom-left-radius: var(--h); background: linear-gradient(to top, rgba(20,122,20,.4), #004b1f); }
.flower__line__leaf--1{ transform: rotate(70deg) rotateY(30deg); }
.flower__line__leaf--2{ top:45%; transform: rotate(70deg) rotateY(30deg); }
.flower__line__leaf--3, .flower__line__leaf--4, .flower__line__leaf--6{
  border-top-right-radius: 0; border-bottom-left-radius: 0; border-top-left-radius: var(--h); border-bottom-right-radius: var(--h);
  left: -460%; top:12%; transform: rotate(-70deg) rotateY(30deg);
}
.flower__line__leaf--4{ top:40%; }
.flower__line__leaf--5{ top:0; transform-origin:left; transform: rotate(70deg) rotateY(30deg) scale(.6); }
.flower__line__leaf--6{ top:-2%; left:-450%; transform-origin:right; transform: rotate(-70deg) rotateY(30deg) scale(.6); }
.flower__light{ position:absolute; bottom:0vmin; width:1vmin; height:1vmin; background:#ff5454; border-radius:50%; filter: blur(.2vmin); animation: light-ans 4s linear infinite backwards; }
.flower__light:nth-child(odd){ background:#fff; }
.flower__light--1{ left:-2vmin; animation-delay:1s; }
.flower__light--2{ left:3vmin; animation-delay:.5s; }
.flower__light--3{ left:-6vmin; animation-delay:.3s; }
.flower__light--4{ left:6vmin; animation-delay:.9s; }
.flower__light--5{ left:-1vmin; animation-delay:1.5s; }
.flower__light--6{ left:-4vmin; animation-delay:3s; }
.flower__light--7{ left:3vmin; animation-delay:2s; }
.flower__light--8{ left:-6vmin; animation-delay:3.5s; }

.flower__grass{ --c:#55a630; --line-w:1.5vmin; position:absolute; bottom:12vmin; left:-7vmin; display:flex; flex-direction:column; align-items:flex-end; z-index:20; transform-origin:bottom center; transform: rotate(-48deg) rotateY(40deg); }
.flower__grass--1{ animation: moving-grass 2s linear infinite; }
.flower__grass--2{ left:2vmin; bottom:10vmin; transform: scale(.5) rotate(75deg) rotateX(10deg) rotateY(-200deg); opacity:.8; z-index:0; animation:moving-grass--2 1.5s linear infinite; }
.flower__grass--top{ width:7vmin; height:10vmin; border-top-right-radius:100%; border-right: var(--line-w) solid var(--c); transform-origin:bottom center; transform: rotate(-2deg); }
.flower__grass--bottom{ margin-top:-2px; width:var(--line-w); height:25vmin; background-image: linear-gradient(to top, transparent, var(--c)); }
.flower__grass__leaf{ --size:10vmin; position:absolute; width: calc(var(--size)*2.1); height:var(--size); border-top-left-radius: var(--size); border-top-right-radius: var(--size); background-image: linear-gradient(to top, transparent, transparent 30%, var(--c)); z-index:100; }
.flower__grass__leaf--1{ top:-6%; left:30%; --size:6vmin; transform: rotate(-20deg); animation:growing-grass-ans--1 2s 2.6s backwards; }
.flower__grass__leaf--2{ top:-5%; left:-110%; --size:6vmin; transform: rotate(10deg); animation:growing-grass-ans--2 2s 2.4s linear backwards; }
.flower__grass__leaf--3{ top:5%; left:60%; --size:8vmin; transform: rotate(-18deg) rotateX(-20deg); animation:growing-grass-ans--3 2s 2.2s linear backwards; }
.flower__grass__leaf--4{ top:6%; left:-135%; --size:8vmin; transform: rotate(2deg); animation:growing-grass-ans--4 2s 2s linear backwards; }
.flower__grass__leaf--5{ top:20%; left:60%; --size:10vmin; transform: rotate(-24deg) rotateX(-20deg); animation:growing-grass-ans--5 2s 1.8s linear backwards; }
.flower__grass__leaf--6{ top:22%; left:-180%; --size:10vmin; transform: rotate(10deg); animation:growing-grass-ans--6 2s 1.6s linear backwards; }
.flower__grass__leaf--7{ top:39%; left:70%; --size:10vmin; transform: rotate(-10deg); animation:growing-grass-ans--7 2s 1.4s linear backwards; }
.flower__grass__leaf--8{ top:40%; left:-215%; --size:11vmin; transform: rotate(10deg); animation:growing-grass-ans--8 2s 1.2s linear backwards; }
.flower__grass__overlay{ position:absolute; top:-10%; right:0%; width:100%; height:100%; background: rgba(0,0,0,.6); filter: blur(1.5vmin); z-index:100; }

.flower__g-long{ --w:2vmin; --h:6vmin; --c:#004b1f; position:absolute; bottom:10vmin; left:-3vmin; transform-origin: bottom center; transform: rotate(-30deg) rotateY(-20deg); display:flex; flex-direction:column; align-items:flex-end; animation: flower-g-long-ans 3s linear infinite; }
.flower__g-long__top{ top: calc(var(--h)*-1); width: calc(var(--w) + 1vmin); height:var(--h); border-top-right-radius:100%; border-right:.7vmin solid var(--c); transform: translate(-.7vmin, 1vmin); }
.flower__g-long__bottom{ width:var(--w); height:50vmin; transform-origin: bottom center; background-image: linear-gradient(to top, transparent 30%, var(--c)); box-shadow: inset 0 0 2px rgba(0,0,0,.5); clip-path: polygon(35% 0, 65% 1%, 100% 100%, 0% 100%); }

.flower__g-right{ position:absolute; bottom:6vmin; left:-2vmin; transform-origin: bottom left; transform: rotate(20deg); }
.flower__g-right .leaf{ width:30vmin; height:50vmin; border-top-left-radius:100%; border-left: 2vmin solid #55a630; background-image: linear-gradient(to bottom, transparent, rgba(5,5,5,0.43) 60%); -webkit-mask-image: linear-gradient(to top, transparent 25%, #55a630 60%); }
.flower__g-right--1{ animation: flower-g-right-ans 2.5s linear infinite; }
.flower__g-right--2{ left:5vmin; transform: rotateY(-180deg); animation: flower-g-right-ans--2 3s linear infinite; }
.flower__g-right--2 .leaf{ height:75vmin; filter: blur(.3vmin); opacity:.8; }

.flower__g-front{ position:absolute; bottom:6vmin; left:2.5vmin; z-index:100; transform-origin: bottom center; transform: rotate(-28deg) rotateY(30deg) scale(1.04); animation: flower__g-front-ans 2s linear infinite; }
.flower__g-front__line{ width:.3vmin; height:20vmin; background-image: linear-gradient(to top, transparent, #55a630, transparent 100%); position:relative; }
.flower__g-front__leaf-wrapper{ position:absolute; top:0; left:0; transform-origin: bottom left; transform: rotate(10deg); }
.flower__g-front__leaf-wrapper:nth-child(even){ left:0vmin; transform: rotateY(-180deg) rotate(5deg); animation: flower__g-front__leaf-left-ans 1s ease-in backwards; }
.flower__g-front__leaf-wrapper:nth-child(odd){ animation: flower__g-front__leaf-ans 1s ease-in backwards; }
.flower__g-front__leaf-wrapper--1{ top:-8vmin; transform: scale(.7); animation: flower__g-front__leaf-ans 1s 5.5s ease-in backwards !important; }
.flower__g-front__leaf-wrapper--2{ top:-8vmin; transform: rotateY(-180deg) scale(.7) !important; animation: flower__g-front__leaf-left-ans-2 1s 4.6s ease-in backwards !important; }
.flower__g-front__leaf-wrapper--3{ top:-3vmin; animation: flower__g-front__leaf-ans 1s 4.6s ease-in backwards; }
.flower__g-front__leaf-wrapper--4{ top:-3vmin; transform: rotateY(-180deg) scale(.9) !important; animation: flower__g-front__leaf-left-ans-2 1s 4.6s ease-in backwards !important; }
.flower__g-front__leaf-wrapper--5, .flower__g-front__leaf-wrapper--6{ top:2vmin; }
.flower__g-front__leaf-wrapper--7, .flower__g-front__leaf-wrapper--8{ top:6.5vmin; }
.flower__g-front__leaf-wrapper--2{ animation-delay:5.2s !important; }
.flower__g-front__leaf-wrapper--3{ animation-delay:4.9s !important; }
.flower__g-front__leaf-wrapper--5{ animation-delay:4.3s !important; }
.flower__g-front__leaf-wrapper--6{ animation-delay:4.1s !important; }
.flower__g-front__leaf-wrapper--7{ animation-delay:3.8s !important; }
.flower__g-front__leaf-wrapper--8{ animation-delay:3.5s !important; }
.flower__g-front__leaf{ width:10vmin; height:10vmin; border-radius: 100% 0% 0% 100% / 100% 100% 0% 0%; box-shadow: inset 0 2px 1vmin hsla(184,97%,58%,.2); background-image: linear-gradient(to bottom left, transparent, rgba(5,5,5,0.43)), linear-gradient(to bottom right, #55a630 50%, transparent 50%, transparent); -webkit-mask-image: linear-gradient(to bottom right, #55a630 50%, transparent 50%, transparent); mask-image: linear-gradient(to bottom right, #55a630 50%, transparent 50%, transparent); }

.flower__g-fr{ position:absolute; bottom:-4vmin; left:vmin; transform-origin: bottom left; z-index:10; animation: flower__g-fr-ans 2s linear infinite; }
.flower__g-fr .leaf{ width:30vmin; height:50vmin; border-top-left-radius:100%; border-left:2vmin solid #55a630; -webkit-mask-image: linear-gradient(to top, transparent 25%, #55a630 50%); position:relative; z-index:1; }
.flower__g-fr__leaf{ position:absolute; top:0; left:0; width:10vmin; height:10vmin; border-radius: 100% 0% 0% 100% / 100% 100% 0% 0%; box-shadow: inset 0 2px 1vmin hsla(184,97%,58%,.2); background-image: linear-gradient(to bottom left, transparent, rgba(5,5,5,0.43) 98%), linear-gradient(to bottom right, #55a630 45%, transparent 50%, transparent); -webkit-mask-image: linear-gradient(135deg, #55a630 40%, transparent 50%, transparent); }
.flower__g-fr__leaf--1{ left:20vmin; transform: rotate(45deg); animation: flower__g-fr-leaft-ans-1 .5s 5.2s linear backwards; }
.flower__g-fr__leaf--2{ left:12vmin; top:-7vmin; transform: rotate(25deg) rotateY(-180deg); animation: flower__g-fr-leaft-ans-6 .5s 5s linear backwards; }
.flower__g-fr__leaf--3{ left:15vmin; top:6vmin; transform: rotate(55deg); animation: flower__g-fr-leaft-ans-5 .5s 4.8s linear backwards; }
.flower__g-fr__leaf--4{ left:6vmin; top:-2vmin; transform: rotate(25deg) rotateY(-180deg); animation: flower__g-fr-leaft-ans-6 .5s 4.6s linear backwards; }
.flower__g-fr__leaf--5{ left:10vmin; top:14vmin; transform: rotate(55deg); animation: flower__g-fr-leaft-ans-5 .5s 4.4s linear backwards; }
.flower__g-fr__leaf--6{ left:0vmin; top:6vmin; transform: rotate(25deg) rotateY(-180deg); animation: flower__g-fr-leaft-ans-6 .5s 4.2s linear backwards; }
.flower__g-fr__leaf--7{ left:5vmin; top:22vmin; transform: rotate(45deg); animation: flower__g-fr-leaft-ans-7 .5s 4s linear backwards; }
.flower__g-fr__leaf--8{ left:-4vmin; top:15vmin; transform: rotate(15deg) rotateY(-180deg); animation: flower__g-fr-leaft-ans-8 .5s 3.8s linear backwards; }

.long-g{ position:absolute; bottom:25vmin; left:-42vmin; transform-origin: bottom left; }
.long-g--1{ bottom:0vmin; transform: scale(.8) rotate(-5deg); }
.long-g--1 .leaf{ -webkit-mask-image: linear-gradient(to top, transparent 40%, #55a630 80%) !important; }
.long-g--1 .leaf--1{ --w:5vmin; --h:60vmin; left:-2vmin; transform: rotate(3deg) rotateY(-180deg); }
.long-g--2, .long-g--3{ bottom:-3vmin; left:-35vmin; transform-origin:center; transform: scale(.6) rotateX(60deg); }
.long-g--2 .leaf, .long-g--3 .leaf{ -webkit-mask-image: linear-gradient(to top, transparent 50%, #55a630 80%) !important; }
.long-g--2 .leaf--1, .long-g--3 .leaf--1{ left:-1vmin; transform: rotateY(-180deg); }
.long-g--3{ left:-17vmin; bottom:0vmin; }
.long-g--3 .leaf{ -webkit-mask-image: linear-gradient(to top, transparent 40%, #55a630 80%) !important; }
.long-g--4{ left:25vmin; bottom:-3vmin; transform-origin:center; transform: scale(.6) rotateX(60deg); }
.long-g--4 .leaf{ -webkit-mask-image: linear-gradient(to top, transparent 50%, #55a630 80%) !important; }
.long-g--5{ left:42vmin; bottom:0vmin; transform: scale(.8) rotate(2deg); }
.long-g--6{ left:0vmin; bottom:-20vmin; z-index:100; filter: blur(.3vmin); transform: scale(.8) rotate(2deg); }
.long-g--7{ left:35vmin; bottom:20vmin; z-index:-1; filter: blur(.3vmin); transform: scale(.6) rotate(2deg); opacity:.7; }
.long-g .leaf{ --w:15vmin; --h:40vmin; --c:#004b1f; position:absolute; bottom:0; width:var(--w); height:var(--h); border-top-left-radius:100%; border-left:2vmin solid var(--c); -webkit-mask-image: linear-gradient(to top, transparent 20%, rgba(5,5,5,0.43)); transform-origin: bottom center; }
.long-g .leaf--0{ left:2vmin; animation: leaf-ans-1 4s linear infinite; }
.long-g .leaf--1{ --w:5vmin; --h:60vmin; animation: leaf-ans-1 4s linear infinite; }
.long-g .leaf--2{ --w:10vmin; --h:40vmin; left:-0.5vmin; bottom:5vmin; transform-origin: bottom left; transform: rotateY(-180deg); animation: leaf-ans-2 3s linear infinite; }
.long-g .leaf--3{ --w:5vmin; --h:30vmin; left:-1vmin; bottom:3.2vmin; transform-origin: bottom left; transform: rotate(-10deg) rotateY(-180deg); animation: leaf-ans-3 3s linear infinite; }

.grow-ans{ animation: grow-ans 2s var(--d) backwards; }
.growing-grass{ animation: growing-grass-ans 1s 2s backwards; }

@keyframes grow-ans{ 0%{ transform: scale(0); opacity:0; } }
@keyframes growing-grass-ans{ 0%{ transform: scale(0); } }
@keyframes light-ans{ 0%{ opacity:0; transform: translateY(0vmin); } 25%{ opacity:1; transform: translateY(-5vmin) translateX(-2vmin); } 50%{ opacity:1; transform: translateY(-15vmin) translateX(2vmin); filter: blur(.2vmin);} 75%{ transform: translateY(-20vmin) translateX(-2vmin); filter: blur(.2vmin);} 100%{ transform: translateY(-30vmin); opacity:0; filter: blur(1vmin);} }
@keyframes moving-flower-1{ 0%,100%{ transform: rotate(2deg);} 50%{ transform: rotate(-2deg);} }
@keyframes moving-flower-2{ 0%,100%{ transform: rotate(18deg);} 50%{ transform: rotate(14deg);} }
@keyframes moving-flower-3{ 0%,100%{ transform: rotate(-18deg);} 50%{ transform: rotate(-20deg) rotateY(-10deg);} }
@keyframes blooming-leaf-right{ 0%{ transform-origin:left; transform: rotate(70deg) rotateY(30deg) scale(0);} }
@keyframes blooming-leaf-left{ 0%{ transform-origin:right; transform: rotate(-70deg) rotateY(30deg) scale(0);} }
@keyframes grow-flower-tree{ 0%{ height:0; border-radius:1vmin; } }
@keyframes blooming-flower{ 0%{ transform: scale(0);} }
@keyframes moving-grass{ 0%,100%{ transform: rotate(-48deg) rotateY(40deg);} 50%{ transform: rotate(-50deg) rotateY(40deg);} }
@keyframes moving-grass--2{ 0%,100%{ transform: scale(.5) rotate(75deg) rotateX(10deg) rotateY(-200deg);} 50%{ transform: scale(.5) rotate(79deg) rotateX(10deg) rotateY(-200deg);} }
@keyframes growing-grass-ans--1{ 0%{ transform-origin: bottom left; transform: rotate(-20deg) scale(0);} }
@keyframes growing-grass-ans--2{ 0%{ transform-origin: bottom right; transform: rotate(10deg) scale(0);} }
@keyframes growing-grass-ans--3{ 0%{ transform-origin: bottom left; transform: rotate(-18deg) rotateX(-20deg) scale(0);} }
@keyframes growing-grass-ans--4{ 0%{ transform-origin: bottom right; transform: rotate(2deg) scale(0);} }
@keyframes growing-grass-ans--5{ 0%{ transform-origin: bottom left; transform: rotate(-24deg) rotateX(-20deg) scale(0);} }
@keyframes growing-grass-ans--6{ 0%{ transform-origin: bottom right; transform: rotate(10deg) scale(0);} }
@keyframes growing-grass-ans--7{ 0%{ transform-origin: bottom left; transform: rotate(-10deg) scale(0);} }
@keyframes growing-grass-ans--8{ 0%{ transform-origin: bottom right; transform: rotate(10deg) scale(0);} }
@keyframes flower-g-long-ans{ 0%,100%{ transform: rotate(-30deg) rotateY(-20deg);} 50%{ transform: rotate(-32deg) rotateY(-20deg);} }
@keyframes flower-g-right-ans{ 0%,100%{ transform: rotate(20deg);} 50%{ transform: rotate(24deg) rotateX(-20deg);} }
@keyframes flower-g-right-ans--2{ 0%,100%{ transform: rotateY(-180deg) rotate(0deg) rotateX(-20deg);} 50%{ transform: rotateY(-180deg) rotate(6deg) rotateX(-20deg);} }
@keyframes flower__g-front-ans{ 0%,100%{ transform: rotate(-28deg) rotateY(30deg) scale(1.04);} 50%{ transform: rotate(-35deg) rotateY(40deg) scale(1.04);} }
@keyframes flower__g-front__leaf-left-ans-2{ 0%{ transform: rotateY(-180deg) scale(0);} }
@keyframes flower__g-front__leaf-ans{ 0%{ transform: rotate(10deg) scale(0);} }
@keyframes flower__g-front__leaf-left-ans{ 0%{ transform: rotateY(-180deg) rotate(5deg) scale(0);} }
@keyframes flower__g-fr-ans{ 0%,100%{ transform: rotate(2deg);} 50%{ transform: rotate(4deg);} }
@keyframes flower__g-fr-leaft-ans-1{ 0%{ transform-origin:left; transform: rotate(45deg) scale(0);} }
@keyframes flower__g-fr-leaft-ans-5{ 0%{ transform-origin:left; transform: rotate(55deg) scale(0);} }
@keyframes flower__g-fr-leaft-ans-6{ 0%{ transform-origin:right; transform: rotate(25deg) rotateY(-180deg) scale(0);} }
@keyframes flower__g-fr-leaft-ans-7{ 0%{ transform-origin:left; transform: rotate(45deg) scale(0);} }
@keyframes flower__g-fr-leaft-ans-8{ 0%{ transform-origin:right; transform: rotate(15deg) rotateY(-180deg) scale(0);} }

/* Responsive tweaks */
@media (max-width: 600px){
  .flowers{ position:relative; bottom: 8vh; transform: scale(.9); }
}

/* Botón volver contenedor */
.rf-actions{
  position:absolute; left: 16px; bottom: 16px; z-index: 20;
}
`;
