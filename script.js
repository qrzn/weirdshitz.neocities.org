document.addEventListener('DOMContentLoaded', function() {
    const typewriter = document.getElementById('typewriter');
    const text = typewriter.innerText;
    typewriter.innerHTML = '';

    let i = 0;
    function typeWriterEffect() {
        if (i < text.length) {
            typewriter.innerHTML += text.charAt(i);
            i++;
            setTimeout(typeWriterEffect, 64); // Adjust typing speed here
        } else {
            // Once text is fully printed, start the blink effect
            blinkText(); // Blink indefinitely, insert number for a certain number of times
        }
    }

    function blinkText(times) {
        let blinkCount = 0;
        const blinkInterval = setInterval(function() {
            typewriter.style.visibility = typewriter.style.visibility === 'hidden' ? '' : 'hidden';
            blinkCount++;
            if (blinkCount === times * 2) {
                clearInterval(blinkInterval);
                typewriter.style.visibility = 'hidden'; // Hide text after blinking
            }
        }, 100); // Adjust blink speed here
    }

    typeWriterEffect();
});
