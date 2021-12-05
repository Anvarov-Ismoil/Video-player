const play = document.querySelector('.fa-play')
const pause = document.querySelector('.fa-pause')
const stop = document.querySelector('.stop')
const speedUp = document.querySelector('.speed-up')
const volume = document.querySelector('input[type="range"]')
const volumeIndicator = document.querySelector('.volume')
const progress = document.querySelector('.progress')
const video = document.querySelector('video')
const mute = document.querySelector('.mute')
const next = document.querySelector('.fa-fast-forward')
const prev = document.querySelector('.fa-fast-backward')
const currentText = document.querySelector('.video-time .current-time')
const durationText = document.querySelector('.video-time .duration-time')

const videos = [
    'video-1.mp4',
    'video-2.mp4',
    'video-3.mp4',
    'video-4.mp4',
    'video-5.mp4'
]

let videosCount = 0
prev.style.opacity = '0'
prev.style.pointerEvents = 'none'


video.src = 'videos/' + videos[videosCount]
// Next
next.addEventListener('click', () => {
    videosCount++
    video.style.display = 'block'
    video.src = 'videos/' + videos[videosCount]
    video.play()
    prev.style.opacity = '1'
    prev.style.pointerEvents = 'auto'

    played()
    if (videosCount + 1 === videos.length) {
        next.style.opacity = '0'
        next.style.pointerEvents = 'none'
    }

})

// Prev
prev.addEventListener('click', () => {
    videosCount--

    video.src = 'videos/' + videos[videosCount]
    video.style.opacity = '1'
    video.play()
    played()

    if (videosCount == 0) {
        prev.style.opacity = '0'
        prev.style.pointerEvents = 'none'

    }

    if (videosCount < videos.length) {
        next.style.opacity = '1'
        next.style.pointerEvents = 'auto'

    }
})

function played() {
    play.classList.remove('active')
    pause.classList.add('active')
}

function paused() {
    play.classList.add('active')
    pause.classList.remove('active')
}

// Play
play.addEventListener('click', () => {
    video.play()
    played()
})

// Pause
pause.addEventListener('click', () => {
    video.pause()
    paused()
})

// Stop
stop.addEventListener('click', () => {
    video.pause()
    video.currentTime = 0
    paused()
})

// Speed Up
let speedCount = 1;
speedUp.addEventListener('click', () => {
    video.playbackRate = speedCount
    speedCount += speedCount
    if (speedCount === 2) {
        speedUp.textContent = '2x'
        speedUp.classList.add('active')
    } else if (speedCount === 4) {
        speedUp.textContent = '4x'
        speedUp.classList.add('active')
    } else if (speedCount === 8) {
        speedUp.textContent = '8x'
        speedUp.classList.add('active')
    } else if (speedCount === 16) {
        speedUp.textContent = '16x'
        speedUp.classList.add('active')
    } else {
        speedCount = 1
        video.playbackRate = speedCount
        speedUp.textContent = '2x'
        speedUp.classList.remove('active')
    }
    video.play()
    played()
})

// Volume
volume.addEventListener('input', () => {
    const volumeValue = volume.value
    volumeIndicator.textContent = volumeValue + '%'
    video.volume = volumeValue / 100

    if (volumeValue == 0) {
        mute.classList.remove('fa-volume-up')
        mute.classList.add('fa-volume-mute')
    } else {
        mute.classList.add('fa-volume-up')
        mute.classList.remove('fa-volume-mute')
    }
})

// Mute
mute.addEventListener('click', () => {
    mute.classList.toggle('muted')
    if (mute.classList.contains('muted')) {
        video.volume = 0
        mute.classList.remove('fa-volume-up')
        mute.classList.add('fa-volume-mute')
    } else {
        video.volume = volume.value / 100
        mute.classList.add('fa-volume-up')
        mute.classList.remove('fa-volume-mute')
    }
})

// Video time
function currentTime() {

    const current = video.currentTime;
    const duration = video.duration;

    let currentMinutes = Math.floor(current / 60);
    let currentSeconds = Math.floor(current - currentMinutes * 60);
    let durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration - durationMinutes * 60);


    currentText.innerHTML = `${currentMinutes}:${currentSeconds<10 ? '0' + currentSeconds : currentSeconds}`;

    if (isNaN(duration)) {
        durationText.innerHTML = '0:00'
    } else {
        durationText.innerHTML = `${durationMinutes}:${durationSeconds}`;
    }
}
video.addEventListener('timeupdate', currentTime)

// Progress
video.addEventListener('timeupdate', () => {
    const current = video.currentTime
    const duration = video.duration
    progress.value = (current * 100) / duration
})

progress.addEventListener('click', e => {
    const progressWidth = progress.offsetWidth
    const clicked = e.offsetX
    progress.value = (clicked * 100) / progressWidth
    video.currentTime = (clicked / progressWidth) * video.duration
})

// End
video.addEventListener('pause', () => {
    if (video.currentTime === video.duration) {
        video.currentTime = 0
        paused()
    }
})