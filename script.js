document.addEventListener("DOMContentLoaded", () => {
  const card = document.querySelector(".card")
  const pages = document.querySelectorAll(".page")
  const prevButton = document.querySelector(".prev")
  const nextButton = document.querySelector(".next")
  const currentPageSpan = document.querySelector(".current-page")
  const totalPagesSpan = document.querySelector(".total-pages")
  const jokeButton = document.querySelector(".joke-button")
  const jokeText = document.querySelector(".joke-text")
  const jokeAnswer = document.querySelector(".joke-answer")
  const audioElement = document.getElementById("audio-element")
  const playPauseButton = document.getElementById("play-pause")
  const seekSlider = document.getElementById("seek-slider")

  let currentPage = 0
  const totalPages = pages.length

  totalPagesSpan.textContent = totalPages

  function showPage(pageIndex) {
    pages.forEach((page, index) => {
      if (index === pageIndex) {
        page.classList.add("active")
      } else {
        page.classList.remove("active")
      }
    })
    currentPageSpan.textContent = pageIndex + 1
  }

  function nextPage() {
    currentPage = (currentPage + 1) % totalPages
    showPage(currentPage)
  }

  function prevPage() {
    currentPage = (currentPage - 1 + totalPages) % totalPages
    showPage(currentPage)
  }

  card.addEventListener("click", () => {
    if (!card.classList.contains("open")) {
      card.classList.add("open")
      showPage(currentPage)
    }
  })

  nextButton.addEventListener("click", (e) => {
    e.stopPropagation()
    nextPage()
  })

  prevButton.addEventListener("click", (e) => {
    e.stopPropagation()
    prevPage()
  })

  // 3D tilt effect
  card.addEventListener("mousemove", (e) => {
    const { left, top, width, height } = card.getBoundingClientRect()
    const x = (e.clientX - left) / width
    const y = (e.clientY - top) / height

    const tiltAmount = 15
    const tiltX = (y - 0.5) * tiltAmount
    const tiltY = (x - 0.5) * -tiltAmount

    card.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg) ${card.classList.contains("open") ? "rotateY(180deg)" : ""}`
  })

  card.addEventListener("mouseleave", () => {
    card.style.transform = card.classList.contains("open") ? "rotateY(180deg)" : ""
  })

  // Joke generator
  const jokes = [
    { setup: "Why don't scientists trust atoms?", punchline: "Because they make up everything!" },
    { setup: "Why did the scarecrow win an award?", punchline: "He was outstanding in his field!" },
    { setup: "Why don't eggs tell jokes?", punchline: "They'd crack each other up!" },
    { setup: "What do you call a fake noodle?", punchline: "An impasta!" },
    { setup: "Why did the math book look so sad?", punchline: "Because it had too many problems!" },
  ]

  function getRandomJoke() {
    return jokes[Math.floor(Math.random() * jokes.length)]
  }

  function displayJoke() {
    const joke = getRandomJoke()
    jokeText.textContent = joke.setup
    jokeAnswer.textContent = joke.punchline
  }

  jokeButton.addEventListener("click", displayJoke)

  // Initialize with a random joke
  displayJoke()

  // Audio player
  let isPlaying = false

  playPauseButton.addEventListener("click", () => {
    if (isPlaying) {
      audioElement.pause()
      playPauseButton.innerHTML = '<i class="fas fa-play"></i>'
    } else {
      audioElement.play()
      playPauseButton.innerHTML = '<i class="fas fa-pause"></i>'
    }
    isPlaying = !isPlaying
  })

  audioElement.addEventListener("timeupdate", () => {
    const progress = (audioElement.currentTime / audioElement.duration) * 100
    seekSlider.value = progress
  })

  seekSlider.addEventListener("input", () => {
    const time = (seekSlider.value / 100) * audioElement.duration
    audioElement.currentTime = time
  })

  audioElement.addEventListener("ended", () => {
    isPlaying = false
    playPauseButton.innerHTML = '<i class="fas fa-play"></i>'
  })
})

