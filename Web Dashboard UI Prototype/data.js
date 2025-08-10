// WriteRight Therapist Dashboard - Mock Data

// Sample patients data
const patientsData = [
    {
        id: 1,
        name: 'Rehan Maghamse',
        email: 'RehanMaghamseh@email.com',
        age: 26,
        condition: 'Stroke Recovery',
        status: 'active',
        created_at: '2025-02-16T19:29:02.142072',
        last_active: '2025-08-07T19:29:02.142092',
        total_sessions: 45,
        avg_accuracy: 78.5,
        improvement: 15.3,
        current_streak: 7,
        avatar: 'RM'
    },
    {
        id: 2,
        name: 'Amir Diab',
        email: 'AmirDiab@email.com',
        age: 28,
        condition: 'Motor Skills Recovery',
        status: 'active',
        created_at: '2025-01-20T10:15:30.000000',
        last_active: '2025-08-06T14:22:15.000000',
        total_sessions: 38,
        avg_accuracy: 82.1,
        improvement: 22.7,
        current_streak: 5,
        avatar: 'AD'
    },
    {
        id: 3,
        name: 'Robert Chen',
        email: 'robert.chen@email.com',
        age: 65,
        condition: 'Hand Coordination',
        status: 'active',
        created_at: '2025-03-10T08:45:12.000000',
        last_active: '2025-08-07T11:30:45.000000',
        total_sessions: 52,
        avg_accuracy: 75.8,
        improvement: 18.9,
        current_streak: 12,
        avatar: 'RC'
    },
    {
        id: 4,
        name: 'Sarah Wilson',
        email: 'sarah.wilson@email.com',
        age: 59,
        condition: 'Fine Motor Skills',
        status: 'inactive',
        created_at: '2025-01-05T16:20:00.000000',
        last_active: '2025-07-28T09:15:30.000000',
        total_sessions: 23,
        avg_accuracy: 69.3,
        improvement: 8.2,
        current_streak: 0,
        avatar: 'SW'
    },
    {
        id: 5,
        name: 'David Brown',
        email: 'david.brown@email.com',
        age: 74,
        condition: 'Stroke Recovery',
        status: 'active',
        created_at: '2025-04-15T12:30:45.000000',
        last_active: '2025-08-07T16:45:20.000000',
        total_sessions: 31,
        avg_accuracy: 71.6,
        improvement: 12.4,
        current_streak: 3,
        avatar: 'DB'
    },
    {
        id: 6,
        name: 'Lisa Anderson',
        email: 'lisa.anderson@email.com',
        age: 61,
        condition: 'Motor Recovery',
        status: 'new',
        created_at: '2025-07-25T14:10:30.000000',
        last_active: '2025-08-05T10:20:15.000000',
        total_sessions: 8,
        avg_accuracy: 65.2,
        improvement: 5.1,
        current_streak: 2,
        avatar: 'LA'
    }
];

// Sample sessions data
const sessionsData = [
    {
        id: 1,
        patient_id: 1,
        patient_name: 'Rehan magamseh',
        shape_type: 'Circle',
        accuracy: 85.5,
        duration: 45,
        created_at: '2025-08-07T10:30:00.000000',
        confidence: 0.92
    },
    {
        id: 2,
        patient_id: 2,
        patient_name: 'amir diab',
        shape_type: 'Square',
        accuracy: 78.2,
        duration: 38,
        created_at: '2025-08-07T09:15:00.000000',
        confidence: 0.88
    },
    {
        id: 3,
        patient_id: 3,
        patient_name: 'Robert Chen',
        shape_type: 'Triangle',
        accuracy: 92.1,
        duration: 52,
        created_at: '2025-08-07T11:45:00.000000',
        confidence: 0.95
    },
    {
        id: 4,
        patient_id: 1,
        patient_name: 'Rehan magamseh',
        shape_type: 'Star',
        accuracy: 73.8,
        duration: 67,
        created_at: '2025-08-06T15:20:00.000000',
        confidence: 0.84
    },
    {
        id: 5,
        patient_id: 5,
        patient_name: 'David Brown',
        shape_type: 'Heart',
        accuracy: 69.4,
        duration: 58,
        created_at: '2025-08-06T14:10:00.000000',
        confidence: 0.79
    }
];

