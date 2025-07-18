import { getTimeOfDay } from '@/utils';

export const DEFAULT_CITY = "Prague";

const timeOfDay = getTimeOfDay();
export const IS_NIGHT = timeOfDay === "night";