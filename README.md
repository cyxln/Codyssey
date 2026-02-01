# OpenJWL's HPFPI-based Model Web

A digital platform documenting and promoting community-led societal development, disaster preparedness, and resilience building based on the proven model of the Homeless People's Federation Philippines, Inc. (HPFPI).

## 📋 Project Description

This website serves as a comprehensive resource hub focused on four interconnected themes of societal development:

- **Disaster Management and Preparedness** — Shifting from reactive response to proactive community-led risk reduction
- **Community Empowerment** — Promoting ownership-based approaches over top-down charity models
- **Awareness** — Educating stakeholders about the links between poverty, insecure tenure, and disaster vulnerability
- **Societal Innovation** — Showcasing innovative community-driven tools and solutions

The platform documents the methodologies, strategies, and lessons learned from the Philippine Alliance (HPFPI–PACSII) experience, making this knowledge accessible to communities, practitioners, policymakers, and the general public worldwide.

### Key Objectives

1. Document and disseminate proven community-led development models  
2. Promote a paradigm shift from charity-based to empowerment-based approaches  
3. Build awareness and catalyze action on disaster resilience  
4. Foster learning and innovation through knowledge sharing

---

## 🌍 Core Functionality: Hazard Mapping + AI Guidance

### 1) Location Input and Vulnerability Assessment
- OpenStreetMap-based interactive view where users:
  - Click anywhere on the map to select a location (captures latitude/longitude)
  - Or enter an address/place name (geocoding)
- Reverse geocoding (e.g., Nominatim or another provider) to resolve human-readable location data
- Overlay hazard information (e.g., flood zones, earthquake faults, landslide susceptibility, typhoon tracks)
- Compute a simple risk score (Low/Medium/High) using factors like:
  - Proximity to waterways/floodplains
  - Earthquake and volcanic hazard maps
  - Recent advisories and historical events
  - Elevation/slope
  - Population density
  - Proximity to critical infrastructure (hospitals, evacuation centers)

### 2) AI-Powered Preparedness Suggestions
- Uses **OpenRouter** to call an AI model that:
  - Interprets the location context and hazard signals
  - Summarizes recent advisories via a web search tool (e.g., Exa)
  - Produces tailored, actionable preparedness steps aligned with community-led DRR best practices

### 3) Example User Flow
1. User selects a point on the map or enters an address  
2. App captures coordinates and reverse geocodes to get the place name  
3. App queries hazard datasets and performs focused web search for recent advisories  
4. AI analyzes signals to produce a risk level, hazard list, and localized recommendations  
5. Results are displayed with links to authoritative sources

---

## 🧱 Architecture Overview

- Frontend (React + Next.js)
  - Map view (OpenStreetMap tiles), location selection, and results display
  - Address input and reverse geocoding for context

- Backend (Next.js API routes)
  - Aggregates data from open hazard sources (see “Data Sources”)
  - Uses a web search tool (e.g., Exa) to fetch current events/info related to the area
  - Calls OpenRouter to generate structured risk assessments and recommendations

- Risk Engine (Basic)
  - Combines spatial overlays + recent advisories into a normalized score
  - Returns: risk level, hazards, and AI-generated preparedness steps

---

## 🗂️ Data Sources (Examples)

- Earthquakes/Faults: USGS; PHIVOLCS (Philippines)
- Volcano Hazards: PHIVOLCS (Philippines)
- Tropical Cyclones: PAGASA (Philippines); NOAA IBTrACS (global)
- Flood Risk: NAMRIA/DPWH (Philippines); Global Flood datasets
- Elevation/Slope: SRTM/ASTER; OpenTopography
- Population Density: WorldPop; GHSL
- Basemaps/Geocoding: OpenStreetMap, Nominatim (or similar)

Note: Verify licensing and usage terms for each dataset. Attribute sources in the UI where appropriate.

---

## 🛠️ Tools Used

