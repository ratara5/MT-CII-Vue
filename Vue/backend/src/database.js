const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost/node-vue',{
    useNewUrlParser:true
})
.then(db => console.log('Database connected'))
.catch(err => console.log(err) );
