import { motion } from "framer-motion";
import { PackageCheck } from "lucide-react";

const TotalOrdersCard = () => {
	const totalOrders = 456; // Puedes conectarlo a un backend o base de datos luego

	return (
		<motion.div
			className='bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl shadow-md p-6 flex items-center gap-4'
			initial={{ opacity: 0, scale: 0.95 }}
			animate={{ opacity: 1, scale: 1 }}
			transition={{ delay: 0.1 }}
		>
			<div className='bg-white bg-opacity-20 p-3 rounded-full'>
				<PackageCheck size={32} />
			</div>
			<div>
				<h3 className='text-sm uppercase tracking-wide text-white/80'>Total de Órdenes</h3>
				<p className='text-2xl font-bold'>{totalOrders}</p>
			</div>
		</motion.div>
	);
};

export default TotalOrdersCard;