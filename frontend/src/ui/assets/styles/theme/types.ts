import '@mui/material/styles';

type Status = {
  danger: string;
};

type FontStyle = {
  nunito: string;
  PlusJakarta: string;
};

type ColorType = {
  error: string;
  info: string;
  warning: string;
  success: string;
  black: string;
  grey: string;
  lightGrey: string;
  background: string;
  lightOrange: string;
};

interface ThemeExtension {
  status: Status;
  color: ColorType;
  font: FontStyle;
}

declare module '@mui/material/styles' {
  interface Theme extends ThemeExtension {
    /**
     * Dummy field to avoid `no-empty-object-type` lint error
     */
    _augmentedBrand?: never;
  }

  interface ThemeOptions {
    status: Status;
    color: ColorType;
    font: FontStyle;
  }

  interface ThemeOptions extends ThemeExtension {
    _augmentedBrand?: never;
  }
}

export {};
