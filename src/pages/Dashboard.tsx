import { useEffect, useState, useMemo } from "react";

import { useMeterStore } from "@stores/meterStore";
import { api } from "@utils/api";
import { getYearRange, getColorByID } from "@utils/utils";
import {
  EnergyMap,
  type EnergyMapProps,
  type EnergyMapValue
} from "@components/EnergyMap";
import {
  PowerTable,
  type MeterPowerDelta,
  type MeterPowerRow,
} from "@components/PowerTable";
import {
  PieGraph,
  type PieGraphPoint,
  type PieGraphProps
} from "@components/PieGraph";


export default function Dashboard() {
  const [energyMapData, setEnergyMapData] = useState<EnergyMapValue[] | null>(null);
  const [powerTable, setPowerTable] = useState<MeterPowerRow[] | null>(null);
  const [meterEnergy, setMeterEnergy] = useState<PieGraphPoint[] | null>(null);
  const [loading, setLoading] = useState(true);

  const currentYear = new Date().getFullYear();
  const { start, end } = useMemo(() => getYearRange(), []);
  const meters = useMeterStore((s) => s.meters);
  const POLL_INTERVAL = 5 * 60 * 1000; // 5 minutes

  useEffect(() => {
    setLoading(true);
    api.meter
      .getAvgDailyEnergy(start, end)
      .then((energyData) => {
        setEnergyMapData(
          energyData.map((d) => ({
            date: d.date,
            count: d.average_energy,
          }))
        );
      })
      .finally(() => setLoading(false));
  }, [start, end]);

  useEffect(() => {
    api.meter
      .getAverageConsumptionAndPowerYearly(currentYear)
      .then((resData) => {
        const points = resData.map((item, index) => ({
          id: index,
          label: item.meter_name,
          value: item.average_power,
          color: getColorByID(index),
        }));

        setMeterEnergy(points);
      });
  }, [currentYear]);
  
  useEffect(() => {
    const fetchPower = async () => {
      const res = await api.meter.getPreviousCurrentPower();
  
      const rows = res.map((m: MeterPowerDelta) => {
        const diff = m.current_power - m.previous_power;
        const percent = m.previous_power === 0 ? 0 : (diff / m.previous_power) * 100;
  
        return {
          meter_name: m.meter_name,
          power: m.current_power,
          deltaPercent: +percent.toFixed(1),
          trend: diff > 0 ? "up" : diff < 0 ? "down" : "same",
        };
      });
  
      setPowerTable(rows);
    };
  
    fetchPower();
    const id = setInterval(fetchPower, POLL_INTERVAL);
  
    return () => {
      clearInterval(id);
    };
  }, []);

  return (
    <div className="grid grid-rows-2 grid-rows-[220px_60%] gap-2 h-screen">
      <EnergyMap
        title="Energy Consumption this Year"
        data={energyMapData}
        colors={[
          "#f5f3ff",
          "#ddd6fe",
          "#a78bfa",
          "#7c3aed",
          "#4c1d95",
        ]}
        start_date={start}
        end_date={end}
      />
      <div className="grid grid-cols-[50%_50%] gap-2">
        <PowerTable data={powerTable} />
    
        <PieGraph
          title="Average Energy Distribution Across Meters (Wh)"
          data={meterEnergy}
          innerRadius={60}
          outerRadius={150}
        />
      </div>
    </div>
  );
}
