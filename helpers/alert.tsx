import { Alert } from "react-native";

type ShowAlertPropTypes = {
	title: string;
	content: string;
};

export const showAlert = ({ title, content }: ShowAlertPropTypes) => {
	Alert.alert(title, content, [{ text: "OK", onPress: () => {} }]);
};
