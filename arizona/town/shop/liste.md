---
layout: single
title: "Magasin de fichiers"
description: "Parcourez, partagez, téléchargez."
---

## Fiches
<ul>
{% assign fiches = site.pages | where_exp: "p", "p.url contains '/o/'" | sort: "title" %}
{% for f in fiches %}
<li><a href="{{ f.url | relative_url }}">{{ f.title }}</a></li>
{% endfor %}
</ul>
