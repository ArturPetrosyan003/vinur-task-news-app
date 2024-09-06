import React from "react";
import { StatusBar } from "expo-status-bar";

import Router from "./router";

import NetworkProvider from "./providers/network-provider";
import OfflineModeProvider from "./providers/offline-mode-provider";

export default function App() {
	return (
		<>
			<StatusBar style="auto" />
			<NetworkProvider>
				<OfflineModeProvider>
					<Router />
				</OfflineModeProvider>
			</NetworkProvider>
		</>
	);
}
