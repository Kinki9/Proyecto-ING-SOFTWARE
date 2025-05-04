import { useState } from "react";
import { Download, FileText, Printer } from "lucide-react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import AnalyticsReport from "./AnalyticsReport";

const ExportControls = ({ timeRange, setTimeRange }) => {
  const [exportFormat, setExportFormat] = useState("pdf");

  return (
    <div className="flex items-center space-x-4">
      <select
        className="bg-gray-700 text-white rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={timeRange}
        onChange={(e) => setTimeRange(e.target.value)}
      >
        <option value="lastWeek">Última semana</option>
        <option value="lastMonth">Último mes</option>
        <option value="lastQuarter">Último trimestre</option>
        <option value="lastYear">Último año</option>
      </select>

      <div className="relative">
        <button className="flex items-center bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded-md text-sm transition-colors">
          <Download className="mr-1 size-4" />
          Exportar
        </button>
        
        <div className="absolute right-0 mt-1 w-48 bg-gray-800 rounded-md shadow-lg z-10 hidden group-hover:block">
          <div className="py-1">
            <PDFDownloadLink 
              document={<AnalyticsReport timeRange={timeRange} />} 
              fileName={`reporte-aeroespacial-${new Date().toISOString().split('T')[0]}.pdf`}
              className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
            >
              <FileText className="mr-2 size-4" />
              PDF
            </PDFDownloadLink>
            <button className="flex items-center w-full px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">
              <Printer className="mr-2 size-4" />
              Imprimir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportControls;