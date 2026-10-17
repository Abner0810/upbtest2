"use client";

import { useCallback, useEffect, useState } from "react";

const API = process.env.NEXT_PUBLIC_API_URL;

type Estado = "cargando" | "ok" | "error";

function Item({
  label,
  estado,
  detalle,
}: {
  label: string;
  estado: Estado;
  detalle?: string;
}) {
  const color =
    estado === "ok" ? "#22c55e" : estado === "error" ? "#ef4444" : "#eab308";
  const icono = estado === "ok" ? "✅" : estado === "error" ? "❌" : "⏳";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 0" }}>
      <span>{icono}</span>
      <span style={{ fontWeight: 600, minWidth: 120 }}>{label}</span>
      <span style={{ color }}>
        {estado === "cargando"
          ? "Verificando..."
          : estado === "ok"
            ? "Conectado"
            : `Error: ${detalle}`}
      </span>
    </div>
  );
}

export default function EstadoConexion() {
  const sinApi = !API;
  const [backend, setBackend] = useState<Estado>(sinApi ? "error" : "cargando");
  const [db, setDb] = useState<Estado>(sinApi ? "error" : "cargando");
  const [detalleDb, setDetalleDb] = useState<string | undefined>(
    sinApi ? "NEXT_PUBLIC_API_URL no definida" : undefined,
  );
  const [probando, setProbando] = useState(false);

  const consultar = useCallback(() => {
    if (!API) return;

    fetch(`${API}/`)
      .then((r) => (r.ok ? setBackend("ok") : Promise.reject(r.status)))
      .catch(() => setBackend("error"));

    fetch(`${API}/api/productos`)
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then(() => setDb("ok"))
      .catch((err) => {
        setDb("error");
        setDetalleDb(String(err));
      });
  }, []);

  useEffect(() => {
    consultar();
  }, [consultar]);

  const reintentar = () => {
    setProbando(true);
    setBackend("cargando");
    setDb("cargando");
    setDetalleDb(undefined);
    consultar();
    window.setTimeout(() => setProbando(false), 600);
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: 16,
        right: 16,
        background: "#1e293b",
        color: "#f1f5f9",
        borderRadius: 12,
        padding: "16px 20px",
        fontSize: 14,
        boxShadow: "0 4px 20px rgba(0,0,0,.4)",
        zIndex: 9999,
        maxWidth: 340,
      }}
    >
      <div style={{ fontWeight: 700, marginBottom: 8 }}>🔗 Estado de conexión</div>
      <Item label="Frontend" estado="ok" />
      <Item label="Backend" estado={backend} />
      <Item label="Base de datos" estado={db} detalle={detalleDb} />

      <button
        type="button"
        onClick={reintentar}
        disabled={probando}
        style={{
          marginTop: 10,
          width: "100%",
          padding: "8px 12px",
          borderRadius: 8,
          border: "none",
          cursor: probando ? "wait" : "pointer",
          fontWeight: 600,
          background: probando ? "#475569" : "#3b82f6",
          color: "#fff",
        }}
      >
        {probando ? "Probando..." : "Probar conexión"}
      </button>

      <div style={{ marginTop: 8, fontSize: 11, color: "#94a3b8" }}>API: {API}</div>
    </div>
  );
}
