const IS_DEV = process.env.APP_VARIANT === "development";

const getUniqueIdentifier = () => {
  if (IS_DEV) {
    return "com.dnstld.HomerQuotes.dev";
  }

  return "com.dnstld.HomerQuotes";
};

const getAppName = () => {
  if (IS_DEV) {
    return "Homer Quotes (Dev)";
  }

  return "Homer Quotes";
};

const getGoogleServices = () => {
  if (IS_DEV) {
    return "./android/app/google-services-dev.json";
  }

  return "./android/app/google-services.json";
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
  build: {
    development: {
      developmentClient: true,
      distribution: "internal",
      env: {
        APP_VARIANT: "development",
      },
    },
    production: {
      env: {
        APP_VARIANT: "production",
      },
    },
  },
  hooks: {
    postPublish: [
      {
        file: "sentry-expo/upload-sourcemaps",
        config: {
          project: process.env.EXPO_PUBLIC_SENTRY_PROJECT,
          organization: process.env.EXPO_PUBLIC_SENTRY_ORG,
          authToken: process.env.SENTRY_AUTH_TOKEN,
        },
      },
    ],
  },
  submit: {
    production: {},
  },
  splash: {
    image: "./assets/splash.png",
    resizeMode: "contain",
    backgroundColor: "#00AAFF",
  },
  notifications: {
    icon: "./assets/notification-icon.png",
    color: "#00AAFF",
  },
  ios: {
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
    icon: "./assets/icon-1024x1024.png",
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
    },
    package: "com.dnstld.HomerQuotes",
    versionCode: "1",
    googleServicesFile: getGoogleServices(),
  },
  web: {
    favicon: "./assets/favicon.ico",
    bundler: "metro",
  },
  plugins: ["expo-router", "sentry-expo"],
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
