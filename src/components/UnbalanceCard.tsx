import React from "react";
import type { MeterStatus, VoltageAnalysisItem, CurrentAnalysisItem } from "@utils/types";

type Mode = "voltage" | "current";

type Props = {
  mode: Mode;
  data: VoltageAnalysisItem | CurrentAnalysisItem;
};

const getStatusColor = (status: MeterStatus): string => {
  switch (status) {
    case "NORMAL":
      return "#22c55e";
    case "ACCEPTABLE":
      return "#16a34a";
    case "WARNING":
      return "#f59e0b";
    case "CRITICAL":
      return "#dc2626";
    default:
      return "#6b7280";
  }
};

export const UnbalanceCard: React.FC<Props> = ({ mode, data }) => {
  const value =
    mode === "voltage"
      ? (data as VoltageAnalysisItem).voltage_unbalance_percent
      : (data as CurrentAnalysisItem).current_unbalance_percent;

  const val = typeof value === "number" ? value.toFixed(2) : "--";

  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <h3 style={styles.meterName}>{data.meter_name}</h3>
        <span style={{ ...styles.status, backgroundColor: getStatusColor(data.status) }}>
          {data.status}
        </span>
      </div>
      <div style={styles.value}>{val}%</div>

      <div style={styles.footer}>
        Last updated: {new Date(data.timestamp).toLocaleString()}
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  card: {
    width: 320,
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#fff",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    fontFamily: "sans-serif",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  meterName: {
    margin: 0,
    fontSize: 18,
    fontWeight: 600,
    color: "#111827",
  },
  status: {
    color: "#fff",
    padding: "4px 12px",
    borderRadius: 999,
    fontSize: 12,
    fontWeight: 700,
  },
  value: {
    fontSize: 40,
    fontWeight: 700,
    color: "#111827",
  },
  footer: {
    fontSize: 12,
    color: "#9ca3af",
    textAlign: "center",
  },
};
