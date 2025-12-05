import React from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// Dummy data sementara (nanti ganti dari API)
const jobData = [
  { name: "Industri maritim & perkapalan", value: 35 },
  { name: "Industri migas", value: 20 },
  { name: "Energi dan listrik", value: 15 },
  { name: "Industri kimia", value: 10 },
  { name: "Konstruksi & infrastruktur", value: 20 },
];

const COLORS = ["#00BCD4", "#FFC107", "#4CAF50", "#FF5722", "#7C4DFF"];

/**
 * renderCustomizedLabel
 * props yang tersedia: { cx, cy, midAngle, innerRadius, outerRadius, percent, index, payload }
 * - kita gambar garis (polyline) dari titik tepi slice -> titik tengah garis -> posisi label akhir
 * - tampilkan text di posisi akhir dengan alignment berdasarkan sisi kanan/kiri
 */
const renderCustomizedLabel = (props) => {
  const { cx, cy, midAngle, outerRadius, percent, payload } = props;
  const RADIAN = Math.PI / 180;

  // titik mulai (tepi luar slice, sedikit masuk supaya garis mulai terlihat dari potongan)
  const startRadius = outerRadius - 6;
  const startX = cx + startRadius * Math.cos(-midAngle * RADIAN);
  const startY = cy + startRadius * Math.sin(-midAngle * RADIAN);

  // titik tengah garis (sedikit keluar dari slice)
  const midRadius = outerRadius + 8;
  const midX = cx + midRadius * Math.cos(-midAngle * RADIAN);
  const midY = cy + midRadius * Math.sin(-midAngle * RADIAN);

  // titik akhir (posisi label)
  const endRadius = outerRadius + 36;
  const endX = cx + endRadius * Math.cos(-midAngle * RADIAN);
  const endY = cy + endRadius * Math.sin(-midAngle * RADIAN);

  // jika label di kanan, beri sedikit offset ke kanan; jika di kiri, offset ke kiri
  const textAnchor = endX > cx ? "start" : "end";
  const textOffsetX = endX > cx ? 6 : -6;

  return (
    <g>
      {/* Garis leader: dari tepi slice -> mid -> label */}
      <polyline
        points={`${startX},${startY} ${midX},${midY} ${endX},${endY}`}
        stroke="#ffffff"
        strokeWidth={1.2}
        fill="none"
      />
      {/* Bulatan kecil di ujung garis (opsional, bisa dihilangkan) */}
      <circle cx={startX} cy={startY} r={1.2} fill="#ffffff" />

      {/* Label (nama + persen) */}
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
  return (
    <div className="w-full flex justify-center items-center py-6">
      <div style={{ width: "100%", maxWidth: 800, height: 360 }}>
        <ResponsiveContainer width="100%" height="100%">
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
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AlumniJobCharts;
