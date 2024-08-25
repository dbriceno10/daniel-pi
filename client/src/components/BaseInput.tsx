import React, {
  ChangeEventHandler,
  HTMLInputTypeAttribute,
  FocusEventHandler,
} from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { SxProps, Theme } from "@mui/material";

export type Margin = "none" | "dense" | "normal";

interface Props {
  startElement?: JSX.Element;
  autoFocus?: boolean;
  fullWidth?: boolean;
  id?: string;
  name?: string;
  label?: string;
  value?: string | number;
  error?: boolean;
  helperText?: string;
  placeholder?: string;
  onChange?: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  select?: boolean;
  readOnly?: boolean;
  extraSx?: SxProps<Theme>;
  margin?: Margin;
  type?: HTMLInputTypeAttribute;
  onFocus?: FocusEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  multiline?: boolean;
  maxRows?: number;
  minRows?: number;
  rows?: number;
  defaultValue?: string | number;
  onBlur?: FocusEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  required?: boolean;
  children?: any;
  className?: string;
}

const BaseInput: React.FC<Props> = ({
  startElement,
  autoFocus,
  fullWidth,
  id,
  name,
  label,
  value,
  error,
  helperText,
  placeholder,
  onChange,
  select,
  readOnly,
  extraSx = {},
  children,
  margin = "normal",
  type = "text",
  onFocus,
  multiline,
  maxRows,
  minRows,
  rows,
  defaultValue,
  onBlur,
  required = false,
  className = "",
}): JSX.Element => {
  return (
    <TextField
      margin={margin}
      variant="outlined"
      autoFocus={autoFocus}
      fullWidth={fullWidth}
      id={id}
      name={name}
      label={label}
      value={value}
      error={error}
      helperText={helperText}
      placeholder={placeholder}
      onChange={onChange}
      onBlur={onBlur}
      select={select}
      onFocus={onFocus}
      type={type}
      multiline={multiline}
      rows={rows}
      maxRows={maxRows}
      minRows={minRows}
      defaultValue={defaultValue}
      required={required}
      className={className}
      sx={{
        backgroundColor: "#fff",
        ...extraSx,
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">{startElement}</InputAdornment>
        ),
        readOnly: readOnly,
      }}
    >
      {children}
    </TextField>
  );
};

export default BaseInput;
