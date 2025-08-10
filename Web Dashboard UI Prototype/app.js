// WriteRight Therapist Dashboard - Main Application

class WriteRightApp {
    constructor() {
        this.currentPage = 'overview';
        this.currentUser = null;
        this.chartManager = new ChartManager();
        this.init();
    }

    init() {
        // Hide loading screen after a short delay
        setTimeout(() => {
            document.getElementById('loading').classList.add('hidden');
            document.getElementById('loginScreen').classList.remove('hidden');
        }, 1500);

        // Setup event listeners
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Login form
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        }

        // Navigation items
        document.addEventListener('click', (e) => {
            if (e.target.closest('.nav-item')) {
                e.preventDefault();
                const navItem = e.target.closest('.nav-item');
                const page = navItem.dataset.page;
                if (page) {
                    this.navigateToPage(page);
                }
            }
        });

        // Search functionality
        const searchInput = document.querySelector('.search-bar input');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => this.handleSearch(e.target.value));
        }
    }

    handleLogin(e) {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Simple validation (accept any email/password for demo)
        if (email && password) {
            this.currentUser = {
                name: 'Dr. Rula Farah',
                email: email,
                specialty: 'Stroke Rehabilitation'
            };

            // Hide login screen and show dashboard
            document.getElementById('loginScreen').classList.add('hidden');
            document.getElementById('dashboard').classList.remove('hidden');

            // Load default page
            this.navigateToPage('overview');
        } else {
            alert('Please enter both email and password');
        }
    }

    logout() {
        this.currentUser = null;
        this.chartManager.destroyAllCharts();
        document.getElementById('dashboard').classList.add('hidden');
        document.getElementById('loginScreen').classList.remove('hidden');
        
        // Reset form
        document.getElementById('loginForm').reset();
    }

    navigateToPage(page) {
        // Update active navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        document.querySelector(`[data-page="${page}"]`).classList.add('active');

        // Update page content
        this.currentPage = page;
        this.renderPage(page);
    }

    renderPage(page) {
        const content = document.getElementById('pageContent');
        
        switch (page) {
            case 'overview':
                content.innerHTML = this.renderOverviewPage();
                setTimeout(() => this.chartManager.createOverviewCharts(), 100);
                break;
            case 'patients':
                content.innerHTML = this.renderPatientsPage();
                break;
            case 'analytics':
                content.innerHTML = this.renderAnalyticsPage();
                setTimeout(() => this.chartManager.createOverviewCharts(), 100);
                break;
            case 'settings':
                content.innerHTML = this.renderSettingsPage();
                break;
            default:
                content.innerHTML = this.renderOverviewPage();
        }

        // Add fade-in animation
        content.classList.add('fade-in');
        setTimeout(() => content.classList.remove('fade-in'), 500);
    }

    renderOverviewPage() {
        const data = window.AppData.analytics.overview;
        const recentActivity = window.AppData.recentActivity;
        const schedule = window.AppData.todaySchedule;

        return `
            <div class="page-header">
                <h1>Dashboard Overview</h1>
                <p>Welcome back, Dr. Farah. Here's what's happening with your patients today.</p>
            </div>

            <!-- Stats Grid -->
            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-header">
                        <div class="stat-icon primary">
                            <i class="fas fa-users"></i>
                        </div>
                    </div>
                    <div class="stat-value">${data.totalPatients}</div>
                    <div class="stat-label">Total Patients</div>
                    <div class="stat-change positive">
                        <i class="fas fa-arrow-up"></i>
                        <span>+2 this month</span>
                    </div>
                </div>

                <div class="stat-card">
                    <div class="stat-header">
                        <div class="stat-icon success">
                            <i class="fas fa-user-check"></i>
                        </div>
                    </div>
                    <div class="stat-value">${data.activePatients}</div>
                    <div class="stat-label">Active Patients</div>
                    <div class="stat-change positive">
                        <i class="fas fa-arrow-up"></i>
                        <span>${data.completionRate}% completion rate</span>
                    </div>
                </div>

                <div class="stat-card">
                    <div class="stat-header">
                        <div class="stat-icon warning">
                            <i class="fas fa-chart-line"></i>
                        </div>
                    </div>
                    <div class="stat-value">${data.avgImprovement}%</div>
                    <div class="stat-label">Avg Improvement</div>
                    <div class="stat-change positive">
                        <i class="fas fa-arrow-up"></i>
                        <span>+3.2% this week</span>
                    </div>
                </div>

                <div class="stat-card">
                    <div class="stat-header">
                        <div class="stat-icon primary">
                            <i class="fas fa-clipboard-list"></i>
                        </div>
                    </div>
                    <div class="stat-value">${data.totalSessions}</div>
                    <div class="stat-label">Total Sessions</div>
                    <div class="stat-change positive">
                        <i class="fas fa-arrow-up"></i>
                        <span>+15 this week</span>
                    </div>
                </div>
            </div>

            <!-- Charts Row -->
            <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 1.5rem; margin-bottom: 2rem;">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">Monthly Progress</h3>
                        <p class="card-subtitle">Patient accuracy and session trends</p>
                    </div>
                    <div class="chart-container">
                        <canvas id="monthlyProgressChart"></canvas>
                    </div>
                </div>

                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">Weekly Activity</h3>
                        <p class="card-subtitle">Sessions per day</p>
                    </div>
                    <div class="chart-container">
                        <canvas id="weeklyActivityChart"></canvas>
                    </div>
                </div>
            </div>

            <!-- Bottom Row -->
            <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1.5rem;">
                <!-- Recent Activity -->
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">Recent Activity</h3>
                        <p class="card-subtitle">Latest patient updates</p>
                    </div>
                    <div style="max-height: 300px; overflow-y: auto;">
                        ${recentActivity.map(activity => `
                            <div style="display: flex; align-items: center; padding: 0.75rem 0; border-bottom: 1px solid var(--border-color);">
                                <div style="width: 40px; height: 40px; border-radius: 50%; background-color: var(--${activity.color}-color); color: white; display: flex; align-items: center; justify-content: center; margin-right: 1rem;">
                                    <i class="${activity.icon}" style="font-size: 0.875rem;"></i>
                                </div>
                                <div style="flex: 1;">
                                    <p style="font-weight: 500; margin-bottom: 0.25rem;">${activity.patient}</p>
                                    <p style="color: var(--text-secondary); font-size: 0.875rem; margin-bottom: 0.25rem;">${activity.message}</p>
                                    <p style="color: var(--text-muted); font-size: 0.75rem;">${activity.time}</p>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- Today's Schedule -->
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">Today's Schedule</h3>
                        <p class="card-subtitle">Upcoming appointments</p>
                    </div>
                    <div style="max-height: 300px; overflow-y: auto;">
                        ${schedule.map(appointment => `
                            <div style="display: flex; align-items: center; padding: 0.75rem 0; border-bottom: 1px solid var(--border-color);">
                                <div style="margin-right: 1rem;">
                                    <div style="font-weight: 600; color: var(--text-primary);">${appointment.time}</div>
                                    <div style="font-size: 0.75rem; color: var(--text-muted);">${appointment.duration}</div>
                                </div>
                                <div style="flex: 1;">
                                    <p style="font-weight: 500; margin-bottom: 0.25rem;">${appointment.patient}</p>
                                    <p style="color: var(--text-secondary); font-size: 0.875rem;">${appointment.type}</p>
                                </div>
                                <div class="status-badge ${appointment.status}">${appointment.status}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- Shape Distribution -->
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">Shape Practice</h3>
                        <p class="card-subtitle">Most practiced shapes</p>
                    </div>
                    <div class="chart-container">
                        <canvas id="shapeDistributionChart"></canvas>
                    </div>
                </div>
            </div>
        `;
    }

    renderPatientsPage() {
        const patients = window.AppData.patients;

        return `
            <div class="page-header">
                <h1>Patient Management</h1>
                <p>Monitor and manage your patients' rehabilitation progress.</p>
            </div>

            <!-- Patients Table -->
            <div class="table-container">
                <table class="table">
                    <thead>
                        <tr>
                            <th>Patient</th>
                            <th>Condition</th>
                            <th>Status</th>
                            <th>Sessions</th>
                            <th>Avg Accuracy</th>
                            <th>Improvement</th>
                            <th>Streak</th>
                            <th>Last Active</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${patients.map(patient => `
                            <tr>
                                <td>
                                    <div style="display: flex; align-items: center;">
                                        <div style="width: 40px; height: 40px; border-radius: 50%; background-color: var(--primary-color); color: white; display: flex; align-items: center; justify-content: center; margin-right: 1rem; font-weight: 600;">
                                            ${patient.avatar}
                                        </div>
                                        <div>
                                            <div style="font-weight: 500; color: var(--text-primary);">${patient.name}</div>
                                            <div style="font-size: 0.875rem; color: var(--text-secondary);">${patient.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>${patient.condition}</td>
                                <td><span class="status-badge ${patient.status}">${patient.status}</span></td>
                                <td>${patient.total_sessions}</td>
                                <td>
                                    <div style="display: flex; align-items: center;">
                                        <span style="margin-right: 0.5rem;">${patient.avg_accuracy}%</span>
                                        <div class="progress-bar" style="width: 60px;">
                                            <div class="progress-fill" style="width: ${patient.avg_accuracy}%;"></div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <span class="stat-change ${patient.improvement > 0 ? 'positive' : 'negative'}">
                                        <i class="fas fa-arrow-${patient.improvement > 0 ? 'up' : 'down'}"></i>
                                        ${Math.abs(patient.improvement)}%
                                    </span>
                                </td>
                                <td>
                                    <span style="display: flex; align-items: center;">
                                        <i class="fas fa-fire" style="color: #f59e0b; margin-right: 0.25rem;"></i>
                                        ${patient.current_streak}
                                    </span>
                                </td>
                                <td>${new Date(patient.last_active).toLocaleDateString()}</td>
                                <td>
                                    <button class="btn-secondary" onclick="app.viewPatientDetails(${patient.id})" style="padding: 0.5rem; font-size: 0.75rem;">
                                        <i class="fas fa-eye"></i>
                                        View
                                    </button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
    }

    renderAnalyticsPage() {
        const analytics = window.AppData.analytics;

        return `
            <div class="page-header">
                <h1>Analytics Dashboard</h1>
                <p>Comprehensive insights into patient progress and rehabilitation outcomes.</p>
            </div>

            <!-- Analytics Stats -->
            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-header">
                        <div class="stat-icon primary">
                            <i class="fas fa-percentage"></i>
                        </div>
                    </div>
                    <div class="stat-value">${analytics.overview.avgAccuracy}%</div>
                    <div class="stat-label">Overall Accuracy</div>
                    <div class="stat-change positive">
                        <i class="fas fa-arrow-up"></i>
                        <span>+2.3% this month</span>
                    </div>
                </div>

                <div class="stat-card">
                    <div class="stat-header">
                        <div class="stat-icon success">
                            <i class="fas fa-trophy"></i>
                        </div>
                    </div>
                    <div class="stat-value">${analytics.overview.completionRate}%</div>
                    <div class="stat-label">Completion Rate</div>
                    <div class="stat-change positive">
                        <i class="fas fa-arrow-up"></i>
                        <span>+5.1% this week</span>
                    </div>
                </div>

                <div class="stat-card">
                    <div class="stat-header">
                        <div class="stat-icon warning">
                            <i class="fas fa-clock"></i>
                        </div>
                    </div>
                    <div class="stat-value">42</div>
                    <div class="stat-label">Avg Session Time (min)</div>
                    <div class="stat-change negative">
                        <i class="fas fa-arrow-down"></i>
                        <span>-3 min this week</span>
                    </div>
                </div>

                <div class="stat-card">
                    <div class="stat-header">
                        <div class="stat-icon danger">
                            <i class="fas fa-shapes"></i>
                        </div>
                    </div>
                    <div class="stat-value">11</div>
                    <div class="stat-label">Shape Types</div>
                    <div class="stat-change positive">
                        <i class="fas fa-check"></i>
                        <span>All shapes practiced</span>
                    </div>
                </div>
            </div>

            <!-- Charts -->
            <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 1.5rem; margin-bottom: 2rem;">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">Progress Trends</h3>
                        <p class="card-subtitle">Monthly accuracy and session volume</p>
                    </div>
                    <div class="chart-container">
                        <canvas id="monthlyProgressChart"></canvas>
                    </div>
                </div>

                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">Weekly Distribution</h3>
                        <p class="card-subtitle">Sessions by day of week</p>
                    </div>
                    <div class="chart-container">
                        <canvas id="weeklyActivityChart"></canvas>
                    </div>
                </div>
            </div>

            <!-- Shape Performance Table -->
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">Shape Performance Analysis</h3>
                    <p class="card-subtitle">Detailed breakdown by shape type</p>
                </div>
                <div class="table-container">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Shape</th>
                                <th>Total Attempts</th>
                                <th>Average Accuracy</th>
                                <th>Improvement</th>
                                <th>Difficulty Level</th>
                                <th>Progress</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${analytics.shapeAnalytics.map(shape => {
                                const difficulty = shape.avgAccuracy > 80 ? 'Easy' : shape.avgAccuracy > 65 ? 'Medium' : 'Hard';
                                const difficultyColor = shape.avgAccuracy > 80 ? 'success' : shape.avgAccuracy > 65 ? 'warning' : 'danger';
                                
                                return `
                                    <tr>
                                        <td style="font-weight: 500;">${shape.shape}</td>
                                        <td>${shape.attempts}</td>
                                        <td>
                                            <div style="display: flex; align-items: center;">
                                                <span style="margin-right: 0.5rem;">${shape.avgAccuracy}%</span>
                                                <div class="progress-bar" style="width: 80px;">
                                                    <div class="progress-fill" style="width: ${shape.avgAccuracy}%;"></div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <span class="stat-change positive">
                                                <i class="fas fa-arrow-up"></i>
                                                ${shape.improvement}%
                                            </span>
                                        </td>
                                        <td><span class="status-badge ${difficultyColor}">${difficulty}</span></td>
                                        <td>
                                            <div style="display: flex; align-items: center;">
                                                <div class="progress-bar" style="width: 100px;">
                                                    <div class="progress-fill" style="width: ${Math.min(100, (shape.attempts / 50) * 100)}%;"></div>
                                                </div>
                                                <span style="margin-left: 0.5rem; font-size: 0.75rem; color: var(--text-muted);">
                                                    ${shape.attempts}/50
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                `;
                            }).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }

    renderSettingsPage() {
        return `
            <div class="page-header">
                <h1>Settings</h1>
                <p>Manage your account preferences and system configuration.</p>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
                <!-- Profile Settings -->
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">Profile Information</h3>
                        <p class="card-subtitle">Update your personal details</p>
                    </div>
                    <div style="display: flex; flex-direction: column; gap: 1rem;">
                        <div class="form-group">
                            <label>Full Name</label>
                            <input type="text" value="Dr. Rula Farah" style="width: 100%; padding: 0.75rem; border: 1px solid var(--border-color); border-radius: 0.5rem;">
                        </div>
                        <div class="form-group">
                            <label>Email Address</label>
                            <input type="email" value="therapist@clinic.com" style="width: 100%; padding: 0.75rem; border: 1px solid var(--border-color); border-radius: 0.5rem;">
                        </div>
                        <div class="form-group">
                            <label>Specialty</label>
                            <input type="text" value="Stroke Rehabilitation" style="width: 100%; padding: 0.75rem; border: 1px solid var(--border-color); border-radius: 0.5rem;">
                        </div>
                        <div class="form-group">
                            <label>License Number</label>
                            <input type="text" value="PT-12345" style="width: 100%; padding: 0.75rem; border: 1px solid var(--border-color); border-radius: 0.5rem;">
                        </div>
                        <button class="btn-primary" style="align-self: flex-start;">
                            <i class="fas fa-save"></i>
                            Save Changes
                        </button>
                    </div>
                </div>

                <!-- Notification Settings -->
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">Notifications</h3>
                        <p class="card-subtitle">Configure your notification preferences</p>
                    </div>
                    <div style="display: flex; flex-direction: column; gap: 1.5rem;">
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <div>
                                <div style="font-weight: 500;">Email Notifications</div>
                                <div style="font-size: 0.875rem; color: var(--text-secondary);">Receive updates via email</div>
                            </div>
                            <label style="position: relative; display: inline-block; width: 60px; height: 34px;">
                                <input type="checkbox" checked style="opacity: 0; width: 0; height: 0;">
                                <span style="position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: var(--primary-color); transition: .4s; border-radius: 34px; &:before { position: absolute; content: ''; height: 26px; width: 26px; left: 4px; bottom: 4px; background-color: white; transition: .4s; border-radius: 50%; }"></span>
                            </label>
                        </div>
                        
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <div>
                                <div style="font-weight: 500;">Push Notifications</div>
                                <div style="font-size: 0.875rem; color: var(--text-secondary);">Browser push notifications</div>
                            </div>
                            <label style="position: relative; display: inline-block; width: 60px; height: 34px;">
                                <input type="checkbox" style="opacity: 0; width: 0; height: 0;">
                                <span style="position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: #ccc; transition: .4s; border-radius: 34px;"></span>
                            </label>
                        </div>
                        
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <div>
                                <div style="font-weight: 500;">Weekly Reports</div>
                                <div style="font-size: 0.875rem; color: var(--text-secondary);">Automated progress summaries</div>
                            </div>
                            <label style="position: relative; display: inline-block; width: 60px; height: 34px;">
                                <input type="checkbox" checked style="opacity: 0; width: 0; height: 0;">
                                <span style="position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: var(--primary-color); transition: .4s; border-radius: 34px;"></span>
                            </label>
                        </div>
                    </div>
                </div>

                <!-- Display Preferences -->
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">Display Preferences</h3>
                        <p class="card-subtitle">Customize your dashboard appearance</p>
                    </div>
                    <div style="display: flex; flex-direction: column; gap: 1rem;">
                        <div class="form-group">
                            <label>Theme</label>
                            <select style="width: 100%; padding: 0.75rem; border: 1px solid var(--border-color); border-radius: 0.5rem;">
                                <option>Light</option>
                                <option>Dark</option>
                                <option>Auto</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Language</label>
                            <select style="width: 100%; padding: 0.75rem; border: 1px solid var(--border-color); border-radius: 0.5rem;">
                                <option>English</option>
                                <option>Spanish</option>
                                <option>French</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Timezone</label>
                            <select style="width: 100%; padding: 0.75rem; border: 1px solid var(--border-color); border-radius: 0.5rem;">
                                <option>UTC-8 (Pacific)</option>
                                <option>UTC-5 (Eastern)</option>
                                <option>UTC+0 (GMT)</option>
                            </select>
                        </div>
                    </div>
                </div>

                <!-- Data Management -->
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">Data Management</h3>
                        <p class="card-subtitle">Export and backup options</p>
                    </div>
                    <div style="display: flex; flex-direction: column; gap: 1rem;">
                        <button class="btn-secondary">
                            <i class="fas fa-download"></i>
                            Export Patient Data
                        </button>
                        <button class="btn-secondary">
                            <i class="fas fa-file-pdf"></i>
                            Generate Report
                        </button>
                        <button class="btn-secondary">
                            <i class="fas fa-cloud-upload-alt"></i>
                            Backup Data
                        </button>
                        <div style="margin-top: 1rem; padding: 1rem; background-color: #f8fafc; border-radius: 0.5rem; border: 1px solid var(--border-color);">
                            <div style="font-weight: 500; margin-bottom: 0.5rem;">Storage Usage</div>
                            <div style="display: flex; align-items: center; margin-bottom: 0.5rem;">
                                <div class="progress-bar" style="flex: 1; margin-right: 1rem;">
                                    <div class="progress-fill" style="width: 65%;"></div>
                                </div>
                                <span style="font-size: 0.875rem; color: var(--text-secondary);">65% used</span>
                            </div>
                            <div style="font-size: 0.75rem; color: var(--text-muted);">2.1 GB of 3.2 GB used</div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    viewPatientDetails(patientId) {
        const patient = window.AppData.patients.find(p => p.id === patientId);
        if (!patient) return;

        // Create modal or navigate to detailed view
        alert(`Viewing details for ${patient.name}\n\nThis would open a detailed patient view with:\n- Session history\n- Progress charts\n- Shape performance\n- Therapy notes\n- Contact information`);
    }

    handleSearch(query) {
        if (this.currentPage === 'patients') {
            // Filter patients table based on search query
            const patients = window.AppData.patients.filter(patient => 
                patient.name.toLowerCase().includes(query.toLowerCase()) ||
                patient.condition.toLowerCase().includes(query.toLowerCase()) ||
                patient.email.toLowerCase().includes(query.toLowerCase())
            );
            
            // Re-render patients page with filtered results
            // This is a simplified implementation
            console.log('Searching for:', query, 'Found:', patients.length, 'patients');
        }
    }
}

// Global logout function
function logout() {
    if (window.app) {
        window.app.logout();
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new WriteRightApp();
});

