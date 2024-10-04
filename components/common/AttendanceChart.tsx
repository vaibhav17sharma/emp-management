"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, Cell, XAxis } from "recharts";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface GroupedAttendanceData {
  date: string;
  valueKey: number;
  value: string;
}

interface ChartProps {
  chartData: GroupedAttendanceData[];
}

const chartConfig = {
  views: {
    label: "Active Hours",
  },
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export const AttendanceChart: React.FC<ChartProps> = ({ chartData }) => {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("desktop");

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 p-0 sm:flex-row"></CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });
                  }}
                />
              }
            />
            <Bar dataKey={"valueKey"}>
              {chartData.map((item) => (
                <Cell
                  key={item.valueKey}
                  fill={
                    item.valueKey >= 500
                      ? "hsl(var(--chart-1))"
                      : "hsl(var(--chart-3))"
                  }
                />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
