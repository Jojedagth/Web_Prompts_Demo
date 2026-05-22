# PromptOps

Biblioteca local de estructuras de prompt certificadas. Sin dependencias, sin servidor.

## Funcionamiento básico

**Library** — Cards con prompts precargados. Filtralos por tipo (Spec, Architecture, UI, Agent, System Prompt). Hacé clic en **View** para ver el prompt completo, copiarlo o descargarlo como `.md`.

**Adapter** — Seleccioná un prompt de la librería, describí tu proyecto y generá un mega-prompt combinado listo para copiar y pegar en una IA.

**Login** — Iniciá sesión con `admin / promptops2026` o `dev1 / dev1pass` para desbloquear la sección **Publish**.

**Publish** — Publicá tus propias estructuras de prompt. Se guardan en localStorage y aparecen automáticamente en la librería.

**EN / ES** — Idioma toggleable en la esquina superior derecha. Se persiste al recargar.

## Stack

HTML5, CSS3, Vanilla JS. Todo en `css/` y `js/`.

![Web](/public/web.png)
