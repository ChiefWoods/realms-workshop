const buildPrettierCommand = (filenames) =>
  `prettier ${filenames.join(" ")} -w`;

export default {
  "**/*.ts": [buildPrettierCommand],
};
