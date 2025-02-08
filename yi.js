async function loadInterpretations() {
    try {
        const response = await fetch("int.json");
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error loading JSON:", error);
        return {};  // Return empty object to avoid crashes
    }
}

// Generate a 6-digit hexagram (only "6" or "7" to match `int.json`)
function generateHexagram() {
    let hexagram = "";
    for (let i = 0; i < 6; i++) {
        hexagram += Math.random() < 0.5 ? "6" : "7"; // 50% chance for each line
    }
    return hexagram;
}

// Display hexagram as broken (yin) and solid (yang) lines
function displayHexagram(hexagram) {
    return hexagram.split("").reverse().map(line =>
        line === "6" ? "-------" : "--- ---"
    ).join("\n");
}

// Get interpretation from `int.json` or return a default
async function interpretHexagram(hexagram, interpretations) {
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

    async function newReading() {
        const hexagram = generateHexagram();
        const interpretation = await interpretHexagram(hexagram, interpretations);

        output.innerHTML = `
            <h2>Hexagram: ${hexagram}</h2>
            <pre>${displayHexagram(hexagram)}</pre>
            <h3>${interpretation.hexagram}</h3>
            <p><strong>Image:</strong> ${interpretation.image}</p>
            <p><strong>Judgment:</strong> ${interpretation.judgment}</p>
            <p><strong>Description:</strong> ${interpretation.description}</p>
        `;
    }

    newReadingBtn.addEventListener("click", newReading);
    newReading();
});
