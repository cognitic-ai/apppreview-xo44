import { ScrollView, Text, View, Pressable, Linking } from "react-native";
import { useDevToolsPluginClient } from "expo/devtools";
import { useEffect } from "react";
import Constants from "expo-constants";

export default function IndexRoute() {
  // Access the dev client API
  const devClient = useDevToolsPluginClient("dev-client");

  useEffect(() => {
    // Log that dev client is ready
    console.log("Dev Client ready");
  }, []);

  const handleOpenCamera = async () => {
    // On a real dev client build, this would open the QR scanner
    // The expo-dev-launcher handles this automatically in custom builds
    if (Constants.appOwnership === "expo") {
      alert("QR Scanner available in custom dev client builds");
    }
  };

  const handleEnterURL = async () => {
    // In a production dev client, this would show a text input
    alert("Enter URL manually in custom dev client builds");
  };

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={{
        flex: 1,
        backgroundColor: "#fff",
      }}
    >
      <View style={{ padding: 24, gap: 16, alignItems: "center", paddingTop: 60 }}>
        <Text style={{ fontSize: 32, fontWeight: "bold", marginBottom: 8 }}>
          Dev Client
        </Text>

        <Text style={{ fontSize: 16, color: "#666", textAlign: "center", marginBottom: 32 }}>
          A custom development client for loading Expo projects
        </Text>

        <Pressable
          onPress={handleOpenCamera}
          style={{
            backgroundColor: "#4630eb",
            paddingHorizontal: 32,
            paddingVertical: 16,
            borderRadius: 12,
            borderCurve: "continuous",
            minWidth: 280,
          }}
        >
          <Text style={{ color: "white", fontSize: 18, fontWeight: "600", textAlign: "center" }}>
            Scan QR Code
          </Text>
        </Pressable>

        <Pressable
          onPress={handleEnterURL}
          style={{
            backgroundColor: "#f3f4f6",
            paddingHorizontal: 32,
            paddingVertical: 16,
            borderRadius: 12,
            borderCurve: "continuous",
            minWidth: 280,
          }}
        >
          <Text style={{ color: "#111", fontSize: 18, fontWeight: "600", textAlign: "center" }}>
            Enter URL Manually
          </Text>
        </Pressable>

        <View style={{ marginTop: 48, gap: 8 }}>
          <Text style={{ fontSize: 14, color: "#888", textAlign: "center" }}>
            Version {Constants.expoConfig?.version || "1.0.0"}
          </Text>
          <Text style={{ fontSize: 12, color: "#aaa", textAlign: "center" }}>
            Build with expo-dev-client for full functionality
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
