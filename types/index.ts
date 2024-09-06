export type News = {
	id: string;
	title: string;
	thumbnail: string;
	publicationDate: string;
	body: string;
};

export type OfflineContextTypes = {
	savedPosts: News[];
	savePost: (payload: News) => Promise<boolean>;
	isSaved: (id: string) => Promise<boolean>;
};
