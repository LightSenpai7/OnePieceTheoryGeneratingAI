import { ReactNode } from "react";

export interface MontserratTextProps {
    uniquifier: string;
    weight: number;
    fontSize?: string;
    lineHeight?: string;
    marginBottom?: string;
    children: ReactNode;
  }