export const loadCurrentTemperatures = <T>() => {
	// TODO: change the url to be api.polytunnel... or whatever
  return fetch("https://polytunnel.gsej.co.uk/api/currenttemperatures").then((response) => {
    if (response.ok) {
      return response.json() as Promise<T>;
    } else {
      throw new Error("Something went wrong.");
    }
  });
};
