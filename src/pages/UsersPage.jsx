import { motion } from "framer-motion";
import Header from "../components/common/Header";

import ForumPostList from "../components/users/ForumPostList";
import ForumNewPostForm from "../components/users/ForumNewPostForm";
import ForumGroupSelector from "../components/users/ForumGroupSelector";

const ForumPage = () => {
	return (
		<div className='flex-1 overflow-auto relative z-10'>
			<Header title='Foro de Trabajadores' />

			<main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
				{/* Selector de Grupos / Áreas */}
				<motion.div
					className='mb-6'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
				>
					<ForumGroupSelector />
				</motion.div>

				{/* Publicar nuevo mensaje */}
				<motion.div
					className='mb-8'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.2, duration: 0.8 }}
				>
					<ForumNewPostForm />
				</motion.div>

				{/* Lista de publicaciones y comentarios */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.4, duration: 0.8 }}
				>
					<ForumPostList />
				</motion.div>
			</main>
		</div>
	);
};

export default ForumPage;
