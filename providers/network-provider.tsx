import React, { createContext, useEffect, useState } from "react";
import NetInfo from "@react-native-community/netinfo";

export const NetworkContext = createContext<boolean>(null);

const NetworkProvider = ({ children }) => {
	const [networkState, setNetworkState] = useState<boolean | null>(null);

	useEffect(() => {
		const listener = NetInfo.addEventListener((state) => {
			// setNetworkState(state.isConnected);
			setNetworkState(true); //change this to false to go offline
		});
	}, []);

	return (
		<NetworkContext.Provider value={networkState}>
			{children}
		</NetworkContext.Provider>
	);
};

export default NetworkProvider;
