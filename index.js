const express = require('express');
const { usersRouter, authRouter } = require("./src/routes");

const app = express();

app.use(express.json());

app.use("/auth", authRouter);
app.use("/users", usersRouter);

// error handling
app.use((err, req, res, next) => {

  console.log('err', err);
  
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";

  return res.status(statusCode).json({ message });
  
})

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});