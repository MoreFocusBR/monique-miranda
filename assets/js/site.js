// Menu mobile, ano do rodapé e controle do vídeo. Textos conforme o idioma da página (<html lang>).
const EN = document.documentElement.lang.startsWith('en');
const T = EN
  ? { open: 'Open menu', close: 'Close menu', play: 'Play video', pause: 'Pause video' }
  : { open: 'Abrir menu', close: 'Fechar menu', play: 'Reproduzir vídeo', pause: 'Pausar vídeo' };

const menuButton = document.querySelector('.menu');
const nav = document.querySelector('.navlinks');
const setMenu = (open) => {
  nav.classList.toggle('open', open);
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? T.close : T.open);
  menuButton.textContent = open ? '×' : '☰';
};
menuButton.addEventListener('click', () => setMenu(!nav.classList.contains('open')));
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
document.getElementById('year').textContent = new Date().getFullYear();

// Vídeo: não toca sozinho para quem prefere menos movimento; botão de pausar/continuar.
const video = document.querySelector('.hero-media video');
const toggle = document.querySelector('.video-toggle');
if (video && toggle) {
  const setLabel = () => {
    toggle.textContent = video.paused ? '▶' : '❚❚';
    toggle.setAttribute('aria-label', video.paused ? T.play : T.pause);
  };
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { video.removeAttribute('autoplay'); video.pause(); }
  toggle.addEventListener('click', () => { video.paused ? video.play() : video.pause(); });
  video.addEventListener('play', setLabel);
  video.addEventListener('pause', setLabel);
  setLabel();
}