| Tool | Purpose |
|------|---------|
| **VS Code** | Primary code editor and development environment |
| **Figma** | UI/UX design and prototyping |
| **React** | Frontend JavaScript library for building user interfaces |
| **Next.js** | React framework for production-grade applications (API routes, SSR/SSG) |
| **OpenStreetMap** | Basemap tiles and geographic data |
| **Web Search Tool** | Fetches live and recent information for analysis |
| **OpenRouter** | Calls AI models for risk analysis and recommendations |
| **Exa (Exa Search API)** | AI-native web search used to retrieve up-to-date, credible sources and extract clean content to ground assessments with citations |

Optional/Extensible:
- **Geocoding provider** (e.g., Nominatim, OpenCage, Geocode Earth)
- **Map library** of choice if needed (e.g., Mapbox GL JS)

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm

### Install
```bash
npm install
```

### Run (Development)
```bash
npm run dev
```

### Environment Variables
Create a `.env.local` file and set:
```
OPENROUTER_API_KEY=your_openrouter_key
EXA_API_KEY=your_exa_key
# Add geocoding provider keys if applicable
```

### Operational Notes
- OpenStreetMap tiles: follow the OSM Tile Usage Policy; consider hosted tiles for production use
- Geocoding: respect provider rate limits and usage requirements
- Disclaimers: Clearly state the app provides informational guidance and does not replace official government warnings or emergency instructions

---

## 👥 Developers

| Name | Role |
|------|------|
| Repana, Jellian | Front End |
| Bautista, Wyatt Marcus | Back End |
| De Leon, Ma. Lhira | Researcher |
|  |  |

---

## 📚 References

- Asian Coalition for Housing Rights (ACHR). (n.d.). Citywide upgrading in Iloilo City, Philippines [PDF document]. http://www.achr.net/upload/downloads/file_13112019091044.pdf  
- Asian Coalition for Housing Rights (ACHR). (n.d.). Community-led housing and land acquisition in the Philippines [PDF document]. http://www.achr.net/upload/downloads/file_13112019111227.pdf  
- d’Cruz, C., & Satterthwaite, D. (2006). Grassroots organizations & urban poverty reduction. Global Urban Development Magazine, 2(1). https://www.globalurban.org/GUDMag06Vol2Iss1/d’Cruz%20%26%20Satterthwaite.htm  
- Gongadze, S., & Maassen, A. (2023, January 11). Inclusive housing & flood protection in Iloilo City, Philippines. World Resources Institute. https://www.wri.org/insights/iloilo-city-philippines-housing-flood-protection  
- Institute of Environmental Science for Social Change (ESSC). (n.d.). ESSC joins RURBANISE project on urbanization patterns & differential vulnerabilities. https://essc.org.ph/content/essc-joins-rurbanise-project-on-urbanization-patterns-and-differential-vulnerabilities-works-with-informal-communities-at-risk-to-flooding-and-landslides/  
- Rayos Co, J. C. (2010). Community-driven disaster intervention: Experiences of the Homeless People's Federation Philippines, Incorporated (HPFPI). Human Settlements Working Paper Series. https://www.iied.org/sites/default/files/pdfs/migrate/10587IIED.pdf  
- SM Hotels and Conventions Corp. (2024, October 29). SM Hotels & Conventions Corp. launches Tela Tales in Iloilo and Bacolod. Philstar. https://www.philstar.com/lifestyle/business-life/2024/10/29/2392950/sm-hotels-and-conventions-corp-launches-tela-tales-iloilo-and-bacolod  
- The Bartlett Development Planning Unit. (2015, March 17). Philippine Alliance: Collaboration for planning and design. UCL DPU Blog. https://blogs.ucl.ac.uk/dpublog/2015/03/17/philippine-alliance-collaboration-for-planning-design/  
- UK in the Philippines. (n.d.). Home [Facebook page]. Retrieved October 30, 2024, from https://www.facebook.com/ukinthephilippines  
- Vincentian Missionaries Social Development Foundation Incorporated (VMSDFI). (2001). Meet the Philippines Homeless People's Federation. PHILIPPINES HOMELESS PEOPLE'S FEDERATION, 13(2). http://www.achr.net/upload/downloads/file_13112019091044.pdf  


This project aims to democratize access to community-led development knowledge and contribute to building resilient societies from the ground up.
