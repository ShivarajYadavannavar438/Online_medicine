// Add test reminder function
window.testReminder = function() {
    const medicines = JSON.parse(localStorage.getItem('medicines') || '[]');
    if (medicines.length === 0) {
        showNotification('Please add a medicine first', 'error');
        return;
    }
    
    const medicine = medicines[0]; // Test with first medicine
    console.log('🧪 Testing reminder for:', medicine.name);
    
    // Force trigger reminder regardless of notification settings
    const testMedicine = {
        ...medicine,
        notifications: {
            email: { enabled: true, address: 'test@example.com' },
            sms: { enabled: true, phone: '+919876543210' },
            sound: { enabled: true }
        }
    };
    
    triggerReminder(testMedicine);
    showNotification('💊 Test reminder triggered! Check console for details.', 'success');
}

// Quick add multiple medicines demo
window.quickAddDemo = function() {
    if (!authToken) {
        showNotification('Please login first to add medicines', 'error');
        showAuthModal();
        return;
    }
    
    const demoMedicines = [
        { name: 'Paracetamol', dosage: '500mg tablet', description: 'Pain reliever', precaution: 'Take after meals' },
        { name: 'Vitamin D3', dosage: '1000 IU capsule', description: 'Vitamin supplement', precaution: 'Take with milk' },
        { name: 'Omega-3', dosage: '1 softgel', description: 'Fish oil supplement', precaution: 'Take with food' }
    ];
    
    const medicines = JSON.parse(localStorage.getItem('medicines') || '[]');
    const currentTime = new Date();
    const timeString = `${String(currentTime.getHours()).padStart(2, '0')}:${String(currentTime.getMinutes()).padStart(2, '0')}`;
    const dateString = currentTime.toISOString().split('T')[0];
    
    demoMedicines.forEach((demo, index) => {
        const newMedicine = {
            _id: 'demo_' + Date.now() + '_' + index,
            name: demo.name,
            dosage: demo.dosage,
            description: demo.description,
            precaution: demo.precaution,
            times: [timeString],
            frequency: 'daily',
            startDate: dateString,
            endDate: '',
            status: 'active',
            notifications: {
                email: { enabled: true, address: 'demo@example.com' },
                sms: { enabled: true, phone: '+91 9876543210' },
                sound: { enabled: true }
            }
        };
        medicines.push(newMedicine);
        scheduleReminder(newMedicine);
        logMedicineAction(newMedicine._id, 'added', 'Demo medicine added');
    });
    
    localStorage.setItem('medicines', JSON.stringify(medicines));
    saveMedicinesToFile(medicines);
    
    showNotification(`${demoMedicines.length} demo medicines added successfully!`, 'success');
    loadDashboardData();
}