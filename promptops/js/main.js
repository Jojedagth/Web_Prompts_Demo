document.addEventListener('DOMContentLoaded', () => {

  currentPrompts = getPrompts();

  renderCards(currentPrompts);
  populateAdapterSelect();

  const savedLang = localStorage.getItem('promptops_lang') || 'en';
  applyLanguage(savedLang);

  setupFilters();
  setupCardActions();
  setupMouseGlow();
  setupModalClose();
  setupModalCopy();
  setupModalDownload();
  setupModalAdapt();
  setupAdapterCopy();
  setupStackObserver();

  const langToggle = document.getElementById('langToggle');
  if (langToggle) {
    langToggle.addEventListener('click', () => {
      const current = localStorage.getItem('promptops_lang') || 'en';
      const next = current === 'en' ? 'es' : 'en';
      applyLanguage(next);
    });
  }

  const loginBtn = document.getElementById('loginBtn');
  if (loginBtn) {
    loginBtn.addEventListener('click', () => {
      document.getElementById('loginModal').classList.add('open');
    });
  }

  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      logout();
      updateAuthUI();
      applyLanguage(localStorage.getItem('promptops_lang') || 'en');
    });
  }

  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', e => {
      e.preventDefault();
      const username = document.getElementById('loginUsername').value.trim();
      const password = document.getElementById('loginPassword').value.trim();
      const errorEl = document.getElementById('loginError');

      if (login(username, password)) {
        document.getElementById('loginModal').classList.remove('open');
        document.getElementById('loginUsername').value = '';
        document.getElementById('loginPassword').value = '';
        errorEl.style.display = 'none';
        updateAuthUI();
        applyLanguage(localStorage.getItem('promptops_lang') || 'en');
      } else {
        errorEl.style.display = 'block';
      }
    });
  }

  const loginModalOverlay = document.getElementById('loginModal');
  if (loginModalOverlay) {
    loginModalOverlay.addEventListener('click', e => {
      if (e.target === loginModalOverlay) {
        loginModalOverlay.classList.remove('open');
      }
    });
  }

  const generateBtn = document.getElementById('generateBtn');
  if (generateBtn) {
    generateBtn.addEventListener('click', generateMegaPrompt);
  }

  const publishForm = document.getElementById('publishForm');
  if (publishForm) {
    publishForm.addEventListener('submit', e => {
      e.preventDefault();
      const title = document.getElementById('publishTitle').value.trim();
      const type = document.getElementById('publishType').value;
      const stacks = document.getElementById('publishStacks').value.split(',').map(s => s.trim()).filter(Boolean);
      const desc = document.getElementById('publishDesc').value.trim();
      const body = document.getElementById('publishBody').value.trim();

      if (!title || !type || !body) return;

      const newPrompt = {
        id: Date.now().toString(),
        title,
        type,
        author: getSession()?.username || 'anonymous',
        stacks,
        description: desc,
        body,
        createdAt: new Date().toISOString()
      };

      currentPrompts = addPrompt(newPrompt);
      renderCards(currentPrompts);
      populateAdapterSelect();
      publishForm.reset();

      const lang = localStorage.getItem('promptops_lang') || 'en';
      showToast('publish_success', 'success');
    });
  }

  updateAuthUI();
});

function updateAuthUI() {
  const loggedIn = isLoggedIn();
  const loginBtn = document.getElementById('loginBtn');
  const logoutBtn = document.getElementById('logoutBtn');
  const publishForm = document.getElementById('publishForm');
  const publishLocked = document.getElementById('publishLocked');

  if (loginBtn) loginBtn.style.display = loggedIn ? 'none' : 'inline-block';
  if (logoutBtn) logoutBtn.style.display = loggedIn ? 'inline-block' : 'none';

  if (publishForm) publishForm.classList.toggle('show', loggedIn);
  if (publishLocked) publishLocked.style.display = loggedIn ? 'none' : 'block';
}
