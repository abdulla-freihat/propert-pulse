const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;

//fetch all properties

const fetchProperties = async () => {
  try {
    if (!apiDomain) {
      return [];
    }

    const res = await fetch(`${apiDomain}/properties` , {cache:'no-store'});

    if (!res.ok) {
      throw new Error("Failed to fetch data.");
    }

    return res.json();
  } catch (err) {
    console.log(err.message);
    return [];
  }
};

//fetch single property

const fetchSingleProperty = async (id) => {
  try {
    if (!apiDomain) {
      return null;
    }

    const res = await fetch(`${apiDomain}/properties/${id}`);

    if (!res.ok) {
      throw new Error("Failed to fetch data.");
    }

    return res.json();
  } catch (err) {
    console.log(err.message);
    return null;
  }
};




//fetch user properties

const fetchUserProperties = async (userId) => {
  try {
    if (!apiDomain) {
      return null;
    }

    const res = await fetch(`${apiDomain}/properties/user/${userId}`);

    if (!res.ok) {
      throw new Error("Failed to fetch data.");
    }

    return res.json();
  } catch (err) {
    console.log(err.message);
    return null;
  }
};

export { fetchProperties, fetchSingleProperty  , fetchUserProperties};
