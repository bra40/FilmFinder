import React from "react";

interface OutputTableProps {
  data: { movie: string; providers: string[] }[];
}

const OutputTable: React.FC<OutputTableProps> = ({ data }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 font-bold">films</th>
            <th className="p-2 font-bold">providers</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr
              key={index}
              className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
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
