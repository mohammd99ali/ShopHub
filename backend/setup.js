const fs = require('fs');
const path = require('path');

const envContent = `NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:5175

# MongoDB
MONGODB_URI=mongodb+srv://mohammdali300_db_user:Si1WeaYUZi5ZAig3@cluster0.dtpcbaw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

# JWT
JWT_SECRET=your_jwt_secret_key_here_change_in_production
JWT_EXPIRE=30d

# Email (for future use)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password

# Payment (for future use)
STRIPE_SECRET_KEY=your_stripe_secret_key
PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_CLIENT_SECRET=your_paypal_client_secret
`;

const envPath = path.join(__dirname, '.env');

try {
    fs.writeFileSync(envPath, envContent);
    console.log('✅ Environment file (.env) created successfully!');
    console.log('📝 MongoDB Atlas connection configured.');
    console.log('🔐 Please update the JWT_SECRET with a secure random string for production.');
} catch (error) {
    console.error('❌ Error creating .env file:', error.message);
}
