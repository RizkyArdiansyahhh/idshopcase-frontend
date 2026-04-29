"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const SECTIONS = [
  {
    id: 0,
    title: "Cepat",
    desc: "Aplikasi super cepat",
    image: "/images/product-1.jpeg",
  },
  {
    id: 1,
    title: "Aman",
    desc: "Keamanan terjamin",
    image: "/images/product-2.jpeg",
  },
  {
    id: 2,
    title: "Mudah",
    desc: "User friendly",
    image: "/images/product-3.jpeg",
  },
];
const ratingData = [
  { star: 5, percent: 60 }, // 60% pengguna kasih 5 bintang
  { star: 4, percent: 25 },
  { star: 3, percent: 10 },
  { star: 2, percent: 3 },
  { star: 1, percent: 2 },
];

export const StickyScrollHomePage = () => {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  const [boxes, setBoxes] = useState<(string | null)[]>([null, null]); // tetap untuk kotak video/gambar
  const [ratingVisible, setRatingVisible] = useState(false);
  const [ratingValues, setRatingValues] = useState<number[]>([0, 0, 0, 0, 0]);
  const ratingTarget = 4.7; // misal rating average

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !ratingVisible) {
            setRatingVisible(true);

            ratingData.forEach((data, i) => {
              let start = 0;
              const duration = 800; // 0.8s
              const stepTime = 16; // ~60fps
              const increment = data.percent / (duration / stepTime);

              const interval = setInterval(() => {
                start += increment;
                if (start >= data.percent) {
                  start = data.percent;
                  clearInterval(interval);
                }
                setRatingValues((prev) => {
                  const newValues = [...prev];
                  newValues[i] = start;
                  return newValues;
                });
              }, stepTime);
            });
          }
        });
      },
      { threshold: 0.6 },
    );

    refs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [ratingVisible]);

  return (
    <section className="relative py-40">
      <div className="mx-auto  w-[80vw] flex flex-row  gap-16">
        <div className="space-y-40 w-[20%]">
          {SECTIONS.map((item, i) => (
            <div
              key={item.id}
              ref={(el) => {
                refs.current[i] = el;
              }}
              data-index={i}
              className="min-h-[70vh]"
            >
              <h2 className="text-4xl font-bold">{item.title}</h2>
              <p className="mt-4 text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="w-[80%]">
          <div className="sticky top-32 z-30 h-[80vh] rounded-xs overflow-hidden flex gap-2">
            <div className="w-full h-full flex flex-row gap-1.5">
              <div className="w-1/2 h-full border rounded-xs relative overflow-hidden">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className="w-full h-full object-cover"
                >
                  <source
                    src="https://res.cloudinary.com/dy9gtwsh7/video/upload/v1770913678/We_regret_it_xyud2n.mp4"
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
              </div>

              <div className="w-1/2 h-full flex flex-col gap-2">
                <div className="w-full h-1/2 border rounded-xs relative overflow-hidden bg-black p-4 flex flex-col justify-center gap-2">
                  <ChartBarLabelCustom></ChartBarLabelCustom>
                </div>

                <div className="w-full h-1/2 border rounded-xs relative overflow-hidden">
                  {boxes[2] && (
                    <Image
                      src={boxes[2]}
                      alt="kotak 2"
                      fill
                      className="object-cover object-center transition-opacity duration-500"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

import { TrendingUp } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

export const description = "A bar chart with a custom label";

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-2)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-2)",
  },
  label: {
    color: "var(--background)",
  },
} satisfies ChartConfig;

export function ChartBarLabelCustom() {
  return (
    <Card className="bg-transparent">
      <CardHeader>
        <CardTitle>Bar Chart - Custom Label</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              right: 16,
            }}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="month"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
              hide
            />
            <XAxis dataKey="desktop" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar
              dataKey="desktop"
              layout="vertical"
              fill="var(--color-desktop)"
              radius={4}
            >
              <LabelList
                dataKey="month"
                position="insideLeft"
                offset={8}
                className="fill-(--color-label)"
                fontSize={12}
              />
              <LabelList
                dataKey="desktop"
                position="right"
                offset={8}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
