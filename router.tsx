import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { NetworkContext } from "./providers/network-provider";

import Home from "./pages/Home";
import Details from "./pages/Details";
import OfflineIndicator from "./components/UI/offline-indicator";

const Router = () => {
	const isOnline = useContext<boolean>(NetworkContext);

	const Stack = createNativeStackNavigator();

	return (
		<>
			<NavigationContainer>
				<Stack.Navigator initialRouteName="Home">
					<Stack.Screen
						options={{
							headerShown: false,
						}}
						name="Home"
						component={Home}
					/>
					<Stack.Screen
						options={{
							headerShown: false,
						}}
						name="Details"
						component={Details}
					/>
				</Stack.Navigator>
			</NavigationContainer>

			{!isOnline && <OfflineIndicator />}
		</>
	);
};

export default Router;
