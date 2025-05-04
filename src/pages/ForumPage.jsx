import { MessageCircle, Users, FileText, UsersIcon } from "lucide-react";
import { motion } from "framer-motion";

import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
import CommentsSection from "../components/forum/ForumComments";
import PostsSection from "../components/forum/PostSection";
import GroupsSection from "../components/forum/ForumGroup";

const forumStats = {
	totalComments: 1200,
	totalPosts: 300,
	totalGroups: 15,
};

const ForumPage = () => {
	return (
		<div className='flex-1 overflow-auto relative z-10'>
			<Header title='Foro de Comunicación' />

			<main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
				{/* STATS */}
				<motion.div
					className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-8'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1 }}
				>
					<StatCard
						name='Total de Comentarios'
						icon={MessageCircle}
						value={forumStats.totalComments.toLocaleString()}
						color='#6366F1'
					/>
					<StatCard
						name='Total de Publicaciones'
						icon={FileText}
						value={forumStats.totalPosts.toLocaleString()}
						color='#10B981'
					/>
					<StatCard
						name='Total de Grupos'
						icon={Users}
						value={forumStats.totalGroups.toLocaleString()}
						color='#F59E0B'
					/>
				</motion.div>

				{/* SECCIONES DEL FORO */}
				<CommentsSection />
				<PostsSection />
				<GroupsSection />
			</main>
		</div>
	);
};

export default ForumPage;
