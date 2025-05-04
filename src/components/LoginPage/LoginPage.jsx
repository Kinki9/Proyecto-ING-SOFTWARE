
import Header from "../components/common/Header";

const LoginPage = () => {
	return (
		<div className='flex-1 overflow-auto relative z-10 bg-gray-900'>
			<Header title={"Iniciar Sesión"} />

			<main className='max-w-md mx-auto py-6 px-4 lg:px-8'>
				<h2 className='text-white text-2xl font-bold mb-4'>Bienvenido de nuevo</h2>
				<form className='bg-gray-800 p-6 rounded-lg shadow-md'>
					<div className='mb-4'>
						<label className='block text-white text-sm font-bold mb-2' htmlFor='username'>
							Nombre de usuario
						</label>
						<input
							className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
							id='username'
							type='text'
							placeholder='Ingresa tu nombre de usuario'
						/>
					</div>
					<div className='mb-6'>
						<label className='block text-white text-sm font-bold mb-2' htmlFor='password'>
							Contraseña
						</label>
						<input
							className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
							id='password'
							type='password'
							placeholder='Ingresa tu contraseña'
						/>
					</div>
					<div className='flex items-center justify-between'>
						<button
							className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
							type='submit'
						>
							Iniciar Sesión
						</button>
					</div>
				</form>
			</main>
		</div>
	);
};

export default LoginPage;
