"use client"

import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

const productSales = [
  {
    name: "May",
    product1: 1890,
    product2: 2181,
  },
  {
    name: "Jun",
    product1: 2390,
    product2: 2050,
  },
]

export const MonthBarChart = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        width={500}
        height={400}
        data={productSales}
        margin={{ right: 30 }}
      >
        <YAxis />
        <XAxis dataKey="name" />
        <CartesianGrid strokeDasharray="5 5" />

        <Tooltip content={<CustomTooltip />} />
        <Legend />

        <Area
          type="monotone"
          dataKey="product1"
          stroke="hsl(var(--primary))"
          fill="hsl(var(--primary))"
          stackId="1"
        />
        <Area
          type="monotone"
          dataKey="product2"
          stroke="#bef264"
          fill="#bef264"
          stackId="1"
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="flex flex-col gap-4 rounded-md bg-slate-900 p-4">
        <p className="text-medium text-lg">{label}</p>
        <p className="text-sm text-blue-400">
          <span>{`Product #1`}</span>
          <span className="ml-2">${payload[0].value}</span>
        </p>
        <p className="text-sm text-blue-400">
          <span>{`Product #2`}</span>
          <span className="ml-2">${payload[1].value}</span>
        </p>
      </div>
    )
  }
}
