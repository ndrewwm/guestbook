import { error } from "@sveltejs/kit";
import { z } from "zod";

const Forecast = z.object({
  shortForecast: z.string(),
  detailedForecast: z.string(),
  startTime: z.string().datetime(),
  endTime: z.string().datetime(),
  name: z.string(),
  number: z.number().int(),
  temperature: z.number(),
  // temperatureTrend: z.number(),
  windSpeed: z.string(),
  windDirection: z.string(),
  isDaytime: z.boolean(),
  relativeHumidity: z.object({
    unitCode: z.string(),
    value: z.number(),
  }),
  probabilityOfPrecipitation: z.object({
    unitCode: z.string(),
    value: z.number(),
  }),
});

type WeeklyForecast = z.infer<typeof Forecast>;

export async function getWeather() {
  let req = await fetch("https://api.weather.gov/gridpoints/BOI/158,130/forecast");
  let data = await req.json();
  let weather: WeeklyForecast[] = data.get("properties").get("periods");

  if (!weather) {
    throw error(500, "Failed to retrieve forecast.");
  }

  weather = weather.forEach((element) => {
    return Forecast.parse(element);
  })!;

  return weather;
}
