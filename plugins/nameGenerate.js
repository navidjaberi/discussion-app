 const nameGenerate = (uName) => {
    let rgx = new RegExp(/(\p{L}{1})\p{L}+/, "gu");
    let name = uName;
    let initials = [...name.matchAll(rgx)] || [];

    initials = (
      (initials.shift()?.[1] || "") + (initials.pop()?.[1] || "")
    ).toUpperCase();
    return initials;
  };
  export default nameGenerate;