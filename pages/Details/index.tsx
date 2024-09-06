import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

import SaveButton from "../../components/DetailsComponents/save-button";
import { News } from "../../types";

import moment from "moment";

const Details = ({ route }) => {
	const params: News = route.params;

	return (
		<View style={styles.container}>
			<Image height={RFValue(300)} source={{ uri: params.thumbnail }} />
			<SaveButton payload={params} />

			<View style={styles.textContainer}>
				<ScrollView showsVerticalScrollIndicator={false}>
					<Text style={styles.date}>
						{moment(params.publicationDate).format("DD/MM/YYYY")}
					</Text>
					<Text style={styles.headline}>{params.title}</Text>
					<Text style={styles.body}>
						{params.body
							.replace(/<[^>]*>/g, "")
							.replace(/\s+/g, " ")
							.trim()}
					</Text>
				</ScrollView>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "white",
	},
	textContainer: {
		flex: 1,
		backgroundColor: "white",
		paddingTop: RFValue(30),
		paddingHorizontal: RFValue(20),
		borderTopLeftRadius: RFValue(40),
		borderTopRightRadius: RFValue(40),
		top: RFValue(-40),
	},
	date: {
		fontSize: RFValue(14),
		textAlign: "center",
		fontWeight: "500",
		alignSelf: "flex-end",
		color: "#397dfa",
	},
	headline: {
		fontSize: RFValue(22),
		textAlign: "center",
		fontWeight: "600",
		marginTop: RFValue(5),
	},
	body: {
		fontSize: RFValue(14),
		marginTop: RFValue(20),
	},
});

export default Details;
