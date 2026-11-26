# AKONDA GLOBAL WORLD — Portal Prototype & Integration Status
Updated: 26 November 2026

## What was committed
- Added `portal.html`: responsive service-portal prototype with:
  - Overview dashboard
  - Job/category search and local demo job entries
  - Planned 41-country directory (the previous documented list had 38 countries; Japan, Malaysia and United Arab Emirates are shown as proposed additions and must be confirmed against the owner's authoritative list)
  - Worker registration and company registration demo forms
  - Visa/invitation official-source discovery searches (not certified direct application links)
  - Flight route/date search links to external providers
  - Popular skills/language/certificate course catalogue
  - Text translation via an external public endpoint where available, browser speech input and text-to-speech
- Added a Service portal link to the existing homepage navigation.
- Corrected the homepage brand spelling from AKONDO to AKONDA.

## What works in this prototype
- Responsive navigation and portal sections.
- Demo job/worker/company/course forms save non-sensitive demo entries in the current browser's local storage only.
- Search and filters work on demo job records.
- External flight-search links are prepared from the route/date form.
- Visa pages create search links to help users find government/embassy information; these are not guaranteed direct application links.
- Text translation can be attempted through an external translation endpoint; browser speech features depend on device/browser support.

## What is NOT production-ready
- Local-storage records are not shared with the company, other users or a server; they are not emailed.
- No verified live vacancy feed or employer identity verification is connected.
- No live flight fares are displayed inside this portal. External flight search links are not an all-airline live-price API.
- No visa application is submitted to a government and no invitation is issued automatically.
- No secure document upload, user login, admin authorization, shared database, email notification, payment, or certificate issuing/verification backend is connected.
- No live voice-to-voice translation, voice call or video call is enabled. Video calling requires a secure WebRTC/signalling backend, authentication, permissions, privacy and abuse controls.
- The 41-country scope needs owner confirmation: the documented earlier list had 38 countries. Do not claim all 41 government invitation links are verified until every link is checked against an official source.
- The supplied email wording was previously ambiguous. Confirm the exact monitored email address before production forms send customer data.

## Required next implementation steps
1. Confirm the authoritative 41-country list and the exact monitored business email.
2. Add a secure backend and database; create worker, employer, admin and reviewer roles with email verification.
3. Add server-side enquiry submission and email notifications; do not put secrets in frontend code.
4. Configure an authorized job-data provider (Careerjet access requires an API key; availability and terms must be confirmed) and mark listings with source and last-verified timestamps.
5. Configure a flight-price provider and server-side API credentials. Amadeus or other provider access/market eligibility/terms must be checked. Reconfirm final prices at provider checkout; ticket issuance may require a consolidator or relevant authorization.
6. Build and manually verify the country-specific official visa/invitation link directory.
7. Implement secure temporary document uploads only after approval, with private storage, signed expiry links, access control, retention/deletion rules and audit logs.
8. Integrate a translation provider through a secure backend and add clear privacy notices. Treat automated translation as assistance, not legal/certified translation.
9. Implement voice/video communications using a secure real-time communications architecture only after consent, account security, abuse reporting and retention controls are specified.
10. Run build, mobile/browser, accessibility, security and end-to-end tests; verify deployment URL before announcing launch.

## Safety rules
- Do not publish a vacancy as live without source verification.
- Do not claim a visa, invitation, certificate, job, salary or ticket is guaranteed.
- Do not collect passport/NID/bank details in demo forms.
- Do not commit API keys, passwords or private tokens to GitHub.
- Do not call this prototype production-ready until the blockers above are resolved.
