// Google Calendar Integration for KO Savant booking form
// This script handles adding calendar events when bookings are submitted

// Google API Credentials
const CLIENT_ID = '903943216552-2h4ctheg26f1ik72to2ecqo2qg3ii4rp.apps.googleusercontent.com';
const API_KEY = 'AIzaSyArpuRsCUnhkTXcsppGuwGvVfX7WV3CuRg';

// Discovery docs and scopes for Google Calendar API
const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest';
const SCOPES = 'https://www.googleapis.com/auth/calendar.events';

let tokenClient;
let gapiInited = false;
let gisInited = false;

/**
 * Initialize the Google API client
 */
function initializeGoogleAPI() {
  // Load the Google API client library
  gapi.load('client', initializeGapiClient);
}

/**
 * Initialize the GAPI client
 */
async function initializeGapiClient() {
  await gapi.client.init({
    apiKey: API_KEY,
    discoveryDocs: [DISCOVERY_DOC],
  });
  gapiInited = true;
  maybeEnableButtons();
}

/**
 * Initialize the Google Identity Services client
 */
function initializeGoogleIdentityServices() {
  tokenClient = google.accounts.oauth2.initTokenClient({
    client_id: CLIENT_ID,
    scope: SCOPES,
    callback: '', // defined later
  });
  gisInited = true;
  maybeEnableButtons();
}

/**
 * Enable buttons once APIs are initialized
 */
function maybeEnableButtons() {
  // Both APIs initialized - booking form is ready to use calendar integration
  if (gapiInited && gisInited) {
    console.log('Google Calendar API initialized successfully');
  }
}

/**
 * Get authorization to access Google Calendar
 */
function getAuthorizationForCalendar(callback) {
  tokenClient.callback = async (resp) => {
    if (resp.error !== undefined) {
      throw resp;
    }
    callback();
  };

  if (gapi.client.getToken() === null) {
    // Prompt the user to select a Google Account and ask for consent
    tokenClient.requestAccessToken({prompt: 'consent'});
  } else {
    // Skip display of account chooser and consent dialog for an existing session
    tokenClient.requestAccessToken({prompt: ''});
  }
}

/**
 * Add an event to Google Calendar
 * @param {Object} bookingData - The booking data from the form
 */
function addEventToCalendar(bookingData) {
  // First, ensure we have authorization
  getAuthorizationForCalendar(() => {
    createCalendarEvent(bookingData);
  });
}

/**
 * Create a calendar event with the booking data
 * @param {Object} bookingData - The booking data from the form
 */
async function createCalendarEvent(bookingData) {
  try {
    // Format date and time for Google Calendar
    const dateTimeString = `${bookingData.date}T${bookingData.time}:00`;
    const endTime = new Date(new Date(`${dateTimeString}`).getTime() + 60 * 60 * 1000); // Add 1 hour
    const endTimeString = endTime.toISOString();

    // Create the event details
    const event = {
      'summary': `Consultation with ${bookingData.name}`,
      'description': `Service: ${bookingData.service}\nMessage: ${bookingData.message}\nContact: ${bookingData.email}`,
      'start': {
        'dateTime': dateTimeString,
        'timeZone': 'America/Los_Angeles'
      },
      'end': {
        'dateTime': endTimeString,
        'timeZone': 'America/Los_Angeles'
      },
      'attendees': [
        {'email': bookingData.email},
        {'email': 'contact@kosavant.com'}
      ],
      'reminders': {
        'useDefault': false,
        'overrides': [
          {'method': 'email', 'minutes': 24 * 60},
          {'method': 'popup', 'minutes': 30}
        ]
      }
    };

    // Add the event to the calendar
    const request = gapi.client.calendar.events.insert({
      'calendarId': 'primary',
      'resource': event,
      'sendUpdates': 'all'
    });

    request.execute(function(event) {
      console.log('Event created: ' + event.htmlLink);
      // Show success message to user
      showCalendarSuccess(event.htmlLink);
    });
  } catch (error) {
    console.error('Error creating calendar event:', error);
    // Show error message
    showCalendarError();
  }
}

/**
 * Show success message after calendar event is created
 * @param {string} eventLink - Link to the created event
 */
function showCalendarSuccess(eventLink) {
  const formSuccess = document.getElementById('form-success');
  const bookingForm = document.getElementById('booking-form');
  
  if (formSuccess) {
    // Update success message to include calendar link
    const message = formSuccess.querySelector('p');
    if (message) {
      message.innerHTML = `
        Your consultation has been booked successfully! We've added this appointment to our calendar.<br>
        <a href="${eventLink}" target="_blank" class="calendar-link">View in Google Calendar</a>
      `;
    }
    
    formSuccess.classList.remove('hidden');
    
    if (bookingForm) {
      bookingForm.classList.add('hidden');
    }
  }
}

/**
 * Show error message if calendar event creation fails
 */
function showCalendarError() {
  alert('There was an error adding this event to the calendar. Please try again or contact us directly.');
  
  // Enable submit button again
  const submitBtn = document.querySelector('.submit-btn');
  if (submitBtn) {
    submitBtn.disabled = false;
    submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Submit Request';
  }
}

// Export functions for use in main script
window.calendarIntegration = {
  addEventToCalendar
};

// Initialize APIs when the window loads
window.onload = function() {
  // Check if Google API is available
  if (typeof gapi !== 'undefined') {
    initializeGoogleAPI();
  } else {
    console.error('Google API not loaded');
  }
  
  // Check if Google Identity Services is available
  if (typeof google !== 'undefined' && typeof google.accounts !== 'undefined') {
    initializeGoogleIdentityServices();
  } else {
    console.error('Google Identity Services not loaded');
  }
};
