import React from "react";
import { Button, SxProps, Theme } from "@mui/material";

export interface BaseButtonProps {
  btnText: string | JSX.Element;
  type?: "button" | "submit" | "reset";
  startIcon?: JSX.Element;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  variant?: "text" | "contained" | "outlined";
  extraSx?: SxProps<Theme>;
  color?:
    | "inherit"
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "info"
    | "warning";
  size?: "small" | "medium" | "large";
  toolTip?: string;
  disabled?: boolean;
}

const BaseButton: React.FC<BaseButtonProps> = ({
  btnText,
  startIcon,
  className,
  onClick,
  color,
  type = "button",
  variant = "contained",
  extraSx = {},
  size = "medium",
  toolTip = null,
  disabled = false,
}): JSX.Element => {
  return (
    <Button
      type={type}
      variant={variant}
      // size={size ? size : window.screen.width < 900 ? 'small' : 'medium'}
      size={size}
      startIcon={startIcon}
      className={className}
      onClick={onClick}
      disabled={disabled}
      sx={{
        // padding: window.screen.width < 900 ? '2px 6px' : '6px 16px',
        ...extraSx,
      }}
      color={color}
      title={toolTip ?? ""}
    >
      {btnText}
    </Button>
  );
};

export default BaseButton;
