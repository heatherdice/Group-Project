const mongoose = require('mongoose');
const dbName = process.env.OUR_DB

mongoose.connect(`mongodb://localhost/${ dbName }`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log(`Established a connection to the ${ dbName } database`))
.catch((err) => console.log(err));