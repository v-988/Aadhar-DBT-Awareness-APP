// Basic UI elements
const langSelect = document.getElementById('langSelect');
const getStarted = document.getElementById('getStarted');
const guideOpen = document.getElementById('guideOpen');
const scenarioModal = document.getElementById('scenarioModal');
const guideModal = document.getElementById('guideModal');

const quizLangSelect = document.getElementById('quizLang');
const quizLevelSelect = document.getElementById('quizLevel');
const startQuizBtn = document.getElementById('startQuizBtn');
const quizWrap = document.getElementById('quizWrap');
const qText = document.getElementById('qText');
const optionsDiv = document.getElementById('options');
const explainDiv = document.getElementById('explain');
const scoreBox = document.getElementById('scoreBox');
const progressFill = document.getElementById('progressFill');
const nextBtn = document.getElementById('nextBtn');
const finishBtn = document.getElementById('finishBtn');
const notifyBtn = document.getElementById('notifyBtn');

// welcome hide
setTimeout(()=> document.getElementById('welcome').style.display='none', 1800);

// UI language dictionary (static labels)
const DICT = {
  en:{heroTitle:"DBT & Aadhaar — Learn & Protect Your Scholarship", heroDesc:"Interactive: Aadhaar-linked vs DBT-enabled accounts.", getStarted:"Get Started", guideBtn:"How to Enable DBT", startQuiz:"Start Quiz", next:"Next", finish:"Finish", score:"Score"},
  hi:{heroTitle:"DBT और Aadhaar — अपनी छात्रवृत्ति सुरक्षित रखें", heroDesc:"इंटरेक्टिव: Aadhaar-linked बनाम DBT-enabled खाते", getStarted:"शुरू करें", guideBtn:"DBT कैसे सक्षम करें", startQuiz:"क्विज़ शुरू करें", next:"अगला", finish:"समाप्त", score:"स्कोर"},
  ta:{heroTitle:"DBT மற்றும் ஆதார் — உங்கள் ஸ்காலர்ஷிப்பை பாதுகாப்பது", heroDesc:"இணையதளம்: Aadhaar-linked மற்றும் DBT-enabled கணக்குகள்", getStarted:"தொடங்கு", guideBtn:"DBT ஐ எப்படி இயக்கு", startQuiz:"க்விஸ் தொடங்கு", next:"அடுத்து", finish:"முடிவு", score:"மதிப்பெண்"},
  te:{heroTitle:"DBT మరియు Aadhaar — మీ స్కాలర్‌షిప్ రక్షించుకోండి", heroDesc:"ఇంటరాక్టివ్: Aadhaar-linked vs DBT-enabled ఖాతాలు", getStarted:"ప్రారంభించు", guideBtn:"DBT ఎలా ఎనేబుల్ చేయాలి", startQuiz:"క్విజ్ ప్రారంభించు", next:"తర్వాత", finish:"ముగించు", score:"స్కోర్"},
  kn:{heroTitle:"DBT ಮತ್ತು Aadhaar — ನಿಮ್ಮ ಸ್ಕಾಲರ್‌ಶಿಪ್ ಉಳಿಸಿಕೊಳ್ಳಿ", heroDesc:"ಇಂಟರಾಕ್ಟಿವ್: Aadhaar-linked ಮತ್ತು DBT-enabled ಖಾತೆಗಳು", getStarted:"ಆರಂಭಿಸಿ", guideBtn:"DBT ಅನ್ನು ಹೇಗೆ ಸಕ್ರಿಯಗೊಳಿಸುವುದು", startQuiz:"ಕ್ವಿಜ್ ಪ್ರಾರಂಭಿಸಿ", next:"ಮುಂದೆ", finish:"ಮುಗಿಯಿತು", score:"ಸ್ಕೋರ್"},
  ml:{heroTitle:"DBT & Aadhaar — നിങ്ങളുടെ സ്കോളർഷിപ്പ് സംരക്ഷിക്കുക", heroDesc:"ഇന്ററാക്ടിവ്: Aadhaar-linked vs DBT-enabled അക്കൗണ്ടുകൾ", getStarted:"ആരംഭിക്കുക", guideBtn:"DBT എങ്ങനെ സജീവമാക്കാം", startQuiz:"ക്വിസ് ആരംഭിക്കുക", next:"അടുത്തത്", finish:"മുന്തിയിരിക്കുക", score:"സ്കോർ"}
};

