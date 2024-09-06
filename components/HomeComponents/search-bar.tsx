import React from "react";
import { StyleSheet, View, Platform } from "react-native";
import { Searchbar } from "react-native-paper";
import { RFValue } from "react-native-responsive-fontsize";

type SearchBarPropTypes = {
	value: string;
	onChange: (text: string) => void;
};

const SearchBar = ({ value, onChange }: SearchBarPropTypes) => {
	return (
		<View style={styles.container}>
			<Searchbar
				style={styles.input}
				inputStyle={{
					alignSelf: "center",
					fontSize: RFValue(14),
				}}
				value={value}
				onChangeText={(value: string) => onChange(value)}
				placeholder="Search for news..."
				elevation={1}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		height: RFValue(40),
		marginTop: Platform.OS === "android" ? RFValue(60) : RFValue(20),
		marginBottom: RFValue(20),
	},
	input: {
		width: RFValue(250),
		height: "100%",
		borderRadius: RFValue(15),
		color: "grey",
		backgroundColor: "white",
		alignSelf: "center",
	},
});

export default SearchBar;
