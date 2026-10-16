# Research image generation

Tool: built-in image generation.

Website asset: `public/assets/projects/aqe-salting-illustration.webp` (1536 × 1024).

Sources reviewed: the 13-page AQE vs Salting paper, the research presentation,
repository README and `src/skewbench/costmodel.py`. The image is conceptual and
does not encode experimental results.

## Final prompt

Create a polished editorial technical illustration for Aditya Malviya's portfolio research section. Landscape 1536x1024 composition, warm ivory/cream background #f4f0e6, deep navy #102b79, burnt orange #ed8838 and muted slate. Research topic is 'AQE vs Salting' in Apache Spark. Main title exactly 'AQE vs Salting', small eyebrow exactly 'SKEWED JOINS / RESEARCH'. Below title, a clear refined schematic comparison in two equal areas, not a bar chart. LEFT label exactly 'Adaptive splitting': an uneven partition group with one large orange hot partition feeds a runtime split mechanism and several balanced processing blocks, suggesting Spark AQE. RIGHT label exactly 'Selective salting': one large orange hot-key stream divides into smaller differently marked sub-key streams, alongside small matching reference-row stacks repeated to meet each stream, suggesting selective salting's replication trade-off. Use tasteful precise isometric-ish flat editorial forms, clean connectors, crisp spacing, subtle paper grain and soft depth, high visual quality. Bottom short caption exactly 'Less skew. More replication. A measured trade-off.' Small author credit exactly 'Aditya Malviya'. Illustration should communicate the concepts from a research paper and benchmark code, with no invented quantitative results, no speedup claims, no plotted measurements, no fabricated UI, no company logos, no watermarks. Strong readable typography with limited words, generous margins, all content fully inside frame. This is an original conceptual illustration to replace a raw research figure screenshot on the website.
