const app = require('./src/app');
const connectDB = require('./src/config/db');
const { seedAll } = require('./src/utils/seedData');

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();
  await seedAll();
  
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();