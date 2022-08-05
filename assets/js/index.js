if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js');
}

document.querySelector('#share').addEventListener('click', () => navigator.share({
    title: 'Alan Zatarain - Web developer',
    text: 'Take a look at the portfolio of Alan Zatarain',
    url: 'https://ingSinTitulo.github.io/'
}));