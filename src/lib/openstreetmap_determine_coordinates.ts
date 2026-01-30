type ReverseGeocodeOptions = {
  signal?: AbortSignal;
  language?: string;
  zoom?: number;
};

const NOMINATIM_REVERSE_URL = "https://nominatim.openstreetmap.org/reverse";

export async function getLocationNameFromCoordinates(
  latitude: number,
  longitude: number,
  options: ReverseGeocodeOptions = {}
): Promise<string | null> {
  const params = new URLSearchParams({
    format: "jsonv2",
    lat: latitude.toString(),
    lon: longitude.toString(),
    zoom: String(options.zoom ?? 12),
  });

  if (options.language) {
    params.set("accept-language", options.language);
  }

  const response = await fetch(`${NOMINATIM_REVERSE_URL}?${params.toString()}`, {
    headers: {
      "User-Agent": "codyssey/1.0 (reverse-geocode)",
    },
    signal: options.signal,
  });

  if (!response.ok) {
    return null;
  }

  const data = (await response.json()) as {
    name?: string;
    display_name?: string;
  };

  return data.display_name ?? data.name ?? null;
}
