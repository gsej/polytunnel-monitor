export const loadCurrentTemperatures = <T>() => {
  return fetch("https://polytunnel.gsej.co.uk/api/currenttemperatures").then((response) => {
    if (response.ok) {
      return response.json() as Promise<T>;
    } else {
      throw new Error("Something went wrong.");
    }
  });
};

export const loadTemperatures= <T>() => {
  return fetch("https://polytunnel.gsej.co.uk/api/temperatures").then((response) => {
    if (response.ok) {
      return response.json() as Promise<T>;
    } else {
      throw new Error("Something went wrong.");
    }
  });
};
