import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RFValue } from "react-native-responsive-fontsize";

import { News } from "../../types";

import moment from "moment";

type NewsItemPropTypes = {
	payload: News;
};

const NewsItem = ({ payload }: NewsItemPropTypes) => {
	const { navigate } = useNavigation();

	return (
		<TouchableOpacity
			style={styles.container}
			onPress={() =>
				navigate({ name: "Details", params: { ...payload } } as never)
			}
		>
			<Image height={RFValue(180)} source={{ uri: payload.thumbnail }} />
			<View style={styles.textContainer}>
				<Text style={styles.date}>
					{moment(payload.publicationDate).format("DD/MM/YYYY")}
				</Text>
				<Text style={styles.headline}>{payload.title}</Text>
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	container: {
		width: "100%",
		borderRadius: RFValue(10),
		overflow: "hidden",
	},
	textContainer: {
		width: "100%",
		padding: RFValue(20),
		alignItems: "flex-start",
		backgroundColor: "rgba(0, 0, 0, 0.6)",
		position: "absolute",
		bottom: 0,
	},
	headline: {
		color: "white",
		fontSize: RFValue(14),
		fontWeight: "600",
		marginTop: RFValue(5),
	},
	date: {
		color: "white",
		fontSize: RFValue(12),
		alignSelf: "flex-end",
	},
});

export default NewsItem;
