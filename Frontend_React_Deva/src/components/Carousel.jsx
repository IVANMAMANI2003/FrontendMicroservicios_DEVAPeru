/* eslint-disable react/prop-types */
import { Carousel } from "primereact/carousel";

export const Carousels = (props) => {
  const { value } = props;

  const responsiveOptions = [
    {
      breakpoint: "1024px",
      numVisible: 1,
      numScroll: 1,
    },
    {
      breakpoint: "768px",
      numVisible: 1,
      numScroll: 1,
    },
    {
      breakpoint: "560px",
      numVisible: 1,
      numScroll: 1,
    },
  ];

  const bannerTemplate = (rowData) => {
    return (
      <div className="relative overflow-hidden h-[30vh] sm:h-[38vh] md:h-[50vh] lg:h-[78vh]">
        <div>
          <img
            src={rowData.imagen}
            alt="banner"
            className="w-full h-[30vh] sm:h-[38vh] md:h-[50vh] lg:h-[78vh]"
          />
          <div className="w-full hidden md:flex justify-center absolute bottom-0 p-2">
            <div className="w-4/5 text-white rounded-lg text-center bg-black bg-opacity-60 p-2">
              <h5 className="text-xl">{rowData.nombre}</h5>
              <p>{rowData.tipo}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <Carousel
        value={value}
        itemTemplate={bannerTemplate}
        numVisible={1}
        numScroll={1}
        responsiveOptions={responsiveOptions}
        circular={true}
        autoplayInterval={4000}
        className="custom-carousel"
      />
    </div>
  );
};
