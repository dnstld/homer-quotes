const IS_DEV = process.env.APP_VARIANT === "development";
const IS_PREVIEW = process.env.APP_VARIANT === "preview";

const getUniqueIdentifier = () => {
  if (IS_DEV) {
    return "com.dnstld.HomerQuotes.dev";
  }

  if (IS_PREVIEW) {
    return "com.dnstld.HomerQuotes.preview";
  }

  return "com.dnstld.HomerQuotes";
};

const getAppName = () => {
  if (IS_DEV) {
    return "HomerQuotes (Dev)";
  }

  if (IS_PREVIEW) {
    return "HomerQuotes (Preview)";
  }

  return "HomerQuotes";
};

export default {
  name: getAppName(),
  description:
    "Explore funny Homer Simpson quotes from every season of The Simpsons. Share the fun and laughter with friends! D'oh!",
  owner: "dnstld",
  slug: "HomerQuotes",
  scheme: "homerQuotesScheme",
  version: "1.0.2",
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "light",
  platforms: ["ios", "android"],
  githubUrl: "https://github.com/dnstld/homer-quotes",
  backgroundColor: "#00AAFF",
  primaryColor: "#00AAFF",
  splash: {
    image: "./assets/splash.png",
    resizeMode: "contain",
    backgroundColor: "#00AAFF",
  },
  ios: {
    supportsTablet: true,
    bundleIdentifier: getUniqueIdentifier(),
    buildNumber: "1",
    config: {
      usesNonExemptEncryption: false,
    },
    infoPlist: {
      LSApplicationQueriesSchemes: ["instagram"],
    },
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
    },
    package: getUniqueIdentifier(),
    versionCode: "1",
  },
  web: {
    favicon: "./assets/favicon.ico",
    bundler: "metro",
  },
  plugins: ["expo-router"],
  extra: {
    router: {
      origin: false,
    },
    eas: {
      projectId: "681feb86-1fc2-4ec3-97cb-33ffc2f23bcf",
    },
  },
  updates: {
    url: "https://u.expo.dev/681feb86-1fc2-4ec3-97cb-33ffc2f23bcf",
  },
  runtimeVersion: {
    policy: "sdkVersion",
  },
};
