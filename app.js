const modal = document.getElementById("modal");
const modalContent = document.getElementById("modalContent");
const toastBox = document.getElementById("toast");

function openModal(type){
  const signup = type === "signup";
  modalContent.innerHTML = `
    <h2>${signup ? "Create your free account" : "Welcome back"}</h2>
    <p style="color:#8192a6;font-size:13px">${signup ? "Start building your career profile today." : "Login is currently a Phase 1 demo."}</p>
    ${signup ? `<div class="field"><label>FULL NAME</label><input id="name" placeholder="Your name"></div>` : ""}
    <div class="field"><label>EMAIL</label><input id="email" type="email" placeholder="you@example.com"></div>
    <div class="field"><label>PASSWORD</label><input id="password" type="password" placeholder="••••••••"></div>
    <button class="btn primary" onclick="${signup ? "demoSignup()" : "demoLogin()"}">${signup ? "Create Free Account" : "Login"}</button>
    <p style="text-align:center;color:#71849a;font-size:11px;margin-bottom:0">Supabase Auth will be connected in the next backend step.</p>
  `;
  modal.classList.add("show");
}

function closeModal(e){
  if(!e || e.target === modal) modal.classList.remove("show");
}

function demoSignup(){
  const name = document.getElementById("name")?.value.trim() || "User";
  const email = document.getElementById("email")?.value.trim();
  if(!email){ toast("Please enter your email."); return; }
  localStorage.setItem("careerlab_demo_user", JSON.stringify({name,email}));
  modal.classList.remove("show");
  toast(`Welcome, ${name}! Demo account created.`);
}

function demoLogin(){
  const email = document.getElementById("email")?.value.trim();
  if(!email){ toast("Please enter your email."); return; }
  localStorage.setItem("careerlab_demo_user", JSON.stringify({name:"CareerLab User",email}));
  modal.classList.remove("show");
  toast("Login demo successful.");
}

function toast(message){
  toastBox.textContent = message;
  toastBox.classList.add("show");
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(()=>toastBox.classList.remove("show"), 2600);
}

document.addEventListener("keydown", e => {
  if(e.key === "Escape") modal.classList.remove("show");
});

function updatePrep(){
  const role = document.getElementById("roleSelect").value;
  const company = document.getElementById("companySelect").value;
  const level = document.getElementById("levelSelect").value;
  document.getElementById("prepRole").textContent = `${role} · ${level}`;
  toast(`${role} preparation selected for ${company}.`);
}

function openInterview(){
  modalContent.innerHTML = `
    <h2>🎤 Natural AI Mock Interview</h2>
    <p style="color:#8192a6;font-size:13px">This demo shows the intended interview experience. The production version will use voice + AI follow-up questions.</p>
    <div class="field"><label>INTERVIEW MODE</label><select id="mode" style="width:100%;padding:12px;border-radius:9px;background:#091321;color:#fff;border:1px solid #2a3b51"><option>HR + Technical</option><option>Technical</option><option>HR</option><option>Case Study</option></select></div>
    <div class="field"><label>ANSWER MODE</label><select style="width:100%;padding:12px;border-radius:9px;background:#091321;color:#fff;border:1px solid #2a3b51"><option>Voice</option><option>Text</option></select></div>
    <button class="btn primary" onclick="startDemoInterview()">Start Interview</button>
  `;
  modal.classList.add("show");
}

function startDemoInterview(){
  modalContent.innerHTML = `
    <div style="font-size:10px;color:#62d89c;font-weight:800;letter-spacing:1px">● INTERVIEW STARTED</div>
    <h2>Tell me about yourself.</h2>
    <p style="color:#8192a6;font-size:13px">Answer naturally in 60–90 seconds. In production, the AI will listen, transcribe, evaluate and ask a relevant follow-up.</p>
    <button class="btn primary" onclick="toast('Voice AI will be connected in the AI integration phase.')">🎤 Use Microphone</button>
    <button class="btn ghost" style="width:100%;margin-top:8px" onclick="toast('Demo answer submitted. Next question would adapt to your response.')">Submit Demo Answer</button>
  `;
}
