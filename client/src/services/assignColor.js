const assignColorToCategory = profile => {
    if (profile.category === "GeneralSupplies") {
      return " text-center p-3 mb-2 bg-success text-white";
    } else if (profile.category === "Software") {
      return " text-center p-3 mb-2 bg-warning text-dark";
    } else if (profile.category === "Hotel&Hospitality") {
      return " text-center p-3 mb-2 bg-light text-dark";
    }
  };

  export default assignColorToCategory