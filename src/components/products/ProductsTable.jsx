import { motion } from "framer-motion";
import { Edit, Search, Trash2, PlusCircle, Plus } from "lucide-react";
import { useState, useEffect } from "react";

// Datos iniciales
const PRODUCT_DATA = [
	{ id: 1, name: "Cobre", category: "Material", price: 1330.99, stock: 143, sales: 1200, usage: [] },
	{ id: 2, name: "Silicio", category: "Material", price: 3900.99, stock: 289, sales: 800, usage: [] },
	{ id: 3, name: "Titanio", category: "Material", price: 9670.99, stock: 569, sales: 650, usage: [] },
	{ id: 4, name: "Fibra de carbono", category: "Material", price: 6600.00, stock: 210, sales: 950, usage: [] },
	{ id: 5, name: "Hidrogeno Liquido", category: "Combustible", price: 7999.99, stock: 780, sales: 720, usage: [] },
	{ id: 6, name: "Aluminio", category: "Material", price: 1800.00, stock: 300, sales: 720, usage: [] },
	{ id: 7, name: "Oxigeno Liquido", category: "Combustible", price: 4200.00, stock: 170, sales: 720, usage: [] },
	{ id: 8, name: "Etanol", category: "Material", price: 2999.99, stock: 640, usage: [] },
];

