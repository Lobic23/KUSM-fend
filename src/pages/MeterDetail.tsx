import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import {
  Zap,
  Gauge,
  Activity,
  Plug
} from "lucide-react";

import { useMeterStore } from "@stores/meterStore";
import type { GetLatestMeterDataResponse, MeterData, TimePoint } from "@utils/types";
import { api } from "@utils/api";
import { LineGraph, type LineGraphPoint } from "@components/LineGraph";
import { BarGraph } from "@components/BarGraph";
import { OverviewInfoCard } from "@components/OverviewInfoCard";

export default function MeterDetail() {
  const { meterId } = useParams<{ meterId: string }>();
  const meters = useMeterStore((s) => s.meters);
  const meter = meters.find((m) => m.meter_id === Number(meterId));

  const [meterReadings, setMeterReadings] = useState<MeterData[]>([]);
  const [loading, setLoading] = useState(true);

  const colors = ["#3b82f6", "#10b981", "#f59e0b"];
  const data120 = Array.from({ length: 288 }, (_, i) => {
    return (
      50 +
      20 * Math.sin(i / 10) +   // main curve
      10 * Math.sin(i / 25)    // gentle variation
    );
  });

  const getToday = () => {
    const now = new Date();
    const local = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
    return local.toISOString().split("T")[0];
  };

  // Creates line graph plotable data
  const createPhaseData = (keyPrefix: string) => {
    const a: TimePoint[] = [];
    const b: TimePoint[] = [];
    const c: TimePoint[] = [];
    let totalSum = 0;
    let count = 0;

    meterReadings.forEach(d => {
      const time = new Date(d.timestamp.replace(" ", "T"));
      const valA = d[`phase_A_${keyPrefix}`];
      const valB = d[`phase_B_${keyPrefix}`];
      const valC = d[`phase_C_${keyPrefix}`];

      a.push({ x: time, y: valA });
      b.push({ x: time, y: valB });
      c.push({ x: time, y: valC });

      totalSum += valA + valB + valC;
      count += 3;
    });

    // Returning null if no data is found (to trigger the loading animation ofc)
    if (!a.length && !b.length && !c.length) return null;

    const phaseData = [
      { label: "Phase A", data: a, color: "#3b82f6" },
      { label: "Phase B", data: b, color: "#10b981" },
      { label: "Phase C", data: c, color: "#f59e0b" },
    ];

    const average = count > 0 ? totalSum / count : 0;

    return { phaseData: phaseData, average: average.toFixed(2) };
  };

  // Fetch the meter data
  useEffect(() => {
    if (!meter) return;

    setLoading(true);
    setMeterReadings([]);

    const fetchTodayData = async () => {
      try {
        const today = getToday();
        console.log(today);
        const res = await api.meter.getMeterDataByDate(
          meter.name,
          today,
          today
        );

        if (!res.success) {
          throw new Error(res.message);
        }

        setMeterReadings(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTodayData();
  }, [meter]);


  useEffect(() => {
    if (!meter) return;
  
    const interval = setInterval(async () => {
      try {
        const latest = await api.meter.getLatestMeterData(meter.meter_id);
  
        setMeterReadings(prev => {
          if (!prev.length) return [latest];
  
          const last = prev[prev.length - 1];
  
          // Avoid duplicate timestamps
          if (last.timestamp === latest.timestamp) {
            return prev;
          }
  
          return [...prev, latest].slice(-288);
        });
      } catch (err) {
        console.error("Polling error:", err);
      }
    }, 5 * 60 * 1000); // 5 minutes
  
    return () => clearInterval(interval);
  }, [meter]);

  const powerData = useMemo(() => createPhaseData('active_power'), [meterReadings]);
  const currentData = useMemo(() => createPhaseData('current'), [meterReadings]);
  const voltageData = useMemo(() => createPhaseData('voltage'), [meterReadings]);
  const gridData = useMemo(() => createPhaseData('grid_consumption'), [meterReadings]);

  const phasePowerContribution = useMemo(() => {
    if (!meterReadings.length) return undefined;
  
    let sumA = 0;
    let sumB = 0;
    let sumC = 0;
  
    meterReadings.forEach(d => {
      sumA += d.phase_A_active_power;
      sumB += d.phase_B_active_power;
      sumC += d.phase_C_active_power;
    });
  
    const total = sumA + sumB + sumC;
    if (total === 0) return [];
  
    return [
      { label: "Phase A", value: +(sumA / total * 100).toFixed(1) },
      { label: "Phase B", value: +(sumB / total * 100).toFixed(1) },
      { label: "Phase C", value: +(sumC / total * 100).toFixed(1) },
    ];
  }, [meterReadings]);

  return (
    <div className="grid grid-rows-2 grid-rows-[30%_70%] gap-2 h-screen">
      <div className="grid grid-rows-[0.3fr_1fr] gap-2">
        <div className="mx-2 mt-2 text-xl">
          Overview
        </div>
        <div className="grid grid-cols-4 auto-cols-fr gap-3">
          <OverviewInfoCard
            title="Power"
            data={powerData?.average}
            unit="W"
            icon={<Zap size={18} />}
          />

          <OverviewInfoCard
            title="Grid Consumption"
            data={gridData?.average}
            unit="Wh"
            icon={<Plug size={18} />}
          />

          <OverviewInfoCard
            title="Current"
            data={currentData?.average}
            unit="A"
            icon={<Activity size={18} />}
          />

          <OverviewInfoCard
            title="Voltage"
            data={voltageData?.average}
            unit="V"
            icon={<Gauge size={18} />}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 grid-rows-[50%_30%_30%] gap-4 h-screen">
        <div className="col-span-2">
          <LineGraph title="Power" points={powerData?.phaseData} />
        </div>
        <div className="">
          <LineGraph title="Current" points={currentData?.phaseData} />
        </div>
        <div className="row-span-2">
          <BarGraph
            title="Phase Power Contribution (%)"
            data={phasePowerContribution}
          />
        </div>
        <div className="">
          <LineGraph title="Voltage" points={voltageData?.phaseData} />
        </div>
      </div>
    </div>
  );
}
