import {vi} from "vitest";
import {renderHook, act} from "@testing-library/react";
import {useWeatherData} from "./useWeatherData";
import {getWeatherForecast} from "../data/api";

vi.mock("../data/api", () => ({
  getWeatherForecast: vi.fn(),
}));

describe("useWeatherData hook", () => {
  test("should add a city to selectedCities when getCity is called", async () => {
    getWeatherForecast.mockResolvedValue({
      id: "berlin-id",
      location: "Berlin",
    });

    const {result} = renderHook(() => useWeatherData());

    await act(async () => {
      await result.current.getCity("Berlin", "gfs");
    });

    expect(result.current.selectedCities.has("berlin-id")).toBe(true);
  });

  test("should remove a city from selectedCities when removeCity is called", async () => {
    getWeatherForecast.mockResolvedValue({
      id: "berlin-id",
      location: "Berlin",
    });

    const {result} = renderHook(() => useWeatherData());

    await act(async () => {
      await result.current.getCity("Berlin", "gfs");
    });

    act(() => {
      result.current.removeCity("berlin-id");
    });

    expect(result.current.selectedCities.has("berlin-id")).toBe(false);
  });

  test("should toggle a city in selectedCities when toggleCity is called", async () => {
    getWeatherForecast.mockResolvedValue({
      id: "berlin-id",
      location: "Berlin",
    });

    const {result} = renderHook(() => useWeatherData());

    await act(async () => {
      await result.current.getCity("Berlin", "gfs");
    });

    act(() => {
      result.current.toggleCity("berlin-id");
    });

    expect(result.current.selectedCities.has("berlin-id")).toBe(false);

    act(() => {
      result.current.toggleCity("berlin-id");
    });

    expect(result.current.selectedCities.has("berlin-id")).toBe(true);
  });

  test("should select all cities when toggleCities is called with true", async () => {
    getWeatherForecast.mockResolvedValue({
      id: "berlin-id",
      location: "Berlin",
    });

    const {result} = renderHook(() => useWeatherData());

    await act(async () => {
      await result.current.getCity("Berlin", "gfs");
    });

    act(() => {
      result.current.toggleCities(true);
    });

    expect(result.current.selectedCities.size).toBe(1);
  });

  test("should deselect all cities when toggleCities is called with false", async () => {
    getWeatherForecast.mockResolvedValue({
      id: "berlin-id",
      location: "Berlin",
    });

    const {result} = renderHook(() => useWeatherData());

    await act(async () => {
      await result.current.getCity("Berlin", "gfs");
    });

    act(() => {
      result.current.toggleCities(false);
    });

    expect(result.current.selectedCities.size).toBe(0);
  });

  /* test("should get geocoding results when searchLocations is called", async () => {
  }); */
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
