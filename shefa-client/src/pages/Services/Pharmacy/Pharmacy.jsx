import PharmacyCard from "./PharmacyCard/PharmacyCard";

const Pharmacy = () => {
  const shops = [
    {
      shop_name: "Chayanika Pharmacy Tootpara Khulna",
      address: "47 Tootpara Central Road, Khulna, Bangladesh",
      latitude: 22.806517,
      longitude: 89.5673633,
      phone: "+8801840014735",
      email: "chayanika.khl@gmail.com",
    },
    {
      shop_name: "Medicare Pharmacy Majid Sarani Khulna",
      address: "122 Majid Sarani, Khulna, Bangladesh",
      latitude: 22.8162284,
      longitude: 89.5432121,
      phone: "+8801682228902",
      email: "medicare.khulna@gmail.com",
    },
    {
      shop_name: "Akon Medical",
      address: "RH66+89P, Tarer Pukur Rd, Khulna, Bangladesh",
      phone: "+88041720337",
      email: "",
      latitude: 22.8393,
      longitude: 89.5598,
    },

    {
      shop_name: "Saleha Medicine Corner Khulna Medical College Gate",
      address: "Khulna Medical College Hospital Gate, Khulna, Bangladesh",
      latitude: 22.8273967,
      longitude: 89.5366926,
      phone: "+8801812223222",
      email: "saleha.pharmacy@gmail.com",
    },
    {
      shop_name: "Masfi Drugs Khulna Medical College Area",
      address: "Madrasa Gali, Khulna Medical College Area, Khulna, Bangladesh",
      latitude: 22.8272079,
      longitude: 89.5370182,
      phone: "+8801920686484",
      email: "masfi.drugs@gmail.com",
    },
    {
      shop_name: "Boyra Pharmacy Khulna Medical College Front",
      address: "Hospital Main Gate, Khulna Medical College, Khulna, Bangladesh",
      latitude: 22.8273454,
      longitude: 89.5368203,
      phone: "+8801715595509",
      email: "boyra.pharmacy@gmail.com",
    },
  ]; // your array

  return (
    <div className=" w-full sm:mb-15 px-[7%] pt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 bg-[#f7fbff]  ">
      {shops.map((shop, index) => (
        <PharmacyCard key={index} shop={shop} />
      ))}
    </div>
  );
};

export default Pharmacy;
