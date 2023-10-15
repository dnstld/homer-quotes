import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type ParamList = {
  Quotes: undefined;
  Share: { quote: string };
};

export type ScreenProps<T extends keyof ParamList> = NativeStackScreenProps<
  ParamList,
  T
>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends ParamList {}
  }
}
