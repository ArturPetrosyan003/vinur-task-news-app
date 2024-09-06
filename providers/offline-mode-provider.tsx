import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { NetworkContext } from "./network-provider";
import { showAlert } from "../helpers/alert";

import { News, OfflineContextTypes } from "../types";

export const OfflineContext = createContext<OfflineContextTypes>(null);

const OfflineModeProvider = ({ children }) => {
	const [savedPosts, setSavedPosts] = useState<News[]>([]);
	const isOnline = useContext<boolean>(NetworkContext);

	useEffect(() => {
		if (!isOnline) {
			loadPosts();
		}
	}, [isOnline]);

	const saveImage = async (imageUrl: string): Promise<string> => {
		try {
			const request = await fetch(imageUrl);
			const response = await request.blob();

			const reader = new FileReader();
			reader.readAsDataURL(response);

			return new Promise((res) => {
				reader.onloadend = () => {
					const base64data = reader.result;

					res(base64data.toString());
				};
			});
		} catch (error) {
			console.error(error);
			showAlert({
				title: "Image saving issue",
				content: "Failed to save image. Please try again later",
			});
		}
	};

	const isSaved = async (id: string): Promise<boolean> => {
		try {
			const foundPost: string = await AsyncStorage.getItem(id);
			return foundPost !== null;
		} catch (error) {
			console.error(error);
			showAlert({
				title: "Saved post finding issue",
				content: "Couldn't find current post in saved. Please try again.",
			});
		}
	};

	const savePost = async (payload: News): Promise<boolean> => {
		try {
			const dontSave = await isSaved(payload.id);

			if (dontSave) {
				await AsyncStorage.removeItem(payload.id);
				showAlert({
					title: "Success!",
					content: "Current post was successfully removed from saved.",
				});
				return;
			}

			const base64Image: string = await saveImage(payload.thumbnail);

			return new Promise(async (res) => {
				await AsyncStorage.setItem(
					payload.id,
					JSON.stringify({ ...payload, thumbnail: base64Image })
				);

				showAlert({
					title: "Success!",
					content: "Current post was successfully saved.",
				});
				res(true);
			});
		} catch (error) {
			console.error(error);
			showAlert({
				title: "Post saving issue",
				content: "Failed to save post. Please try again later",
			});
		}
	};

	const loadPosts = async () => {
		try {
			const keys: readonly string[] = await AsyncStorage.getAllKeys();
			const data: News[] = (await AsyncStorage.multiGet(keys))
				.flat()
				.filter((_, index) => index % 2 !== 0)
				.map((item) => JSON.parse(item));

			setSavedPosts([...data]);
		} catch (error) {
			console.error(error);
			showAlert({
				title: "Posts loading issue",
				content: "Failed to load saved posts. Please try again later",
			});
		}
	};

	return (
		<OfflineContext.Provider value={{ savedPosts, savePost, isSaved }}>
			{children}
		</OfflineContext.Provider>
	);
};

export default OfflineModeProvider;
