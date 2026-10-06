function Login({ onLogin }) {
  return (
    <div className="login-page">

      <div className="login-box">

        <h1>Attendance System</h1>

        <h2>Login</h2>

        <input
          type="text"
          placeholder="Username"
          id="username"
        />

        <input
          type="password"
          placeholder="Password"
          id="password"
        />

        <button
          onClick={() => {
            const username =
              document.getElementById("username").value;

            const password =
              document.getElementById("password").value;

            if (username === "admin" && password === "1234") {
              onLogin();
            } else {
              alert("Wrong username or password");
            }
          }}
        >
          LOGIN
        </button>

      </div>

    </div>
  );
}

export default Login;