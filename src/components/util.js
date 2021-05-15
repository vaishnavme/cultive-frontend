export const checkIn = (collection, itemID) => {
    return !!collection.find((item) => item._id === itemID);
}

export const onlyUnique = (value, index, self) => {
    return self.indexOf(value) === index;
  }