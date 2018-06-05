var mongoose = require('mongoose');

var db = mongoose.connection;

mongoose.connect('mongodb://127.0.0.1/library');

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('MongoDB is connected');
});

return db;