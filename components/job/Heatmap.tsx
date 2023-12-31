const Heatmap = ({ data }: { data?: number[] }) => {
  if (!data) return;
  return (
    <div className="w-full grid grid-flow-col border shadow-xl rounded-full overflow-hidden">
      {data?.map((val, idx) => {
        const color = perc2color(val * 100);
        return (
          <div
            key={idx}
            className="shadow-xl min-h-[2px]"
            style={{
              backgroundColor: color,
            }}
          />
        );
      })}
    </div>
  );
};

export default Heatmap;

// License: MIT - https://opensource.org/licenses/MIT
// Author: Michele Locati <michele@locati.it>
// Source: https://gist.github.com/mlocati/7210513
const perc2color = (perc: number) => {
  // flip, since the original function goes from red --> green, instead of green --> red
  perc = 100 - perc;
  let r,
    g,
    b = 0;
  if (perc < 50) {
    r = 255;
    g = Math.round(5.1 * perc);
  } else {
    g = 255;
    r = Math.round(510 - 5.1 * perc);
  }
  const h = r * 0x10000 + g * 0x100 + b * 0x1;
  const hex = "#" + ("000000" + h.toString(16)).slice(-6);
  return hex;
};
