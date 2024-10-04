document.addEventListener("DOMContentLoaded", () => {
    const closeButton = document.querySelector("button");

    // Close the tab when the user clicks the "Close Tab" button
    closeButton.addEventListener("click", () => {
        window.close();
    });

    // Increment the blocked attempt counter in local storage
    let blockedAttempts = parseInt(localStorage.getItem("blockedAttempts")) || 0;
    blockedAttempts += 1;
    localStorage.setItem("blockedAttempts", blockedAttempts);

    // Display blocked attempts in the sidebar (if needed in the UI)
    const attemptsElement = document.createElement("p");
    attemptsElement.textContent = `Blocked attempts: ${blockedAttempts}`;
    document.body.appendChild(attemptsElement);
});
