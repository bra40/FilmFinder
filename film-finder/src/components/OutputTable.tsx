import React from "react";

interface OutputTableProps {
  data: { movie: string; providers: string[] }[];
}

const OutputTable: React.FC<OutputTableProps> = ({ data }) => {
  return (
    <div className="overflow-x-auto rounded-md ">
      <table className="w-full border-collapse ">
        <thead>
          <tr className="bg-blue400 text-white500 text-left shadow-md">
            <th className="p-2 font-bold shadow-md">films</th>
            <th className="p-2 font-bold shadow-md">providers</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr
              key={index}
              className={index % 2 === 0 ? "bg-white500" : "bg-white200"}
            >
              <td className="p-2">{item.movie}</td>
              <td className="p-2">{item.providers.join(", ")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OutputTable;
