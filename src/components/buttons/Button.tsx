"use client";
import Image from "next/image";
import {CSSProperties} from "react";
import Icon from "../Icon";

interface ButtonProps {
  onClick: () => any;
  disabled?: boolean;
  label?: string;
  className?: string;
  iconSrc?: string;
  style?: CSSProperties;
}

export default function Button(props: ButtonProps) {
  return (
    <button
      className={`mainButton clickableItem pl-3 ${props.className || ""}`}
      disabled={props.disabled}
      onClick={() => {
        props.onClick();
      }}
      style={props.style}
    >
      {props.iconSrc && <Icon src={props.iconSrc} />}
      <span>{props.label}</span>
    </button>
  );
}
