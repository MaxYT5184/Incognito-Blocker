let attemptCount = 0;

// Function to get the device's IP address using an external API
async function getIPAddress() {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        return data.ip;
    } catch (error) {
        console.error('Error fetching IP address:', error);
        return 'Unknown IP';
    }
}

// Function to display the sidebar with device info
async function displaySidebar() {
    const deviceName = navigator.userAgent;
    const ipAddress = await getIPAddress();

    const sidebarHtml = `
        <div style="position:fixed; top:0; right:0; width:300px; height:100%; background:#333; color:white; padding:10px; font-family:sans-serif; z-index:9999;">
            <h2>Device Info</h2>
            <p><strong>Device Name:</strong> ${deviceName}</p>
            <p><strong>IP Address:</strong> ${ipAddress}</p>
            <hr>
            <h2>Incognito Attempts</h2>
            <p><strong>Attempts:</strong> ${attemptCount}</p>
        </div>
    `;

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            func: (html) => {
                const sidebar = document.createElement('div');
                sidebar.innerHTML = html;
                document.body.appendChild(sidebar);
            },
            args: [sidebarHtml]
        });
    });
}

// Event listener for new tabs
chrome.tabs.onCreated.addListener(async (tab) => {
    // Check if the newly created tab is in incognito mode
    if (tab.incognito) {
        attemptCount++;  // Increment the attempt counter

        // Create a new tab with the blocked message
        chrome.tabs.create({
            url: chrome.runtime.getURL("blocked.html"),
            active: true
        });

        // Close the original Incognito tab
        chrome.tabs.remove(tab.id);

        // Display the sidebar with updated info
        displaySidebar();
    }
});
