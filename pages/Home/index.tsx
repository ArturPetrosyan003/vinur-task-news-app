import React, { useCallback, useContext, useEffect, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { RFValue } from "react-native-responsive-fontsize";

import NewsItem from "../../components/HomeComponents/news-item";
import SearchBar from "../../components/HomeComponents/search-bar";

import { NetworkContext } from "../../providers/network-provider";
import { OfflineContext } from "../../providers/offline-mode-provider";

import { News, OfflineContextTypes } from "../../types";

import { showAlert } from "../../helpers/alert";

import _ from "lodash";

//e9034fb1-0d35-47c3-8c47-7e2e54bcc550
//b65e5494-6130-4596-bc72-73076bf231b0

const Home = () => {
	const [news, setNews] = useState<News[]>([]);
	const [page, setPage] = useState<number>(1);
	const [searchQuery, setSearchQuery] = useState<string>("");
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const { savedPosts } = useContext<OfflineContextTypes>(OfflineContext);
	const isOnline = useContext<boolean>(NetworkContext);

	const debouncedFetchArticles = useCallback(
		_.debounce(() => {
			setIsLoading(true);
			fetchArticles();
		}, 500),
		[page, searchQuery]
	);

	useEffect(() => {
		if (isOnline) {
			debouncedFetchArticles();
		}
	}, [page, searchQuery, debouncedFetchArticles, isOnline]);

	useEffect(() => {
		if (!isOnline) {
			setNews([...savedPosts]);
		}
	}, [isOnline, savedPosts]);

	const fetchArticles = async () => {
		if (isLoading || !isOnline) {
			return;
		}
		try {
			const searchQueryParam: string =
				searchQuery !== "" ? `q=${searchQuery}` : "";

			const request = await fetch(
				`${process.env.EXPO_PUBLIC_API_URL}&${searchQueryParam}&api-key=${process.env.EXPO_PUBLIC_API_KEY}&page=${page}`
			);
			const { response } = await request.json();

			if (response.results) {
				const data: News[] = [];

				response.results.forEach((item: any) => {
					data.push({
						id: item.id,
						title: item.fields.headline,
						thumbnail: item.fields.thumbnail,
						publicationDate: item.fields.webPublicationDate,
						body: item.fields.body,
					});
				});
				setNews((prev) => [...prev, ...data]);
			}
			setIsLoading(false);
		} catch (error) {
			console.error(error);
			showAlert({
				title: "News fetching issue",
				content: "Failed to fetch news. Please try again later",
			});
			setIsLoading(false);
		}
	};

	const handleSearch = useCallback(
		(value: string) => {
			setSearchQuery(value);
			setPage(1);
			setNews([]);
		},
		[searchQuery]
	);

	return (
		<SafeAreaView
			style={[styles.container, { paddingTop: isOnline ? 0 : RFValue(100) }]}
		>
			{isOnline && (
				<SearchBar
					value={searchQuery}
					onChange={(value: string) => handleSearch(value)}
				/>
			)}

			<FlatList
				data={news as News[]}
				keyExtractor={(item: News) => item.id}
				onEndReached={() => (isOnline ? setPage((prev) => prev + 1) : null)}
				contentContainerStyle={{
					rowGap: RFValue(30),
					paddingHorizontal: RFValue(10),
					paddingBottom: RFValue(10),
				}}
				showsVerticalScrollIndicator={false}
				renderItem={({ item }: { item: News }) => <NewsItem payload={item} />}
				ListFooterComponent={() =>
					isOnline && <ActivityIndicator color="blue" />
				}
			/>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: RFValue(30),
	},
});

export default Home;
