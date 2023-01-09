const mongoose = require ('mongoose');

const URI ='mongodb+srv://vivi:vivi@cluster0.cszslkf.mongodb.net/?retryWrites=true&w=majority'

mongoose.connect(URI)
.then(db => console.log('DB connected'))
.catch(err => console.log(err));

module.exports = mongoose ;