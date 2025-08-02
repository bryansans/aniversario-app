// App.js actualizado solo con rutas corregidas para GitHub Pages

import React, { useState } from 'react';
import './App.css';

import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

function App() {
  const [fecha, setFecha] = useState('');
  const [acceso, setAcceso] = useState(false);
  const [vista, setVista] = useState('login'); // 'login', 'dashboard', 'historia', 'momentos'

  const fechaCorrecta = '2024-08-18';

  const verificarFecha = () => {
    if (fecha === fechaCorrecta) {
      setAcceso(true);
      setVista('dashboard');
    } else {
      Swal.fire({
        title: 'Como!!',
        text: 'Te voy hacer mierdita si no te acuerdas',
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
        <div className="login fade-in">
          <h2>💖 ¿Recuerdas nuestra fecha especial?</h2>
          <p>Elige el día que comenzó todo 💘</p>
          <input
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
          />
          <button onClick={verificarFecha}>Desbloquear</button>
        </div>
      )}

      {vista === 'dashboard' && acceso && (
        <Dashboard
          irAHistoria={() => setVista('historia')}
          irAMomentos={() => setVista('momentos')}
          irADibujos={() => setVista('dibujos')}
          irAMensaje={() => setVista('mensaje')}
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

    </div>
  );
}

function Dashboard({ irAHistoria, irAMomentos, irADibujos, irAMensaje }) {
  return (
    <div className="dashboard fade-in">
      <h2>Bienvenida corazón mio ❤️</h2>
      <p>Puedes ir revisando cada seccion, iras encontrando algunas cositas que te preparé 💕 </p>
      <div className="tarjetas">
        <div className="tarjeta hover-anim" onClick={irAHistoria}>📖 Nuestra historia juntos</div>
        <div className="tarjeta hover-anim" onClick={irAMomentos}>📸 Momentos juntitos</div>
        <div className="tarjeta hover-anim" onClick={irADibujos}>🎨 Dibujos</div>
        <div className="tarjeta hover-anim" onClick={irAMensaje}>💌 Mensaje final</div>
      </div>
    </div>
  );
}

function Historia({ volver }) {
  return (
    <div className="historia fade-in">
      <h2>📖 Nuestra historia juntos</h2>
      <p className="historia-texto">
        Y pensar que todo comenzo con un "among us black?" jaja, y asi de la manera mas random nos conocimos,
        solo nos hablabamos a traves de la cami ya que eramos solo conocidos, ya en algun momento que la cami nos dejo
        solos comenzamos hablar y sin darnos cuenta conectabamos mucho y nos volvimos amigos. Ya al pasar el tiempo
        pasaron cositas que al final nos separamos del resto hasta quedarnos nosotros solitos, y bueno nos conocimos
        mas aun hasta que sentimos cositas el uno por el otro sin darnos cuenta, pero algo paso que perdimos conexion pero
        luego volvimos a reencontrarnos y fue tan bonito haber comenzado hablar nuevamente y saber que no se habia perdido
        esa conexion que teniamos y que aun nos queriamos mucho, y bueno como que conituamos eso que ya teniamos y llegamos
        a lo inesperado, ser novios y comenzar una nueva etapa pero juntitos ❤️.
      </p>

      <img src={`${process.env.PUBLIC_URL}/pareja.png`} alt="nuestra historia" className="historia-imagen" />
      <button className="boton-volver" onClick={volver}>← Volver</button>
    </div>
  );
}

function Momentos({ volver }) {
  const momentos = [
    'foto1.png', 'foto2.png', 'foto3.png', 'foto4.png', 'foto5.png', 'foto6.png', 'foto7.png',
    'foto8.png', 'foto9.png', 'foto10.png', 'foto11.png', 'foto12.png', 'foto13.png', 'foto14.png',
    'foto15.png', 'foto16.png', 'foto17.png', 'momentojuntos.mp4'
  ].map(path => `${process.env.PUBLIC_URL}/${path}`);

  return (
    <div className="momentos fade-in">
      <h2>📸 Nuestros momentos juntitos</h2>
      <p>Alguno de nuestros momentos mami</p>

      <div className="carrusel">
        {momentos.map((src, i) => (
          <div key={i} className="slide">
            {src.endsWith('.mp4') ? (
              <video controls className="slide-video">
                <source src={src} type="video/mp4" />
                Tu navegador no soporta videos HTML5 😢
              </video>
            ) : (
              <img src={src} alt={`momento-${i}`} className="slide-img" />
            )}
          </div>
        ))}
      </div>

      <button className="boton-volver" onClick={volver}>← Volver</button>
    </div>
  );
}

function Dibujos({ volver }) {
  const dibujos = [
    'dibujo1.png', 'dibujo2.png', 'dibujo3.png', 'dibujo4.png',
    'dibujo5.png', 'dibujo6.png', 'dibujo7.png', 'dibujo8.png'
  ].map(path => `${process.env.PUBLIC_URL}/${path}`);

  return (
    <div className="dibujos fade-in">
      <h2>🎨 Dibujos especiales</h2>
      <p>Dibujitos que hice con el tiempo</p>

      <div className="carrusel">
        {dibujos.map((src, i) => (
          <div key={i} className="slide">
            <img src={src} alt={`dibujo-${i}`} className="slide-img" />
          </div>
        ))}
      </div>

      <button className="boton-volver" onClick={volver}>← Volver</button>
    </div>
  );
}

function MensajeFinal({ volver }) {
  const mensajeCompleto =
    "Bueno mi morcita linda, esta página la hice con todo mi cariño para ti, pensando cada detalle y\n" +
    "algunos de los tantos momentos que hemos compartido juntos.\n\n" +
    "Nuestro primer año juntitos ha sido muy lindo, lleno de momentos good y algunos bad, pero siempre juntitos\n" +
    "apoyándonos mutuamente. Este es el primero de muchos años que estaremos juntitos, mor mío.\n\n" +
    "Si Dios quiere, el otro año nos veremos en persona y podremos compartir momentos inolvidables juntitos,\n" +
    "momentos que recordaremos por siempre, morcita mía.\n\n" +
    "Te amo tanto, mor mío. Eres el amor de mi vida y alma 💖";

  return (
    <div className="mensaje-final fade-in">
      <h2>💌 Mi mensaje para ti</h2>
      <pre className="mensaje-texto">{mensajeCompleto}</pre>

      <img src={`${process.env.PUBLIC_URL}/final.gif`} alt="gif romántico" className="gif-final" />

      <button className="boton-volver" onClick={volver}>← Volver</button>
    </div>
  );
}

export default App;
