//
//
//
// If you are wondering how did I make the below object :cry: :cry: :cry:
//
//
//

// function onSubmit() {
// let timetable_text = document.getElementById("timetable-text").value;
// let slots_raw = [
// ...timetable_text.matchAll(
// /(?<=MON.*)([ABCDEFG][12]|T[A-Z][12]|T[A-Z][A-Z][12]|[LVWXYZ][1-9]|[LVWXYZ][1-9][0-9])([\s]|(-\w))/g
// ),
// ];
// let times = [
// ...timetable_text.matchAll(/(?<=Start.*)\s([0-9][0-9]:[0-9][0-9])/g),
// ];
// let classes = [
// ...timetable_text.matchAll(
// /(?<=THEORY.*)\s([A-Z]|[A-Z][A-Z]|[A-Z][A-Z][A-Z])([0-9]|[0-9][0-9])-([^-]+)-([^-]+)-([^-]+)-([^\s]+)/g
// ),
// ];

// let slots = {};
// let days = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

// for (let i = 0; i < slots_raw.length; i++) {
// if (!slots[slots_raw[i][1]]) {
// slots[slots_raw[i][1]] = [];
// }
// if (i % 23 < 11) {
// slots[slots_raw[i][1]].push(days[Math.floor(i / 23)]);
// slots[slots_raw[i][1]].push(times[i % 23][1]);
// slots[slots_raw[i][1]].push(times[12 + (i % 23)][1]);
// } else {
// slots[slots_raw[i][1]].push(days[Math.floor(i / 23)]);
// slots[slots_raw[i][1]].push(times[13 + (i % 23)][1]);
// slots[slots_raw[i][1]].push(times[25 + (i % 23)][1]);
// }
// }

// document.body.innerHTML = JSON.stringify(slots);
// }
const CLIENT_ID =
  "438957213547-tud19n08bcde2egqp5kmqhja993rbns0.apps.googleusercontent.com";
const API_KEY = "AIzaSyD-zKIh5e5gFVk5xlG5p4CcK8KS4rDTgtc";
const DISCOVERY_DOC =
  "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest";
const SCOPES = "https://www.googleapis.com/auth/calendar.events";
document.getElementById("submit-button").style.visibility = "hidden";

let tokenClient;
let gapiInited = false;
let gisInited = false;

