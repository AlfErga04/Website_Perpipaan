import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const LABELS = {
  maritim_perkapalan: "Industri maritim & perkapalan",
  migas: "Industri migas",
  energi_listrik: "Energi dan listrik",
  kimia: "Industri kimia",
  konstruksi_infrastruktur: "Konstruksi & infrastruktur",
  lain_lain: "Lain-lain"
};

const COLORS = ["#8979ff", "#FF928a", "#3cc3df", "#FFAE4C", "#537ff1", "#CBE896"];

const renderCustomizedLabel = (props) => {
  const { cx, cy, midAngle, outerRadius, percent, payload } = props;
  const RADIAN = Math.PI / 180;

  const startRadius = outerRadius - 6;
  const startX = cx + startRadius * Math.cos(-midAngle * RADIAN);
  const startY = cy + startRadius * Math.sin(-midAngle * RADIAN);

  const midRadius = outerRadius + 8;
  const midX = cx + midRadius * Math.cos(-midAngle * RADIAN);
  const midY = cy + midRadius * Math.sin(-midAngle * RADIAN);

  const endRadius = outerRadius + 36;
  const endX = cx + endRadius * Math.cos(-midAngle * RADIAN);
  const endY = cy + endRadius * Math.sin(-midAngle * RADIAN);

  const textAnchor = endX > cx ? "start" : "end";
  const textOffsetX = endX > cx ? 6 : -6;

  return (
    <g>
      <polyline
        points={`${startX},${startY} ${midX},${midY} ${endX},${endY}`}
        stroke="#ffffff"
        strokeWidth={1.2}
        fill="none"
      />
      <circle cx={startX} cy={startY} r={1.2} fill="#ffffff" />

      <text
        x={endX + textOffsetX}
        y={endY}
        fill="#ffffff"
        fontSize={13}
        textAnchor={textAnchor}
        dominantBaseline="central"
        style={{ fontWeight: 500 }}
      >
        {`${payload.name}: ${(percent * 100).toFixed(0)}%`}
      </text>
    </g>
  );
};

const AlumniJobCharts = () => {
  const [jobData, setJobData] = useState([]);

useEffect(() => {
  axios
    .get(`${import.meta.env.VITE_API_URL}/alumni/job-stats`)
    .then((res) => {
      const raw = res.data.data;

      const formatted = raw
        .map((item) => ({
          name: LABELS[item.sector] ?? item.sector,
          value: Number(item.percentage.toFixed(2)), // rapikan angka desimal
        }))
        .filter((item) => item.value > 0);

      setJobData(formatted);
    })
    .catch((err) => {
      console.error("Gagal fetch job stats:", err);
    });
}, []);


  return (
    <div className="w-full flex justify-center items-center py-6">
      <div className="w-full max-w-[800px] min-h-[400px]">
        <ResponsiveContainer width="100%" aspect={1.6}>
          <PieChart>
            <Pie
              data={jobData}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={110}
              dataKey="value"
              labelLine={false}
              label={renderCustomizedLabel}
            >
              {jobData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AlumniJobCharts;
