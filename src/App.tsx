import { useEffect, useState } from "react";
import { api } from "./api";
import "./App.css";

function App() {
  const [email, setEmail] = useState("test@test.com");
  const [password, setPassword] = useState("password123");

  const [token, setToken] = useState(
    localStorage.getItem("token") || ""
  );

  const [prompt, setPrompt] = useState("");
  const [answer, setAnswer] = useState("");

  const [history, setHistory] = useState<any[]>([]);

  async function login() {
    const res = await api.post(
      "/api/auth/login",
      {
        email,
        password
      }
    );

    setToken(res.data.token);

    localStorage.setItem(
      "token",
      res.data.token
    );
  }

  function logout() {
    localStorage.removeItem("token");

    setToken("");
    setHistory([]);
    setAnswer("");
  }

  async function askAI() {
    const res = await api.post(
      "/api/ai/ask",
      {
        prompt
      }
    );

    setAnswer(res.data.answer);

    await loadHistory();
  }

  async function loadHistory() {
    const res = await api.get(
      "/api/ai/history"
    );

    setHistory(res.data);
  }

  useEffect(() => {
    if (token) {
      loadHistory();
    }
  }, [token]);

  return (
    <main
      style={{
        padding: "2rem",
        fontFamily: "Arial",
        maxWidth: "900px"
      }}
    >
      <h1>Char Engine Dashboard</h1>

      {!token ? (
        <>
          <input
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            placeholder="Email"
          />

          <br />
          <br />

          <input
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            placeholder="Password"
            type="password"
          />

          <br />
          <br />

          <button onClick={login}>
            Login
          </button>
        </>
      ) : (
        <>
          <p>Authenticated.</p>

          <button onClick={logout}>
            Logout
          </button>

          <br />
          <br />

          <textarea
            value={prompt}
            onChange={(e) =>
              setPrompt(e.target.value)
            }
            placeholder="Ask AI something..."
            rows={5}
            cols={70}
          />

          <br />
          <br />

          <button onClick={askAI}>
            Ask AI
          </button>

          <br />
          <br />

          <div>
            <strong>AI Response:</strong>

            <p>{answer}</p>
          </div>

          <h2>Conversation History</h2>

          {history.map((item) => (
            <div
              key={item.id}
              style={{
                border: "1px solid #ccc",
                padding: "1rem",
                marginBottom: "1rem",
                borderRadius: "8px"
              }}
            >
              <p>
                <strong>Prompt:</strong>{" "}
                {item.prompt}
              </p>

              <p>
                <strong>Response:</strong>{" "}
                {item.response}
              </p>

              <small>
                {new Date(
                  item.createdAt
                ).toLocaleString()}
              </small>
            </div>
          ))}
        </>
      )}
    </main>
  );
}

export default App;