(() => {
  // CONFIG
  const TOTAL = 10; // number of questions per run
  const AUTO_ADVANCE_DELAY = 1200; // ms to wait before auto-next when Auto-next checked

  // QUESTION BANK (expanded)
  const BANK = {
    easy: [
      { q: { en:"What does DBT stand for?", hi:"DBT का पूरा नाम क्या है?" }, opts: { en:["Direct Bank Transfer","Direct Benefit Transfer","Digital Benefit Transfer","Direct Billing Transfer"] }, a:1, exp: { en:"Direct Benefit Transfer — government sends benefit directly to your bank account." } },
      { q: { en:"Aadhaar linking is mainly used for?" , hi:"Aadhaar लिंकिंग किसके लिए है?" }, opts: { en:["Identity verification","Only DBT","Shopping","Loans"] }, a:0, exp: { en:"Aadhaar linking is primarily for identity verification (KYC)." } },
      { q: { en:"Who manages Aadhaar?", hi:"Aadhaar किस संस्था द्वारा संचालित है?" }, opts: { en:["RBI","UIDAI","NPCI","State Dept"] }, a:1, exp: { en:"UIDAI (Unique Identification Authority of India) manages Aadhaar." } },
      { q: { en:"Where do scholarships usually come from?" }, opts: { en:["School fund","Government (State/Central)","Friends","Banks"] }, a:1, exp:{ en:"Most scholarships are funded by state or central government and disbursed via DBT." } },
      { q: { en:"If account is not DBT-enabled, what may happen?" }, opts: { en:["Payments succeed","Payments may fail/delay","You get extra money","Account blocked"] }, a:1, exp:{ en:"If not DBT-enabled, payments may fail or be delayed." } },
      { q: { en:"Why enable DBT?" }, opts: { en:["Faster payments","More paperwork","Higher fees","No benefit"] }, a:0, exp:{ en:"Enabling DBT ensures funds reach beneficiaries quickly and transparently." } },
      { q: { en:"What is APBS?" }, opts: { en:["Aadhaar Payment Bridge System","A bank feature","A scholarship program","A tax"] }, a:0, exp:{ en:"APBS routes DBT payments using Aadhaar." } },
      { q: { en:"Can multiple accounts be DBT-enabled?" }, opts: { en:["Yes","No, only one is used","Yes for same bank","Only with permission"] }, a:1, exp:{ en:"Only one DBT-enabled account is used to avoid duplication." } },
      // extra easy Qs
      { q: { en:"DBT helps reduce which of these?" }, opts: { en:["Leakages & delays","Electricity use","Interest rates","Physical paperwork only"] }, a:0, exp:{ en:"DBT reduces leakages and speeds transfers by minimizing manual handling." } },
      { q: { en:"Which ID is used for seeding DBT?" }, opts: { en:["PAN","Passport","Aadhaar","Voter ID"] }, a:2, exp:{ en:"Aadhaar is used for Aadhaar-seeded DBT accounts." } }
    ],
    medium: [
      { q:{ en:"Which system routes Aadhaar-based payments?" }, opts:{ en:["APBS","UPI","NEFT","RTGS"] }, a:0, exp:{ en:"APBS (Aadhaar Payment Bridge System) routes DBT." }},
      { q:{ en:"Where to verify DBT seeding status?" }, opts:{ en:["Bank branch","School office","Friend","Post office"] }, a:0, exp:{ en:"Visit your bank or NPCI/UMANG portals to verify seeding." }},
      { q:{ en:"Who marks an account as DBT-enabled?" }, opts:{ en:["Student","Bank","UIDAI","School"] }, a:1, exp:{ en:"Only the bank can mark an account as DBT-enabled in NPCI records." }},
      { q:{ en:"If payment returned, what should you do?" }, opts:{ en:["Do nothing","Contact bank to enable DBT","Change bank","Close account"] }, a:1, exp:{ en:"Contact the bank to seed Aadhaar & enable DBT." }},
      // extras
      { q:{ en:"Seeding Aadhaar to the wrong account can cause?" }, opts:{ en:["Faster credit","Funds to wrong account","Extra interest","No effect"] }, a:1, exp:{ en:"Seeding wrong account can cause funds to go to the wrong account." }},
      { q:{ en:"Which portal can show DBT disbursal details?" }, opts:{ en:["UMANG/NPCI portals","YouTube","Facebook","Twitter"] }, a:0, exp:{ en:"Government portals such as UMANG/NPCI provide DBT disbursal information." } }
    ],
    hard: [
      { q:{ en:"Who manages the Aadhaar database?" }, opts:{ en:["NPCI","UIDAI","RBI","Banks"] }, a:1, exp:{ en:"UIDAI manages the Aadhaar ecosystem." } },
      { q:{ en:"What does DBT reduce?" }, opts:{ en:["Leakages & delays","Interest rates","Taxes","Account types"] }, a:0, exp:{ en:"DBT reduces leakages and speeds up transfers." } },
      { q:{ en:"In Aadhaar seeding, NPCI is responsible for?" }, opts:{ en:["Routing payments","Printing Aadhaar","Issuing passports","Collecting taxes"] }, a:0, exp:{ en:"NPCI helps route DBT payments in the banking/payment ecosystem." } },
      { q:{ en:"Which is required to validate beneficiary bank during DBT?" }, opts:{ en:["IFSC & Account","Email","Phone only","PAN only"] }, a:0, exp:{ en:"IFSC + Account details are needed to route to the correct bank branch." } }
    ]
  };

  // small translation map used only for quiz UI texts
  const SMALL = {
    en: { Score:"Score", "Quiz Completed":"Quiz Completed", "Your Final Score":"Your Final Score", "Wrong":"Wrong", "Next":"Next", "Finish":"Finish", "Start Quiz":"Start Quiz" },
    hi: { Score:"स्कोर", "Quiz Completed":"क्विज़ पूरा हुआ", "Your Final Score":"आपका अंतिम स्कोर", "Wrong":"गलत", "Next":"अगला", "Finish":"समाप्त", "Start Quiz":"क्विज़ शुरू करें" },
    ta: { Score:"மதிப்பெண்", "Quiz Completed":"வினாடி-வினா முடிந்தது", "Your Final Score":"உங்கள் இறுதி மதிப்பெண்", "Wrong":"தவறு", "Next":"அடுத்ததாக", "Finish":"முடி", "Start Quiz":"வினாடி-வினா தொடங்கு" },
    te: { Score:"స్కోర్", "Quiz Completed":"క్విజ్ పూర్తి", "Your Final Score":"మీ తుది స్కోర్", "Wrong":"తప్పుడు", "Next":"తరువాత", "Finish":"పూర్తి", "Start Quiz":"క్విజ్ ప్రారంభించండి" },
    kn: { Score:"ಸ್ಕೋರ್","Quiz Completed":"ಕ್ವಿಜ್ ಪೂರ್ಣ","Your Final Score":"ನಿಮ್ಮ ಅಂತಿಮ ಅಂಕು","Wrong":"ತಪ್ಪು","Next":"ಮುಂದಿನ","Finish":"ಮುಗಿಸು","Start Quiz":"ಕ್ವಿಜ್ ಪ್ರಾರಂಭಿಸಿ" },
    ml: { Score:"സ്കോർ","Quiz Completed":"ക്വിസ് പൂർത്തിയായി","Your Final Score":"നിന്റെ അന്തിമ സ്കോർ","Wrong":"തെറ്റ്","Next":"അടുത്തത്","Finish":"ഒടുക്കം","Start Quiz":"ക്വിസ് തുടങ്ങിയവ" }
  };

  // DOM refs
  const quizLangSelect = document.getElementById('quizLang');
  const quizLevelSelect = document.getElementById('quizLevel');
  const startQuizBtn = document.getElementById('startQuizBtn');
  const notifyBtn = document.getElementById('notifyBtn');
  const quizWrap = document.getElementById('quizWrap');
  const progressFill = document.getElementById('progressFill');
  const qText = document.getElementById('qText');
  const optionsDiv = document.getElementById('options');
  const explainDiv = document.getElementById('explain');
  const scoreBox = document.getElementById('scoreBox');
  const nextBtn = document.getElementById('nextBtn');
  const finishBtn = document.getElementById('finishBtn');
  const autoAdvanceToggle = document.getElementById('autoAdvanceToggle');

  // state
  let quizPool = [];
  let qIndex = 0;
  let score = 0;

  // UTILS
  function translate(key) {
    const lang = quizLangSelect.value || 'en';
    return (SMALL[lang] && SMALL[lang][key]) ? SMALL[lang][key] : (SMALL.en[key] || key);
  }

  function buildPool(level) {
    const bank = BANK[level] || BANK.easy;
    // make shallow copy so we can splice
    let copy = [...bank];
    const pool = [];
    while (pool.length < TOTAL) {
      if (copy.length === 0) copy = [...bank]; // refill (allows repeats if bank < TOTAL)
      const r = Math.floor(Math.random() * copy.length);
      pool.push(copy.splice(r, 1)[0]);
    }
    return pool;
  }

  function updateProg() {
    const p = Math.round(((qIndex + 1) / TOTAL) * 100);
    progressFill.style.width = Math.min(100, p) + '%';
  }

  function getEmojiReward() {
    const list = ["🎉 Correct!","✅ Well done","👏 Nice!","🌟 Saved!"];
    return list[Math.floor(Math.random()*list.length)];
  }

  function fireConfetti(count = 30) {
    for (let i = 0; i < count; i++) {
      const el = document.createElement('div');
      el.style.position = 'fixed';
      el.style.left = (30 + Math.random()*40) + "%";
      el.style.top = "-20px";
      el.style.fontSize = (10 + Math.random()*28) + "px";
      el.style.pointerEvents = 'none';
      el.innerText = ["🎉","✨","⭐","💸"][Math.floor(Math.random()*4)];
      document.body.appendChild(el);
      const dur = 1400 + Math.random()*1600;
      el.animate([{transform:'translateY(0) rotate(0deg)', opacity:1},{transform:`translateY(${window.innerHeight + 200}px) rotate(${Math.random()*360}deg)`, opacity:0}], {duration:dur, easing:'linear'});
      setTimeout(()=> el.remove(), dur + 60);
    }
  }

  // RENDER
  function renderQ(lang) {
    const item = quizPool[qIndex];
    if (!item) { finishQuiz(); return; }

    const langCode = lang || quizLangSelect.value || 'en';
    // question text (fallback to English)
    const qTextValue = (item.q && (item.q[langCode] || item.q.en)) || '';
    qText.innerText = `${qIndex + 1}. ${qTextValue}`;

    // build options array robustly
    let optsArr = [];
    if (item.opts) {
      if (Array.isArray(item.opts[langCode])) optsArr = item.opts[langCode];
      else if (Array.isArray(item.opts.en)) optsArr = item.opts.en;
      else {
        // try to find first array in opts object
        const vals = Object.values(item.opts).find(v => Array.isArray(v));
        if (vals) optsArr = vals;
      }
    }

    // clear and render
    optionsDiv.innerHTML = '';
    explainDiv.innerText = '';
    qText.setAttribute('aria-busy', 'false');

    optsArr.forEach((o, idx) => {
      const b = document.createElement('button');
      b.className = 'opt-btn';
      b.type = 'button';
      b.innerText = o;
      b.dataset.optIndex = idx;
      b.onclick = () => selectOpt(idx, item, b, langCode);
      optionsDiv.appendChild(b);
    });

    // UI
    nextBtn.classList.add('hidden');
    finishBtn.classList.add('hidden');
    updateProg();
    scoreBox.innerText = `${translate('Score')}: ${score}`;
  }

  // ANSWER SELECTION
  let autoAdvanceTimer = null;
  function selectOpt(selectedIdx, item, btnEl, langCode) {
    // disable all options immediately
    Array.from(optionsDiv.children).forEach(b => b.disabled = true);

    const correct = item.a;
    const explanation = (item.exp && (item.exp[langCode] || item.exp.en)) || '';

    // Safe check: correct should be number; if not, try to coerce
    const correctIdx = (typeof correct === 'number') ? correct : parseInt(correct, 10);

    if (selectedIdx === correctIdx) {
      btnEl.classList.add('correct');
      score += 10;
      scoreBox.innerText = `${translate('Score')}: ${score}`;
      explainDiv.innerText = `✔ ${getEmojiReward()}`;
      fireConfetti(18);
    } else {
      btnEl.classList.add('wrong');
      // highlight correct option if present
      const correctBtn = optionsDiv.children[correctIdx];
      if (correctBtn) correctBtn.classList.add('correct');
      explainDiv.innerText = `✖ ${translate('Wrong') || 'Wrong'} — ${explanation}${correctBtn ? ' (Correct: ' + correctBtn.innerText + ')' : ''}`;
    }

    // show next/finish appropriately
    if (qIndex >= quizPool.length - 1) {
      finishBtn.classList.remove('hidden');
    } else {
      nextBtn.classList.remove('hidden');
    }

    // auto-next if toggle on
    if (autoAdvanceToggle && autoAdvanceToggle.checked) {
      if (autoAdvanceTimer) clearTimeout(autoAdvanceTimer);
      autoAdvanceTimer = setTimeout(() => {
        if (qIndex >= quizPool.length - 1) finishQuiz();
        else nextQ();
      }, AUTO_ADVANCE_DELAY);
    }
  }

  // NAVIGATION
  function nextQ() {
    if (autoAdvanceTimer) { clearTimeout(autoAdvanceTimer); autoAdvanceTimer = null; }
    qIndex++;
    if (qIndex >= quizPool.length) { finishQuiz(); return; }
    renderQ(quizLangSelect.value);
    // hide next until next selection
    nextBtn.classList.add('hidden');
  }

  function finishQuiz() {
    if (autoAdvanceTimer) { clearTimeout(autoAdvanceTimer); autoAdvanceTimer = null; }
    qText.innerText = translate('Quiz Completed') || 'Quiz Completed';
    optionsDiv.innerHTML = '';
    explainDiv.innerText = `${translate('Your Final Score') || 'Your Final Score'}: ${score}`;
    nextBtn.classList.add('hidden');
    finishBtn.classList.add('hidden');
    startQuizBtn.classList.remove('hidden');
    // feedback + confetti for good score
    const threshold = Math.round(TOTAL * 10 * 0.7);
    if (score >= threshold) { explainDiv.innerText += ' 🎉 Great job!'; fireConfetti(60); }
    else { explainDiv.innerText += ' 👍 Try again to improve.'; }
  }

  // INIT
  function initQuiz() {
    const lvl = quizLevelSelect.value || 'easy';
    const lang = quizLangSelect.value || 'en';
    quizPool = buildPool(lvl);
    qIndex = 0;
    score = 0;
    scoreBox.innerText = `${translate('Score')}: ${score}`;
    startQuizBtn.classList.add('hidden');
    quizWrap.classList.remove('hidden');
    renderQ(lang);
  }

  // NOTIFICATIONS (demo)
  if (notifyBtn) {
    notifyBtn.addEventListener('click', async () => {
      if (!('Notification' in window)) { alert('Notifications not supported'); return; }
      if (Notification.permission === 'granted') { sendNotification(); }
      else if (Notification.permission !== 'denied') {
        const p = await Notification.requestPermission();
        if (p === 'granted') sendNotification();
      } else alert('Enable notifications in browser settings.');
    });
  }
  function sendNotification() {
    const n = new Notification('DBT Reminder', { body:'Check if your account is Aadhaar-seeded & DBT-enabled to receive scholarships.' });
    setTimeout(()=> n.close(), 8000);
  }

  // BUTTON HOOKS
  startQuizBtn.addEventListener('click', initQuiz);
  nextBtn.addEventListener('click', nextQ);
  finishBtn.addEventListener('click', finishQuiz);

  // react to language changes so UI strings update
  quizLangSelect.addEventListener('change', () => {
    // update small UI labels
    nextBtn.innerText = translate('Next');
    finishBtn.innerText = translate('Finish');
    startQuizBtn.innerText = translate('Start Quiz');
    scoreBox.innerText = `${translate('Score')}: ${score}`;
    // re-render current question in selected language
    if (!quizWrap.classList.contains('hidden')) renderQ(quizLangSelect.value);
  });

  // initialize visible UI labels
  nextBtn.innerText = translate('Next');
  finishBtn.innerText = translate('Finish');
  startQuizBtn.innerText = translate('Start Quiz');
  scoreBox.innerText = `${translate('Score')}: ${score}`;

})();
// scenario animation
function playScenario(mode){
  const arrow1 = document.getElementById('arrow1');
  const arrow2 = document.getElementById('arrow2');
  const msg = document.getElementById('scenarioMsg');
  arrow1.classList.remove('active'); arrow2.classList.remove('active'); msg.innerText='';
  scenarioModal.classList.remove('hidden');

  if(mode === 'linked'){
    arrow1.classList.add('active');
    msg.innerText = "❌ Money can't route to student (DBT not enabled) — payment may be returned or delayed.";
    setTimeout(()=> arrow1.classList.remove('active'), 2200);
  } else {
    arrow1.classList.add('active');
    setTimeout(()=>{ arrow2.classList.add('active'); msg.innerText = "✅ DBT enabled — money flows to student's account on time."; }, 900);
  }
}
function closeScenarioModal(){ scenarioModal.classList.add('hidden'); document.getElementById('scenarioMsg').innerText=''; document.getElementById('arrow1').classList.remove('active'); document.getElementById('arrow2').classList.remove('active'); }
function openScenarioModal(){ scenarioModal.classList.remove('hidden'); }

