// https://mo-lms.t3.storage.dev/icon%20up.png-%20357f4c86-d323-45e1-9c40-6c7728c5c72c

// after / it is image fileKey  =>icon%20up.png-%20357f4c86-d323-45e1-9c40-6c7728c5c72c
// mo-lms => buket name

export const useURL = (fileKey: string): string => {
  const url = `https://mo-lms.t3.storage.dev/${fileKey}`;
  return url;
};
