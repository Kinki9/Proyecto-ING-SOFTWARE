import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Eye } from "lucide-react";

const rawMaterialOrders = [
	{ id: "CMP001", material: "Cobre", quantity: "500 kg", supplier: "MetalCorp", status: "Entregado", date: "2025-04-01" },
	{ id: "CMP002", material: "Silicio", quantity: "300 kg", supplier: "SilicaTech", status: "Procesando", date: "2025-04-02" },
	{ id: "CMP003", material: "Oxígeno Líquido", quantity: "800 L", supplier: "CryoGases", status: "Enviado", date: "2025-04-03" },
	{ id: "CMP004", material: "Aluminio", quantity: "1000 kg", supplier: "AluWorld", status: "Pendiente", date: "2025-04-04" },
	{ id: "CMP005", material: "Titanio", quantity: "200 kg", supplier: "TitanWorks", status: "Entregado", date: "2025-04-05" },
];

const RawMaterialTable = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [filteredOrders, setFilteredOrders] = useState(rawMaterialOrders);

	const handleSearch = (e) => {
		const term = e.target.value.toLowerCase();
		setSearchTerm(term);
		const filtered = rawMaterialOrders.filter(
			(order) =>
				order.id.toLowerCase().includes(term) ||
				order.material.toLowerCase().includes(term) ||
				order.supplier.toLowerCase().includes(term)
		);
		setFilteredOrders(filtered);
	};

	return (
		<motion.div
			className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.4 }}
		>
			<div className='flex justify-between items-center mb-6'>
				<h2 className='text-xl font-semibold text-gray-100'>Órdenes de Materia Prima</h2>
				<div className='relative'>
					<input
						type='text'
						placeholder='Buscar orden...'
						className='bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
						value={searchTerm}
						onChange={handleSearch}
					/>
					<Search className='absolute left-3 top-2.5 text-gray-400' size={18} />
				</div>
			</div>

			<div className='overflow-x-auto'>
				<table className='min-w-full divide-y divide-gray-700'>
					<thead>
						<tr>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase'>ID</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase'>Material</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase'>Cantidad</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase'>Proveedor</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase'>Estado</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase'>Fecha</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase'>Acciones</th>
						</tr>
					</thead>
					<tbody className='divide divide-gray-700'>
						{filteredOrders.map((order) => (
							<motion.tr
								key={order.id}
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ duration: 0.3 }}
							>
								<td className='px-6 py-4 text-sm font-medium text-gray-100'>{order.id}</td>
								<td className='px-6 py-4 text-sm font-medium text-gray-100'>{order.material}</td>
								<td className='px-6 py-4 text-sm font-medium text-gray-100'>{order.quantity}</td>
								<td className='px-6 py-4 text-sm font-medium text-gray-100'>{order.supplier}</td>
								<td className='px-6 py-4 text-sm'>
									<span
										className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
											order.status === "Entregado"
												? "bg-green-100 text-green-800"
												: order.status === "Procesando"
												? "bg-yellow-100 text-yellow-800"
												: order.status === "Enviado"
												? "bg-blue-100 text-blue-800"
												: "bg-red-100 text-red-800"
										}`}
									>
										{order.status}
									</span>
								</td>
								<td className='px-6 py-4 text-sm text-gray-300'>{order.date}</td>
								<td className='px-6 py-4 text-sm text-gray-300'>
									<button className='text-indigo-400 hover:text-indigo-300 mr-2'>
										<Eye size={18} />
									</button>
								</td>
							</motion.tr>
						))}
					</tbody>
				</table>
			</div>
		</motion.div>
	);
};

export default RawMaterialTable;