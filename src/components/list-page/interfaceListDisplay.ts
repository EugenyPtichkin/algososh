import { ElementStates } from "../../types/element-states";

export interface IListDisplay {
  state?: ElementStates;
  letter?: string;
  head?: string | React.ReactElement | null;
  index?: number;
  tail?: string | React.ReactElement | null;
  tailType?: "string" | "element";
  extraClass?: string;
  isSmall?: boolean;
  add?: boolean;
  delete?:boolean;
  extra?:string;
}