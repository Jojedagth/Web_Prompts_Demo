function populateAdapterSelect() {
  const select = document.getElementById('adapterSelect');
  if (!select) return;
  const prompts = getPrompts();
  select.innerHTML = prompts.map(p =>
    `<option value="${p.id}">${escapeHtml(p.title)}</option>`
  ).join('');
}

function generateMegaPrompt() {
  const select = document.getElementById('adapterSelect');
  const textarea = document.getElementById('adapterIdea');
  const output = document.getElementById('adapterOutput');
  const outputBody = document.getElementById('adapterOutputBody');
  const copyBtn = document.getElementById('adapterCopyBtn');

  const id = select.value;
  const idea = textarea.value.trim();

  if (!id || !idea) return;

  const prompts = getPrompts();
  const prompt = prompts.find(p => p.id === id);
  if (!prompt) return;

  const mega = `## Context
You are a senior developer. Use the following proven prompt structure as your methodology.

## Prompt Structure (from PromptOps)
${prompt.body}

## My Project
${idea}

## Instructions
Apply the structure above to my project. Be specific, detailed, and production-ready.`;

  outputBody.textContent = mega;
  copyBtn.dataset.body = mega;
  output.classList.add('show');
}

function setupAdapterCopy() {
  document.getElementById('adapterCopyBtn')?.addEventListener('click', async function () {
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