let slot_timings = {
  A1: ["MON", "08:00", "08:50", "WED", "09:00", "09:50"],
  F1: ["MON", "09:00", "09:50", "WED", "10:00", "10:50"],
  D1: ["MON", "10:00", "10:50", "THU", "08:00", "08:50"],
  TB1: ["MON", "11:00", "11:50"],
  TG1: ["MON", "12:00", "12:50"],
  A2: ["MON", "14:00", "14:50", "WED", "15:00", "15:50"],
  F2: ["MON", "15:00", "15:50", "WED", "16:00", "16:50"],
  D2: ["MON", "16:00", "16:50", "THU", "14:00", "14:50"],
  TB2: ["MON", "17:00", "17:50"],
  TG2: ["MON", "18:00", "18:50"],
  V3: ["MON", "18:51", "19:00"],
  L1: ["MON", "08:00", "08:50"],
  L2: ["MON", "08:51", "09:40"],
  L3: ["MON", "09:51", "10:40"],
  L4: ["MON", "10:41", "11:30"],
  L5: ["MON", "11:40", "12:30"],
  L6: ["MON", "12:31", "13:20"],
  L31: ["MON", "14:00", "14:50"],
  L32: ["MON", "14:51", "15:40"],
  L33: ["MON", "15:51", "16:40"],
  L34: ["MON", "16:41", "17:30"],
  L35: ["MON", "17:40", "18:30"],
  L36: ["MON", "18:31", "19:20"],
  B1: ["TUE", "08:00", "08:50", "THU", "09:00", "09:50"],
  G1: ["TUE", "09:00", "09:50", "THU", "10:00", "10:50"],
  E1: ["TUE", "10:00", "10:50", "FRI", "08:00", "08:50"],
  TC1: ["TUE", "11:00", "11:50"],
  TAA1: ["TUE", "12:00", "12:50"],
  B2: ["TUE", "14:00", "14:50", "THU", "15:00", "15:50"],
  G2: ["TUE", "15:00", "15:50", "THU", "16:00", "16:50"],
  E2: ["TUE", "16:00", "16:50", "FRI", "14:00", "14:50"],
  TC2: ["TUE", "17:00", "17:50"],
  TAA2: ["TUE", "18:00", "18:50"],
  V4: ["TUE", "18:51", "19:00"],
  L7: ["TUE", "08:00", "08:50"],
  L8: ["TUE", "08:51", "09:40"],
  L9: ["TUE", "09:51", "10:40"],
  L10: ["TUE", "10:41", "11:30"],
  L11: ["TUE", "11:40", "12:30"],
  L12: ["TUE", "12:31", "13:20"],
  L37: ["TUE", "14:00", "14:50"],
  L38: ["TUE", "14:51", "15:40"],
  L39: ["TUE", "15:51", "16:40"],
  L40: ["TUE", "16:41", "17:30"],
  L41: ["TUE", "17:40", "18:30"],
  L42: ["TUE", "18:31", "19:20"],
  C1: ["WED", "08:00", "08:50", "FRI", "09:00", "09:50"],
  V1: ["WED", "11:00", "11:50"],
  V2: ["WED", "12:00", "12:50"],
  C2: ["WED", "14:00", "14:50", "FRI", "15:00", "15:50"],
  TD2: ["WED", "17:00", "17:50"],
  TBB2: ["WED", "18:00", "18:50"],
  V5: ["WED", "18:51", "19:00"],
  L13: ["WED", "08:00", "08:50"],
  L14: ["WED", "08:51", "09:40"],
  L15: ["WED", "09:51", "10:40"],
  L16: ["WED", "10:41", "11:30"],
  L17: ["WED", "11:40", "12:30"],
  L18: ["WED", "12:31", "13:20"],
  L43: ["WED", "14:00", "14:50"],
  L44: ["WED", "14:51", "15:40"],
  L45: ["WED", "15:51", "16:40"],
  L46: ["WED", "16:41", "17:30"],
  L47: ["WED", "17:40", "18:30"],
  L48: ["WED", "18:31", "19:20"],
  TE1: ["THU", "11:00", "11:50"],
  TCC1: ["THU", "12:00", "12:50"],
  TE2: ["THU", "17:00", "17:50"],
  TCC2: ["THU", "18:00", "18:50"],
  V6: ["THU", "18:51", "19:00"],
  L19: ["THU", "08:00", "08:50"],
  L20: ["THU", "08:51", "09:40"],
  L21: ["THU", "09:51", "10:40"],
  L22: ["THU", "10:41", "11:30"],
  L23: ["THU", "11:40", "12:30"],
  L24: ["THU", "12:31", "13:20"],
  L49: ["THU", "14:00", "14:50"],
  L50: ["THU", "14:51", "15:40"],
  L51: ["THU", "15:51", "16:40"],
  L52: ["THU", "16:41", "17:30"],
  L53: ["THU", "17:40", "18:30"],
  L54: ["THU", "18:31", "19:20"],
  TA1: ["FRI", "10:00", "10:50"],
  TF1: ["FRI", "11:00", "11:50"],
  TD1: ["FRI", "12:00", "12:50"],
  TA2: ["FRI", "16:00", "16:50"],
  TF2: ["FRI", "17:00", "17:50"],
  TDD2: ["FRI", "18:00", "18:50"],
  V7: ["FRI", "18:51", "19:00"],
  L25: ["FRI", "08:00", "08:50"],
  L26: ["FRI", "08:51", "09:40"],
  L27: ["FRI", "09:51", "10:40"],
  L28: ["FRI", "10:41", "11:30"],
  L29: ["FRI", "11:40", "12:30"],
  L30: ["FRI", "12:31", "13:20"],
  L55: ["FRI", "14:00", "14:50"],
  L56: ["FRI", "14:51", "15:40"],
  L57: ["FRI", "15:51", "16:40"],
  L58: ["FRI", "16:41", "17:30"],
  L59: ["FRI", "17:40", "18:30"],
  L60: ["FRI", "18:31", "19:20"],
  V8: ["SAT", "08:00", "08:50"],
  X11: ["SAT", "09:00", "09:50", "SUN", "11:00", "11:50"],
  X12: ["SAT", "10:00", "10:50", "SUN", "12:00", "12:50"],
  Y11: ["SAT", "11:00", "11:50", "SUN", "09:00", "09:50"],
  Y12: ["SAT", "12:00", "12:50", "SUN", "10:00", "10:50"],
  X21: ["SAT", "14:00", "14:50", "SUN", "16:00", "16:50"],
  Z21: ["SAT", "15:00", "15:50", "SUN", "15:00", "15:50"],
  Y21: ["SAT", "16:00", "16:50", "SUN", "14:00", "14:50"],
  W21: ["SAT", "17:00", "17:50", "SUN", "17:00", "17:50"],
  W22: ["SAT", "18:00", "18:50", "SUN", "18:00", "18:50"],
  V9: ["SAT", "18:51", "19:00"],
  L71: ["SAT", "08:00", "08:50"],
  L72: ["SAT", "08:51", "09:40"],
  L73: ["SAT", "09:51", "10:40"],
  L74: ["SAT", "10:41", "11:30"],
  L75: ["SAT", "11:40", "12:30"],
  L76: ["SAT", "12:31", "13:20"],
  L77: ["SAT", "14:00", "14:50"],
  L78: ["SAT", "14:51", "15:40"],
  L79: ["SAT", "15:51", "16:40"],
  L80: ["SAT", "16:41", "17:30"],
  L81: ["SAT", "17:40", "18:30"],
  L82: ["SAT", "18:31", "19:20"],
  V10: ["SUN", "08:00", "08:50"],
  V11: ["SUN", "18:51", "19:00"],
  L83: ["SUN", "08:00", "08:50"],
  L84: ["SUN", "08:51", "09:40"],
  L85: ["SUN", "09:51", "10:40"],
  L86: ["SUN", "10:41", "11:30"],
  L87: ["SUN", "11:40", "12:30"],
  L88: ["SUN", "12:31", "13:20"],
  L89: ["SUN", "14:00", "14:50"],
  L90: ["SUN", "14:51", "15:40"],
  L91: ["SUN", "15:51", "16:40"],
  L92: ["SUN", "16:41", "17:30"],
  L93: ["SUN", "17:40", "18:30"],
  L94: ["SUN", "18:31", "19:20"],
};

