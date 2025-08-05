// 💬 Lista de palabras (puedes agregar más)
const palabras = ["isagi", "nagi", "reo", "bachira", "kunigami", "rin", "barou", "yuki", "shidou", "sae"];
const palabraSecreta = palabras[Math.floor(Math.random() * palabras.length)].toLowerCase();

// ⚙️ Variables iniciales
let intento = 0;
let palabraActual = "";
const maxIntentos = 6;

// 🔲 Crear el tablero
const game = document.getElementById("game");
for (let i = 0; i < maxIntentos * 5; i++) {
  const tile = document.createElement("div");
  tile.classList.add("tile");
  game.appendChild(tile);
}

// ⌨️ Crear el teclado
const letras = "QWERTYUIOPASDFGHJKLZXCVBNM";
const keyboard = document.getElementById("keyboard");

function crearTecla(letra) {
  const btn = document.createElement("button");
  btn.textContent = letra;
  btn.classList.add("key");
  if (letra === "ENTER" || letra === "⌫") {
    btn.classList.add("wide");
  }
  btn.onclick = () => manejarTecla(letra);
  keyboard.appendChild(btn);
}

[...letras].forEach(l => crearTecla(l));
crearTecla("ENTER");
crearTecla("⌫");

// 🎮 Lógica del teclado
function manejarTecla(letra) {
  if (letra === "ENTER") {
    if (palabraActual.length < 5) return;
    evaluarIntento();
  } else if (letra === "⌫") {
    palabraActual = palabraActual.slice(0, -1);
    actualizarTablero();
  } else {
    if (palabraActual.length < 5) {
      palabraActual += letra.toLowerCase();
      actualizarTablero();
    }
  }
}

// 🖼️ Mostrar letras en casillas
function actualizarTablero() {
  for (let i = 0; i < 5; i++) {
    const tileIndex = intento * 5 + i;
    const tile = game.children[tileIndex];
    tile.textContent = palabraActual[i] || "";
  }
}

// ✅ Evaluar intento
function evaluarIntento() {
  const resultado = [];
  const palabraTemp = palabraSecreta.split("");

  for (let i = 0; i < 5; i++) {
    const letra = palabraActual[i];
    const tile = game.children[intento * 5 + i];
    if (letra === palabraTemp[i]) {
      tile.classList.add("correct");
      resultado.push("correct");
      palabraTemp[i] = null; // para no volver a contarla
    }
  }

  for (let i = 0; i < 5; i++) {
    const letra = palabraActual[i];
    const tile = game.children[intento * 5 + i];
    if (!tile.classList.contains("correct")) {
      if (palabraTemp.includes(letra)) {
        tile.classList.add("present");
        palabraTemp[palabraTemp.indexOf(letra)] = null;
      } else {
        tile.classList.add("absent");
      }
    }
  }

  if (palabraActual === palabraSecreta) {
    setTimeout(() => alert("🎉 ¡Ganaste! Era: " + palabraSecreta.toUpperCase()), 100);
  } else if (++intento === maxIntentos) {
    setTimeout(() => alert("❌ Perdiste. Era: " + palabraSecreta.toUpperCase()), 100);
  }

  palabraActual = "";
}
