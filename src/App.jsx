import { useState } from "react";
import "./App.css";

const INITIAL_TASKS = [
  { id: 1, text: "Design landing page", done: true, tag: "Design" },
  { id: 2, text: "Set up CI/CD pipeline", done: false, tag: "DevOps" },
  { id: 3, text: "Write unit tests", done: false, tag: "Dev" },
  { id: 4, text: "Code review PR #42", done: true, tag: "Dev" },
  { id: 5, text: "Update documentation", done: false, tag: "Docs" },
];

const TAG_COLORS = {
  Design: "#6c63ff",
  DevOps: "#f59e0b",
  Dev: "#10b981",
  Docs: "#3b82f6",
};

export default function App() {
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [input, setInput] = useState("");
  const [tag, setTag] = useState("Dev");
  const [filter, setFilter] = useState("All");

  const addTask = () => {
    const text = input.trim();
    if (!text) return;
    setTasks((prev) => [...prev, { id: Date.now(), text, done: false, tag }]);
    setInput("");
  };

  const toggleTask = (id) =>
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );

  const deleteTask = (id) =>
    setTasks((prev) => prev.filter((t) => t.id !== id));

  const visible =
    filter === "All"
      ? tasks
      : filter === "Done"
      ? tasks.filter((t) => t.done)
      : tasks.filter((t) => !t.done);

  const done = tasks.filter((t) => t.done).length;
  const pct = tasks.length ? Math.round((done / tasks.length) * 100) : 0;

  return (
    <div className="app">
      <header className="header">
        <div>
          <h1 className="title">Task Board</h1>
          <p className="subtitle">Demo app — React + Vite</p>
        </div>
        <div className="progress-wrap">
          <span className="progress-label">{done}/{tasks.length} done ({pct}%)</span>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${pct}%` }} />
          </div>
        </div>
      </header>

      <section className="add-section">
        <input
          className="text-input"
          placeholder="New task..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTask()}
        />
        <select
          className="tag-select"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
        >
          {Object.keys(TAG_COLORS).map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
        <button className="add-btn" onClick={addTask}>
          + Add
        </button>
      </section>

      <div className="filters">
        {["All", "Todo", "Done"].map((f) => (
          <button
            key={f}
            className={`filter-btn${filter === f ? " active" : ""}`}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      <ul className="task-list">
        {visible.length === 0 && (
          <li className="empty">Nothing here. Add a task above!</li>
        )}
        {visible.map((task) => (
          <li key={task.id} className={`task-item${task.done ? " done" : ""}`}>
            <input
              type="checkbox"
              className="checkbox"
              checked={task.done}
              onChange={() => toggleTask(task.id)}
            />
            <span className="task-text">{task.text}</span>
            <span
              className="tag"
              style={{ background: TAG_COLORS[task.tag] ?? "#888" }}
            >
              {task.tag}
            </span>
            <button
              className="delete-btn"
              onClick={() => deleteTask(task.id)}
              aria-label="Delete task"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