// guide modal
function openGuideModal(){ guideModal.classList.remove('hidden'); }
function closeGuideModal(){ guideModal.classList.add('hidden'); }

// language / UI text translate helper
function translate(key){
  const small = {
    en: { Score:"Score", "Quiz Completed":"Quiz Completed", "Your Final Score":"Your Final Score", "Wrong":"Wrong", "Great job":"Great job", "Try again to improve":"Try again to improve" },
    hi: { Score:"स्कोर", "Quiz Completed":"क्विज़ पूरा हुआ", "Your Final Score":"आपका अंतिम स्कोर", "Wrong":"गलत", "Great job":"शानदार", "Try again to improve":"फिर प्रयास करें" },
    ta: { Score:"மதிப்பெண்", "Quiz Completed":"வினாடி-வினா முடிந்தது", "Your Final Score":"உங்கள் இறுதி மதிப்பெண்", "Wrong":"தவறு", "Great job":"அற்புதம்", "Try again to improve":"மீண்டும் முயற்சி" },
    te: { Score:"స్కోర్", "Quiz Completed":"క్విజ్ పూర్తి", "Your Final Score":"మీ తుది స్కోర్", "Wrong":"తప్పుడు", "Great job":"అద్భుతం", "Try again to improve":"మళ్ళీ ప్రయత్నించండి" },
    kn: { Score:"ಸ್ಕೋರ್","Quiz Completed":"ಕ್ವಿಜ್ ಪೂರ್ಣ","Your Final Score":"ನಿಮ್ಮ ಅಂತಿಮ ಅಂಕು","Wrong":"ತಪ್ಪು","Great job":"ಶುಭವಾಗಲಿ","Try again to improve":"ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ" },
    ml: { Score:"സ്കോർ","Quiz Completed":"ക്വിസ് പൂർത്തിയായി","Your Final Score":"നിന്റെ അന്തിമ സ്കോർ","Wrong":"തെറ്റ്","Great job":"നന്ദി","Try again to improve":"വീണ്ടും ശ്രമിക്കുക" }
  };
  const lang = langSelect.value || 'en';
  return (small[lang] && small[lang][key]) ? small[lang][key] : (small.en[key] || key);
}

