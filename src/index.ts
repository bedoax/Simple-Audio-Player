interface Elements {
    divMusicContainer: HTMLElement;
    image: HTMLElement;
    img: HTMLImageElement;
    controls: HTMLElement;
    btnBackward: HTMLElement;
    btnPlay: HTMLElement;
    btnForward: HTMLElement;
    btnPause: HTMLElement | null;
    iBackward: HTMLElement;
    iPlay: HTMLElement;
    iForward: HTMLElement;
    infat: HTMLElement;
    audio: HTMLAudioElement;
    divProgress: HTMLElement;
    progressBar: HTMLInputElement;
    source: HTMLSourceElement;
}
let isAnimationRunning:boolean=true;
// Define an interface for the audio object
interface AudioObject {
    src: { [key: number]: string };
    imgs: { [key: number]: string };
}

// Define an object to store elements
const elements: Elements = {
    divMusicContainer: document.querySelector('.contanier-music')! as HTMLElement,
    image: document.querySelector('.image')! as HTMLElement,
    img: document.querySelector('img')! as HTMLImageElement,
    controls: document.querySelector('.controls')! as HTMLElement,
    btnBackward: document.querySelector('.backward')! as HTMLElement,
    btnPlay: document.querySelector('.play')! as HTMLElement,
    btnForward: document.querySelector('.forward')! as HTMLElement,
    btnPause: document.querySelector('.pause'),
    iBackward: document.querySelector('.fa-backward')! as HTMLElement,
    iPlay: document.querySelector('.fa-play')! as HTMLElement,
    iForward: document.querySelector('.fa-forward')! as HTMLElement,
    infat: document.querySelector('.infat')! as HTMLElement,
    audio: document.querySelector('audio')! as HTMLAudioElement,
    divProgress: document.querySelector('.progress-container')! as HTMLElement,
    progressBar: document.querySelector('.progress-bar') as HTMLInputElement,
    source: document.querySelector('source')! as HTMLSourceElement,
};

// Define an object for audio sources and images
const audioObject: AudioObject = {
    src: {
        0: "https://server6.mp3quran.net/abkr/001.mp3",
        1: "https://server6.mp3quran.net/abkr/112.mp3",
        2: "https://server6.mp3quran.net/abkr/113.mp3",
        3: "https://server6.mp3quran.net/abkr/114.mp3",
    },
    imgs: {
        0: "https://i1.sndcdn.com/artworks-000278411180-v08rj4-t500x500.jpg",
        1: "https://plus.unsplash.com/premium_photo-1661603403807-aa68bfcc983a?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        2: "https://images.unsplash.com/photo-1594372365401-3b5ff14eaaed?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        3: "https://images.unsplash.com/photo-1567095761054-7a02e69e5c43?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
};

let posSrc = 0;

elements.btnPlay?.addEventListener("click", function () {
    if (elements.iPlay) {
        elements.iPlay.classList.toggle('fa-play');
        elements.iPlay.classList.toggle('fa-pause');
        toggleAnimationState();
        toggleProgressBarVisibility();
        elements.iPlay.classList.contains("fa-play") ? pauseAudio() : playAudio();
    }
});

elements.btnForward.addEventListener('click', function () {
    nextAudioSound();
    if(!elements.iPlay.classList.contains('fa-play')){
        playAudio();
    }
   
});

elements.btnBackward.addEventListener('click', function () {
    previousAudioSound();
    if(!elements.iPlay.classList.contains('fa-play')){
        playAudio();
    }
   
});

elements.audio.addEventListener('ended', function () {
    nextAudioSound();
    playAudio();
});

elements.audio.addEventListener('timeupdate', function () {
    updateProgressBar();
});

elements.progressBar.addEventListener('input', function () {
    updateAudioPlaybackPosition();
});

function playAudio() {
    elements.audio.load();
    elements.audio.addEventListener('loadedmetadata', function onLoadedMetadata() {
        elements.audio.play();
        elements.audio.removeEventListener('loadedmetadata', onLoadedMetadata); // Remove the event listener after playing
    });
}

function pauseAudio() {
    elements.audio.pause();
}

function nextAudioSound() {
    updateProgressBarValue();
    posSrc = (posSrc + 1) % Object.keys(audioObject.src).length;
    updateAudioSource();
}

function previousAudioSound() {
    updateProgressBarValue();
    posSrc = (posSrc - 1 + Object.keys(audioObject.src).length) % Object.keys(audioObject.src).length;
    updateAudioSource();
}

function updateProgressBarValue() {
    elements.progressBar.value = "0";
}

function updateAudioSource() {
    elements.source.src = audioObject.src[posSrc];
    elements.img.src = audioObject.imgs[posSrc];
}

function updateProgressBar() {
    const progress = (elements.audio.currentTime / elements.audio.duration) * 100;
    elements.progressBar.value = progress.toFixed(2);
}

function updateAudioPlaybackPosition() {
    const newTime = (parseInt(elements.progressBar.value) / 100) * elements.audio.duration;
    elements.audio.currentTime = newTime;
}

function toggleAnimationState() {
    elements.infat.style.animationPlayState = isAnimationRunning ? 'running' : 'paused';
    isAnimationRunning = !isAnimationRunning;
}

function toggleProgressBarVisibility() {
    const hiddenClass = 'hidden';
    const blockClass = 'block';
    elements.divProgress.classList.toggle(hiddenClass, isAnimationRunning);
    elements.divProgress.classList.toggle(blockClass, !isAnimationRunning);
}


