/* const getFirstUpper = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }; */
  /* <Popover className="group relative">
        <PopoverButton className="flex items-center text-sm text-neutral-500">
          More...
          <ChevronDownIcon className="size-5 text-neutral-500 group-data-open:rotate-180" />
        </PopoverButton>
        <PopoverPanel
          anchor="bottom"
          className="flex flex-col justify-between items-start border border-neutral-400 bg-neutral-900 p-4 rounded-md gap-1 w-fit-content max-w-58"
        >
          <div className="flex flex-row justify-center items-center gap-3">
            <p className="text-xs text-center">
              <Droplets className="text-4xl text-neutral-400" />
              {relativeHumidity}%
            </p>
            <p className="text-xs text-center">
              <Wind className="text-4xl text-neutral-400" />
              {windSpeed}
            </p>
            <p className="text-xs text-center">
              <WiWindDeg className="text-2xl text-neutral-400" />
              {direction}
            </p>
            <WindDirection angle={angle} size={60} />
          </div>
        </PopoverPanel>
      </Popover> */


  /* 
  useEffect(() => {
    // Autofocus on the first input field when the component mounts
    setFocus("title");
  }, []);
 */


/* 
const [selectedPerson, setSelectedPerson] = useState(people[0])
  const [query, setQuery] = useState('')

  const filteredPeople =
    query === ''
      ? people
      : people.filter((person) => {
          return person.name.toLowerCase().includes(query.toLowerCase())
        })

  return (
    <Combobox value={selectedPerson} onChange={setSelectedPerson} onClose={() => setQuery('')}>
      <ComboboxInput
        aria-label="Assignee"
        displayValue={(person) => person?.name}
        onChange={(event) => setQuery(event.target.value)}
      />
      <ComboboxOptions anchor="bottom" className="w-52 border empty:invisible">
        {filteredPeople.map((person) => (
          <ComboboxOption key={person.id} value={person} className="data-focus:bg-blue-100">
            {person.name}
          </ComboboxOption>
        ))}
      </ComboboxOptions>
    </Combobox>
*/
/* <p className="text-neutral-400 pl-1">Filter mit Städten…</p> */
/* <CityList
  cities={results}
  selectedCities={selectedCities}
  onChange={handleCityChange}
/> */
/* <ComparePanel
  dailyData={getDaylyData(selectedCities, results)}
  previewCityId={previewCityId}
  selectedCitiesData={getSelectedCitiesData(selectedCities, results)}
  setPreviewCityId={setPreviewCityId}
/> */
/* 
<Tooltip key={result.id} desc={"neu laden"}>
              <CityCard key={result.id} active={index === 0} weather={result} />
            </Tooltip>
*/
// Keep this file for future utility functions that might be needed in the project.
/* 
  
  const getHourlyData = useMemo(() => {
    return (selectedCities, results) => {
      const compareCities = results.filter((city) => selectedCities.has(city.id));
      const selectedCitiesData = compareCities.map((city) => {
        const hourlyData = city.hourly?.time.map((t, index) => {
          return {
            time: t.toString().slice(-4),
            temperature: city.hourly?.temperature[index],
            relativeHumidity: city.hourly?.relativeHumidity[index],
            weatherCode: city.hourly?.weatherCode[index],
          };
        });
        return {
          id: city.id,
          location: city.location,
          data: hourlyData,
          units: city.hourlyUnits || {},
        };
      });
      console.log("getHourlyData:", selectedCitiesData);
      return selectedCitiesData;
    };
  }, [selectedCities, results]);

  const handleCityChange = ({ id, type, checked }) => {
    console.log("id", id, "type", type, "checked", checked);
    // Handle the change in city selection here
    if (type === "toggle") {
      toggleCity(id);
    } else if (type === "remove") {
      removeCity(id);
    } else if (type === "all") {
      //console.log("handleCityChange: type all, checked", checked);
      // Handle select all logic here
      toggleCities(checked);
    }
  };
 
  const getSelectedCitiesData = useMemo(() => {
    return (selectedCities, results) => {
      const compareCities = results.filter((city) => selectedCities.has(city.id));
      const selectedCitiesData = compareCities.map((city) => {
        return {
          id: city.id,
          location: city.location,
          data: city.current || {},
          units: city.currentUnits || {},
          model: city.model || {},
        };
      });
      return selectedCitiesData;
    };
  }, [selectedCities, results]);

  const getDaylyData = useMemo(() => {
    return (selectedCities, results) => {
      const compareCities = results.filter((city) => selectedCities.has(city.id));
      const selectedCitiesData = compareCities.map((city) => {
        const daylyData = city.daily?.time.map((t, index) => {
          const date = new Date(t);
          const day = date.getDay();
          return {
            date: DAYS_OF_WEEK[day] + " " + date.getDate() + "." + (date.getMonth() + 1),
            temperatureMax: city.daily?.temperature[index],
            temperatureMin: city.daily?.temperatureMin[index],
            temperature: [
              city.daily?.temperatureMin[index],
              city.daily?.temperature[index],
            ],
            weatherCode: city.daily?.weatherCode[index],
          };
        });
        return {
          id: city.id,
          location: city.location,
          data: daylyData,
          units: city.dailyUnits || {},
        };
      });
      //console.log("getDaylyData:", selectedCitiesData);
      return selectedCitiesData;
    };
  }, [selectedCities, results]);
*/