// UI labels apply on language change
function applyUILang(){
  const d = DICT[langSelect.value] || DICT.en;
  document.getElementById('heroTitle').innerText = d.heroTitle;
  document.getElementById('heroDesc').innerText = d.heroDesc;
  getStarted.innerText = d.getStarted;
  guideOpen.innerText = d.guideBtn;
  startQuizBtn.innerText = d.startQuiz;
  nextBtn.innerText = d.next;
  finishBtn.innerText = d.finish;
  scoreBox.innerText = `${translate('Score')}: ${score}`;
}
langSelect.addEventListener('change', applyUILang);

// attach events
getStarted.addEventListener('click', ()=> {
  document.getElementById('quizWrap').classList.add('hidden'); // force choose level
  document.getElementById('quizSection').scrollIntoView({behavior:'smooth'});
});
guideOpen.addEventListener('click', openGuideModal);
startQuizBtn.addEventListener('click', initQuiz);
nextBtn.addEventListener('click', nextQ);
finishBtn.addEventListener('click', finishQuiz);

// notifications (demo)
notifyBtn && notifyBtn.addEventListener('click', async ()=>{
  if(!('Notification' in window)){ alert('Notifications not supported'); return; }
  if(Notification.permission === 'granted'){ sendNotification(); }
  else if(Notification.permission !== 'denied'){ const p = await Notification.requestPermission(); if(p === 'granted') sendNotification(); }
  else alert('Enable notifications in browser settings.');
});
function sendNotification(){ const n = new Notification('DBT Reminder', { body:'Check if your account is Aadhaar-seeded & DBT-enabled to receive scholarships.' }); setTimeout(()=> n.close(), 8000); }

