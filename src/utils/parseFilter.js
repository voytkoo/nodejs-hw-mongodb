const parseType = (contactType) => {
  const isString = typeof contactType === 'string';
  if (!isString) return;

  const isType = (contactType) =>
    ['work', 'home', 'personal'].includes(contactType);

  if (isType(contactType)) return contactType;
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
