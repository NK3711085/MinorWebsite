const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { spawn } = require('child_process');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// ........................................................ HomePage start .................................................
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'about.html'));
});
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  const pythonProcess = spawn('python', ['loginPageFinder.py', email, password]);

  let resultData = '';

  pythonProcess.stdout.on('data', (data) => {
    resultData += data.toString();
  });

  pythonProcess.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  pythonProcess.on('close', (code) => {
    resultData = resultData.trim();
    console.log(`Python exited with code ${code} and result: ${resultData}`);

    if (code === 0 && resultData === 'success') {
      res.send(`
        <script>
          alert('✅ Login Successful!');
          window.location.href = '/about.html';
        </script>
      `);
    } else {
      res.send(`
        <script>
          alert('❌ Invalid Credentials. Please register first.');
          window.location.href = '/';
        </script>
      `);
    }
  });
});
// ........................................................ HomePage end .................................................


// ........................................................ Register page start .................................................
app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'reg.html'));
});

app.post('/register', (req, res) => {
  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    password,
    confirmPassword,
    gender
  } = req.body;

  const pythonProcess = spawn('python', [
    'registerPage.py',
    firstName,
    lastName,
    email,
    phoneNumber,
    password,
    confirmPassword,
    gender
  ]);

  let pythonOutput = '';

  pythonProcess.stdout.on('data', (data) => {
    pythonOutput += data.toString();
  });

  pythonProcess.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  pythonProcess.on('close', (code) => {
    console.log(`Python exited with code ${code}`);
    console.log(`Output: ${pythonOutput}`);

    if (pythonOutput.includes("User data inserted successfully")) {
      res.redirect('/register?success=1');
    } else if (pythonOutput.includes("Email already registered")) {
      res.send(`
        <h2>❌ Registration failed: Email already registered.</h2>
        <a href="/register">⬅ Go back</a>
      `);
    } else {
      res.send(`
        <h2>❌ Registration failed. Please try again.</h2>
        <pre>${pythonOutput}</pre>
        <a href="/register">⬅ Go back</a>
      `);
    }
  });
});
// ........................................................ Register page end .................................................

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
