import { StyleSheet, Text, type TextProps } from 'react-native';

import { colors, fonts } from '@/theme/tokens';

export type TextVariant =
  | 'display'
  | 'title'
  | 'heading'
  | 'bodyStrong'
  | 'body'
  | 'label'
  | 'caption'
  | 'overline';

type Props = TextProps & {
  variant?: TextVariant;
  color?: string;
  align?: 'left' | 'center' | 'right';
};

/** Uygulamadaki tüm yazılar bu bileşenle yazılır; yazı tipi ve boyut buradan gelir. */
export function AppText({ variant = 'body', color = colors.ink, align, style, ...rest }: Props) {
  return <Text style={[styles[variant], { color, textAlign: align }, style]} {...rest} />;
}

const styles = StyleSheet.create({
  display: { fontFamily: fonts.extrabold, fontSize: 32, lineHeight: 38 },
  title: { fontFamily: fonts.extrabold, fontSize: 24, lineHeight: 30 },
  heading: { fontFamily: fonts.bold, fontSize: 17, lineHeight: 24 },
  bodyStrong: { fontFamily: fonts.bold, fontSize: 15, lineHeight: 22 },
  body: { fontFamily: fonts.regular, fontSize: 15, lineHeight: 22 },
  label: { fontFamily: fonts.semibold, fontSize: 14, lineHeight: 20 },
  caption: { fontFamily: fonts.medium, fontSize: 13, lineHeight: 18 },
  overline: { fontFamily: fonts.bold, fontSize: 12, lineHeight: 16, letterSpacing: 0.4 },
});
