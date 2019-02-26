const express = require('express');
const path = require('path');

const app = express();
app.use(express.static(path.resolve('./build')));

app.listen(5000, () => {
  process.stdout.write('server started 5000');
});
