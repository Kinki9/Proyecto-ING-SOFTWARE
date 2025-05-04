import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const dailyRawMaterialOrders = [
	{ date: "01/01", orders: 220 },
	{ date: "01/02", orders: 31 },
	{ date: "01/03", orders: 150 },
	{ date: "01/04", orders: 49 },
	{ date: "01/05", orders: 68 },
	{ date: "01/06", orders: 190 },
	{ date: "01/07", orders: 90 },
	{ date: "01/08", orders: 110 },
	{ date: "01/09", orders: 75 },
	{ date: "01/10", orders: 57 },
	{ date: "01/11", orders: 81 },
	{ date: "01/12", orders: 175 },
	{ date: "01/13", orders: 162 },
	{ date: "01/14", orders: 93 },
	{ date: "01/15", orders: 86 },
	{ date: "01/16", orders: 45 },
	{ date: "01/17", orders: 235 },
	{ date: "01/18", orders: 190 },
	{ date: "01/19", orders: 219 },
	{ date: "01/20", orders: 10 },
	{ date: "01/21", orders: 190 },

];

const DailyRawMaterialOrders = () => {
	return (
		<motion.div
			className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.2 }}
		>
			<h2 className='text-xl font-semibold text-gray-100 mb-4'>Órdenes de Materia Prima por Día</h2>

			<div style={{ width: "100%", height: 300 }}>
				<ResponsiveContainer>
					<LineChart data={dailyRawMaterialOrders}>
						<CartesianGrid strokeDasharray='3 3' stroke='#374151' />
						<XAxis dataKey='date' stroke='#9CA3AF' />
						<YAxis stroke='#9CA3AF' />
						<Tooltip
							contentStyle={{
								backgroundColor: "rgba(31, 41, 55, 0.8)",
								borderColor: "#4B5563",
							}}
							itemStyle={{ color: "#E5E7EB" }}
						/>
						<Legend />
						<Line type='monotone' dataKey='orders' stroke='#34D399' strokeWidth={2} />
					</LineChart>
				</ResponsiveContainer>
			</div>
		</motion.div>
	);
};

export default DailyRawMaterialOrders;