const ProductsTable = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [products, setProducts] = useState(() => {
		const stored = localStorage.getItem("products");
		return stored ? JSON.parse(stored) : PRODUCT_DATA;
	});
	const [selectedProductId, setSelectedProductId] = useState(null);
	const [usageInput, setUsageInput] = useState({ quantity: "", project: "" });
	const [newProductFormVisible, setNewProductFormVisible] = useState(false);
	const [newProduct, setNewProduct] = useState({
		name: "",
		category: "",
		price: "",
		stock: "",
	});

	// Actualiza el localStorage cada vez que los productos cambian
	useEffect(() => {
		localStorage.setItem("products", JSON.stringify(products));
	}, [products]);

	const handleSearch = (e) => {
		setSearchTerm(e.target.value.toLowerCase());
	};

	const filteredProducts = products.filter(
		(p) =>
			p.name.toLowerCase().includes(searchTerm) ||
			p.category.toLowerCase().includes(searchTerm)
	);

	const openUsageForm = (id) => {
		setSelectedProductId(id);
		setUsageInput({ quantity: "", project: "" });
	};

	const handleUsageSubmit = () => {
		if (!usageInput.quantity || !usageInput.project) return;

		const updated = products.map((p) =>
			p.id === selectedProductId
				? {
						...p,
						usage: [
							...p.usage,
							{
								id: Date.now(),
								quantity: parseFloat(usageInput.quantity),
								project: usageInput.project,
								date: new Date().toLocaleDateString(),
							},
						],
				  }
				: p
		);
		setProducts(updated);
		setSelectedProductId(null);
	};

	// Mostrar el formulario para agregar un nuevo producto
	const toggleNewProductForm = () => {
		setNewProductFormVisible(!newProductFormVisible);
	};

	// Manejar el envío del formulario de nuevo producto
	const handleNewProductSubmit = (e) => {
		e.preventDefault();
		if (!newProduct.name || !newProduct.category || !newProduct.price || !newProduct.stock) return;

		const newProductData = {
			...newProduct,
			id: Date.now(),
			price: parseFloat(newProduct.price),
			stock: parseInt(newProduct.stock),
			usage: [],
		};
		setProducts([...products, newProductData]);
		setNewProduct({
			name: "",
			category: "",
			price: "",
			stock: "",
		});
		toggleNewProductForm();
	};

	// Manejar cambios en los campos del formulario de nuevo producto
	const handleNewProductChange = (e) => {
		const { name, value } = e.target;
		setNewProduct((prev) => ({ ...prev, [name]: value }));
	};

	return (
		<motion.div
			className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.2 }}
		>
			<div className='flex justify-between items-center mb-6'>
				<h2 className='text-xl font-semibold text-gray-100'>Productos utilizados</h2>
				<div className='relative'>
					<input
						type='text'
						placeholder='Buscar...'
						className='bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
						onChange={handleSearch}
						value={searchTerm}
					/>
					<Search className='absolute left-3 top-2.5 text-gray-400' size={18} />
				</div>
			</div>

			{/* Botón para agregar un nuevo producto */}
			<div className='mb-4'>
				<button
					onClick={toggleNewProductForm}
					className='bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2'
				>
					<Plus size={18} /> Añadir Producto
				</button>
			</div>

			{/* Formulario para agregar un nuevo producto */}
			{newProductFormVisible && (
				<form onSubmit={handleNewProductSubmit} className='bg-gray-900 p-6 rounded-lg mb-6'>
					<h3 className='text-gray-200 font-semibold mb-4'>Agregar Nuevo Producto</h3>
					<div className='flex gap-4 mb-4'>
						<input
							type='text'
							name='name'
							placeholder='Nombre'
							className='bg-gray-700 text-white px-3 py-1 rounded w-full'
							value={newProduct.name}
							onChange={handleNewProductChange}
						/>
						<input
							type='text'
							name='category'
							placeholder='Categoría'
							className='bg-gray-700 text-white px-3 py-1 rounded w-full'
							value={newProduct.category}
							onChange={handleNewProductChange}
						/>
					</div>
					<div className='flex gap-4 mb-4'>
						<input
							type='number'
							name='price'
							placeholder='Precio'
							className='bg-gray-700 text-white px-3 py-1 rounded w-full'
							value={newProduct.price}
							onChange={handleNewProductChange}
						/>
						<input
							type='number'
							name='stock'
							placeholder='Stock'
							className='bg-gray-700 text-white px-3 py-1 rounded w-full'
							value={newProduct.stock}
							onChange={handleNewProductChange}
						/>
					</div>
					<div className='flex gap-4'>
						<button
							type='submit'
							className='bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded'
						>
							Guardar Producto
						</button>
						<button
							type='button'
							className='bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded'
							onClick={toggleNewProductForm}
						>
							Cancelar
						</button>
					</div>
				</form>
			)}

			<div className='overflow-x-auto'>
				<table className='min-w-full divide-y divide-gray-700'>
					<thead>
						<tr>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>Nombre</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>Categoría</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>Precio</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>Existencia</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>Usos</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>Acciones</th>
						</tr>
					</thead>

					<tbody className='divide-y divide-gray-700'>
						{filteredProducts.map((product) => (
							<motion.tr
								key={product.id}
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ duration: 0.3 }}
							>
								<td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100 flex gap-2 items-center'>
									<img
										src='https://images.unsplash.com/photo-1627989580309-bfaf3e58af6f?w=500'
										alt='img'
										className='size-10 rounded-full'
									/>
									{product.name}
								</td>
								<td className='px-6 py-4 text-sm text-gray-300'>{product.category}</td>
								<td className='px-6 py-4 text-sm text-gray-300'>${product.price.toFixed(2)}</td>
								<td className='px-6 py-4 text-sm text-gray-300'>{product.stock}</td>
								<td className='px-6 py-4 text-sm text-gray-300'>
									{product.usage.length} registro(s)
									{product.usage.length > 0 && (
										<ul className='text-xs mt-1 text-gray-400 list-disc list-inside'>
											{product.usage.map((u) => (
												<li key={u.id}>
													{u.quantity} en "{u.project}" ({u.date})
												</li>
											))}
										</ul>
									)}
								</td>
								<td className='px-6 py-4 text-sm text-gray-300 flex gap-2'>
									<button
										className='text-green-400 hover:text-green-300'
										onClick={() => openUsageForm(product.id)}
									>
										<PlusCircle size={18} />
									</button>
									<button className='text-indigo-400 hover:text-indigo-300'>
										<Edit size={18} />
									</button>
									<button className='text-red-400 hover:text-red-300'>
										<Trash2 size={18} />
									</button>
								</td>
							</motion.tr>
						))}
					</tbody>
				</table>
			</div>

			{/* Formulario de uso */}
			{selectedProductId && (
				<div className='mt-6 p-4 bg-gray-900 border border-gray-700 rounded-lg'>
					<h3 className='text-gray-200 font-semibold mb-2'>Registrar uso</h3>
					<div className='flex gap-4 mb-2'>
						<input
							type='number'
							placeholder='Cantidad utilizada'
							value={usageInput.quantity}
							onChange={(e) => setUsageInput({ ...usageInput, quantity: e.target.value })}
							className='bg-gray-700 text-white px-3 py-1 rounded w-1/3'
						/>
						<input
							type='text'
							placeholder='Proyecto o trabajo'
							value={usageInput.project}
							onChange={(e) => setUsageInput({ ...usageInput, project: e.target.value })}
							className='bg-gray-700 text-white px-3 py-1 rounded w-2/3'
						/>
					</div>
					<div className='flex gap-2'>
						<button
							className='bg-blue-600 hover:bg-blue-500 text-white px-4 py-1 rounded'
							onClick={handleUsageSubmit}
						>
							Guardar uso
						</button>
						<button
							className='bg-gray-600 hover:bg-gray-500 text-white px-4 py-1 rounded'
							onClick={() => setSelectedProductId(null)}
						>
							Cancelar
						</button>
					</div>
				</div>
			)}
		</motion.div>
	);
};

export default ProductsTable;