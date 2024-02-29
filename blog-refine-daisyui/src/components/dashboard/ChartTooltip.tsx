export const ChartTooltip = ({
  active,
  payload,
  label,
  coordinate,
  colors,
  kpi,
}: any) => {
  if (active && payload && payload.length) {
    const dataPoint = payload[0].payload;

    const tooltipStyle = {
      left: coordinate.x, // Adjust positioning
      top: coordinate.y, // Adjust positioning
    };

    const label1=label.split(" ")[0]+" "+label.split(" ")[1]+" "+(Number(label.split(" ")[2])-1);

    return (
      <div
        className="p-1 flex flex-col justify-center items-start border border-black rounded-lg text-zinc-50"
        style={tooltipStyle}
      >
        <div
          style={{
            position: "absolute",
            width: "0",
            height: "0",
            borderTop: "10px solid transparent",
            borderBottom: "10px solid transparent",
            borderRight: "10px solid rgba(0, 0, 0, 0.7)",
            left: "-10px",
          }}
        />
        <div className="flex flex-col gap-2 mb-2">
          <p className="flex text-xs font-semibold">{label1}</p>
          <p className="text-xs">
            <span
              className="mr-1"
              style={{
                width: "0.5px",
                height: "0.5px",
                border: `1px solid ${colors?.stroke}`,
                backgroundColor: colors?.fill,
              }}
            >
              &nbsp;&nbsp;&nbsp;&nbsp;
            </span>
            {`${kpi}: ${dataPoint.value}`}
          </p>
        </div>
        <div className="flex flex-col gap-2">
        <p className="flex text-xs font-semibold">{label}</p>
          <p className="text-xs">
            <span
              className="mr-1"
              style={{
                width: "0.5px",
                height: "0.5px",
                border: `1px solid ${colors?.stroke}`,
                backgroundColor: colors?.fill,
              }}
            >
              &nbsp;&nbsp;&nbsp;&nbsp;
            </span>
            {`${kpi}: ${dataPoint.value1}`}
          </p>
        </div>
      </div>
    );
  }

  return null;
};