/* 
import React, { useMemo, useState } from "react";
  const [detailsOpen, setDetailsOpen] = useState(false);
<Menu as="div" className="relative md:hidden z-50">
          <MenuButton
            role="nav-opener"
            className="inline-flex justify-center data-focus:outline-none"
          >
            <Bars3Icon className="h-6 w-6 text-gray-100" />
          </MenuButton>

          <MenuItems
            anchor={{ to: "bottom end", gap: "4px" }}
            className="mt-6 border border-neutral-600 rounded-md shadow-lg data-focus:outline-none z-50"
          >
            {navData.map((value, index) => (
              <React.Fragment key={value.id}>
                {value.items ? (
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setDetailsOpen((open) => !open)}
                      className="
                block w-28 h-auto px-4 py-2
                text-sm text-center font-bold
                bg-neutral-900 text-neutral-400
              "
                    >
                      {value.name}
                      <ChevronDownIcon
                        className={`inline-block size-4 ml-1 transition-transform ${
                          detailsOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {detailsOpen && (
                      <div
                        className="
                  absolute right-full top-0 mr-1
                  border border-neutral-600
                  rounded-md shadow-lg
                  bg-neutral-900
                  z-50
                "
                      >
                        {value.items.map((item) => (
                          <NavLink
                            key={item.id}
                            to={item.path}
                            onClick={() => setDetailsOpen(false)}
                            className={({ isActive, isPending }) => {
                              const baseClass =
                                "block w-36 h-8 px-4 py-2 text-sm text-center font-bold";

                              return isPending
                                ? `${baseClass} bg-neutral-850 text-neutral-400`
                                : isActive
                                  ? `${baseClass} bg-neutral-900 text-neutral-200`
                                  : `${baseClass} bg-neutral-900 text-neutral-400`;
                            }}
                          >
                            {item.name}
                          </NavLink>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <MenuItem>
                    <NavLink
                      to={value.path}
                      className={({ isActive, isPending }) => {
                        const baseClass =
                          "block w-28 h-8 px-4 py-2 text-sm text-center font-bold";

                        return isPending
                          ? `${baseClass} pending bg-neutral-850 text-neutral-400`
                          : isActive
                            ? `${baseClass} bg-neutral-900 text-neutral-200`
                            : `${baseClass} bg-neutral-900 text-neutral-400`;
                      }}
                    >
                      {value.name}
                    </NavLink>
                  </MenuItem>
                )}

                {index < navData.length - 1 && (
                  <MenuSeparator className="h-px bg-gray-400" />
                )}
              </React.Fragment>
            ))}
          </MenuItems>
        </Menu>
*/

        {/* <Menu as="div" className="relative md:hidden z-50">
          <MenuButton
            role="nav-opener"
            className="inline-flex justify-center data-focus:outline-none"
          >
            <Bars3Icon className="h-6 w-6 text-gray-100" />
          </MenuButton>

          <MenuItems
            anchor={{ to: "bottom end", gap: "4px" }}
            className="mt-6 border border-neutral-600 rounded-md shadow-lg data-focus:outline-none z-50"
          >
            {navData.map((value, index) => (
              <React.Fragment key={value.id}>
                {value.items ? (
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setDetailsOpen((open) => !open)}
                      className="block w-28 h-auto px-4 py-2 text-sm text-center font-bold bg-neutral-900 text-neutral-400"
                    >
                      {value.name}
                      <ChevronDownIcon
                        className={`inline-block size-4 ml-1 transition-transform ${
                          detailsOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {detailsOpen && (
                      <div
                        className="
                  absolute right-full top-0 mr-1
                  border border-neutral-600
                  rounded-md shadow-lg
                  bg-neutral-900
                  z-50
                "
                      >
                        {value.items.map((item) => (
                          <NavLink
                            key={item.id}
                            to={item.path}
                            onClick={() => setDetailsOpen(false)}
                            className={({ isActive, isPending }) => {
                              const baseClass =
                                "block w-36 h-8 px-4 py-2 text-sm text-center font-bold";

                              return isPending
                                ? `${baseClass} bg-neutral-850 text-neutral-400`
                                : isActive
                                  ? `${baseClass} bg-neutral-900 text-neutral-200`
                                  : `${baseClass} bg-neutral-900 text-neutral-400`;
                            }}
                          >
                            {item.name}
                          </NavLink>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <MenuItem>
                    <NavLink
                      to={value.path}
                      className={({ isActive, isPending }) => {
                        const baseClass =
                          "block w-28 h-8 px-4 py-2 text-sm text-center font-bold";

                        return isPending
                          ? `${baseClass} pending bg-neutral-850 text-neutral-400`
                          : isActive
                            ? `${baseClass} bg-neutral-900 text-neutral-200`
                            : `${baseClass} bg-neutral-900 text-neutral-400`;
                      }}
                    >
                      {value.name}
                    </NavLink>
                  </MenuItem>
                )}

                {index < navData.length - 1 && (
                  <MenuSeparator className="h-px bg-gray-400" />
                )}
              </React.Fragment>
            ))}
          </MenuItems>
        </Menu> */}