/* ============================================
   Task Jar — app logic
   Vanilla JS, no frameworks. Data saved per day
   in localStorage so each day starts fresh.
   ============================================ */

(() => {
  "use strict";

  // ---------- message banks ----------

  const COMPLETION_MUTUAL = [
    "Well done cutie 🙌💖 you're unstoppable!",
    "Look at you go bestie 💫 task = demolished",
    "Ding ding ding 🔔 another one bites the dust!",
    "Certified task-slayer 🏆 keep glowing",
    "POV: you just ate that task up 🍽️✨",
    "Chef's kiss 👌🍰 nailed it completely",
    "10/10, no notes. proud of you cutie💖 ",
    "Shabaash! 🙌 ek aur kaam khatam",
    "Wah wah wah 👏 kya baat hai!",
    "You ate. you left no crumbs. 🍽️👑",
    "The discipline is showing bestie 🔥📈",
    "Done aur dusted, mashallah 🤍",
    "Yeh hui na baat! kamaal kar diya 🎯",
    "Little by little, look how far you've come 🌱💫",
    "Achievement unlocked: certified doer 🕹️🏅",
    "You're built different, fr fr 💯",
    "That task never stood a chance 😤✅",
    "Tick, done, next — you're a machine 🤖💖",
    "Grandma proud, mom proud, WE proud 🥹💗",
    "Full marks for effort AND execution 📝💯",
    "This is the productivity arc we love to see 📈🎬",
    "Ek tick, ek smile — perfect combo 😊✔️",
    "You just flexed on procrastination 💪😂",
    "That's a wrap on this one, superstar 🌟",
    "Absolutely ate this task for breakfast 🥞😤",
    "Zabardast! next task better watch out 👀",
    "You + consistency = unstoppable duo 🔥🤝",
    "Task successfully bullied into submission 😂✅",
    "You said 'let's get it' and got it 🙌",
    "This deserves a chai break, seriously ☕🎉",
    "Bestie really just adulted so well today 👏🏡",
    "Certified overachiever moment 🏆😌",
    "One more W added to your collection 🏅",
    "That was smooth, like actually impressive 😮‍💨✨",
    "Task: 0, You: 1. Scoreboard updated 📊",
    "Kaam khatam, khushi shuru 🥳🤍",
    "You really said 'not today procrastination' 😌🚫",
    "Here's a chocolate for you cutie 🍫 you earned it",
    "Here's a candy for you 🍬 sweet as this win",
    "More power to youuu 💪✨ keep that energy up"
  ];

  const COMPLETION_MALE = [
    "That's my bro 🤙 keep it up!",
    "W bro, absolute machine 💪",
    "Bro really said 'watch me' and did it 😤",
    "Legend behavior, bro 🏆",
    "Respect bro, that's how it's done 🔥",
    "My guy really ate that task up 🍽️😤",
    "Bro's on a mission, unstoppable 🚀",
    "That's the bro energy we love 💯",
    "Big brain, big execution bro 🧠🔥",
    "You handled that like a real one, bro 🤝",
    "Bro just flexed on procrastination 😂💪",
    "King behavior fr, keep going king 👑",
    "That's what I call bro discipline 📈",
    "Bro said 'no cap' and delivered 🧢",
    "Absolute unit, that's my bro 💪🏆"
  ];

  const COMPLETION_FEMALE = [
    "Slayyy queen 👑 so proud of youuu!",
    "That's my girl 😌💅 flawless execution",
    "Queen behavior only, as always 💅✨",
    "Certified queen move 👑🔥",
    "Main character energy fr, queen 🎬💖",
    "That's a queen move if I've ever seen one 👑",
    "Chef's kiss queen 👌🍰",
    "Queen really said 'watch me' and did it 😏✨",
    "Little queen, big wins today 👑🌸",
    "That's the queen discipline we love 📈👑",
    "Queen said 'no cap' and delivered 🧢👑",
    "Absolute queen behavior, no notes 👑💯",
    "That's my queen, flawless as always 💅👑",
    "Queen energy unmatched today 👑✨",
    "Vibes: immaculate. Task: complete, queen. 🌸✔️"
  ];

  function getCompletionPool(gender) {
    if (gender === "male") return COMPLETION_MALE.concat(COMPLETION_MUTUAL);
    if (gender === "female") return COMPLETION_FEMALE.concat(COMPLETION_MUTUAL);
    return COMPLETION_MUTUAL;
  }

  const KEEP_GOING_MESSAGES = [
    "You've got this bestie, don't stop now 💪🌸",
    "Baby steps count too, keep it up! 🐾✨",
    "One down, more to gooo — let's gooo! 🚀",
    "Chai break earned, now back to it ☕📝",
    "You're on a roll, don't jinx it 😉🔥",
    "Small wins stack up, promise 🌱💗",
    "Halfway isn't nothing, keep pushing 💫",
    "Thoda aur, tum kar sakti ho 🤍",
    "Momentum loading... don't lose it now ⏳✨",
    "Every tick is a tiny victory lap 🏃‍♀️🎉",
    "You're doing better than you think, fr 💖",
    "Slow progress is still progress bestie 🐢💗",
    "Focus mode: activated. keep goingggg 🎯",
    "You started, that's already half the battle 🌟",
    "Kaam pura hone tak ruknay ka nahi 😤",
    "One tick at a time, no rush 🕊️",
    "You + this list = unfinished business 😌📋",
    "Not gonna lie, you're kinda killing it 💅",
    "Keep that streak alive, cutie 🔥📆",
    "Deep breath, next tick, let's gooo 🌬️✅",
    "This is the effort montage, keep it rolling 🎬💪",
    "Bas thoda focus aur, ho jayega 🤲",
    "You're not tired, you're just warming up 😤🔥",
    "Every box ticked = future you thanking you 🙏💫",
    "Persistence looks good on you 😌✨",
    "Little wins today, big flex tomorrow 🌱🏆",
    "You said you'd do it, so DO it bestie 💗",
    "Onward and upward, no stopping now ⬆️🚀",
    "You're the main character, act like it 🎬💁‍♀️",
    "Progress bar loading... don't close the tab 📊",
    "Kaam pending hai but himmat bhi hai 💪",
    "Grit looks great on you today 🔥💗",
    "Not done yet means more W's coming 🏅",
    "Chalo chalo, next task is calling 📣",
    "Keep that focus, ignore the distractions 🎯🙈",
    "You're closer than you were five minutes ago 💫",
    "Steady hands, steady heart, keep ticking ✋💗",
    "This grind will be worth it, promise 🌸🔥",
    "Don't stop till the jar's full, bestie 🫙✨",
    "You've survived worse than a to-do list 😌💪"
  ];

  const ALMOST_THERE_MESSAGES = [
    "Just ONE more, you're SO close 😩✨",
    "Last one standing, finish strong 💥",
    "Home stretch bestie, don't give up now 🏁",
    "So close I can taste the victory 🍰",
    "One tiny push left, you've basically won 🎯",
    "Ek aur bacha hai, bas khatam karo 🤲",
    "Final boss task, you got this 🎮👑",
    "This is it, the last hurdle 🏃‍♀️🔥",
    "So close, don't blink now 👀✨",
    "One tick away from total victory 🏆",
    "The finish line is RIGHT there 🎯🏁",
    "Last one, make it count cutie 💗",
    "You can already smell the success 🌸😤",
    "Bas ek aur, phir full rest 😌🛋️",
    "This is your victory lap, almost there 🏃‍♀️🎉",
    "One more tick and it's officially a W day 🏅",
    "So close bestie, don't slow down now 🚀",
    "This last one doesn't stand a chance 😤✅",
    "Final stretch, give it everything 💪🔥",
    "You're literally one tick from iconic 💫",
    "Almost fully slayed the day, keep going 👑",
    "One left, zero excuses 😌📋",
    "This is the last dragon to slay 🐉⚔️",
    "So near, don't you dare stop now 😤💗",
    "Ek last push, phir chai aur rest ☕🌙",
    "Nearly a perfect day, finish it off 🌟",
    "The jar's almost full, one more to go 🫙✨",
    "Last box, biggest flex incoming 💅🏆",
    "You're basically done, just seal the deal 🖋️✅",
    "One more and today is a certified win 🏅💗",
    "So close, your future self is cheering 🙌",
    "Almost there, don't let it slip now 🎯",
    "Last one, then it's celebration time 🎉🌙",
    "One tick from a full-clear day, go go go 🚀",
    "This is the encore, finish with a bang 🎆",
    "Nearly perfect, keep that energy up 🔥💫",
    "Just this one left standing, take it down 😤",
    "Final answer, final task, you got this 📝✅",
    "One more tick and it's nap-earned status 😌🛌",
    "So close to a spotless jar, keep pushing 💪 "
  ];

  const GIGGLE_LINES = [
    "Bhayyaaaa !!! Vastegunehuiyennnn 😭😭",
    "You after every 5 minutes: Mein to thakk gyi... Mein to phir se thakk gyi 😂",
    "Error 404: motivation not found... jk here's a giggle instead 😂",
    "Task list loading... buffering... buffering... okay you got this 🎉",
    "You vs the task list: currently winning, don't stop 🥷",
    "Plot twist: you're actually productive today 😳🎬",
    "Brb, telling my future self how iconic today was 💁‍♀️",
    "Narrator voice: and she did NOT give up. 🎙️✨",
    "This is your sign to drink water and finish that task 💧😌",
    "Breaking news: local cutie about to finish her to-do list 📰💅",
    "Meri maa kehti thi kaam khatam karo, warna chai nahi milegi ☕😤",
    "Aunty next door is definitely judging your to-do list rn 👀💀",
    "You: 'ek minute mein karti hun' — that was 3 hours ago 🙃",
    "Sun rahi ho? task pending hai abhi bhi wahi ka wahi 👻",
    "Breaking: scientists confirm chai fixes 90% of procrastination ☕🔬",
    "Task said 'catch me if you can' — you just did 🏃‍♀️💨",
    "This app has more faith in you than your WiFi does 📶😭",
    "Me checking the jar every 5 mins like it's Instagram😭",
    "Warning: excessive productivity may cause smugness 😌⚠️",
    "Your bed is calling but the jar said not yet bestie 🛏️🚫",
    "POV: you opened this app to procrastinate the task itself 😂💀",
    "Kaam kum, bahane zyada — chalo ab dono thoda kum karte hain 😅",
    "This message brought to you by pure emotional support 🫶📣",
    "Fun fact: ticking boxes releases tiny confetti in your brain 🎊🧠",
    "You + deadline = a love-hate situationship 💔⏰",
    "Somewhere a group project member is watching and taking notes 👀📓",
    "Bestie really opened a task app instead of Instagram, respect 🫡",
    "One does not simply skip the jar. one ticks the jar. 🫙⚔️",
    "Legend has it procrastination fears this exact app 😤📲",
    "Achievement unlocked: touched grass AND finished a task today 🌱✅",
    "Task jar > every other app on your phone rn, no cap 📵💯",
    "Kaam kar rahi ho ya sirf app khol k baithi ho? 👀😂",
    "Sarcasm loading... 3...2...1... ab kaam kar lo 🙃",
    "Aur batao, kitni baar 'abhi karti hun' bola aaj? 😭",
    "Wah, itni der se dekh rahi ho jaise task khud ho jayega 😌",
    "Deadline: 'main aa rahi hun.' You: still scrolling 📱😂",
    "Tumhara WiFi se zyada consistent to yeh procrastination hai 😤",
    "Chalo chalo, drama kam kaam zyada 🎬🚫",
    "Yeh app tumhe pyar se daant rahi hai, sun lo 👀😌",
    "Kaam nahi hua to jar ne bhi tumhe ghoor k dekha 👀",
    "You said 'weekend pe karungi' — sir, aaj weekend hai 🙃",
    "Itna sochna band karo, seedha tick maro ✅😤",
    "Bas ek aur reel dekh lo, phir wahi excuse chalega na? 😂",
    "Mashallah itni himmat hai, to task bhi kar lo na 🥲",
    "Procrastination ka PhD ho gaya tumhara, ab practical bhi karlo 🎓😹",
    "Yeh jar tumse zyada punctual hai, seekh lo kuch 🙃",
    "POV: you're rizzing up your own to-do list to get it done 💀✨",
    "This is not a drill, bestie. this is literally just a checkbox 😂",
    "You have the main character delusion AND the productivity, iconic 🎬💅",
    "Bestie really said 'let him cook' about their own task list 🍳😹",
    "Ok but why does ticking a box feel like winning the lottery 🎰😂"
  ];

  const DUAS = [
    "May Allah put barakah in all your efforts today. 🤍🌙",
    "Alhamdulillah for another day of hard work — may it all be accepted. ✨🤲",
    "May Allah make your tomorrow even easier than today. 🌸",
    "Ya Allah, bless every step taken today with khair. 🕊️",
    "May your hard work today turn into ease tomorrow, In Sha Allah. 🤍",
    "May Allah reward the tired hands and the quiet effort no one saw. 🤲🌙",
    "May today's hard work become tomorrow's relief, Ameen. ✨"
  ];

  // ---------- helpers ----------

  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
  const todayKey = () => {
    const d = new Date();
    return `taskjar-${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  };
  const uid = () => Math.random().toString(36).slice(2, 10);

  // ---------- state ----------

  let tasks = [];
  const STORAGE_KEY = todayKey();
  const TODAY_STR = STORAGE_KEY.replace("taskjar-", "");
  const PROFILE_KEY = "taskjar-profile"; // persists across days, unlike task data
  const DECISION_KEY = `taskjar-decision-${TODAY_STR}`; // "continue" | "new" — asked once per day
  const DAY_KEY_REGEX = /^taskjar-(\d{4}-\d{2}-\d{2})$/;

  function loadProfile() {
    try {
      const raw = localStorage.getItem(PROFILE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  }

  function saveProfile(profile) {
    try {
      localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
    } catch (e) {
      /* storage unavailable — app still works for this session */
    }
  }

  function loadTasks() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      tasks = raw ? JSON.parse(raw) : [];
    } catch (e) {
      tasks = [];
    }
  }

  function saveTasks() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (e) {
      /* storage unavailable — app still works for this session */
    }
  }

  function allTasksComplete() {
    if (tasks.length === 0) return false;
    return tasks.every((t) => t.parts.every((p) => p.done));
  }

  const isTaskComplete = (t) => t.parts.every((p) => p.done);

  // ---------- DOM refs ----------

  const $ = (id) => document.getElementById(id);

  const eyebrowNoteEl = $("eyebrowNote");
  const todayDateEl = $("todayDate");
  const greetingLineEl = $("greetingLine");
  const progressFillEl = $("progressFill");
  const progressLabelEl = $("progressLabel");

  const taskTitleInput = $("taskTitleInput");
  const partsListEl = $("partsList");
  const addPartBtn = $("addPartBtn");
  const addTaskBtn = $("addTaskBtn");

  const taskBoardEl = $("taskBoard");
  const emptyStateEl = $("emptyState");

  const popupOverlay = $("popupOverlay");
  const popupEmoji = $("popupEmoji");
  const popupText = $("popupText");
  const popupClose = $("popupClose");

  const giggleBtn = $("giggleBtn");
  const giggleOverlay = $("giggleOverlay");
  const giggleText = $("giggleText");
  const giggleClose = $("giggleClose");
  const resetAllBtn = $("resetAllBtn");

  const duaOverlay = $("duaOverlay");
  const duaText = $("duaText");
  const duaClose = $("duaClose");

  const doneCheckOverlay = $("doneCheckOverlay");
  const doneCheckYesBtn = $("doneCheckYesBtn");
  const doneCheckNoBtn = $("doneCheckNoBtn");

  const carryOverlay = $("carryOverlay");
  const carryText = $("carryText");
  const carryContinueBtn = $("carryContinueBtn");
  const carryFreshBtn = $("carryFreshBtn");

  const onboardOverlay = $("onboardOverlay");
  const onboardStep1 = $("onboardStep1");
  const onboardStep2 = $("onboardStep2");
  const genderMaleBtn = $("genderMaleBtn");
  const genderFemaleBtn = $("genderFemaleBtn");
  const onboardGreeting = $("onboardGreeting");
  const onboardNameInput = $("onboardNameInput");
  const onboardSubmitBtn = $("onboardSubmitBtn");

  let pendingDua = false;
  let selectedGender = null;
  let carryCandidates = []; // earlier days that still have unfinished tasks

  // "Handsome" picks the cutie greeting, "Pretty" picks the gorgeous greeting —
  // swap the two strings below if you'd rather have it the other way round.
  const GREETING_BY_GENDER = {
    male: "Hi cutie, what's your name?",
    female: "Hi gorgeous ❤️, what's your name?"
  };
  const HEADER_GREETING_BY_GENDER = {
    male: (name) => `hi cutie, ${name} 🫰`,
    female: (name) => `hi gorgeous, ${name} ❤️`
  };

  // ---------- header date ----------

  function renderDate() {
    const d = new Date();
    todayDateEl.textContent = d.toLocaleDateString(undefined, {
      weekday: "long",
      month: "long",
      day: "numeric"
    });
  }

  function renderEyebrow() {
    let decision = null;
    try {
      decision = localStorage.getItem(DECISION_KEY);
    } catch (e) {
      /* storage unavailable */
    }
    eyebrowNoteEl.textContent =
      decision === "continue" ? "— continuing your previous tasks —" : "— today's page —";
  }

  // ---------- new-day carry-over ----------

  function parseDayString(str) {
    const [y, m, d] = str.split("-").map(Number);
    return new Date(y, m - 1, d);
  }

  function friendlyDayLabel(str) {
    const then = parseDayString(str);
    const now = new Date();
    const startToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const diffDays = Math.round((startToday - then) / 86400000);
    if (diffDays === 1) return "yesterday";
    return then.toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" });
  }

  // finds earlier days (not today) that still have unfinished tasks
  // and haven't already been dealt with via this popup
  function findCarryCandidates() {
    const found = [];
    try {
      Object.keys(localStorage).forEach((key) => {
        const match = key.match(DAY_KEY_REGEX);
        if (!match) return;
        const dateStr = match[1];
        if (dateStr >= TODAY_STR) return; // only days before today
        if (localStorage.getItem(`taskjar-handled-${dateStr}`)) return;
        let dayTasks;
        try {
          dayTasks = JSON.parse(localStorage.getItem(key)) || [];
        } catch (e) {
          return;
        }
        const unfinished = dayTasks.filter((t) => !isTaskComplete(t));
        if (unfinished.length > 0) {
          found.push({ dateStr, key, unfinished });
        }
      });
    } catch (e) {
      return [];
    }
    found.sort((a, b) => (a.dateStr < b.dateStr ? 1 : -1)); // latest first
    return found;
  }

  function maybeAskAboutPreviousDay() {
    let alreadyDecided = null;
    try {
      alreadyDecided = localStorage.getItem(DECISION_KEY);
    } catch (e) {
      /* storage unavailable */
    }
    if (alreadyDecided) return;

    carryCandidates = findCarryCandidates();
    if (carryCandidates.length === 0) return;

    const latest = carryCandidates[0];
    const n = latest.unfinished.length;
    const when = friendlyDayLabel(latest.dateStr);
    carryText.innerHTML =
      `new day, new page ✨<br>you still have ${n} unfinished task${n > 1 ? "s" : ""} from ${when}. ` +
      `want to continue ${n > 1 ? "those" : "that one"} or start fresh today?`;
    carryOverlay.classList.remove("hidden");
  }

  function finishCarryChoice(choice) {
    if (choice === "continue") {
      const latest = carryCandidates[0];
      // bring the unfinished tasks (with their ticked parts) into today
      tasks = latest.unfinished.concat(tasks);
      saveTasks();
    }
    try {
      localStorage.setItem(DECISION_KEY, choice);
      // mark earlier days as handled so we don't ask about them again tomorrow
      carryCandidates.forEach((c) => localStorage.setItem(`taskjar-handled-${c.dateStr}`, "1"));
    } catch (e) {
      /* storage unavailable */
    }
    carryCandidates = [];
    carryOverlay.classList.add("hidden");
    renderEyebrow();
    renderBoard();
  }

  carryContinueBtn.addEventListener("click", () => finishCarryChoice("continue"));
  carryFreshBtn.addEventListener("click", () => finishCarryChoice("new"));

  // if the tab stays open past midnight, refresh when the user comes back
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible" && todayKey() !== STORAGE_KEY) {
      location.reload();
    }
  });

  // ---------- add-task form: dynamic part rows ----------

  function addPartRow(value = "") {
    const row = document.createElement("div");
    row.className = "part-row";

    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "a part of this task...";
    input.maxLength = 60;
    input.value = value;

    const removeBtn = document.createElement("button");
    removeBtn.type = "button";
    removeBtn.className = "remove-part-btn";
    removeBtn.textContent = "×";
    removeBtn.setAttribute("aria-label", "remove this part");
    removeBtn.addEventListener("click", () => row.remove());

    row.appendChild(input);
    row.appendChild(removeBtn);
    partsListEl.appendChild(row);
    return input;
  }

  addPartBtn.addEventListener("click", () => {
    addPartRow().focus();
  });

  function resetAddForm() {
    taskTitleInput.value = "";
    partsListEl.innerHTML = "";
  }

  function collectPartTexts() {
    return Array.from(partsListEl.querySelectorAll("input[type='text']"))
      .map((i) => i.value.trim())
      .filter(Boolean);
  }

  addTaskBtn.addEventListener("click", () => {
    const title = taskTitleInput.value.trim();
    if (!title) {
      taskTitleInput.focus();
      return;
    }

    let partTexts = collectPartTexts();
    if (partTexts.length === 0) {
      // no parts entered — the task itself is the single part
      partTexts = [title];
    }

    const task = {
      id: uid(),
      title,
      parts: partTexts.map((text) => ({ id: uid(), text, done: false }))
    };

    tasks.push(task);
    saveTasks();
    resetAddForm();
    renderBoard();
    taskTitleInput.focus();
  });

  taskTitleInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTaskBtn.click();
    }
  });

  // ---------- board rendering ----------

  function renderBoard() {
    taskBoardEl.innerHTML = "";

    if (tasks.length === 0) {
      emptyStateEl.classList.add("visible");
    } else {
      emptyStateEl.classList.remove("visible");
    }

    tasks.forEach((task) => {
      taskBoardEl.appendChild(buildTaskCard(task));
    });

    renderProgress();
  }

  function buildTaskCard(task) {
    const doneCount = task.parts.filter((p) => p.done).length;
    const total = task.parts.length;
    const isComplete = doneCount === total;

    const card = document.createElement("article");
    card.className = "task-card" + (isComplete ? " completed" : "");
    card.dataset.taskId = task.id;

    const head = document.createElement("div");
    head.className = "task-head";

    const titleEl = document.createElement("h3");
    titleEl.className = "task-title";
    titleEl.textContent = task.title;

    const rightWrap = document.createElement("div");
    rightWrap.style.display = "flex";
    rightWrap.style.alignItems = "center";
    rightWrap.style.gap = "6px";

    const fraction = document.createElement("span");
    fraction.className = "task-fraction";
    fraction.textContent = `${doneCount}/${total}`;

    const delBtn = document.createElement("button");
    delBtn.className = "delete-task-btn";
    delBtn.textContent = "✕";
    delBtn.setAttribute("aria-label", `delete task: ${task.title}`);
    delBtn.addEventListener("click", () => {
      tasks = tasks.filter((t) => t.id !== task.id);
      saveTasks();
      renderBoard();
    });

    rightWrap.appendChild(fraction);
    rightWrap.appendChild(delBtn);
    head.appendChild(titleEl);
    head.appendChild(rightWrap);
    card.appendChild(head);

    // only show individual part rows when there's more than one part,
    // or the single part's text differs from the task title
    const showParts = total > 1 || task.parts[0].text !== task.title;

    if (showParts) {
      task.parts.forEach((part) => {
        card.appendChild(buildPartRow(task, part));
      });
    } else {
      // single-part task: the checkbox IS the task row
      card.appendChild(buildPartRow(task, task.parts[0], true));
    }

    return card;
  }

  function buildPartRow(task, part, isMainRow = false) {
    const row = document.createElement("label");
    row.className = "part-item" + (part.done ? " part-done" : "") + (isMainRow ? " part-main" : "");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = part.done;
    checkbox.addEventListener("change", () => onPartToggle(task.id, part.id));

    const text = document.createElement("span");
    text.className = "part-text";
    text.textContent = isMainRow ? "mark as done" : part.text;

    row.appendChild(checkbox);
    row.appendChild(text);
    return row;
  }

  function renderProgress() {
    let doneCount = 0;
    let total = 0;
    tasks.forEach((t) => {
      total += t.parts.length;
      doneCount += t.parts.filter((p) => p.done).length;
    });

    const pct = total === 0 ? 0 : Math.round((doneCount / total) * 100);
    progressFillEl.style.width = `${pct}%`;
    progressLabelEl.textContent = `${doneCount} / ${total} done`;
  }

  // ---------- toggle logic + popups ----------

  function onPartToggle(taskId, partId) {
    const wasAllComplete = allTasksComplete();

    const task = tasks.find((t) => t.id === taskId);
    if (!task) return;
    const part = task.parts.find((p) => p.id === partId);
    if (!part) return;

    part.done = !part.done;
    saveTasks();

    const doneCount = task.parts.filter((p) => p.done).length;
    const total = task.parts.length;

    renderBoard();

    if (!part.done) {
      // unticking — no celebration, just re-render (already done above)
      return;
    }

    const nowAllComplete = allTasksComplete();
    pendingDua = !wasAllComplete && nowAllComplete;

    if (doneCount === total) {
      const profile = loadProfile();
      showPopup("🫰", pick(getCompletionPool(profile ? profile.gender : null)));
    } else {
      const remaining = total - doneCount;
      if (remaining > 1) {
        showPopup("🌸", pick(KEEP_GOING_MESSAGES));
      } else {
        showPopup("💥", pick(ALMOST_THERE_MESSAGES));
      }
    }
  }

  function showPopup(emoji, text) {
    popupEmoji.textContent = emoji;
    popupText.textContent = text;
    popupOverlay.classList.remove("hidden");
  }

  popupClose.addEventListener("click", () => {
    popupOverlay.classList.add("hidden");
    if (pendingDua) {
      pendingDua = false;
      doneCheckOverlay.classList.remove("hidden");
    }
  });

  doneCheckYesBtn.addEventListener("click", () => {
    doneCheckOverlay.classList.add("hidden");
    openDua();
  });

  doneCheckNoBtn.addEventListener("click", () => {
    doneCheckOverlay.classList.add("hidden");
  });

  function openDua() {
    duaText.textContent = pick(DUAS);
    duaOverlay.classList.remove("hidden");
  }

  duaClose.addEventListener("click", () => {
    duaOverlay.classList.add("hidden");
  });

  // ---------- giggle button ----------

  giggleBtn.addEventListener("click", () => {
    giggleText.textContent = pick(GIGGLE_LINES);
    giggleOverlay.classList.remove("hidden");
  });

  giggleClose.addEventListener("click", () => {
    giggleOverlay.classList.add("hidden");
  });

  // close overlays on backdrop click
  // (the new-day popup is intentionally NOT here — it needs a choice)
  [popupOverlay, giggleOverlay, duaOverlay, doneCheckOverlay].forEach((ov) => {
    ov.addEventListener("click", (e) => {
      if (e.target === ov) ov.classList.add("hidden");
    });
  });

  const ownerPrefixEl = $("ownerPrefix");

  // ---------- onboarding (first visit only) ----------

  function applyProfileToHeader(profile) {
    if (!profile) return;
    const build = HEADER_GREETING_BY_GENDER[profile.gender];
    greetingLineEl.textContent = build ? build(profile.name) : "";
    ownerPrefixEl.textContent = `${profile.name}'s `;
  }

  resetAllBtn.addEventListener("click", () => {
    const sure = window.confirm("This wipes your name and every task ever saved on this device. Reset everything?");
    if (!sure) return;
    try {
      Object.keys(localStorage)
        .filter((k) => k.startsWith("taskjar-"))
        .forEach((k) => localStorage.removeItem(k));
    } catch (e) {
      /* storage unavailable */
    }
    location.reload();
  });

  genderMaleBtn.addEventListener("click", () => {
    selectedGender = "male";
    onboardGreeting.textContent = GREETING_BY_GENDER.male;
    onboardStep1.classList.add("hidden");
    onboardStep2.classList.remove("hidden");
    onboardNameInput.focus();
  });

  genderFemaleBtn.addEventListener("click", () => {
    selectedGender = "female";
    onboardGreeting.textContent = GREETING_BY_GENDER.female;
    onboardStep1.classList.add("hidden");
    onboardStep2.classList.remove("hidden");
    onboardNameInput.focus();
  });

  function submitOnboarding() {
    const name = onboardNameInput.value.trim();
    if (!name || !selectedGender) {
      onboardNameInput.focus();
      return;
    }
    const profile = { gender: selectedGender, name };
    saveProfile(profile);
    applyProfileToHeader(profile);
    onboardOverlay.classList.add("hidden");
  }

  onboardSubmitBtn.addEventListener("click", submitOnboarding);
  onboardNameInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      submitOnboarding();
    }
  });

  // ---------- init ----------

  let emojiObserver;

  function emojify() {
    if (!window.twemoji) return;
    if (emojiObserver) emojiObserver.disconnect();
    twemoji.parse(document.body, { folder: "svg", ext: ".svg" });
    if (emojiObserver) {
      emojiObserver.observe(document.body, { childList: true, subtree: true, characterData: true });
    }
  }

  function init() {
    renderDate();
    loadTasks();
    renderBoard();
    renderEyebrow();

    const profile = loadProfile();
    if (profile) {
      applyProfileToHeader(profile);
      // returning user: check if yesterday's (or an earlier day's) tasks were left unfinished
      maybeAskAboutPreviousDay();
    } else {
      onboardOverlay.classList.remove("hidden");
    }

    // watches the whole page and auto-converts any new emoji the app
    // renders later (new tasks, popups, dua text, etc.) so every emoji
    // shows consistently even if the device's own font is missing some
    emojiObserver = new MutationObserver(() => emojify());
    emojify();
  }

  init();
})();
