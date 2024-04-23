import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { Chart } from "primereact/chart";
import ChartDataLabels from "chartjs-plugin-datalabels";
import DungeonsOfEternityCache from "../models/DungeonsOfEternityCache";
import { gearSlotPlacement } from "../models/DungeonsOfEternityCache";
import "./overlap.css";

export default function DoughnutChartDemo() {
  const [chartData1, setChartData1] = useState({
    labels: [],
    datasets: [
      {
        data: [],
      },
    ],
  });
  const [chartData2, setChartData2] = useState({
    labels: [],
    datasets: [
      {
        data: [],
      },
    ],
  });
  const [chartData3, setChartData3] = useState({
    labels: [],
    datasets: [
      {
        data: [],
      },
    ],
  });
  const [chartOptions1, setChartOptions1] = useState({});
  const [chartOptions2, setChartOptions2] = useState({});
  const [chartOptions3, setChartOptions3] = useState({});

  const [cache, setCache] = useState(new DungeonsOfEternityCache());

  const [loading, setLoading] = useState(true);
  const [failedToLoad, setFailedToLoad] = useState(false);

  useEffect(() => {
    const fetcher = async () => {
      const newCache = await DungeonsOfEternityCache.Factory();
      if (newCache == null) {
        setFailedToLoad(true);
        return;
      }
      setCache(newCache);
      setLoading(false);
    };

    fetcher();
  }, []);

  useEffect(() => {
    const options1 = {
      cutout: "0%",
      plugins: {
        legend: {
          display: false,
        },
        datalabels: {
          formatter: function (value, context) {
            const { labels } = context.chart.data;
            const index = context.dataIndex;
            const data = context.dataset.data;
            const label = labels[index];
            const datum = data[index];
            return label + ":\n" + Math.round(datum * 10000) / 100 + "%";
          },
          color: "white",
        },
        tooltip: {
          enabled: false,
        },
      },
    };
    const options2 = {
      cutout: "60%",
      plugins: {
        legend: {
          display: false,
        },
        datalabels: {
          formatter: function (value, context) {
            const { labels } = context.chart.data;
            const index = context.dataIndex;
            const data = context.dataset.data;
            const label = labels[index];
            const datum = data[index];
            return label + ":\n" + Math.round(datum * 100) / 100 + "%";
          },
          color: "white",
          font: {
            weight: "bold",
          },
        },
        tooltip: {
          enabled: false,
        },
      },
    };
    const options3 = {
      cutout: "80%",
      plugins: {
        legend: {
          display: false,
        },
        datalabels: {
          formatter: function (value, context) {
            const { labels } = context.chart.data;
            const index = context.dataIndex;
            const data = context.dataset.data;
            const label = labels[index];
            const datum = data[index];
            return label + ":\n" + Math.round(datum * 10000) / 100 + "%";
          },
          color: "white",
          font: {
            weight: "bold",
          },
        },
        tooltip: {
          enabled: false,
        },
      },
    };
    setChartOptions1(options1);
    setChartOptions2(options2);
    setChartOptions3(options3);

    const gearSlotLabels = [
      ...[...Object.values(gearSlotPlacement)]
        .reduce((a, e) => a.add(e), new Set())
        .values(),
    ].sort();
    const gearSlotValues = gearSlotLabels.map(
      (slotName) =>
        cache.statistics.slots[slotName] / cache.statistics.totalDrops,
    );
    const entries = Object.entries(gearSlotPlacement).sort(
      ([e1g, e1s], [e2g, e2s]) => {
        if (e1s < e2s) {
          return -1;
        }
        if (e1s > e2s) {
          return 1;
        }
        if (e1g < e2g) {
          return -1;
        }
        if (e1g > e2g) {
          return 1;
        }
        return 0;
      },
    );
    const gearByBackThenHip = entries.map((e) => e[0]);

    const documentStyle = getComputedStyle(document.documentElement);
    const data1 = {
      labels: gearSlotLabels,
      datasets: [
        {
          data: gearSlotValues,

          backgroundColor: [
            documentStyle.getPropertyValue("--red-800"),
            documentStyle.getPropertyValue("--blue-800"),
          ],
          hoverBackgroundColor: [
            documentStyle.getPropertyValue("--red-600"),
            documentStyle.getPropertyValue("--blue-600"),
          ],
        },
      ],
    };
    const gearData2 = gearByBackThenHip.map((g) => {
      return cache.statistics.byGroup?.get(g) * 100;
    });
    const data2 = {
      labels: gearByBackThenHip,
      datasets: [
        {
          data: gearData2,
          backgroundColor: [
            documentStyle.getPropertyValue("--red-800"),
            documentStyle.getPropertyValue("--red-600"),
            documentStyle.getPropertyValue("--red-400"),
            documentStyle.getPropertyValue("--red-200"),
            documentStyle.getPropertyValue("--blue-800"),
            documentStyle.getPropertyValue("--blue-600"),
            documentStyle.getPropertyValue("--blue-400"),
            documentStyle.getPropertyValue("--blue-200"),
          ],
          hoverBackgroundColor: [
            documentStyle.getPropertyValue("--red-800"),
            documentStyle.getPropertyValue("--red-600"),
            documentStyle.getPropertyValue("--red-400"),
            documentStyle.getPropertyValue("--red-200"),
            documentStyle.getPropertyValue("--blue-800"),
            documentStyle.getPropertyValue("--blue-600"),
            documentStyle.getPropertyValue("--blue-400"),
            documentStyle.getPropertyValue("--blue-200"),
          ],
        },
      ],
    };

    const gear3DataLabels = gearByBackThenHip
      .map((groupName) => {
        const gearDrops = cache.indexes.byGroup.get(groupName) ?? [];
        const names = [...new Set(gearDrops.map((g) => g.Name))].sort();
        return names;
      })
      .flat();
    const data3 = {
      labels: gear3DataLabels,
      datasets: [
        {
          data: gear3DataLabels.map((l) => cache.statistics.byName.get(l)),
          backgroundColor: [
            documentStyle.getPropertyValue("--red-900"),
            documentStyle.getPropertyValue("--red-800"),
            documentStyle.getPropertyValue("--red-700"),
            documentStyle.getPropertyValue("--red-600"),
            documentStyle.getPropertyValue("--red-500"),
            documentStyle.getPropertyValue("--red-400"),
            documentStyle.getPropertyValue("--red-300"),
            documentStyle.getPropertyValue("--yellow-200"),
            documentStyle.getPropertyValue("--yellow-300"),
            documentStyle.getPropertyValue("--yellow-400"),
            documentStyle.getPropertyValue("--yellow-500"),
            documentStyle.getPropertyValue("--yellow-600"),
            documentStyle.getPropertyValue("--yellow-700"),
            documentStyle.getPropertyValue("--yellow-800"),
            documentStyle.getPropertyValue("--yellow-900"),
            documentStyle.getPropertyValue("--orange-900"),
            documentStyle.getPropertyValue("--orange-800"),
            documentStyle.getPropertyValue("--orange-700"),
            documentStyle.getPropertyValue("--orange-600"),
            documentStyle.getPropertyValue("--orange-800"),

            documentStyle.getPropertyValue("--blue-900"),
            documentStyle.getPropertyValue("--blue-800"),
            documentStyle.getPropertyValue("--blue-700"),
            documentStyle.getPropertyValue("--blue-600"),
            documentStyle.getPropertyValue("--blue-500"),

            documentStyle.getPropertyValue("--green-400"),
            documentStyle.getPropertyValue("--green-500"),
            documentStyle.getPropertyValue("--green-600"),
            documentStyle.getPropertyValue("--green-700"),
            documentStyle.getPropertyValue("--green-800"),
            documentStyle.getPropertyValue("--green-900"),
            documentStyle.getPropertyValue("--purple-900"),
            documentStyle.getPropertyValue("--purple-800"),
            documentStyle.getPropertyValue("--purple-700"),
            documentStyle.getPropertyValue("--purple-600"),
          ],
          hoverBackgroundColor: [
            documentStyle.getPropertyValue("--red-900"),
            documentStyle.getPropertyValue("--red-800"),
            documentStyle.getPropertyValue("--red-700"),
            documentStyle.getPropertyValue("--red-600"),
            documentStyle.getPropertyValue("--red-500"),
            documentStyle.getPropertyValue("--red-400"),
            documentStyle.getPropertyValue("--red-300"),
            documentStyle.getPropertyValue("--red-200"),
            documentStyle.getPropertyValue("--yellow-200"),
            documentStyle.getPropertyValue("--yellow-300"),
            documentStyle.getPropertyValue("--yellow-400"),
            documentStyle.getPropertyValue("--yellow-500"),
            documentStyle.getPropertyValue("--yellow-600"),
            documentStyle.getPropertyValue("--yellow-700"),
            documentStyle.getPropertyValue("--yellow-800"),
            documentStyle.getPropertyValue("--yellow-900"),
            documentStyle.getPropertyValue("--orange-900"),
            documentStyle.getPropertyValue("--orange-800"),
            documentStyle.getPropertyValue("--orange-700"),
            documentStyle.getPropertyValue("--orange-600"),

            documentStyle.getPropertyValue("--blue-900"),
            documentStyle.getPropertyValue("--blue-800"),
            documentStyle.getPropertyValue("--blue-700"),
            documentStyle.getPropertyValue("--blue-600"),
            documentStyle.getPropertyValue("--blue-500"),
            documentStyle.getPropertyValue("--blue-400"),
            documentStyle.getPropertyValue("--blue-300"),
            documentStyle.getPropertyValue("--blue-200"),
            documentStyle.getPropertyValue("--green-200"),
            documentStyle.getPropertyValue("--green-300"),
            documentStyle.getPropertyValue("--green-400"),
            documentStyle.getPropertyValue("--green-500"),
            documentStyle.getPropertyValue("--green-600"),
            documentStyle.getPropertyValue("--green-700"),
            documentStyle.getPropertyValue("--green-800"),
            documentStyle.getPropertyValue("--green-900"),
            documentStyle.getPropertyValue("--purple-900"),
            documentStyle.getPropertyValue("--purple-800"),
            documentStyle.getPropertyValue("--purple-700"),
            documentStyle.getPropertyValue("--purple-600"),
          ],
        },
      ],
    };

    setChartData1(data1);
    setChartOptions1(options1);
    setChartData2(data2);
    setChartOptions2(options2);
    setChartData3(data3);
    setChartOptions3(options3);
  }, [cache]);

  if (failedToLoad) {
    return <p>bummer</p>;
  }

  if (loading) {
    return null;
  }
  return (
    <Container fluid className="chartcontainer">
      <Chart
        plugins={[ChartDataLabels]}
        className="topchart"
        type="doughnut"
        data={chartData1}
        options={chartOptions1}
      />
      <Chart
        plugins={[ChartDataLabels]}
        type="doughnut"
        data={chartData2}
        options={chartOptions2}
        className="middlechart"
      />
      <Chart
        plugins={[ChartDataLabels]}
        type="doughnut"
        data={chartData3}
        options={chartOptions3}
        className="bottomchart"
      />
    </Container>
  );
}