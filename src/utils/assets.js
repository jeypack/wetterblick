const imageModules = import.meta.glob("../assets/**/*.{png,jpg,jpeg,webp,svg,gif}", {
  eager: true,
  import: "default",
});

export function resolveLocalImage(fileName, folder = "weather") {
  const key = `../assets/${folder}/${fileName}`;
  return imageModules[key] ?? "https://placehold.co/800x640";
}
