/* eslint-disable react/jsx-no-target-blank */
import { useEffect, useState } from "react";
import { Accordion, AccordionTab } from "primereact/accordion";
import * as AuthService from "../../services/AuthService";
import "../../styles/Dashboard.css";
import Chart from "chart.js/auto";

const Inicio = () => {
  const [user, setUsers] = useState([]);

  const all_users = 10; // Reemplaza esto con los datos reales de tu API o estado
  const all_products = 20;
  const all_categories = 5;
  const all_videos = 15;
  const all_banners = 8;

  useEffect(() => {
    getUsers();
  }, []);

  const dataDoughnut = {
    labels: ["Usuarios", "Productos", "Categorías", "Videos", "Banners"],
    datasets: [
      {
        label: "Datos",
        data: [
          all_users,
          all_products,
          all_categories,
          all_videos,
          all_banners,
        ],
        backgroundColor: [
          "rgb(22 163 74 / 1)",
          "rgb(37 99 235 / 1)",
          "rgb(234 179 8 / 1)",
          "rgb(249 115 22 / 1)",
          "rgb(147 51 234 / 1)",
        ],
        hoverOffset: 4,
      },
    ],
  };

  const configDoughnut = {
    type: "doughnut",
    data: dataDoughnut,
    options: {},
  };

  useEffect(() => {
    const chartDoughnut = new Chart(
      document.getElementById("chartDoughnut"),
      configDoughnut
    );
    const chartBar = new Chart(
      document.getElementById("chartBar"),
      configBarChart
    );

    return () => {
      chartDoughnut.destroy();
      chartBar.destroy();
    };
  }, []);

  const labelsBarChart = [
    "Usuarios",
    "Productos",
    "Categorías",
    "Videos",
    "Banners",
  ];

  const dataBarChart = {
    labels: labelsBarChart,
    datasets: [
      {
        label: "Datos",
        backgroundColor: "hsl(252, 82.9%, 67.8%)",
        borderColor: "hsl(252, 82.9%, 67.8%)",
        data: [
          all_users,
          all_products,
          all_categories,
          all_videos,
          all_banners,
        ],
      },
    ],
  };

  const configBarChart = {
    type: "bar",
    data: dataBarChart,
    options: {},
  };

  const getUsers = () => {
    AuthService.getUserList()
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div className="p-4">
        <div className="cardBox">
          <a className="card" href="{{ route('sistema-usuarios.index') }}">
            <div className="title shadow-sm text-sm">Usuarios</div>
            <div>
              <div className="numbers">{all_users}</div>
              <div className="cardName">en total</div>
            </div>
            <div className="iconBx">
              <i className="pi pi-users" style={{ fontSize: "3.5rem" }}></i>
            </div>
          </a>
          <a className="card" href="{{ route('sistema-productos.index') }}">
            <div className="title shadow-sm text-sm">Productos</div>
            <div>
              <div className="numbers">{all_products}</div>
              <div className="cardName">en total</div>
            </div>
            <div className="iconBx">
              <i
                className="pi pi-shopping-cart"
                style={{ fontSize: "3.5rem" }}
              ></i>
            </div>
          </a>
          <a className="card" href="{{ route('sistema-categorias.index') }}">
            <div className="title shadow-sm text-sm">Categorias</div>
            <div>
              <div className="numbers">{all_categories}</div>
              <div className="cardName">en total</div>
            </div>
            <div className="iconBx">
              <i className="pi pi-tags" style={{ fontSize: "3.5rem" }}></i>
            </div>
          </a>
          <a className="card" href="{{ route('sistema-videos.index') }}">
            <div className="title shadow-sm text-sm">Videos</div>
            <div>
              <div className="numbers">{all_videos}</div>
              <div className="cardName">en total</div>
            </div>
            <div className="iconBx">
              <i className="pi pi-youtube" style={{ fontSize: "3.5rem" }}></i>
            </div>
          </a>
          <a className="card" href="{{ route('sistema-banners.index') }}">
            <div className="title shadow-sm text-sm">Banners</div>
            <div>
              <div className="numbers">{all_banners}</div>
              <div className="cardName">en total</div>
            </div>
            <div className="iconBx">
              <i className="pi pi-images" style={{ fontSize: "3.5rem" }}></i>
            </div>
          </a>
        </div>
      </div>

      <div className="px-4 lg:flex gap-4">
        <div className="w-full lg:w-[63%]">
          <div className="block rounded-lg shadow-lg h-auto bg-white text-center border border-gray-200">
            <div className="py-3 px-6 border-b border-gray-300">
              Somos innovadores por excelencia
            </div>
            <div className="p-6">
              <h5 className="text-blue-700 text-xl font-medium mb-2 ">
                ¡Bienvenido al sistema!
              </h5>
              <p className="text-gray-700 text-base">
                {user.userName}
                {user.correo}
              </p>
            </div>
            <div className="py-3 px-6 border-t border-gray-300 text-gray-600 items-center">
              <div id="fecha"></div>
              <div id="tiempo"></div>
            </div>
          </div>
          <div
            className="accordion accordion-flush h-auto mt-6 shadow-xl rounded-xl border border-gray-200"
            id="accordionFlushExample"
          >
            <h5>Multiple</h5>
            <Accordion multiple activeIndex={[0]}>
              <AccordionTab header="¿Que dimensión debo utilizar para las imágenes?">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </p>
              </AccordionTab>
              <AccordionTab header="Header II">
                <p>
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque laudantium, totam rem aperiam, eaque
                  ipsa quae ab illo inventore veritatis et quasi architecto
                  beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem
                  quia voluptas sit aspernatur aut odit aut fugit, sed quia
                  consequuntur magni dolores eos qui ratione voluptatem sequi
                  nesciunt. Consectetur, adipisci velit, sed quia non numquam
                  eius modi.
                </p>
              </AccordionTab>
              <AccordionTab header="Header III">
                <p>
                  At vero eos et accusamus et iusto odio dignissimos ducimus qui
                  blanditiis praesentium voluptatum deleniti atque corrupti quos
                  dolores et quas molestias excepturi sint occaecati cupiditate
                  non provident, similique sunt in culpa qui officia deserunt
                  mollitia animi, id est laborum et dolorum fuga. Et harum
                  quidem rerum facilis est et expedita distinctio. Nam libero
                  tempore, cum soluta nobis est eligendi optio cumque nihil
                  impedit quo minus.
                </p>
              </AccordionTab>
            </Accordion>
          </div>
        </div>
        <div className="w-full lg:w-[37%] mt-6 lg:mt-0 flex gap-6">
          <div className="shadow-lg rounded-lg h-auto overflow-hidden bg-white border border-gray-200 w-[37%] lg:w-full">
            <div className="py-3 px-5 text-center">Gráfico</div>
            <canvas
              className="p-4 border-t border-gray-300"
              id="chartDoughnut"
            ></canvas>
          </div>
          <div className="shadow-lg rounded-lg overflow-hidden border border-gray-200 block lg:hidden w-[63%]">
            <div className="py-3 px-5 text-center">Bar chart</div>
            <canvas
              className="p-4 border-t border-gray-300"
              id="chartBar"
            ></canvas>
          </div>
        </div>
      </div>

      {/** Redes Sociales */}
      <div className="p-4 text-center flex justify-center gap-4">
        <a
          data-mdb-ripple="true"
          data-mdb-ripple-color="light"
          href="https://www.facebook.com/DDEVAPERU/"
          target="_blank"
          className="flex justify-center w-[25%] px-6 py-2.5 mb-2 text-white font-medium text-xs leading-tight uppercase rounded-lg shadow-md hover:shadow-xl focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out bg-gradient-to-r from-blue-400 to-blue-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 320 512"
            className="w-4 h-4"
          >
            <path
              fill="currentColor"
              d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"
            />
          </svg>
        </a>
        <a
          data-mdb-ripple="true"
          data-mdb-ripple-color="light"
          href="https://twitter.com/DevaperuS"
          target="_blank"
          className="flex justify-center w-[25%] px-6 py-2.5 mb-2 text-white font-medium text-xs leading-tight uppercase rounded-lg shadow-md hover:shadow-xl focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out bg-gradient-to-r from-cyan-400 to-cyan-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className="w-4 h-4"
          >
            <path
              fill="currentColor"
              d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"
            />
          </svg>
        </a>
        <a
          data-mdb-ripple="true"
          data-mdb-ripple-color="light"
          href="https://www.instagram.com/devaperu_oficial/?hl=es-la"
          target="_blank"
          className="flex justify-center w-[25%] px-6 py-2.5 mb-2 text-white font-medium text-xs leading-tight uppercase rounded-lg shadow-md hover:shadow-xl focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out bg-gradient-to-r from-purple-500 to-pink-500"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            className="w-4 h-4"
          >
            <path
              fill="currentColor"
              d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"
            />
          </svg>
        </a>
        <a
          data-mdb-ripple="true"
          data-mdb-ripple-color="light"
          href="https://www.linkedin.com/in/devaperu-sac-5b250a227/"
          target="_blank"
          className="flex justify-center w-[25%] px-6 py-2.5 mb-2 text-white font-medium text-xs leading-tight uppercase rounded-lg shadow-md hover:shadow-xl focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out bg-gradient-to-r from-gray-700 to-blue-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            className="w-4 h-4"
          >
            <path
              fill="currentColor"
              d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"
            />
          </svg>
        </a>
      </div>
    </div>
  );
};
export default Inicio;
