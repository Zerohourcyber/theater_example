/**
 * The four figures on the "why Portales" section. Population is from the 2020
 * US Census; the last line is stated as our understanding rather than as fact,
 * because it is the one claim here that would be costly to get wrong.
 */

export type Figure = {
  value: string;
  label: string;
};

export const figures: Figure[] = [
  { value: "12,100", label: "residents of Portales" },
  { value: "19,200", label: "Roosevelt County" },
  { value: "1934", label: "ENMU founded in Portales" },
  { value: "0", label: "youth theater companies we're aware of" },
];