random_dates_for_days = {
  MON: "June 20, 2022",
  TUE: "June 21, 2022",
  WED: "June 22, 2022",
  THU: "June 23, 2022",
  FRI: "June 24, 2022",
  SAT: "June 25, 2022",
  SUN: "June 26, 2022",
};
function gapiLoaded() {
  gapi.load("client", intializeGapiClient);
}

async function intializeGapiClient() {
  await gapi.client.init({
    apiKey: API_KEY,
    discoveryDocs: [DISCOVERY_DOC],
  });
  gapiInited = true;
  maybeEnableButtons();
}

function gisLoaded() {
  tokenClient = google.accounts.oauth2.initTokenClient({
    client_id: CLIENT_ID,
    scope: SCOPES,
    callback: "", // defined later
  });
  gisInited = true;
  maybeEnableButtons();
}

function maybeEnableButtons() {
  if (gapiInited && gisInited) {
    document.getElementById("submit-button").style.visibility = "visible";
  }
}

async function SignIn() {
  tokenClient.callback = async (resp) => {
    if (resp.error !== undefined) {
      throw resp;
    }
  };

  if (gapi.client.getToken() === null) {
    tokenClient.requestAccessToken({ prompt: "consent" });
  } else {
    tokenClient.requestAccessToken({ prompt: "" });
  }
}

async function onSubmit() {
  tokenClient.callback = async (resp) => {
    if (resp.error !== undefined) {
      throw resp;
    }
    let calendarId = document.getElementById("timetable-id").value;
    let timetable_text = document.getElementById("timetable-text").value;
    let lectures = [
      ...timetable_text.matchAll(
        /(?<=THEORY.*)\s([A-Z]|[A-Z][A-Z]|[A-Z][A-Z][A-Z])([0-9]|[0-9][0-9])-([^-]+)-([^-]+)-([^-]+)-([^\s]+)/g
      ),
    ];
    let events = [];
    lectures.forEach((lecture) => {
      let slot = lecture[1] + lecture[2];
      let room = lecture[5];
      let course_code = lecture[3];
      // console.log(
      // slot,
      // room,
      // course_code,
      // `${slot_timings[slot][0]} from ${slot_timings[slot][1]} to ${slot_timings[slot][2]}`
      // );
      start_date = new Date(
        random_dates_for_days[slot_timings[slot][0]] +
          " " +
          slot_timings[slot][1] +
          ":00 gmt+0530"
      );
      end_date = new Date(
        random_dates_for_days[slot_timings[slot][0]] +
          " " +
          slot_timings[slot][1] +
          ":00 gmt+0530"
      );
      // console.log(
      // random_dates_for_days[slot_timings[slot][0]] +
      // " " +
      // slot_timings[slot][2] +
      // ":00 gmt+0530",
      // start_date
      // );
      console.log(start_date);
      var event = {
        summary: room + " " + course_code + " " + slot,
        start: {
          dateTime: start_date.toISOString(),
          timeZone: "Asia/Kolkata",
        },
        end: {
          dateTime: end_date.toISOString(),
          timeZone: "Asia/Kolkata",
        },
        recurrence: ["RRULE:FREQ=WEEKLY"],
        reminders: {
          useDefault: false,
          overrides: [
            { method: "popup", minutes: 5 },
            { method: "popup", minutes: 15 },
          ],
        },
      };

      events.push(event);
      slot_timings[slot] = slot_timings[slot].slice(3);
    });
    const batch = gapi.client.newBatch();
    events.map((r, j) => {
      batch.add(
        gapi.client.calendar.events.insert({
          calendarId,
          resource: events[j],
        })
      );
    });
    batch.then(function () {
      console.log("all jobs now dynamically done!!!");
    });
  };

  if (gapi.client.getToken() === null) {
    tokenClient.requestAccessToken({ prompt: "consent" });
  } else {
    tokenClient.requestAccessToken({ prompt: "" });
  }
}

document.getElementById("submit-button").onclick = onSubmit;
