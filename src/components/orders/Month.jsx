import { motion } from "framer-motion";
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
} from "recharts";

const monthlyInvestmentData = [
	{ month: "Enero", investment: 12000 },
	{ month: "Febrero", investment: 18000 },
	{ month: "Marzo", investment: 9500 },
	{ month: "Abril", investment: 22000 },
	{ month: "Mayo", investment: 14500 },
];
const MonthlyInvestmentChart = () => {
	// Eliminamos la anotación ": number" y usamos JS estándar
	const formatTooltip = (value) => `$${value.toLocaleString()}`;

	return (
		<motion.div
			className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.6 }}
		>
			<h2 className='text-xl font-semibold text-gray-100 mb-4'>Inversión por Mes ($)</h2>
			<div style={{ width: "100%", height: 300 }}>
				<ResponsiveContainer>
					<BarChart data={monthlyInvestmentData}>
						<CartesianGrid strokeDasharray='3 3' stroke='#374151' />
						<XAxis dataKey='month' stroke='#9CA3AF' />
						<YAxis stroke='#9CA3AF' />
						<Tooltip
							contentStyle={{
								backgroundColor: "rgba(31, 41, 55, 0.8)",
								borderColor: "#4B5563",
							}}
							itemStyle={{ color: "#E5E7EB" }}
							formatter={formatTooltip}
						/>
						<Bar dataKey='investment' fill='#3B82F6' barSize={40} />
					</BarChart>
				</ResponsiveContainer>
			</div>
		</motion.div>
	);
};


export default MonthlyInvestmentChart;