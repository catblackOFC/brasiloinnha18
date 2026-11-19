/* =====================================================
   BRASIL OINNHA • SITE +18
   Cadastro 100% fake: e-mail + senha ficam só no
   localStorage do navegador. Sem backend, sem envio.
   ===================================================== */

/* ---------- COLEÇÃO (edite aqui para adicionar fotos/vídeos) ---------- */
const FOTOS = [
  { src: "img/foto-01.jpg", thumb: "img/thumb/foto-01.jpg" },
  { src: "img/foto-02.jpg", thumb: "img/thumb/foto-02.jpg" },
  { src: "img/foto-03.jpg", thumb: "img/thumb/foto-03.jpg" },
  { src: "img/foto-04.jpg", thumb: "img/thumb/foto-04.jpg" },
  { src: "img/foto-05.jpg", thumb: "img/thumb/foto-05.jpg" },
  { src: "img/foto-06.jpg", thumb: "img/thumb/foto-06.jpg" },
  { src: "img/foto-07.jpg", thumb: "img/thumb/foto-07.jpg" },
  { src: "img/foto-08.jpg", thumb: "img/thumb/foto-08.jpg" },
  { src: "img/foto-09.jpg", thumb: "img/thumb/foto-09.jpg" },
  { src: "img/foto-10.jpg", thumb: "img/thumb/foto-10.jpg" },
  { src: "img/foto-11.jpg", thumb: "img/thumb/foto-11.jpg" },
  { src: "img/foto-12.jpg", thumb: "img/thumb/foto-12.jpg" },
  { src: "img/foto-13.jpg", thumb: "img/thumb/foto-13.jpg" },
  { src: "img/foto-14.jpg", thumb: "img/thumb/foto-14.jpg" },
  { src: "img/foto-15.jpg", thumb: "img/thumb/foto-15.jpg" },
  { src: "img/foto-16.jpg", thumb: "img/thumb/foto-16.jpg" },
  { src: "img/foto-17.jpg", thumb: "img/thumb/foto-17.jpg" }
];

const VIDEOS = [
  { src: "videos/video-1.mp4", poster: "posters/video-1.jpg", dur: "39 s" },
  { src: "videos/video-2.mp4", poster: "posters/video-2.jpg", dur: "11 s" },
  { src: "videos/video-3.mp4", poster: "posters/video-3.jpg", dur: "20 s" },
  { src: "videos/video-4.mp4", poster: "posters/video-4.jpg", dur: "10 s" },
  { src: "videos/video-5.mp4", poster: "posters/video-5.jpg", dur: "26 s" }
];

/* ---------- helpers ---------- */
const $  = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const LS_USER = "bo18_user";
const LS_AGE  = "bo18_age";

let user = null;
let cur  = -1;          // índice atual no lightbox (fotos + vídeos em sequência)
let toastTimer = null;

function toast(msg){
  const t = $("#toast");
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove("show"), 2800);
}
function maskEmail(e){
  const [a,b] = e.split("@");
  if(!b) return e;
  return a.slice(0,2) + "•••@" + b;
}

/* ---------- porta de idade ---------- */
(function initGate(){
  if(localStorage.getItem(LS_AGE) === "1"){
    $("#agegate").classList.add("off");
    $("#agegate").setAttribute("aria-hidden","true");
  }
})();
$("#gateYes").addEventListener("click", () => {
  localStorage.setItem(LS_AGE, "1");
  $("#agegate").classList.add("off");
  $("#agegate").setAttribute("aria-hidden","true");
});

/* ---------- render galeria + vídeos ---------- */
$("#stFotos").textContent  = FOTOS.length;
$("#stVideos").textContent = VIDEOS.length;

$("#strip").innerHTML = FOTOS.map((f,i) => `
  <figure class="ph" data-i="${i}">
    <span class="num">${String(i+1).padStart(2,"0")}</span>
    <img src="${f.thumb}" alt="Foto ${i+1}" loading="lazy">
    <span class="locktag">🔒 <i>Cadastre-se para ver em HD</i></span>
  </figure>`).join("");

$("#vgrid").innerHTML = VIDEOS.map((v,i) => `
  <figure class="vcard" data-i="${i}">
    <span class="hdbadge">HD</span>
    <span class="dur">${v.dur}</span>
    <img class="vthumb" src="${v.poster}" alt="Vídeo ${i+1}" loading="lazy">
    <span class="play"><span>▶</span></span>
    <span class="locktag">🔒 <i>Desbloqueie para assistir</i></span>
  </figure>`).join("");

