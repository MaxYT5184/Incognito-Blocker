document.addEventListener('DOMContentLoaded', () => {
    const incognitoBlockCheckbox = document.getElementById('incognito-block');
    const showNotificationsCheckbox = document.getElementById('show-notifications');
    const saveButton = document.getElementById('save-button');
    const statusMessage = document.getElementById('status');

    // Load saved settings from storage
    chrome.storage.sync.get(['incognitoBlock', 'showNotifications'], (result) => {
        incognitoBlockCheckbox.checked = result.incognitoBlock || false;
        showNotificationsCheckbox.checked = result.showNotifications || false;
    });

    // Save settings on button click
    saveButton.addEventListener('click', () => {
        chrome.storage.sync.set({
            incognitoBlock: incognitoBlockCheckbox.checked,
            showNotifications: showNotificationsCheckbox.checked
        }, () => {
            // Notify the user that the settings have been saved
            statusMessage.textContent = 'Settings saved!';
            setTimeout(() => {
                statusMessage.textContent = '';
            }, 2000);
        });
    });
});
