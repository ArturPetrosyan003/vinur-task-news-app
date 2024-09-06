import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { Icon } from "react-native-paper";

import { NetworkContext } from "../../providers/network-provider";
import { OfflineContext } from "../../providers/offline-mode-provider";

import { News, OfflineContextTypes } from "../../types";

type SaveButtonPropTypes = {
	payload: News;
};

const SaveButton = ({ payload }: SaveButtonPropTypes) => {
	const [saveButtonIcon, setSaveButtonIcon] = useState("arrow-down");

	const { savePost, isSaved } = useContext<OfflineContextTypes>(OfflineContext);
	const isOnline = useContext<boolean>(NetworkContext);

	useEffect(() => {
		isSaved(payload.id).then((value: boolean) => {
			setSaveButtonIcon(value ? "cloud-check" : "arrow-down");
		});
	}, []);

	const save = () => {
		savePost(payload).then(() => {
			setSaveButtonIcon((prev) =>
				prev === "cloud-check" ? "arrow-down" : "cloud-check"
			);
		});
	};

	return (
		isOnline && (
			<TouchableOpacity style={styles.saveButton} onPress={save}>
				<Icon source={saveButtonIcon} size={RFValue(25)} color="white" />
			</TouchableOpacity>
		)
	);
};

const styles = StyleSheet.create({
	saveButton: {
		width: RFValue(40),
		height: RFValue(40),
		backgroundColor: "#34ba67",
		borderRadius: RFValue(20),
		alignItems: "center",
		justifyContent: "center",
		position: "absolute",
		left: RFValue(40),
		top: RFValue(240),
		zIndex: 1,
	},
});

export default SaveButton;
