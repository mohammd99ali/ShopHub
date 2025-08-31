const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

const createAdminUser = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // Check if admin user already exists
        const existingAdmin = await User.findOne({ email: 'admin@example.com' });

        if (existingAdmin) {
            console.log('Admin user already exists');
            console.log('Email: admin@example.com');
            console.log('Password: admin123');
            return;
        }

        // Create admin user
        const adminUser = new User({
            name: 'Admin User',
            email: 'admin@example.com',
            password: 'admin123',
            role: 'admin',
            isActive: true
        });

        await adminUser.save();
        console.log('✅ Admin user created successfully!');
        console.log('Email: admin@example.com');
        console.log('Password: admin123');
        console.log('Role: admin');

    } catch (error) {
        console.error('❌ Error creating admin user:', error.message);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    }
};

createAdminUser();
