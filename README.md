<!--
    AI Support Request Router - Frontend Portal & Admin View
    Role: Forward Deployment Engineer Assessment
    GitHub: https://github.com/the-abhishek-singh
-->

<!-- Banner -->
<a href="https://abhishekworks.com" target="_blank">
  <img src="https://i.pinimg.com/originals/d5/84/0b/d5840b194bc468e606984aa99f6558c8.gif" alt="Portfolio Banner" style="width:100%; height:auto"/>
</a>

</br>

<img src="https://media.tenor.com/Gh3LKX9HMFkAAAAj/hollow-knight-knight.gif" width=330 align="left">

<div align="center">
  
**🪄 About This Project**
</div>

<div align="justify">

This is the **Frontend Client & Admin Router View** for the AI Support Request Router application. 

It provides an intuitive dual-panel interface allowing end users to submit categorized support tickets and administrators to monitor, filter, and triage requests in real-time. Built with **Next.js (App Router)** and **Tailwind CSS**, it features instant feedback banners for idempotent deduplication and clear visual accents for high-priority escalation.

🌐 **Live URL:** [https://eqourse-frontend.vercel.app](https://eqourse-frontend.vercel.app)

</div>
</br>

<img align="right" alt="about-me-gif" width="300" src="https://i.pinimg.com/originals/10/27/f8/1027f80aeabcbb74a2e698be71829e9e.gif"></br>

<h3 align="center">
  <img src="https://cdn-icons-png.flaticon.com/512/1077/1077114.png" width=18>
    Core Features & Panels
  <img src="https://cdn-icons-png.flaticon.com/512/1077/1077114.png" width=18>
</h3>

🟣 **Ticket Submission Portal:** Clean form capturing `Name`, `Email`, `Message`, and `Priority` (`Low`, `Medium`, `High`). </br>
🟪 **Admin Router Dashboard:** Comprehensive table displaying customer details, assigned categories, classification sources (`AI` vs `FALLBACK`), and creation timestamps. </br>
🟣 **Special High-Priority Styling:** Distinct crimson badges and alert icons for urgent triage tickets. </br>
🟪 **Dynamic Filtering:** Instant multi-variable filtering by Priority and Category directly within the dashboard. </br>
🟣 **Context-Aware Feedback:** Responsive UI banners indicating whether a submission was freshly created, caught within the 60-second duplicate window, or escalated in priority. </br>
🟪 **Network Resilience:** Graceful state handling and alerts if the backend server is unreachable. </br>
ㅤ

<div align="center"> 
  <a href="mailto:dev.abhishekworks@gmail.com" target="_blank">
    <img src="https://skillicons.dev/icons?i=gmail" />
  </a>
  <a href="https://www.linkedin.com/in/abhishek-singh-399645272/" target="_blank">
    <img src="https://skillicons.dev/icons?i=linkedin" />
  </a> 
  <a href="https://open.spotify.com/playlist/6m17JoyqPYP3euc31KIBaH" target="_blank">
    <img src="https://cdn.iconscout.com/icon/free/png-256/free-spotify-11-432546.png?f=webp" width="48px" />
  </a>
</div>

</br>

<h3 align="center">
<img src="https://cdn-icons-png.flaticon.com/512/1006/1006771.png" width=20>
  Tech Stack & Tools Used
<img src="https://cdn-icons-png.flaticon.com/512/1006/1006771.png" width=20>
</h3>

<div align="center">
  <img src="https://skillicons.dev/icons?i=nextjs,react,ts,tailwind,vercel,git,github,vscode&theme=dark" /><br>
  <p align="center"><b>UI Icons:</b> Lucide React • <b>Styling:</b> Tailwind CSS</p>
</div>

</br>

<h3 align="center">
  <img src="https://cdn-icons-png.flaticon.com/512/1828/1828884.png" width="16px">
    Installation & Setup
  <img src="https://cdn-icons-png.flaticon.com/512/1828/1828884.png" width="16px">
</h3>

```bash
# 1️⃣ Clone this repo
git clone [https://github.com/the-abhishek-singh/eqourse_frontend.git](https://github.com/the-abhishek-singh/eqourse_frontend.git)

# 2️⃣ Move into the project directory
cd eqourse_frontend

# 3️⃣ Install dependencies
npm install

# 4️⃣ Configure Environment Variables (.env.local)
# Create a .env.local file:
# NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api

# 5️⃣ Run the development server
npm run dev
