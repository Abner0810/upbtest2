"use client";

import { useCallback, useEffect, useState } from "react";

const API = process.env.NEXT_PUBLIC_API_URL;

type PuntitoEstado = "cargando" | "ok" | "error";

export default function PuntitoAbner() {
  const sinApi = !API;
  const [estado, setEstado] = useState<PuntitoEstado>(sinApi ? "error" : "cargando");
  const [puntos, setPuntos] = useState<number>(0);
  const [mensaje, setMensaje] = useState<string | undefined>(
    sinApi ? "NEXT_PUBLIC_API_URL no definida" : undefined,
  );
  const [sumando, setSumando] = useState(false);

  const cargarTotal = useCallback(() => {
    if (!API) return;

    fetch(`${API}/api/puntitos/Abner`)
      .then((r) => {
        if (r.ok) return r.json();
        return Promise.reject(r.status);
      })
      .then((data) => {
        const p = typeof data?.puntos === "number" ? data.puntos : 0;
        setPuntos(p);
        setEstado("ok");
      })
      .catch((err) => {
        setEstado("error");
        setMensaje(typeof err === "string" ? err : String(err));
      });
  }, []);

  useEffect(() => {
    if (sinApi) return;
    const timer = window.setTimeout(() => {
      setEstado("cargando");
      setMensaje(undefined);
      cargarTotal();
    }, 0);
    return () => window.clearTimeout(timer);
  }, [sinApi, cargarTotal]);

  const sumarPuntito = () => {
    if (!API || sumando) return;

    setSumando(true);
    setEstado("cargando");
    setMensaje(undefined);

    fetch(`${API}/api/puntitos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ usuario: "Abner" }),
    })
      .then((r) => {
        if (r.ok) return r.json();
        return r.json().catch(() => ({})).then((err) => {
          const msg = err?.error || r.statusText || `Error ${r.status}`;
          return Promise.reject(msg);
        });
      })
      .then((data) => {
        const p = typeof data?.puntos === "number" ? data.puntos : 0;
        setPuntos(p);
        setEstado("ok");
        setMensaje("¡+1 puntito añadido!");
        window.setTimeout(() => setMensaje(undefined), 2000);
      })
      .catch((err) => {
        setEstado("error");
        setMensaje(typeof err === "string" ? err : String(err));
      })
      .finally(() => {
        setSumando(false);
      });
  };

  const colorEstado =
    estado === "ok" ? "#22c55e" : estado === "error" ? "#ef4444" : "#eab308";

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 16,
        padding: "24px 16px",
        margin: "40px auto 0 auto",
        maxWidth: 480,
        background: "#1e293b",
        color: "#f1f5f9",
        borderRadius: 16,
        boxShadow: "0 4px 20px rgba(0,0,0,.4)",
        textAlign: "center",
      }}
    >
      <div style={{ fontWeight: 700, fontSize: 20 }}>
        Puntitos de Abner
      </div>
      <div style={{ fontSize: 48, fontWeight: 800 }}>
        {puntos} <span style={{ fontSize: 20 }}>pts</span>
      </div>
      <button
        type="button"
        onClick={sumarPuntito}
        disabled={sumando || sinApi}
        style={{
          padding: "14px 28px",
          borderRadius: 9999,
          border: "none",
          cursor: sumando || sinApi ? "wait" : "pointer",
          fontWeight: 700,
          fontSize: 16,
          background: sumando || sinApi ? "#475569" : "#3b82f6",
          color: "#fff",
          boxShadow: "0 4px 14px rgba(59,130,246,.5)",
        }}
      >
        {sumando ? "Añadiendo..." : "Añadir puntito a Abner"}
      </button>
      <div style={{ minHeight: 20 }}>
        {estado !== "ok" && (
          <span style={{ color: colorEstado, fontSize: 14 }}>
            {estado === "cargando" ? "Verificando..." : mensaje}
          </span>
        )}
        {estado === "ok" && mensaje && (
          <span style={{ color: "#22c55e", fontSize: 14 }}>{mensaje}</span>
        )}
        {estado === "ok" && !mensaje && (
          <span style={{ color: "#94a3b8", fontSize: 14 }}>
            Haz clic para sumar +1
          </span>
        )}
      </div>
      {API && (
        <div style={{ fontSize: 11, color: "#94a3b8" }}>
          API: {API}
        </div>
      )}
    </div>
  );
}
