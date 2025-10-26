<p align="center">
    <img src="https://gpul.org/_astro/logo.BisyB_iF_DFKqE.svg", width="150">
    <br>
    <strong>Web de GPUL</strong>
    <br>
</p>

Este repositorio contén o código e o contido da web principal da asociación.

## Uso

A web está feita co framework [Astro](https://astro.build/). A forma máis rápida de poñela a funcionar é utilizando [pnpm](https://pnpm.io/). Unha vez o teñas instalado e o repositorio clonado, executa na raíz do repositorio:

```bash
pnpm install  # Para instalar as dependencias
pnpm dev      # Para arrancar o servidor de probas
```

## Engadir contido

### Eventos

Para crear un evento, engade un ficheiro de markdown en `src/content/eventos/<ano>/<nome-do-evento>.md`. Lembra facer un directorio para o ano actual, e que o nome do ficheiro será o que defina a súa ruta na páxina web.

Este novo ficheiro conterá:

```
---
title: Título da charla
excerpt: Breve resumo da charla
date: 2025-11-05T17:30:00
location: Laboratorio 0.6, Facultade de Informática
tags: ['School']
status: upcoming
authors: [delthia]
video: https://www.youtube.com/watch?v=MWfT4XG6-SM
---

```

- `title`, `excerpt` e `date` son mandatorios
- `location` é opcional
- en `tags` indica o tipo de evento. Podes engadir outras etiquetas separándoas con comas
- `status` será _upcoming_ para eventos futuros e _past_ para eventos pasados
- en `authors` indica o id de quen deu o evento. Podes poñer varios separados por comas
- en `video` indica a URL á gravación da charla, se a hai

Terás que crear o autor en `src/content/authors.json`, engadindo algo coma:

```json
{
  "id": "delthia",
  "name": "Iago R.",
  "portfolio": "https://github.com/delthia"
}
```

(o atributo portfolio é opcional)

Tamén terás que gardar unha imaxe que será a miniatura do evento en `public/<ano>/<nome-do-evento>.png`. Será unha imaxe preferiblemente en formato 16:9 (unha boa resolución é 1920x1080), sempre en formato `png`, e sempre en `src/public/` respetando o nome do evento no nome da imaxe.
