const app = require('./server');

app.listen(process.env.PORT || 5001, () => console.log('app works'));
