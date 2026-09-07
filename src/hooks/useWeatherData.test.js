import {beforeEach, describe, expect, test, vi} from "vitest";
import {renderHook, act} from "@testing-library/react";
import {useWeatherData} from "./useWeatherData";
import {getWeatherForecast} from "../data/api";

const mockUserData = {
  user: null,
  updateRecentLocations: vi.fn(),
  favorites: [],
  recentLocations: [],
  isLoading: false,
};

vi.mock("../data/api", () => ({
  getWeatherForecast: vi.fn(),
  getGeocodingData: vi.fn(),
  getWeather: vi.fn(),
  getWeatherListCurrent: vi.fn(),
}));

vi.mock("../hooks/useUserData", () => ({
  useUserData: () => mockUserData,
}));

describe("useWeatherData hook", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUserData.user = null;
    mockUserData.favorites = [];
    mockUserData.recentLocations = [];
    mockUserData.isLoading = false;
  });

  test("should add a city to selectedCities when getCity is called", async () => {
    vi.mocked(getWeatherForecast).mockResolvedValue({
      id: "berlin-id",
      location: "Berlin",
    });

    const {result} = renderHook(() => useWeatherData());

    await act(async () => {
      await result.current.getCity("Berlin", "gfs");
    });

    expect(result.current.selectedCities.has("berlin-id")).toBe(true);
  });
});

/* 
Methode	Bedeutung
vi.fn()	Fake-Funktion erzeugen
.mockReturnValue(x)	gibt immer x zurück
.mockReturnValueOnce(x)	gibt beim nächsten Aufruf x zurück
.mockResolvedValue(x)	async → Promise wird erfolgreich mit x aufgelöst
.mockResolvedValueOnce(x)	async → nur beim nächsten Aufruf
.mockRejectedValue(error)	async → Promise schlägt fehl
.mockImplementation(fn)	eigene Fake-Implementierung
.mockClear()	nur Aufrufhistorie löschen
.mockReset()	Historie und Implementierung zurücksetzen
*/
