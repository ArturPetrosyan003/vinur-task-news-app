import React from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

const OfflineIndicator = () => {
	return (
		<View style={styles.container}>
			<Text style={styles.text}>
				You are currently offline and can read only saved articles
			</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		width: "100%",
		padding: Platform.OS === "ios" ? RFValue(15) : RFValue(10),
		backgroundColor: "#802525",
	},
	text: {
		fontSize: RFValue(12),
		color: "white",
		textAlign: "center",
		fontWeight: "600",
	},
});

export default OfflineIndicator;
