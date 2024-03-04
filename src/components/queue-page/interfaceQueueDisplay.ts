import { ElementStates } from "../../types/element-states";

export interface IQueueDisplay {
  value?: string;
  state?: ElementStates;  
  head?: string | null;  
  tail?: string | null;
}