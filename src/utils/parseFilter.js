const parseType = (type) => {
  const isString = typeof type === 'string';
  if (!isString) return;

  const isType = (type) => ['work', 'home', 'personal'].includes(type);

  if (isType(type)) return type;
};

const parseIsFavourite = (isFavourite, defaultValue = undefined) => {
  const isString = typeof isFavourite === 'string';
  if (!isString) return defaultValue;

  const parsedIsFavourite =
    isFavourite === 'true' || isFavourite === 'false'
      ? isFavourite
      : defaultValue;

  return parsedIsFavourite;
};

export const parseFilter = (query) => {
  const { contactType, isFavourite } = query;

  const parsedType = parseType(contactType);
  const parsedIsFavourite = parseIsFavourite(isFavourite);

  return {
    contactType: parsedType,
    isFavourite: parsedIsFavourite,
  };
};