/* ---------- cadastro fake (localStorage) ---------- */
function applyState(){
  document.body.classList.toggle("locked", !user);
  $("#enterBtn").hidden  = !!user;
  $("#logoutBtn").hidden = !user;
  $("#userchip").hidden  = !user;
  if(user){
    $("#usermail").textContent = maskEmail(user.e);
    $("#chipFotos").innerHTML  = "✓ desbloqueado em HD";
    $("#chipFotos").className  = "chip";
    $("#chipVideos").innerHTML = "✓ liberado para assistir";
    $("#chipVideos").className = "chip";
  } else {
    $("#chipFotos").innerHTML  = "🔒 desbloqueie para ver em HD";
    $("#chipFotos").className  = "chip chip-lock";
    $("#chipVideos").innerHTML = "🔒 desbloqueie para assistir";
    $("#chipVideos").className = "chip chip-lock";
  }
}
function openModal(){
  $("#signup").hidden = false;
  document.body.style.overflow = "hidden";
  setTimeout(() => $("#inEmail").focus(), 60);
}
function closeModal(){
  $("#signup").hidden = true;
  document.body.style.overflow = "";
}

try{ user = JSON.parse(localStorage.getItem(LS_USER)); }catch(e){ user = null; }
applyState();

$("#enterBtn").addEventListener("click", openModal);
$$("[data-openmodal]").forEach(b => b.addEventListener("click", openModal));
$("#closeSignup").addEventListener("click", closeModal);
$("#signup").addEventListener("click", e => { if(e.target.id === "signup") closeModal(); });

$("#formSignup").addEventListener("submit", e => {
  e.preventDefault();
  const email = $("#inEmail").value.trim().toLowerCase();
  const pass  = $("#inPass").value;
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)){ toast("Digite um e-mail válido 😉"); return; }
  if(pass.length < 6){ toast("A senha precisa de pelo menos 6 caracteres"); return; }
  user = { e: email, p: pass, t: Date.now() };
  localStorage.setItem(LS_USER, JSON.stringify(user));
  applyState();
  closeModal();
  e.target.reset();
  toast("Conta criada! Tudo desbloqueado 🔓");
});

$("#logoutBtn").addEventListener("click", () => {
  if(!confirm("Sair e bloquear a prévia novamente?")) return;
  localStorage.removeItem(LS_USER);
  user = null;
  applyState();
  toast("Você saiu. A prévia voltou a ficar borrada.");
});

/* ---------- lightbox (fotos + vídeos na mesma navegação) ---------- */
const ITEMS = [
  ...FOTOS.map((f,i) => ({ type:"foto",   i })),
  ...VIDEOS.map((v,i) => ({ type:"video", i }))
];

function renderLB(){
  const it = ITEMS[cur];
  const st = $("#lbStage");
  if(it.type === "foto"){
    st.innerHTML = `<img src="${FOTOS[it.i].src}" alt="Foto ${it.i+1}">`;
    $("#lbCap").textContent = `Foto ${it.i+1} de ${FOTOS.length}`;
  } else {
    st.innerHTML = `<video src="${VIDEOS[it.i].src}" poster="${VIDEOS[it.i].poster}" controls autoplay playsinline></video>`;
    $("#lbCap").textContent = `Vídeo ${it.i+1} de ${VIDEOS.length}`;
  }
}
function openLB(n){
  cur = (n + ITEMS.length) % ITEMS.length;
  renderLB();
  $("#lightbox").hidden = false;
  document.body.style.overflow = "hidden";
}
function closeLB(){
  $("#lbStage").innerHTML = "";
  $("#lightbox").hidden = true;
  document.body.style.overflow = "";
  cur = -1;
}
$("#lbClose").addEventListener("click", closeLB);
$("#lbPrev").addEventListener("click", () => openLB(cur - 1));
$("#lbNext").addEventListener("click", () => openLB(cur + 1));
$("#lightbox").addEventListener("click", e => { if(e.target.id === "lightbox") closeLB(); });
document.addEventListener("keydown", e => {
  if($("#lightbox").hidden) return;
  if(e.key === "Escape") closeLB();
  if(e.key === "ArrowLeft") openLB(cur - 1);
  if(e.key === "ArrowRight") openLB(cur + 1);
});

/* ---------- clique nas peças ---------- */
document.addEventListener("click", e => {
  const ph = e.target.closest(".ph");
  const vc = e.target.closest(".vcard");
  if(!ph && !vc) return;
  if(!user){                       // ainda bloqueado? -> pede cadastro
    openModal();
    toast("Crie sua conta gratuita para ver por completo 💛");
    return;
  }
  openLB(ph ? +ph.dataset.i : FOTOS.length + +vc.dataset.i);
});

$("#ano").textContent = new Date().getFullYear();
