import React, { useEffect, useState } from "react";
import { TabPanel } from "./TabPanel";
import { IChartDatum, TTab } from "../../interfaces";
import { IoIosArrowDown } from "react-icons/io";
import { FaPencil } from "react-icons/fa6";
type TTabViewProps = {
  monthlyData: any;
  tabs: TTab[];
  selectedDate: string;
  setSelectedDate: React.Dispatch<React.SetStateAction<string>>;
  selectedSecond: string;
  setSelectedSecond: React.Dispatch<React.SetStateAction<string>>;
};

export const TabView = ({
  monthlyData,
  tabs,
  selectedDate,
  setSelectedDate,
  selectedSecond,
  setSelectedSecond,
}: TTabViewProps) => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [clicked, setIsClicked] = useState<boolean>(false);

  const data = [
    {
      title: "Online Store Sessions",
      value: monthlyData?.data?.reduce(
        (total: number, item: IChartDatum) =>
          total + Number(item.onlineStoreSessions),
        0
      ),
    },
    {
      title: "Net return value",
      value: monthlyData?.data
        ?.reduce(
          (total: number, item: IChartDatum) =>
            total + Number(item.netReturnValue),
          0
        )
        .toFixed(2),
    },
    {
      title: "Total Orders",
      value: monthlyData?.data
        ?.reduce(
          (total: number, item: IChartDatum) =>
            total + Number(item.totalOrders),
          0
        )
        .toFixed(2),
    },
    {
      title: "Conversion Rate",
      value: monthlyData?.data
        ?.reduce(
          (total: number, item: IChartDatum) =>
            total + Number(item.conversionRate),
          0
        )
        .toFixed(2),
    },
  ];

  useEffect(() => {
    setLoading(false);
  }, [monthlyData]);

  const handleTabClick = (index: number) => {
    setActiveTab(index === activeTab ? 0 : index);
  };
  return (
    <div className="py-4 bg-[#FFFFFF] border rounded-lg shadow-lg">
      <div className="flex px-8 gap-4">
        {data?.map((metric, index) => (
          <div
            className="flex flex-col flex-1 p-4 rounded-lg"
            onClick={() => handleTabClick(index)}
            key={index}
            style={{
              background: activeTab === index ? "#F1F1F1" : "white",
              cursor: "pointer",
              width: "80%",
            }}
          >
            <div className="flex items-center justify-between">
              <p>{metric.title}</p>
              <div>{activeTab === index && <FaPencil color="#787878" />}</div>
            </div>
            <p>{metric.value}</p>
          </div>
        ))}
        <div
          className="flex items-center"
          onClick={() => setIsClicked(!clicked)}
        >
          <IoIosArrowDown />
        </div>
      </div>
      <div className="mx-auto" style={{ display: clicked ? "none" : "block" }}>
        {tabs?.map((tab: TTab, index: number) => (
          <TabPanel key={tab?.id} isActive={index === activeTab}>
            {tab?.content}
          </TabPanel>
        ))}
      </div>
      <div
        className="flex justify-end items-center gap-8"
        style={{ display: clicked ? "none" : "flex" }}
      >
        <select
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        >
          <option value="1-6">February 2022-July 2022</option>
          <option value="7-12"> August 2022-January 2023</option>
          <option value="13-18">February 2023-July 2023</option>
          <option value="19-25">August 2023-January 2024</option>
        </select>
        <select
          value={selectedSecond}
          onChange={(e) => setSelectedSecond(e.target.value)}
        >
          <option value="1-6">February 2022-July 2022</option>
          <option value="7-12"> August 2022-January 2023</option>
          <option value="13-18">February 2023-July 2023</option>
          <option value="19-25">August 2023-January 2024</option>
        </select>
      </div>
    </div>
  );
};