// Analytics data
const analyticsData = {
    overview: {
        totalPatients: 6,
        activePatients: 4,
        avgImprovement: 15.3,
        totalSessions: 197,
        avgAccuracy: 75.4,
        completionRate: 83.3
    },
    monthlyProgress: [
        { month: 'Feb', patients: 2, sessions: 28, avgAccuracy: 68.5 },
        { month: 'Mar', patients: 3, sessions: 45, avgAccuracy: 71.2 },
        { month: 'Apr', patients: 4, sessions: 62, avgAccuracy: 73.8 },
        { month: 'May', patients: 5, sessions: 78, avgAccuracy: 75.1 },
        { month: 'Jun', patients: 5, sessions: 85, avgAccuracy: 76.9 },
        { month: 'Jul', patients: 6, sessions: 97, avgAccuracy: 78.2 }
    ],
    shapeAnalytics: [
        { shape: 'Circle', attempts: 45, avgAccuracy: 82.3, improvement: 8.2 },
        { shape: 'Square', attempts: 38, avgAccuracy: 79.1, improvement: 6.5 },
        { shape: 'Triangle', attempts: 42, avgAccuracy: 75.8, improvement: 9.1 },
        { shape: 'Star', attempts: 35, avgAccuracy: 68.4, improvement: 12.3 },
        { shape: 'Heart', attempts: 28, avgAccuracy: 71.2, improvement: 7.8 },
        { shape: 'Pentagon', attempts: 22, avgAccuracy: 66.9, improvement: 11.4 },
        { shape: 'Hexagon', attempts: 18, avgAccuracy: 63.5, improvement: 14.2 },
        { shape: 'Diamond', attempts: 25, avgAccuracy: 70.6, improvement: 9.7 },
        { shape: 'Oval', attempts: 31, avgAccuracy: 77.3, improvement: 5.9 },
        { shape: 'Rectangle', attempts: 29, avgAccuracy: 74.8, improvement: 8.6 },
        { shape: 'Arrow', attempts: 20, avgAccuracy: 65.1, improvement: 13.8 }
    ],
    weeklyActivity: [
        { day: 'Mon', sessions: 12, accuracy: 76.5 },
        { day: 'Tue', sessions: 15, accuracy: 78.2 },
        { day: 'Wed', sessions: 18, accuracy: 74.8 },
        { day: 'Thu', sessions: 14, accuracy: 79.1 },
        { day: 'Fri', sessions: 16, accuracy: 77.3 },
        { day: 'Sat', sessions: 8, accuracy: 73.6 },
        { day: 'Sun', sessions: 6, accuracy: 75.9 }
    ]
};

// Recent activity data
const recentActivity = [
    {
        id: 1,
        type: 'session_completed',
        patient: 'Robert Chen',
        message: 'Completed Triangle practice with 92.1% accuracy',
        time: '2 hours ago',
        icon: 'fas fa-check-circle',
        color: 'success'
    },
    {
        id: 2,
        type: 'milestone_reached',
        patient: 'Rehan magamseh',
        message: 'Reached 7-day practice streak',
        time: '4 hours ago',
        icon: 'fas fa-trophy',
        color: 'warning'
    },
    {
        id: 3,
        type: 'session_completed',
        patient: 'amir diab',
        message: 'Completed Square practice with 78.2% accuracy',
        time: '6 hours ago',
        icon: 'fas fa-check-circle',
        color: 'success'
    },
    {
        id: 4,
        type: 'improvement_noted',
        patient: 'David Brown',
        message: 'Showed 12.4% improvement this week',
        time: '1 day ago',
        icon: 'fas fa-chart-line',
        color: 'primary'
    },
    {
        id: 5,
        type: 'new_patient',
        patient: 'Lisa Anderson',
        message: 'Started rehabilitation program',
        time: '2 days ago',
        icon: 'fas fa-user-plus',
        color: 'primary'
    }
];

// Today's schedule
const todaySchedule = [
    {
        id: 1,
        time: '09:00 AM',
        patient: 'Rehan magamseh',
        type: 'Follow-up Session',
        status: 'completed',
        duration: '30 min'
    },
    {
        id: 2,
        time: '10:30 AM',
        patient: 'amir diab',
        type: 'Progress Review',
        status: 'completed',
        duration: '45 min'
    },
    {
        id: 3,
        time: '02:00 PM',
        patient: 'Robert Chen',
        type: 'Assessment',
        status: 'upcoming',
        duration: '60 min'
    },
    {
        id: 4,
        time: '03:30 PM',
        patient: 'David Brown',
        type: 'Therapy Session',
        status: 'upcoming',
        duration: '45 min'
    }
];

// Export data for use in other files
window.AppData = {
    patients: patientsData,
    sessions: sessionsData,
    analytics: analyticsData,
    recentActivity: recentActivity,
    todaySchedule: todaySchedule
};

