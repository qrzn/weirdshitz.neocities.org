async function loadInterpretations() {
    try {
        const response = await fetch("int.json");
        if (!response.ok) throw new Error(`Failed to load JSON: ${response.statusText}`);
        return await response.json();
    } catch (error) {
        console.error("Error loading interpretations:", error);
        return {}; // Return empty object to prevent crashes
    }
}

// Generate a 6-digit hexagram (each line is either "6" or "7")
function generateHexagram() {
    return Array.from({ length: 6 }, () => (Math.random() < 0.5 ? "6" : "7")).join("");
}

// Display hexagram as broken (yin) and solid (yang) lines
function displayHexagram(hexagram) {
    return hexagram.split("").reverse().map(line => (line === "6" ? "———————————" : "————— —————")).join("\n");
}

// Retrieve hexagram interpretation or provide a default fallback
function getInterpretation(hexagram, interpretations) {
    return interpretations[hexagram] || {
        hexagram: "Unknown Hexagram",
        image: "Unknown Image",
        judgment: "Unknown Judgment",
        description: "Unknown Description"
    };
}

document.addEventListener("DOMContentLoaded", async () => {
    const interpretations = await loadInterpretations();
    const output = document.getElementById("output");
    const newReadingBtn = document.getElementById("newReading");

    function newReading() {
        const hexagram = generateHexagram();
        const interpretation = getInterpretation(hexagram, interpretations);

        output.innerHTML = `
            <h2>${interpretation.hexagram}</h2>
            <pre>${displayHexagram(hexagram)}</pre>

            <details>
                <summary><strong>Image</strong></summary>
                <p>${interpretation.image}</p>
            </details>

            <details>
                <summary><strong>Judgment</strong></summary>
                <p>${interpretation.judgment}</p>
            </details>

            <details>
                <summary><strong>Description</strong></summary>
                <p>${interpretation.description}</p>
            </details>
        `;
    }

    newReadingBtn.addEventListener("click", newReading);
    newReading(); // Generate first hexagram on page load
});
