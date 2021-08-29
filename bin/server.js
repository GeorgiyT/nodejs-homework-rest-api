const app = require('../app')
const mongoose = require('mongoose')
const uriDb = process.env.DB_HOST

async function initDatabase() {
  try {
    await mongoose.connect(uriDb, {
      useUnifiedTopology: true,
    })
    console.log("Database connection successful")
  } catch (error) {
    console.log(`Server not running. Error message: ${error.message}`);
    process.exit(1)
  }
}

initDatabase();

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running. Use our API on port: ${PORT}`)
})