// initial UI apply
applyUILang();

//section 1code
function toggleDetails(detailsId) {
            const card = document.getElementById('aadhaarCol');
            const details = document.getElementById(detailsId);
            
            // Toggle active class on card for animation
            card.classList.toggle('active');
            
            // Toggle details visibility
            if (details.classList.contains('show')) {
                // Hide details
                details.classList.remove('show');
                
                // Add smooth scroll to top of card after animation
                setTimeout(() => {
                    card.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'start' 
                    });
                }, 300);
            } else {
                // Show details
                details.classList.add('show');
                
                // Optional: Scroll to ensure details are visible
                setTimeout(() => {
                    const cardRect = card.getBoundingClientRect();
                    if (cardRect.bottom > window.innerHeight) {
                        card.scrollIntoView({ 
                            behavior: 'smooth', 
                            block: 'start' 
                        });
                    }
                }, 500);
            }
        }

        // Optional: Close details when clicking outside
        document.addEventListener('click', function(event) {
            const card = document.getElementById('aadhaarCol');
            const details = document.getElementById('aadhaarDetails');
            
            // Check if click is outside the card
            if (!card.contains(event.target) && details.classList.contains('show')) {
                toggleDetails('aadhaarDetails');
            }
        });

        // Optional: Keyboard accessibility
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape') {
                const details = document.getElementById('aadhaarDetails');
                if (details.classList.contains('show')) {
                    toggleDetails('aadhaarDetails');
                }
            }
        });

        // Add smooth animations on page load
        window.addEventListener('load', function() {
            const card = document.getElementById('aadhaarCol');
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.6s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100);
        });

