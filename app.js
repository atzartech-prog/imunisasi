/**
 * ImuniCare - Parent Portal & Baby Immunization Tracker
 * Core Application Logic (HTML5 LocalStorage DB, SHA-256 Hashing, JSON Import/Export, PDF Printing)
 */

document.addEventListener("DOMContentLoaded", () => {
    // ==========================================
    // 1. CONFIGURATION & HASHES
    // ==========================================
    // Pre-computed SHA-256 Hashes:
    // admin     -> 8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918
    // bismillah -> a1dd395c19f3a1f7ff0e6bfe3ee6028e4373b41085a6da776ab02a8baf129abb
    const AUTH_CONFIG = {
        userHash: "8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918",
        passHash: "a1dd395c19f3a1f7ff0e6bfe3ee6028e4373b41085a6da776ab02a8baf129abb"
    };

    // Initial 20 Immunization Records (Requested by user)
    const INITIAL_RECORDS = [
        { id: 1, date: "2024-05-31", vaccine: "POLIO", notes: "Polio 1 / Tetes oral pertama", status: "Selesai" },
        { id: 2, date: "2024-06-15", vaccine: "IMUNISASI BCG", notes: "Mencegah penyakit Tuberkulosis (TBC)", status: "Selesai" },
        { id: 3, date: "2024-06-22", vaccine: "HEXAXIM", notes: "Dosis 1 (DPT, Hep B, Hib, Polio IPV)", status: "Selesai" },
        { id: 4, date: "2024-07-05", vaccine: "PREVENAR (IPD)", notes: "PCV 1 - Pencegah Radang Paru & Selaput Otak", status: "Selesai" },
        { id: 5, date: "2024-07-20", vaccine: "ROTARIX", notes: "Rotavirus 1 - Pencegah Diare Berat", status: "Selesai" },
        { id: 6, date: "2024-08-03", vaccine: "HEXAXIM", notes: "Dosis 2 (DPT, Hep B, Hib, Polio IPV)", status: "Selesai" },
        { id: 7, date: "2024-08-16", vaccine: "PREVENAR (IPD)", notes: "PCV 2 - Pencegah Radang Paru & Selaput Otak", status: "Selesai" },
        { id: 8, date: "2024-08-31", vaccine: "ROTARIX", notes: "Rotavirus 2 - Pencegah Diare Berat", status: "Selesai" },
        { id: 9, date: "2024-09-14", vaccine: "HEXAXIM", notes: "Dosis 3 (DPT, Hep B, Hib, Polio IPV)", status: "Selesai" },
        { id: 10, date: "2024-10-05", vaccine: "PREVENAR (IPD)", notes: "PCV 3 - Booster Dosis Lengkap", status: "Selesai" },
        { id: 11, date: "2024-11-12", vaccine: "VAXIGRIP TETRA", notes: "Influenza Dosis 1", status: "Selesai" },
        { id: 12, date: "2024-11-30", vaccine: "INLIVE", notes: "Enterovirus EV71 Dosis 1 - Mencegah HFMD (Flu Singapura)", status: "Selesai" },
        { id: 13, date: "2024-12-11", vaccine: "VAXIGRIP TETRA", notes: "Influenza Dosis 2", status: "Selesai" },
        { id: 14, date: "2024-12-28", vaccine: "INLIVE", notes: "Enterovirus EV71 Dosis 2", status: "Selesai" },
        { id: 15, date: "2025-02-15", vaccine: "CAMPAK - M", notes: "MR Dosis 1 - Pencegah Campak & Rubella", status: "Selesai" },
        { id: 16, date: "2025-04-19", vaccine: "Imojev JE", notes: "Japanese Encephalitis Dosis 1 - Radang Otak", status: "Selesai" },
        { id: 17, date: "2025-07-19", vaccine: "VARICELA", notes: "Varisela Dosis 1 - Pencegah Cacar Air", status: "Selesai" },
        { id: 18, date: "2025-08-02", vaccine: "HEPATITIS A", notes: "Hepatitis A Dosis 1", status: "Selesai" },
        { id: 19, date: "2025-11-01", vaccine: "VARICELA", notes: "Varisela Dosis 2", status: "Selesai" },
        { id: 20, date: "2025-11-29", vaccine: "HEXAXIM", notes: "Booster Lanjutan DPT-HB-Hib di usia 18 bulan", status: "Selesai" }
    ];

    const INITIAL_PROFILE = {
        name: "Muhammad Al-Fatih",
        dob: "2024-04-01",
        gender: "Laki-laki",
        weight: "3.2",
        height: "50",
        mother: "Fatimah",
        father: "Ali"
    };

    // SVG Avatars for Baby Profile card
    const SVGS = {
        boy: `<svg viewBox="0 0 100 100" width="100%" height="100%">
                <circle cx="50" cy="50" r="48" fill="#e0f2fe" stroke="#38bdf8" stroke-width="3"/>
                <circle cx="50" cy="45" r="22" fill="#fdba74"/>
                <path d="M28 40c0-12 10-20 22-20s22 8 22 20c-4-4-10-6-15-4-3-3-9-3-12 0-5-2-11 0-15 4z" fill="#78350f"/>
                <circle cx="43" cy="42" r="3" fill="#1e293b"/>
                <circle cx="57" cy="42" r="3" fill="#1e293b"/>
                <path d="M44 52q6 5 12 0" stroke="#1e293b" stroke-width="3" fill="none" stroke-linecap="round"/>
                <circle cx="38" cy="48" r="3" fill="#f43f5e" opacity="0.3"/>
                <circle cx="62" cy="48" r="3" fill="#f43f5e" opacity="0.3"/>
              </svg>`,
        girl: `<svg viewBox="0 0 100 100" width="100%" height="100%">
                <circle cx="50" cy="50" r="48" fill="#fce7f3" stroke="#f472b6" stroke-width="3"/>
                <circle cx="50" cy="45" r="22" fill="#fde047"/>
                <path d="M28 42c0-12 10-22 22-22s22 10 22 22v4c0 3-2 5-5 5s-4-2-4-5v-2c0-1 0-2-1-2s-2 1-3 2c-3 3-7 3-10 0-1-1-2-2-3-2s-1 1-1 2v2c0 3-2 5-5 5s-5-2-5-5v-4z" fill="#db2777"/>
                <path d="M35 25q5-8 10-2q-5 8-10 2M65 25q-5-8-10-2q5 8 10 2" fill="#ec4899"/>
                <circle cx="43" cy="42" r="3" fill="#1e293b"/>
                <circle cx="57" cy="42" r="3" fill="#1e293b"/>
                <path d="M44 52q6 5 12 0" stroke="#1e293b" stroke-width="3" fill="none" stroke-linecap="round"/>
                <circle cx="38" cy="48" r="3" fill="#f43f5e" opacity="0.4"/>
                <circle cx="62" cy="48" r="3" fill="#f43f5e" opacity="0.4"/>
               </svg>`
    };

    // ==========================================
    // 2. CRYPTO SECURE HASHING UTILITY
    // ==========================================
    async function sha256(text) {
        const msgBuffer = new TextEncoder().encode(text);
        const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
        return hashHex;
    }

    // ==========================================
    // 3. DATE CONVERSIONS UTILS
    // ==========================================
    // Format YYYY-MM-DD from storage to DD-MM-YYYY for display
    function formatDisplayDate(isoDateStr) {
        if (!isoDateStr) return "-";
        const parts = isoDateStr.split("-");
        if (parts.length === 3) {
            return `${parts[2]}-${parts[1]}-${parts[0]}`;
        }
        return isoDateStr;
    }

    // Calculate baby age based on birthday
    function calculateAge(dobString) {
        if (!dobString) return "Usia: -";
        const dob = new Date(dobString);
        const today = new Date();
        
        let years = today.getFullYear() - dob.getFullYear();
        let months = today.getMonth() - dob.getMonth();
        let days = today.getDate() - dob.getDate();
        
        if (days < 0) {
            months -= 1;
            const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
            days += prevMonth.getDate();
        }
        
        if (months < 0) {
            years -= 1;
            months += 12;
        }
        
        let ageStr = "Usia: ";
        if (years > 0) ageStr += `${years} Tahun `;
        if (months > 0) ageStr += `${months} Bulan `;
        if (days > 0 || (years === 0 && months === 0)) ageStr += `${days} Hari`;
        
        return ageStr;
    }

    // ==========================================
    // 4. STORAGE ACCESSORS (LOCAL STORAGE)
    // ==========================================
    function getRecords() {
        const records = localStorage.getItem("imunicare_records");
        if (!records) {
            localStorage.setItem("imunicare_records", JSON.stringify(INITIAL_RECORDS));
            return INITIAL_RECORDS;
        }
        return JSON.parse(records);
    }

    function saveRecords(recordsArray) {
        localStorage.setItem("imunicare_records", JSON.stringify(recordsArray));
    }

    function getProfile() {
        const profile = localStorage.getItem("imunicare_profile");
        if (!profile) {
            localStorage.setItem("imunicare_profile", JSON.stringify(INITIAL_PROFILE));
            return INITIAL_PROFILE;
        }
        return JSON.parse(profile);
    }

    function saveProfile(profileObj) {
        localStorage.setItem("imunicare_profile", JSON.stringify(profileObj));
    }

    // ==========================================
    // 5. DOM ELEMENTS REFERENCE
    // ==========================================
    const loginContainer = document.getElementById("login-container");
    const appContainer = document.getElementById("app-container");
    const loginForm = document.getElementById("login-form");
    const loginError = document.getElementById("login-error");
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const logoutBtn = document.getElementById("logout-btn");

    const menuItems = document.querySelectorAll(".menu-item");
    const tabPanes = document.querySelectorAll(".tab-pane");
    const tabTitle = document.getElementById("tab-title");
    const tabSubtitle = document.getElementById("tab-subtitle");

    // Profile DOM Elements
    const babyNameSummary = document.getElementById("baby-name-summary");
    const babyAgeSummary = document.getElementById("baby-age-summary");
    const babyDobSummary = document.getElementById("baby-dob-summary");
    const babyWeightSummary = document.getElementById("baby-weight-summary");
    const babyHeightSummary = document.getElementById("baby-height-summary");
    const babyAvatar = document.getElementById("baby-avatar");

    const profileForm = document.getElementById("profile-form");
    const pBabyName = document.getElementById("p-baby-name");
    const pBabyGender = document.getElementById("p-baby-gender");
    const pBabyDob = document.getElementById("p-baby-dob");
    const pBabyWeight = document.getElementById("p-baby-weight");
    const pBabyHeight = document.getElementById("p-baby-height");
    const pMotherName = document.getElementById("p-mother-name");
    const pFatherName = document.getElementById("p-father-name");

    // Stats DOM Elements
    const progressCircle = document.getElementById("progress-circle");
    const progressPercentage = document.getElementById("progress-percentage");
    const statsSelesai = document.getElementById("stats-selesai");
    const statsBelum = document.getElementById("stats-belum");
    const statsTotal = document.getElementById("stats-total");
    const nextVaccineText = document.getElementById("next-vaccine-text");

    // Records DOM Elements
    const recentVaccineList = document.getElementById("recent-vaccine-list");
    const vaccineTableBody = document.getElementById("vaccine-table-body");
    const addVaccineBtn = document.getElementById("add-vaccine-btn");
    const searchInput = document.getElementById("search-input");
    const statusFilter = document.getElementById("status-filter");
    const linkToAllVaccines = document.getElementById("link-to-all-vaccines");

    // Modal DOM Elements
    const vaccineModal = document.getElementById("vaccine-modal");
    const vaccineForm = document.getElementById("vaccine-form");
    const modalTitle = document.getElementById("modal-title");
    const vaccineIdInput = document.getElementById("vaccine-id");
    const vDate = document.getElementById("v-date");
    const vName = document.getElementById("v-name");
    const vNotes = document.getElementById("v-notes");
    const vStatus = document.getElementById("v-status");
    const closeVaccineModal = document.getElementById("close-vaccine-modal");
    const cancelVaccineBtn = document.getElementById("cancel-vaccine-btn");

    // Backup & Restore DOM Elements
    const exportBtn = document.getElementById("export-btn");
    const importFile = document.getElementById("import-file-input");
    const importTriggerBtn = document.getElementById("import-trigger-btn");
    const selectedFileName = document.getElementById("selected-file-name");
    const resetDbBtn = document.getElementById("reset-db-btn");

    // Print & PDF Elements
    const printPdfBtn = document.getElementById("print-pdf-btn");

    // ==========================================
    // 6. LOGIN / AUTHENTICATION CONTROLLER
    // ==========================================
    async function handleLogin(e) {
        e.preventDefault();
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        // Hash credentials
        const hashedUser = await sha256(username);
        const hashedPassword = await sha256(password);

        // Verify with pre-computed hashes
        if (hashedUser === AUTH_CONFIG.userHash && hashedPassword === AUTH_CONFIG.passHash) {
            sessionStorage.setItem("imunicare_logged_in", "true");
            loginError.classList.add("hidden");
            usernameInput.value = "";
            passwordInput.value = "";
            showDashboard();
        } else {
            loginError.classList.remove("hidden");
        }
    }

    function checkLoginState() {
        if (sessionStorage.getItem("imunicare_logged_in") === "true") {
            showDashboard();
        } else {
            showLogin();
        }
    }

    function showDashboard() {
        loginContainer.classList.add("hidden");
        appContainer.classList.remove("hidden");
        initApp();
    }

    function showLogin() {
        appContainer.classList.add("hidden");
        loginContainer.classList.remove("hidden");
    }

    function handleLogout() {
        if (confirm("Apakah Anda yakin ingin keluar dari aplikasi?")) {
            sessionStorage.removeItem("imunicare_logged_in");
            showLogin();
        }
    }

    // ==========================================
    // 7. TAB ROUTING CONTROLLER
    // ==========================================
    function switchTab(tabId) {
        // Toggle Nav Button highlight
        menuItems.forEach(item => {
            if (item.getAttribute("data-tab") === tabId) {
                item.classList.add("active");
            } else {
                item.classList.remove("active");
            }
        });

        // Show relevant tab layout pane
        tabPanes.forEach(pane => {
            if (pane.id === `tab-${tabId}`) {
                pane.classList.add("active");
            } else {
                pane.classList.remove("active");
            }
        });

        // Set layout title & description
        switch(tabId) {
            case "dashboard":
                tabTitle.textContent = "Dasbor Pemantauan";
                tabSubtitle.textContent = "Status imunisasi & ringkasan tumbuh kembang buah hati.";
                updateStats();
                renderRecentVaccines();
                break;
            case "profile":
                tabTitle.textContent = "Profil Bayi";
                tabSubtitle.textContent = "Kelola informasi diri bayi Anda untuk menghitung jadwal vaksin.";
                loadProfileForm();
                break;
            case "data-imunisasi":
                tabTitle.textContent = "Catatan Vaksin";
                tabSubtitle.textContent = "Daftar riwayat imunisasi lengkap beserta jadwal berikutnya.";
                renderVaccineTable();
                break;
            case "backup":
                tabTitle.textContent = "Ekspor & Impor";
                tabSubtitle.textContent = "Cadangkan data Anda secara lokal atau pulihkan file data cadangan.";
                selectedFileName.textContent = "Belum ada file terpilih";
                importFile.value = "";
                break;
        }
    }

    // ==========================================
    // 8. DATA RENDERING & COMPUTATION
    // ==========================================
    function initApp() {
        // Initial load of statistics and profiles
        updateStats();
        renderRecentVaccines();
        loadProfileForm();
        renderVaccineTable();
    }

    function updateStats() {
        const records = getRecords();
        const profile = getProfile();

        // Update profile summaries
        babyNameSummary.textContent = profile.name;
        babyDobSummary.textContent = formatDisplayDate(profile.dob);
        babyWeightSummary.textContent = `${profile.weight} Kg`;
        babyHeightSummary.textContent = `${profile.height} Cm`;
        babyAgeSummary.textContent = calculateAge(profile.dob);

        // Update profile avatar based on gender
        if (profile.gender === "Perempuan") {
            babyAvatar.innerHTML = SVGS.girl;
        } else {
            babyAvatar.innerHTML = SVGS.boy;
        }

        // Totals counting
        const total = records.length;
        const selesai = records.filter(r => r.status === "Selesai").length;
        const belum = total - selesai;
        const percentage = total > 0 ? Math.round((selesai / total) * 100) : 0;

        statsTotal.textContent = total;
        statsSelesai.textContent = selesai;
        statsBelum.textContent = belum;
        progressPercentage.textContent = `${percentage}%`;

        // SVG progress stroke offset drawing
        // Radius of circular svg is 50, circumference is 2 * pi * r = 314.159
        const radius = 50;
        const circumference = 2 * Math.PI * radius;
        progressCircle.style.strokeDasharray = `${circumference} ${circumference}`;
        const offset = circumference - (percentage / 100) * circumference;
        progressCircle.style.strokeDashoffset = offset;

        // Next Upcoming Vaccine Finder
        // Filter "Jadwal" and sort dates ascending
        const upcomingVaccines = records
            .filter(r => r.status === "Jadwal")
            .sort((a, b) => new Date(a.date) - new Date(b.date));

        if (upcomingVaccines.length > 0) {
            const next = upcomingVaccines[0];
            nextVaccineText.innerHTML = `<strong>${next.vaccine}</strong> dijadwalkan pada tanggal <strong>${formatDisplayDate(next.date)}</strong> (${next.notes || "Tidak ada catatan"})`;
            document.getElementById("next-schedule-banner").classList.remove("hidden");
        } else {
            nextVaccineText.textContent = "Semua imunisasi yang dijadwalkan sudah selesai dilakukan!";
        }
    }

    function renderRecentVaccines() {
        const records = getRecords();
        // Sort descending by date to show newest/latest first
        const sorted = [...records].sort((a, b) => new Date(b.date) - new Date(a.date));
        const recent = sorted.slice(0, 5); // limit to 5 items

        recentVaccineList.innerHTML = "";
        
        if (recent.length === 0) {
            recentVaccineList.innerHTML = `<tr><td colspan="5" class="text-center text-muted">Belum ada riwayat imunisasi.</td></tr>`;
            return;
        }

        recent.forEach((item, index) => {
            const tr = document.createElement("tr");
            const statusBadge = item.status === "Selesai" 
                ? `<span class="badge badge-success">Selesai</span>` 
                : `<span class="badge badge-warning">Jadwal</span>`;

            tr.innerHTML = `
                <td>${index + 1}</td>
                <td>${formatDisplayDate(item.date)}</td>
                <td><strong>${item.vaccine}</strong></td>
                <td>${item.notes || "-"}</td>
                <td>${statusBadge}</td>
            `;
            recentVaccineList.appendChild(tr);
        });
    }

    function renderVaccineTable() {
        const records = getRecords();
        const searchQuery = searchInput.value.toLowerCase().trim();
        const statusVal = statusFilter.value;

        // Filter database query
        let filtered = records.filter(item => {
            const matchesSearch = item.vaccine.toLowerCase().includes(searchQuery) || 
                                  (item.notes && item.notes.toLowerCase().includes(searchQuery));
            const matchesStatus = statusVal === "Semua" || item.status === statusVal;
            return matchesSearch && matchesStatus;
        });

        // Sort table records chronologically (by Date ascending)
        filtered.sort((a, b) => new Date(a.date) - new Date(b.date));

        vaccineTableBody.innerHTML = "";

        if (filtered.length === 0) {
            vaccineTableBody.innerHTML = `<tr><td colspan="6" class="text-center text-muted">Data imunisasi tidak ditemukan.</td></tr>`;
            return;
        }

        filtered.forEach((item, index) => {
            const tr = document.createElement("tr");
            const statusBadge = item.status === "Selesai" 
                ? `<span class="badge badge-success">Selesai</span>` 
                : `<span class="badge badge-warning">Jadwal</span>`;

            tr.innerHTML = `
                <td>${index + 1}</td>
                <td>${formatDisplayDate(item.date)}</td>
                <td><strong>${item.vaccine}</strong></td>
                <td>${item.notes || "-"}</td>
                <td>${statusBadge}</td>
                <td>
                    <div class="action-buttons">
                        <button class="btn-icon edit-btn" data-id="${item.id}" title="Edit Data">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
                        </button>
                        <button class="btn-icon delete-btn" data-id="${item.id}" title="Hapus Data">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                        </button>
                    </div>
                </td>
            `;
            vaccineTableBody.appendChild(tr);
        });

        // Re-bind action button click event listeners
        document.querySelectorAll(".edit-btn").forEach(btn => {
            btn.addEventListener("click", () => openEditModal(btn.getAttribute("data-id")));
        });

        document.querySelectorAll(".delete-btn").forEach(btn => {
            btn.addEventListener("click", () => deleteVaccineRecord(btn.getAttribute("data-id")));
        });
    }

    // ==========================================
    // 9. PROFILE MANAGEMENT
    // ==========================================
    function loadProfileForm() {
        const profile = getProfile();
        pBabyName.value = profile.name || "";
        pBabyGender.value = profile.gender || "Laki-laki";
        pBabyDob.value = profile.dob || "";
        pBabyWeight.value = profile.weight || "";
        pBabyHeight.value = profile.height || "";
        pMotherName.value = profile.mother || "";
        pFatherName.value = profile.father || "";
    }

    function saveBabyProfile(e) {
        e.preventDefault();
        const updatedProfile = {
            name: pBabyName.value.trim(),
            gender: pBabyGender.value,
            dob: pBabyDob.value,
            weight: pBabyWeight.value,
            height: pBabyHeight.value,
            mother: pMotherName.value.trim(),
            father: pFatherName.value.trim()
        };

        saveProfile(updatedProfile);
        updateStats();
        alert("Profil bayi berhasil diperbarui!");
        switchTab("dashboard");
    }

    // ==========================================
    // 10. CRUD MODAL CONTROLLER
    // ==========================================
    function openAddModal() {
        modalTitle.textContent = "Tambah Catatan Imunisasi";
        vaccineIdInput.value = "";
        vDate.value = "";
        vName.value = "";
        vNotes.value = "";
        vStatus.value = "Selesai";
        
        vaccineModal.classList.remove("hidden");
    }

    function openEditModal(id) {
        modalTitle.textContent = "Edit Catatan Imunisasi";
        const records = getRecords();
        const item = records.find(r => r.id === parseInt(id));

        if (item) {
            vaccineIdInput.value = item.id;
            vDate.value = item.date;
            vName.value = item.vaccine;
            vNotes.value = item.notes || "";
            vStatus.value = item.status;
            vaccineModal.classList.remove("hidden");
        }
    }

    function closeVaccineModalBox() {
        vaccineModal.classList.add("hidden");
    }

    function saveVaccineRecord(e) {
        e.preventDefault();
        const id = vaccineIdInput.value;
        const dateVal = vDate.value;
        const nameVal = vName.value.trim();
        const notesVal = vNotes.value.trim();
        const statusVal = vStatus.value;

        const records = getRecords();

        if (id) {
            // Edit existing record
            const index = records.findIndex(r => r.id === parseInt(id));
            if (index !== -1) {
                records[index].date = dateVal;
                records[index].vaccine = nameVal;
                records[index].notes = notesVal;
                records[index].status = statusVal;
            }
        } else {
            // Create new record
            // Find max ID for auto increment
            const maxId = records.length > 0 ? Math.max(...records.map(r => r.id)) : 0;
            const newRecord = {
                id: maxId + 1,
                date: dateVal,
                vaccine: nameVal,
                notes: notesVal,
                status: statusVal
            };
            records.push(newRecord);
        }

        saveRecords(records);
        closeVaccineModalBox();
        renderVaccineTable();
        updateStats();
    }

    function deleteVaccineRecord(id) {
        if (confirm("Apakah Anda yakin ingin menghapus catatan imunisasi ini?")) {
            const records = getRecords();
            const updated = records.filter(r => r.id !== parseInt(id));
            saveRecords(updated);
            renderVaccineTable();
            updateStats();
        }
    }

    // ==========================================
    // 11. EXPORT & IMPORT DATABASE CONTROLLER
    // ==========================================
    function exportDatabase() {
        const dbData = {
            profile: getProfile(),
            records: getRecords()
        };

        const jsonString = JSON.stringify(dbData, null, 4);
        const blob = new Blob([jsonString], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        
        // Date formatting helper for file extension
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, "0");
        const dd = String(today.getDate()).padStart(2, "0");

        const tempLink = document.createElement("a");
        tempLink.href = url;
        tempLink.download = `imunicare_backup_${yyyy}${mm}${dd}.json`;
        document.body.appendChild(tempLink);
        tempLink.click();
        document.body.removeChild(tempLink);
        URL.revokeObjectURL(url);
    }

    function handleImportFileChange(e) {
        const file = e.target.files[0];
        if (file) {
            selectedFileName.textContent = file.name;
            
            // Read file content
            const reader = new FileReader();
            reader.onload = function(event) {
                try {
                    const parsedData = JSON.parse(event.target.result);
                    
                    // Validation criteria of structure
                    if (parsedData.profile && Array.isArray(parsedData.records)) {
                        if (confirm("Validasi sukses! Apakah Anda ingin menimpa data saat ini dengan file cadangan ini?")) {
                            saveProfile(parsedData.profile);
                            saveRecords(parsedData.records);
                            alert("Data berhasil dipulihkan!");
                            initApp();
                            switchTab("dashboard");
                        }
                    } else {
                        alert("Error: Format file JSON tidak valid.");
                        selectedFileName.textContent = "Belum ada file terpilih";
                        importFile.value = "";
                    }
                } catch (err) {
                    alert("Error: Gagal memproses berkas JSON.");
                    selectedFileName.textContent = "Belum ada file terpilih";
                    importFile.value = "";
                }
            };
            reader.readAsText(file);
        }
    }

    function resetDatabaseToDefault() {
        if (confirm("Peringatan! Ini akan menghapus semua data Anda saat ini dan memulihkan basis data bawaan. Lanjutkan?")) {
            localStorage.setItem("imunicare_records", JSON.stringify(INITIAL_RECORDS));
            localStorage.setItem("imunicare_profile", JSON.stringify(INITIAL_PROFILE));
            alert("Database berhasil di-reset ke kondisi awal!");
            initApp();
            switchTab("dashboard");
        }
    }

    // ==========================================
    // 12. PRINT TO PDF CONTROLLER
    // ==========================================
    function prepareAndPrintPdf() {
        const profile = getProfile();
        const records = getRecords();

        // 1. Fill Header Details
        const today = new Date();
        document.getElementById("print-date-today").textContent = today.toLocaleDateString("id-ID", {
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
        });
        document.getElementById("print-parent-signature").textContent = profile.mother || profile.father || "Orang Tua Wali";

        // 2. Fill Profile Section
        document.getElementById("print-baby-name").textContent = profile.name;
        document.getElementById("print-baby-dob").textContent = formatDisplayDate(profile.dob);
        document.getElementById("print-baby-gender").textContent = profile.gender;
        document.getElementById("print-baby-stats").textContent = `Berat Lahir: ${profile.weight} Kg | Tinggi Lahir: ${profile.height} Cm`;
        
        let parentsText = "";
        if (profile.mother && profile.father) parentsText = `Ibu: ${profile.mother} / Ayah: ${profile.father}`;
        else if (profile.mother) parentsText = `Ibu: ${profile.mother}`;
        else if (profile.father) parentsText = `Ayah: ${profile.father}`;
        else parentsText = "-";
        document.getElementById("print-baby-parents").textContent = parentsText;

        // 3. Fill Table Rows Chronologically (Date ascending)
        const sortedRecords = [...records].sort((a, b) => new Date(a.date) - new Date(b.date));
        const printTableBody = document.getElementById("print-table-body");
        printTableBody.innerHTML = "";

        sortedRecords.forEach((item, index) => {
            const tr = document.createElement("tr");
            const statusText = item.status === "Selesai" ? "Selesai" : "Jadwal / Belum";
            tr.innerHTML = `
                <td class="text-center">${index + 1}</td>
                <td>${formatDisplayDate(item.date)}</td>
                <td><strong>${item.vaccine}</strong></td>
                <td>${item.notes || "-"}</td>
                <td class="text-center font-bold" style="color: ${item.status === 'Selesai' ? '#047857' : '#b45309'};">${statusText}</td>
            `;
            printTableBody.appendChild(tr);
        });

        // 4. Trigger print engine
        window.print();
    }

    // ==========================================
    // 13. INTERFACE EVENT BINDING
    // ==========================================
    // Login Submit
    loginForm.addEventListener("submit", handleLogin);
    logoutBtn.addEventListener("click", handleLogout);

    // Sidebar navigation clicks
    menuItems.forEach(item => {
        item.addEventListener("click", (e) => {
            e.preventDefault();
            const tabId = item.getAttribute("data-tab");
            switchTab(tabId);
        });
    });

    // Profile form saving
    profileForm.addEventListener("submit", saveBabyProfile);

    // CRUD buttons & filters
    addVaccineBtn.addEventListener("click", openAddModal);
    closeVaccineModal.addEventListener("click", closeVaccineModalBox);
    cancelVaccineBtn.addEventListener("click", closeVaccineModalBox);
    vaccineForm.addEventListener("submit", saveVaccineRecord);
    
    // Live filters
    searchInput.addEventListener("input", renderVaccineTable);
    statusFilter.addEventListener("change", renderVaccineTable);
    
    // Shortcut to view all vaccines from dashboard
    linkToAllVaccines.addEventListener("click", (e) => {
        e.preventDefault();
        switchTab("data-imunisasi");
    });

    // Database Actions
    exportBtn.addEventListener("click", exportDatabase);
    importTriggerBtn.addEventListener("click", () => importFile.click());
    importFile.addEventListener("change", handleImportFileChange);
    resetDbBtn.addEventListener("click", resetDatabaseToDefault);

    // Print PDF triggers
    printPdfBtn.addEventListener("click", prepareAndPrintPdf);

    // ==========================================
    // 14. APPLICATION INITIALIZATION WAKEUP
    // ==========================================
    checkLoginState();
});
