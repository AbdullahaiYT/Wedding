document.addEventListener("DOMContentLoaded", function () {
    const envLeft = document.getElementById("env-left");
    const envRight = document.getElementById("env-right");
    const openBtn = document.getElementById("open-btn");
    const bgMusic = document.getElementById("bg-music");
    const musicToggle = document.getElementById("music-toggle");

    // 1. CENTER SPLIT CURTAIN REVEAL LOGIC
    openBtn.addEventListener("click", function () {
        envLeft.classList.add("open-left");
        envRight.classList.add("open-right");
        
        // Button smoothly scale zero ho kar fade out ho jayega
        openBtn.style.opacity = "0";
        openBtn.style.transform = "scale(0)"; 
        setTimeout(() => openBtn.remove(), 600);

        bgMusic.play().catch(err => console.log("Music blocked"));

        setTimeout(() => {
            const animatedElements = document.querySelectorAll(".animate-me");
            animatedElements.forEach((el, index) => {
                setTimeout(() => {
                    el.classList.remove("hide-for-anim");
                    el.classList.add("fade-in-active");
                }, index * 250); 
            });
        }, 600); 
    });

    // 2. AUDIO PLAY / PAUSE SWITCH
    musicToggle.addEventListener("click", function () {
        if (bgMusic.paused) {
            bgMusic.play();
            musicToggle.innerText = "PAUSE";
            musicToggle.style.backgroundColor = "#D4B483"; 
            musicToggle.style.color = "white";
        } else {
            bgMusic.pause();
            musicToggle.innerText = "PLAY";
            musicToggle.style.backgroundColor = "#E6D7C3"; 
            musicToggle.style.color = "#4a0410";
        }
    });

    // 3. MULTIPLE EVENT COUNTDOWNS CONTROLLER
    function initializeCountdown(targetDateStr, elementPrefix) {
        const targetTime = new Date(targetDateStr).getTime();
        const timer = setInterval(function () {
            const now = new Date().getTime();
            const distance = targetTime - now;
            if (distance > 0) {
                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);

                document.getElementById(`${elementPrefix}-days`).innerHTML = days < 10 ? "0" + days : days;
                document.getElementById(`${elementPrefix}-hours`).innerHTML = hours < 10 ? "0" + hours : hours;
                document.getElementById(`${elementPrefix}-mins`).innerHTML = minutes < 10 ? "0" + minutes : minutes;
                document.getElementById(`${elementPrefix}-secs`).innerHTML = seconds < 10 ? "0" + seconds : seconds;
            } else {
                clearInterval(timer);
                document.getElementById(`${elementPrefix}-days`).innerHTML = "00";
                document.getElementById(`${elementPrefix}-hours`).innerHTML = "00";
                document.getElementById(`${elementPrefix}-mins`).innerHTML = "00";
                document.getElementById(`${elementPrefix}-secs`).innerHTML = "00";
            }
        }, 1000);
    }

    initializeCountdown("Dec 28, 2026 16:00:00", "haldi");
    initializeCountdown("Dec 29, 2026 19:00:00", "mehndi");
    initializeCountdown("Dec 30, 2026 19:00:00", "wedding");
    initializeCountdown("Dec 31, 2026 20:00:00", "reception");
});
