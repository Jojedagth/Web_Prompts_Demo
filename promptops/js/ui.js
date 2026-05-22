let currentPrompts = [];
let currentFilter = 'all';

function getTypeLabel(type) {
  const labels = {
    spec: 'Spec',
    architecture: 'Architecture',
    ui: 'UI',
    agent: 'Agent',
    system: 'System Prompt'
  };
  return labels[type] || type;
}

function renderCards(prompts) {
  const grid = document.getElementById('cardsGrid');
  if (!grid) return;

  if (prompts.length === 0) {
    grid.innerHTML = `<p class="empty-library" data-i18n="empty_library">No prompts found.</p>`;
    return;
  }

  grid.innerHTML = prompts.map((p, i) => `
    <div class="prompt-card anim-fade-slide-up" style="animation-delay: ${i * 0.05}s" data-id="${p.id}">
      <div class="prompt-card-header">
        <span class="prompt-card-type ${p.type}">${getTypeLabel(p.type)}</span>
        <span class="prompt-card-author">${p.author}</span>
      </div>
      <h3 class="prompt-card-title">${escapeHtml(p.title)}</h3>
      <p class="prompt-card-desc">${escapeHtml(p.description)}</p>
      <div class="prompt-card-stacks">
        ${p.stacks.map(s => `<span class="stack-tag">${escapeHtml(s)}</span>`).join('')}
      </div>
      <div class="prompt-card-actions">
        <button class="btn-view" data-action="view" data-id="${p.id}" data-i18n="card_view">View</button>
        <button class="btn-adapt-card" data-action="adapt" data-id="${p.id}" data-i18n="card_adapt">Adapt</button>
      </div>
    </div>
  `).join('');
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function openModal(prompt) {
  const overlay = document.getElementById('modalOverlay');
  const typeEl = document.getElementById('modalType');
  const authorEl = document.getElementById('modalAuthor');
  const titleEl = document.getElementById('modalTitle');
  const bodyEl = document.getElementById('modalBody');
  const copyBtn = document.getElementById('modalCopyBtn');
  const downloadBtn = document.getElementById('modalDownloadBtn');
  const adaptBtn = document.getElementById('modalAdaptBtn');

  typeEl.className = `prompt-card-type ${prompt.type}`;
  typeEl.textContent = getTypeLabel(prompt.type);
  authorEl.textContent = prompt.author;
  titleEl.textContent = prompt.title;
  bodyEl.textContent = prompt.body;

  adaptBtn.dataset.id = prompt.id;
  copyBtn.dataset.body = prompt.body;
  downloadBtn.dataset.filename = `${prompt.title.replace(/\s+/g, '_')}.md`;
  downloadBtn.dataset.body = prompt.body;

  overlay.classList.add('open');
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('open');
}

function setupFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.dataset.filter;
      const filtered = currentFilter === 'all'
        ? currentPrompts
        : currentPrompts.filter(p => p.type === currentFilter);
      renderCards(filtered);
      applyLanguage(localStorage.getItem('promptops_lang') || 'en');
    });
  });
}

function setupCardActions() {
  document.addEventListener('click', e => {
    const btn = e.target.closest('[data-action]');
    if (!btn) return;
    const id = btn.dataset.id;
    const prompt = currentPrompts.find(p => p.id === id);
    if (!prompt) return;

    if (btn.dataset.action === 'view') {
      openModal(prompt);
    } else if (btn.dataset.action === 'adapt') {
      const select = document.getElementById('adapterSelect');
      if (select) {
        for (let i = 0; i < select.options.length; i++) {
          if (select.options[i].value === id) {
            select.selectedIndex = i;
            break;
          }
        }
      }
      document.getElementById('adapter').scrollIntoView({ behavior: 'smooth' });
    }
  });
}

function setupMouseGlow() {
  document.addEventListener('mousemove', e => {
    const cards = document.querySelectorAll('.prompt-card');
    cards.forEach(card => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty('--mx', x + '%');
      card.style.setProperty('--my', y + '%');
    });
  });
}

function setupModalClose() {
  const overlay = document.getElementById('modalOverlay');
  overlay.addEventListener('click', e => {
    if (e.target === overlay) closeModal();
  });
}

function setupModalCopy() {
  document.getElementById('modalCopyBtn')?.addEventListener('click', async function () {
    try {
      await navigator.clipboard.writeText(this.dataset.body);
      showToast('toast_copied', 'success');
    } catch {
      const ta = document.createElement('textarea');
      ta.value = this.dataset.body;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      ta.remove();
      showToast('toast_copied', 'success');
    }
  });
}

function setupModalDownload() {
  document.getElementById('modalDownloadBtn')?.addEventListener('click', function () {
    const blob = new Blob([this.dataset.body], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = this.dataset.filename;
    a.click();
    URL.revokeObjectURL(url);
    showToast('toast_downloaded', 'success');
  });
}

function setupModalAdapt() {
  document.getElementById('modalAdaptBtn')?.addEventListener('click', function () {
    closeModal();
    const select = document.getElementById('adapterSelect');
    if (select) {
      for (let i = 0; i < select.options.length; i++) {
        if (select.options[i].value === this.dataset.id) {
          select.selectedIndex = i;
          break;
        }
      }
    }
    document.getElementById('adapter').scrollIntoView({ behavior: 'smooth' });
  });
}

function showToast(key, type = 'info') {
  const container = document.getElementById('toastContainer');
  const lang = localStorage.getItem('promptops_lang') || 'en';
  const msg = TRANSLATIONS[lang]?.[key] || key;
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = msg;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

function setupStackObserver() {
  const cards = document.querySelectorAll('.stack-card');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    cards.forEach((card, i) => {
      card.style.transitionDelay = `${i * 75}ms`;
      observer.observe(card);
    });
  } else {
    cards.forEach(c => c.classList.add('visible'));
  }
}