//section 2 code
function toggleDetails(detailsId) {
            const card = document.getElementById('dbtCol');
            const details = document.getElementById(detailsId);
            
            // Toggle active class on card for animation
            card.classList.toggle('active');
            
            // Toggle details visibility
            if (details.classList.contains('show')) {
                // Hide details
                details.classList.remove('show');
                
                // Add smooth scroll to top of card after animation
                setTimeout(() => {
                    card.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'start' 
                    });
                }, 300);
            } else {
                // Show details
                details.classList.add('show');
                
                // Optional: Scroll to ensure details are visible
                setTimeout(() => {
                    const cardRect = card.getBoundingClientRect();
                    if (cardRect.bottom > window.innerHeight) {
                        card.scrollIntoView({ 
                            behavior: 'smooth', 
                            block: 'start' 
                        });
                    }
                }, 500);
            }
        }

        // Optional: Close details when clicking outside
        document.addEventListener('click', function(event) {
            const card = document.getElementById('dbtCol');
            const details = document.getElementById('dbtDetails');
            
            // Check if click is outside the card
            if (!card.contains(event.target) && details.classList.contains('show')) {
                toggleDetails('dbtDetails');
            }
        });

        // Optional: Keyboard accessibility
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape') {
                const details = document.getElementById('dbtDetails');
                if (details.classList.contains('show')) {
                    toggleDetails('dbtDetails');
                }
            }
        });

        // Add smooth animations on page load
        window.addEventListener('load', function() {
            const card = document.getElementById('dbtCol');
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.6s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 200); // Slight delay for staggered animation
        });

        // Add pulse animation for important sections
        function addPulseEffect() {
            const importanceBox = document.querySelector('.importance-box');
            if (importanceBox) {
                importanceBox.addEventListener('mouseenter', function() {
                    this.style.transform = 'scale(1.02)';
                    this.style.transition = 'transform 0.3s ease';
                });
                
                importanceBox.addEventListener('mouseleave', function() {
                    this.style.transform = 'scale(1)';
                });
            }
        }

        // Initialize pulse effect after DOM is loaded
        document.addEventListener('DOMContentLoaded', addPulseEffect);
  //const user = localStorage.getItem("loggedInUser");
  //if (user) {
   // document.getElementById("welcomeMessage").textContent = "Hello " + user;
  //}
//const user = localStorage.getItem("loggedInUser");
//if (user) {
 // document.getElementById("welcomeMessage").textContent = "Hello " + user;
//}

        document.getElementById('feedbackForm').addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent actual form submission
            
            // Get form elements
            const form = document.getElementById('feedbackForm');
            const successMessage = document.getElementById('successMessage');
            const submitBtn = document.querySelector('.submit-btn');
            
            // Immediately hide the form and show success message
            form.style.display = 'none';
            successMessage.style.display = 'block';
            
            // Reset form after showing success message
            setTimeout(function() {
                form.reset();
                form.style.display = 'block';
                successMessage.style.display = 'none';
            }, 3000); // Hide success message after 3 seconds
        });

        // Add some interactive effects
        document.querySelectorAll('input, select, textarea').forEach(function(element) {
            element.addEventListener('focus', function() {
                this.parentNode.style.transform = 'translateY(-2px)';
                this.parentNode.style.transition = 'transform 0.3s ease';
            });
            
            element.addEventListener('blur', function() {
                this.parentNode.style.transform = 'translateY(0)';
            });
        });
