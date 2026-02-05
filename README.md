# Yogi – Ethics Filter Framework Demo

This repository contains the source code for **Yogi**, the web application used as the case study in:

> Sekulic et al., *Adding Ethics to Agile: The Ethics Filter Framework (EFF)*

Yogi is a small, self‑contained demo that shows how conventional agile user stories and **EFF‑enhanced** user stories lead to two different implementations of the same feature set.

- **Yogi v1 (baseline)** – implements standard business‑driven user stories without explicit ethical analysis.
- **Yogi v2 (EFF‑enhanced)** – implements the same functionality, extended with stakeholder values, harm clauses, and ethical acceptance criteria derived from the Ethics Filter Framework.

The live instance used in the study is available at:

> https://eff-demo.lovable.app/

---

## 1. Repository Purpose

This repo is intended to:

- Make the **case study artifact reproducible** for reviewers and researchers.
- Let practitioners **inspect and run** both versions locally.
- Provide a concrete example of how **extended user stories with ethical constraints** map to UI flows, data handling, and content.

The full text of the baseline and EFF‑enhanced user stories (v1 / v2) is provided in the paper’s Appendix A.

---

## 2. Application Overview

Yogi is a single‑page web app that guides users through two sequential flows:

1. **Baseline Flow (Yogi v1)**  
   - Yoga‑themed onboarding questionnaire  
   - Class recommendations based on answers  
   - AI‑generated “pro tips”  
   - Optional newsletter signup  

2. **EFF‑Enhanced Flow (Yogi v2)**  
   - Same core features, but refined using the Ethics Filter Framework:  
     - Explicit data‑minimization and retention rules  
     - Safety constraints for class recommendations  
     - Clear labeling of AI‑generated content  
     - Dark‑pattern‑free newsletter signup and consent behavior  

The landing page explains that participants first complete **Yogi v1** and are then forwarded to **Yogi v2**. No survey logic is implemented here; the application itself only exposes the two versions.

---

## 3. Tech Stack

The frontend is built with:

- **React** + **TypeScript**
- **Vite** (build and dev server)
- **Tailwind CSS** and **shadcn‑ui** for styling and components

No backend services are required for running the demo locally; all logic is client‑side.

---

## 4. Getting Started

### 4.1 Prerequisites

- Node.js (LTS recommended)  
- npm, pnpm, or yarn

### 4.2 Installation

```bash
# Clone the repository
git clone https://github.com/vs3kulic/eff-demo
cd eff-demo

# Install dependencies
npm install
```

### 4.3 Running the Development Server

```bash
# Start the development server
npm run dev
```

The application will be available at `http://localhost:5173` (or another port if 5173 is occupied).

### 4.4 Building for Production

```bash
# Create an optimized production build
npm run build

# Preview the production build locally
npm run preview
```

---

## 5. Relation to the Ethics Filter Framework

This application is a **concrete instantiation** of the Ethics Filter Framework (EFF):

- Each major feature (questionnaire, recommendations, AI tips, newsletter) is specified by:
  - a baseline user story (v1), and  
  - a corresponding EFF‑enhanced user story (v2) with a value‑oriented harm clause and measurable ethical acceptance criteria.
- The v2 stories operationalize stakeholder values (e.g., Privacy, Fairness, Explainability, Safety, Utility) as testable conditions rather than high‑level principles.

By comparing Yogi v1 and Yogi v2 in the running app and in the user story repository, you can see how EFF:

- Elicits stakeholder values and ethical risks.
- Translates them into constraints on behavior and data handling.
- Changes the resulting system without altering the overall business goal of recommending yoga classes.

---

## 6. Reuse and Extension

You are welcome to reuse or extend this repository:

- **Research and teaching**
  - Demonstrate the impact of ethical requirements in software engineering courses.
  - Use v1/v2 as a template for new case studies in other domains (e.g., health, finance, public services).

- **Practitioner experiments**
  - Replace the questionnaire content and recommendation rules while preserving the baseline vs. EFF structure.
  - Draft your own EFF‑enhanced user stories and verify how they affect the UI, data flows, and copy.

If you build on this work in academic publications or reports, please cite the associated paper and reference this repository as the implementation artifact.

---

## 7. License

This project is released under the following license:

> MIT License – see `LICENSE` for the full text.

If you adapt or extend the code, please retain the license header and clearly mark your changes.

---

## 8. Contact

For questions about:

- the **Ethics Filter Framework (EFF)**,  
- the **Yogi case study**, or  
- the associated **user story repository**,

please refer to the author contact details provided in the published paper or contact the corresponding author via their institutional email address.

Bug reports and minor issues related to this repository can also be submitted as GitHub issues.
